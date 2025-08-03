import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';

export function contentPlugin(): Plugin {
  const virtualModuleId = 'virtual:content';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-content',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const contentDir = path.resolve(process.cwd(), 'content');
        const files = await glob('**/*.md', { cwd: contentDir });
        
        const contentMap: Record<string, any> = {};
        
        for (const file of files) {
          const filePath = path.join(contentDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { data, content } = matter(fileContent);
          
          contentMap[`content/${file}`] = {
            data,
            content: content.trim()
          };
        }
        
        return `export const contentMap = ${JSON.stringify(contentMap)};`;
      }
    },
    handleHotUpdate({ file, server }) {
      if (file.includes('/content/') && file.endsWith('.md')) {
        const module = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
        if (module) {
          server.reloadModule(module);
        }
      }
    }
  };
}
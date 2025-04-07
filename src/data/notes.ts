export interface Note {
  id: string;           // Custom (bingo) or date-based (feb182025)
  title: string;        // Note title
  date: string;         // ISO date string
  content: string;      // Markdown content
  isPinned?: boolean;   // Whether note is pinned
  pinnedOrder?: number; // 1 = top, only for pinned notes
}

export function generatePreview(content: string): string {
  if (!content) return '';
  
  // Remove empty lines at start and end
  const trimmedContent = content.trim();
  
  // Remove markdown headers, list markers, and multiple newlines
  const cleanContent = trimmedContent
    .replace(/^#.*$/gm, '') // Remove headers
    .replace(/^[-*+]\s+/gm, '') // Remove list markers but keep the text
    .replace(/\n{2,}/g, ' ') // Replace multiple newlines with space
    .replace(/\n/g, ' ')    // Replace all remaining newlines with spaces
    .trim();

  // Get the first 100 characters for preview
  return cleanContent.length > 100 
    ? cleanContent.substring(0, 100) + '...'
    : cleanContent;
}

export const notes: Note[] = [
  // Pinned notes (in order of pinnedOrder)
  {
    id: 'mar172025',
    title: '🌱 now (read me!)',
    date: '2025-03-17T03:50:00Z',
    content: `my second ever update woo hoo on this new personal website. finally narrowed down top 2 ethical british shorthair breeders. NYC move might happen sooner than expected, so I'm starting to get back into the job search now!

# goals right now
- make baggy fashion show recap and upload photos (update: [done!](https://helenhuang.io/baggy))
- clean apartment
- apply to jerbs???
- fix the https:// and domain redirect issues on this site

![Me pondering life decisions and why I'm working on this website so late](/images/pondering.jpg)

*BTW, this is my /now page, inspired by Derek Sivers and the [/now movement](https://nownownow.com/about). It's essentially a spot to showcase what I'm exactly up to these days. I'm keeping my old /now pages though, you can see the, below.*
`,
    isPinned: true,
    pinnedOrder: 2
  },
  {
    id: 'about',
    title: '🤠 about me',
    date: '2025-04-07T01:23:00Z',
    content: `howdy, I'm Helen Huang, a product, ops and strategy person. enthusiastic about anything experiential: marketing, content, learning, community, food. 
    
# currently
- having fun on a [career break](https://www.linkedin.com/posts/heyohelen_newbeginnings-careerchange-adultgapyear-activity-7269806988396490752-Lbet?utm_source=share&utm_medium=member_desktop&rcm=ACoAAA0TBRAB1SrfwkAumixBnBxq7Zxt35jGKd8) (since Sept 2024)
- working on creative projects like my fake trash bag [fashion brand](https://helenhuang.io/baggy) and creating [content](/projects) (31K+ followers, 1M+ impressions on socials)
- searching for meaningful work with people who care about making the world better (NYC or remote)

# previous work work 
- cofounder @ co.lab -- wearer of all hats, $30M+ in annual tech industry salaries for our graduates
  - forbes 30 under 30 education, asu+gsv 150 top startups, hustle fund affies award, see other [accolades](/recognition)
- program + product management @ microsoft -- msft edge tech evangelism & later windows engineering/azure devops working on pricing and developer experience
- product manager intern @ zynga -- wordstreak with friends (300k dau), spearheaded app revamp from 1 to 4 stars in four months
- interned @ cibc & scotiabank -- business analyst roles back in university days
- sales -- manchuwok, canada's wonderland, shoe club  

# education (and lifelong learning)
- b.sc in science and business (earth sci specialization) @ university of waterloo (2017)
- nat eliason's build your own products with AI course (feb 2025)
- shreyas doshi's improving your product sense course (april 2025)`,
    isPinned: true,
    pinnedOrder: 1
  },
  {
    id: 'links',
    title: '🔗 links',
    date: '2025-03-17T00:24:00Z',
    content: `feel free to reach out! if you don't hear back quickly, definitely follow up again - it's me, not you. i tend to take long breaks from social media.
- email: [chat@helenhuang.com](mailto:chat@helenhuang.com)
- linkedin: [linkedin.com/in/heyohelen](https://www.linkedin.com/in/heyohelen)
- twitter: [x.com/heyohelen](https://x.com/heyohelen)
- instagram: [instagram.com/heyohelen](https://www.instagram.com/heyohelen)`,
    isPinned: true,
    pinnedOrder: 3  
  },
  {
    id: 'projects',
    title: '📙 creative projects',
    date: '2025-04-07T00:59:00Z',
    content: `i find doing stuff and helping people to be fun. here are some things i'm particularly proud of: 

  # events & community
  - conceptualized and executed satirical performance art project selling 🗑️ trash bags as clothes and running a fashion show
    - check out the dedicated [BAGGY site](https://helenhuang.io/baggy) to decide whether it's real or fake...
    - how it all [started](https://www.instagram.com/p/DFBvhI9vayw/) 
  - coordinated over 15+ volunteers to put on Tech Together, a month-long series of event programming for folks impacted by layoffs with virtual and irl events in Toronto, NYC and Seattle

  ![a few of the events we ran, which saw over 700 engaged attendees (tears were shed)](/images/techtogether.png)

  # content & social media 
  - micro-influencer on [LinkedIn](https://www.linkedin.com/in/heyohelen/), mainly written content on tech and entrepreneurship -- *20K+ followers, previously Top Voice*
  - university of waterloo science faculty [collab reel](https://www.instagram.com/reel/CqlMjmQATLX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==) -- *35K+ views*
  - balam pichkari [dance video](https://x.com/heyohelen/status/1651703013361238016) in india -- *250K+ impressions total*
  - travels to nigeria: self-choreo [dance video](https://x.com/heyohelen/status/1706392849934135705), and written travel [impressions](https://www.linkedin.com/posts/heyohelen_ive-been-in-lagos-for-a-few-days-now-activity-7079138712269295616-QIXu?utm_source=share&utm_medium=member_desktop&rcm=ACoAAA0TBRAB1SrfwkAumixBnBxq7Zxt35jGKd8) -- *900K+ impressions*

  # storytelling 
  - sold and minted 60+ 1:1 nfts on solana, commission-based community & art project [(example)](https://x.com/tamarincrypto/status/1486887134992941058)
  - tales on how to pivot into [product management](https://www.producthunt.com/products/how-to-product#how-to-product), #1 product of the day of Product Hunt
  - [you belong in tech](https://www.producthunt.com/products/you-belong-in-tech-1-0#you-belong-in-tech-1-0) ebooks, #4 product of the day, career-pivot stories and resources meant to inspire folks breaking into tech

  <iframe 
    src="https://www.youtube.com/embed/bZwy0-s7Obc" 
    title="you belong in tech booklet release" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen>
  </iframe>
  `,
    isPinned: true,
    pinnedOrder: 4
  },

  
  // Non-pinned notes (in descending date order)
  {
    id: 'recognition',
    title: '🎖️ recognition and speaking',
    date: '2025-03-17T00:54:00Z',
    content: `
- forbes 30 under 30, asu+gsv top 150 startups: honored for co.lab's impact
- product hunt #1 product of the day, #4 of the day for separate project ~ 
- dmz women of the year: recognized for contributions to tech education
- glory 30x30 honoree: named one of canada's standout young entrepreneurs
- waterloo innovation summit: spoke on flipped classrooms & peer-led learning
- dmz: discussed founder-led sales strategies & marketing funnels
- founder institute: insights on community-driven growth & product-led strategies`
  },
  {
    id: 'reminders',
    title: '🌸 pondering',
    date: '2025-02-27T07:23:00Z',
    content: `
- Happiness is when what you think, what you say, and what you do are in harmony.
- What if the sky isn't the limit?
- All of the time spent on worrying about things can probably be better used in other ways.
- Perhaps digital beings should have rights?
- What exactly does a work-life integration look like?
- How do we get the general public to care about things that matter? How do we break information down into digestible pieces, while retaining the full context and nuance? How do we communicate in a way that is accessible to everyone?`
  },
  {
    id: 'feb182025',
    title: '❄️ feb update',
    date: '2025-02-18T20:14:00Z',
    content: `After a pretty rough last half year, I've been feeling my energy and enthusiasm coming back recently! So I've been spending these past few weeks finally completing some of my personal projects.

Currently still residing in Toronto, though the plan is to move to NYC by the middle of the year. And maybe get a cute little british shorthair (or two!).

Moving to another country would require a visa, which opens up a whole new can of worms on decision-making and future-planning. For someone that hasn't really been thinking of plans beyond the next year, that's absolutely a shift in mindset that I'll need to tackle.

For now though... I'm going to continue focusing on my nearterm goals below and see where that gets me (especially as I continue to get back to - and rediscover - my baseline).

# Current Goals
- spend now - September working on interesting projects that don't need to have a ROI
- prove to myself that I have discipline and focus`,
    isPinned: false
  },
  {
    id: 'whatdis',
    title: '🐓 what is this?',
    date: '2025-02-17T02:01:00Z',
    content: `This is the current version of my personal website. It's a work in progress, but I'm slowly adding more and changing things up.

The current UI is inspired by [Alana Goyal's](https://www.alanagoyal.com/notes/about-me) personal website, with additional whimsical touches from yours truly ~

All the code here was written with the help of AI cause I don't code... or I guess now I do?? 

I used a blend of Cursor (with the help of MCPs), Cursor Code (for any times when I really struggled), and Claude/o1 (to do back and forth prompting review)! 
`,
    isPinned: false
  },
  {
    id: 'bingo',
    title: '📇 bingo card',
    date: '2025-03-17T07:51:00Z',
    content: `In January, I led a workshop where we made bingo cards (rather than your usual new years resolutions). This is what's on mine, it represents all the things I want to complete (or at least get started on) in in this first half of 2025.

# Not Yet Started

- write a creative workbook
- complete a chinese course
- move to NY
- do an essay on why i stopped doing my nails and lashes
- try pottery
- crocs in jean-form
- scifi short story 
- take pictures of all my clothes

# In Progress

- restart my blog
- finish AI coding course
- finish dance classes
- set up trading view for my stocks and rebalance them


# Completed

- finish this website (forever in progress but also done)
- get a drivers license (completed Feb 24, 2024)
- host a fake fashion show for my fake trash bag brand for my real birthday (completed March 2nd, 2025)`,
    isPinned: false
  }
]; 
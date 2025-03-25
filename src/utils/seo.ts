// SEO utility functions
export const generateTitle = (page?: string) => {
  const baseTitle = "Helen Huang | Tech Founder, Product Manager & Growth Strategist";
  return page ? `${page} - ${baseTitle}` : baseTitle;
};

export const generateDescription = (customDescription?: string) => {
  const baseDescription = "Helen Huang is a tech founder, product manager, and operator with 10+ years of experience. Co-founder of Co.Lab, Forbes 30 under 30, and former Microsoft PM.";
  return customDescription || baseDescription;
};

export const generateKeywords = (additionalKeywords: string[] = []) => {
  const baseKeywords = [
    "Helen Huang",
    "Helen Huang founder",
    "Helen Huang operator",
    "Helen Huang PM",
    "Helen Huang product manager",
    "Co.Lab founder",
    "tech education",
    "product management",
    "growth strategy"
  ];
  return [...baseKeywords, ...additionalKeywords].join(", ");
};
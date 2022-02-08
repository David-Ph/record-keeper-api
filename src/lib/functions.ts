export const getExcerptFromString = (string: string): string => {
  if (string.length < 150) return string;

  return `${string.slice(0, 150)}...`;
};

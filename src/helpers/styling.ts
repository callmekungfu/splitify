export const combineClassNames = (...classNames: string[]): string => {
  const trimmed = classNames.map((c) => c.trim());
  return trimmed.join(' ');
};

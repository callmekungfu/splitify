export const combineClassNames = (...classNames: string[]): string => {
  if (!classNames) {
    return '';
  }
  const trimmed = classNames.map((c) => c.trim());
  return trimmed.join(' ');
};

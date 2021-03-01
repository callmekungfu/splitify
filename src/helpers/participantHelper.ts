export const getInitialFromName = (name: string) => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

  let initials = [...Array.from(name.matchAll(rgx))] || [];

  return (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();
};

export const $ = (money: number) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'CAD' }).format(
    money,
  );

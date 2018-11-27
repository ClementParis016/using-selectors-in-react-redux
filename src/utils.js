export const intlAmount = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR"
});

export const intlPercent = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  minimumFractionDigits: 2
});

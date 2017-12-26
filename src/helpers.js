export function formatPrice(cents) {
  return `VND ${(cents).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}



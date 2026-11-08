// Способ приёма оплаты пока не выбран.
export const checkoutUrl = '';
export const guidePrice = '990 ₽';
export function openCheckout() {
  if (checkoutUrl) location.assign(checkoutUrl);
  else alert('Оплата пока не подключена.');
}

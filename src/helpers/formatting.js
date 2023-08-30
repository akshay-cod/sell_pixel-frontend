export const priceFormat = (price) => {
   return "₹"+parseFloat(price)?.toLocaleString()
}
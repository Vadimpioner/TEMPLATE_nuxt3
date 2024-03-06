export type _fetchCard = {
  status: 'outStock' | 'inStock',
  id: string | number,
  price: number,
  oldPrice: number,
  count?: number,
}

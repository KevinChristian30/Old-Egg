type Product = {
  product_id: string
  shop_id: number
  product_name: string
  product_category_id: number
  product_image_url?: string
  product_image_urls: string[]
  product_description: string
  product_price: number
  product_stock: number
  product_details: string
}

export default Product;
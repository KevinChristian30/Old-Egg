type Product = {
  product_id: string
  shop_id: number
  product_name: string
  product_category_id: number
  product_description: string
  product_price: number
  product_stock: number
  product_details: string
  product_image_links?: string[]
}

export default Product;
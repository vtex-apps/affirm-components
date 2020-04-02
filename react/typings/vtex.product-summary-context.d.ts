declare module 'vtex.product-summary-context/ProductSummaryContext' {
  import { Context } from 'react'

  interface ProductSummaryContext {
    product: any
    isLoading: boolean
  }

  export function useProductSummary(): ProductSummaryContext
}

/* eslint-disable @typescript-eslint/camelcase */
import React, { Fragment, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import useScriptLoader from './hooks/useScriptLoader'
import { path, prop } from 'ramda'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'
import Settings from '../graphql/Settings.graphql'

const AffirmSummaryPromo: StorefrontFunctionComponent = () => {
  const { data: settingsData } = useQuery(Settings, { ssr: false })

  const [affirm, { error }] = useScriptLoader(
    settingsData?.affirmSettings?.isLive
      ? 'https://cdn1.affirm.com/js/v2/affirm.js'
      : 'https://cdn1-sandbox.affirm.com/js/v2/affirm.js',
    'affirm'
  )

  useEffect(() => {
    if (affirm && !error) {
      window._affirm_config = {
        public_api_key: settingsData?.affirmSettings?.publicApiKey,
      }
      affirm.ui.refresh()
    }
  })

  const { product, isLoading } = useProductSummary()
  const commertialOffer = path<any>(
    ['sku', 'seller', 'commertialOffer'],
    product
  )

  const price = prop('Price', commertialOffer)

  if (isLoading || !affirm || !product || !commertialOffer) return null

  return (
    <Fragment>
      <p
        className="affirm-as-low-as"
        data-page-type="category"
        data-amount={price * 100}
      ></p>
    </Fragment>
  )
}

export default AffirmSummaryPromo

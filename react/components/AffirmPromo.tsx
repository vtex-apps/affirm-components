/* eslint-disable @typescript-eslint/camelcase */
import React, { Fragment, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import useScriptLoader from './hooks/useScriptLoader'
import useProduct from 'vtex.product-context/useProduct'
import Settings from '../graphql/Settings.graphql'

const AffirmPromo: StorefrontFunctionComponent = () => {
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

  const { product, selectedItem } = useProduct()

  if (!product || !selectedItem || !affirm || error) {
    return null
  }

  const price = selectedItem && selectedItem.sellers[0].commertialOffer.Price

  return (
    <Fragment>
      <p
        className="affirm-as-low-as"
        data-page-type="product"
        data-amount={price * 100}
      ></p>
    </Fragment>
  )
}

export default AffirmPromo

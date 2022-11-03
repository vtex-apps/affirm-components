import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'
import React, { useEffect } from 'react'
import { useQuery } from 'react-apollo'
import { path, prop } from 'ramda'
import { useCssHandles } from 'vtex.css-handles'

import useScriptLoader from './hooks/useScriptLoader'
import Settings from '../graphql/Settings.graphql'

interface AffirmPromoProps {
  affirmSettings: AffirmSettings
}

interface AffirmSettings {
  publicApiKey: string
  isLive: boolean
}

const CSS_HANDLES = ['affirmPromoSummary'] as const

const AffirmSummaryPromoDiv: StorefrontFunctionComponent<AffirmPromoProps> = ({
  affirmSettings,
}) => {
  const { publicApiKey = '', isLive = false } = affirmSettings

  const [affirm, { error }] = useScriptLoader(
    isLive
      ? 'https://cdn1.affirm.com/js/v2/affirm.js'
      : 'https://cdn1-sandbox.affirm.com/js/v2/affirm.js',
    'affirm'
  )

  useEffect(() => {
    if (!affirm || error || !publicApiKey || window._affirm_config) return

    window._affirm_config = {
      public_api_key: publicApiKey,
    }
    affirm.ui.refresh()
  }, [affirm, error, publicApiKey])

  const handles = useCssHandles(CSS_HANDLES)
  const { product, isLoading } = useProductSummary()
  const commertialOffer = path<any>(
    ['sku', 'seller', 'commertialOffer'],
    product
  )

  const price = prop('Price', commertialOffer)

  if (
    isLoading ||
    !affirm ||
    !product ||
    !commertialOffer ||
    error ||
    !publicApiKey
  )
    return null

  return (
    <p
      className={`affirm-as-low-as ${handles.affirmPromoSummary}`}
      data-page-type="category"
      data-amount={price * 100}
    ></p>
  )
}

const AffirmSummaryPromo: StorefrontFunctionComponent = () => {
  const { data: settingsData } = useQuery(Settings, { ssr: false })

  if (!settingsData?.affirmSettings) return null

  return <AffirmSummaryPromoDiv affirmSettings={settingsData.affirmSettings} />
}

export default AffirmSummaryPromo

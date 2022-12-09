import { useProduct } from 'vtex.product-context'
import React, { useEffect } from 'react'
import { useQuery } from 'react-apollo'
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

const CSS_HANDLES = ['affirmPromo'] as const

const AffirmPromoDiv: StorefrontFunctionComponent<AffirmPromoProps> = ({
  affirmSettings,
}) => {
  const { publicApiKey = '', isLive = false } = affirmSettings

  const [affirm, { error }] = useScriptLoader(
    isLive
      ? 'https://cdn1.affirm.com/js/v2/affirm.js'
      : 'https://cdn1-sandbox.affirm.com/js/v2/affirm.js',
    'affirm'
  )
  const productContext = useProduct()
  const product = productContext?.product
  const selectedItem = productContext?.selectedItem
  const selectedQty = productContext?.selectedQuantity ?? 1

  const handles = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    if (!affirm || error || !publicApiKey || window._affirm_config) return

    window._affirm_config = {
      public_api_key: publicApiKey,
    }

    affirm.ui.refresh()
  }, [affirm, error, publicApiKey])

  useEffect(() => {
    if (!affirm || error || !publicApiKey) return

    affirm.ui.refresh()
  }, [selectedItem])

  if (!product || !selectedItem || !affirm || error || !publicApiKey) {
    return null
  }

  const price = selectedItem.sellers[0].commertialOffer.Price

  return (
    <p
      className={`affirm-as-low-as ${handles.affirmPromo}`}
      data-page-type="product"
      data-amount={price * selectedQty * 100}
    ></p>
  )
}

const AffirmPromo: StorefrontFunctionComponent = () => {
  const { data: settingsData } = useQuery(Settings, { ssr: false })

  if (!settingsData?.affirmSettings) return null

  return <AffirmPromoDiv affirmSettings={settingsData.affirmSettings} />
}

export default AffirmPromo

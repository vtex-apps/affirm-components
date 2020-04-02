📢 Use this project, [contribute](https://github.com/vtex-apps/affirm-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

## Description

This app provides promotional messaging components related to the Affirm payment method.

## Configuration

1. Follow the install instructions for [Affirm Payment](https://github.com/vtex-apps/affirm-payment)
2. Add `"vtex.affirm-components": "0.x"` to your store-theme dependencies.
3. Place the desired Affirm component blocks in your `/store/` folder.

The available blocks are:

- `"product-teaser.product.affirm"`: This block should be placed on the product page. It displays a promotional message with the text "As low as $__/mo at _% APR." followed by a "Prequalify now" link that initiates Affirm's account signup modal.
- `"product-teaser.summary.affirm"`: Similar to the above but designed to be placed on product shelves.
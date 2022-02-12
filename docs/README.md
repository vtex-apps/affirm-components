📢 Use this project, [contribute](https://github.com/vtex-apps/affirm-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Affirm Components

This app provides promotional messaging components related to the Affirm payment method.

## Configuration

1. Follow the install instructions for [Affirm Payment](https://github.com/vtex-apps/affirm-payment)
2. Add `"vtex.affirm-components": "0.x"` to your store-theme dependencies.
3. Place the desired Affirm component blocks in your `/store/` folder.

The available blocks are:

- `"product-teaser.product.affirm"`: This block should be placed on the product page (PDP). It displays a promotional message such as `As low as \$\__/mo at _% APR` followed by a `Prequalify now` or `Learn More` link.
- `"product-teaser.summary.affirm"`: Similar to the above but designed to be placed on product shelves.

## Customization

In order to apply CSS customizations to this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles     |
|-----------------|
| `affirmAsLowAs` |
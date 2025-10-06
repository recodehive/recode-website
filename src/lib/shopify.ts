/**
 * Shopify Integration for Recode Merch Store
 * 
 * This file provides functions to interact with Shopify's Storefront API
 * to fetch products, create carts, and process checkouts.
 * 
 * Setup Instructions:
 * 1. Create a Shopify store at https://shopify.com
 * 2. Go to Settings > Apps and sales channels > Develop apps
 * 3. Create a new app and get your Storefront API access token
 * 4. Add your credentials to docusaurus.config.ts customFields
 * 
 * For development, add these to your docusaurus.config.ts:
 * customFields: {
 *   SHOPIFY_STORE_DOMAIN: 'your-store.myshopify.com',
 *   SHOPIFY_STOREFRONT_ACCESS_TOKEN: 'your-token-here',
 * }
 */

// Get credentials from Docusaurus customFields (configured in docusaurus.config.ts)
// These are set at build time and won't expose credentials in the code
const SHOPIFY_STORE_DOMAIN = 
  (typeof window !== 'undefined' && (window as any).docusaurus?.siteConfig?.customFields?.SHOPIFY_STORE_DOMAIN as string) || '';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = 
  (typeof window !== 'undefined' && (window as any).docusaurus?.siteConfig?.customFields?.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string) || '';

const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      };
    }>;
  };
}

interface ShopifyCheckout {
  id: string;
  webUrl: string;
  lineItems: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        quantity: number;
        variant: {
          id: string;
          title: string;
          priceV2: {
            amount: string;
            currencyCode: string;
          };
          image: {
            url: string;
          };
        };
      };
    }>;
  };
  subtotalPriceV2: {
    amount: string;
    currencyCode: string;
  };
  totalPriceV2: {
    amount: string;
    currencyCode: string;
  };
}

/**
 * Make a request to Shopify's Storefront API
 */
async function shopifyFetch<T>(query: string, variables = {}): Promise<T> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.warn('Shopify credentials not configured. Using mock data.');
    throw new Error('Shopify not configured');
  }

  const response = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const json = await response.json();
  
  if (json.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

/**
 * Fetch all products from Shopify
 */
export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
      query,
      { first }
    );
    return data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Get a single product by handle
 */
export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ productByHandle: ShopifyProduct }>(query, { handle });
    return data.productByHandle;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Create a new checkout
 */
export async function createCheckout(): Promise<ShopifyCheckout | null> {
  const query = `
    mutation CreateCheckout {
      checkoutCreate(input: {}) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      checkoutCreate: {
        checkout: ShopifyCheckout;
        checkoutUserErrors: Array<{ field: string; message: string }>;
      };
    }>(query);

    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      console.error('Checkout errors:', data.checkoutCreate.checkoutUserErrors);
      return null;
    }

    return data.checkoutCreate.checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
}

/**
 * Add items to checkout
 */
export async function addToCheckout(
  checkoutId: string,
  lineItems: Array<{ variantId: string; quantity: number }>
): Promise<ShopifyCheckout | null> {
  const query = `
    mutation AddToCheckout($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          webUrl
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                  }
                }
              }
            }
          }
          subtotalPriceV2 {
            amount
            currencyCode
          }
          totalPriceV2 {
            amount
            currencyCode
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      checkoutLineItemsAdd: {
        checkout: ShopifyCheckout;
        checkoutUserErrors: Array<{ field: string; message: string }>;
      };
    }>(query, {
      checkoutId,
      lineItems,
    });

    if (data.checkoutLineItemsAdd.checkoutUserErrors.length > 0) {
      console.error('Add to checkout errors:', data.checkoutLineItemsAdd.checkoutUserErrors);
      return null;
    }

    return data.checkoutLineItemsAdd.checkout;
  } catch (error) {
    console.error('Error adding to checkout:', error);
    return null;
  }
}

/**
 * Update line item quantities in checkout
 */
export async function updateCheckoutLineItems(
  checkoutId: string,
  lineItems: Array<{ id: string; quantity: number }>
): Promise<ShopifyCheckout | null> {
  const query = `
    mutation UpdateCheckout($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
      checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          webUrl
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
              }
            }
          }
          subtotalPriceV2 {
            amount
            currencyCode
          }
          totalPriceV2 {
            amount
            currencyCode
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      checkoutLineItemsUpdate: {
        checkout: ShopifyCheckout;
        checkoutUserErrors: Array<{ field: string; message: string }>;
      };
    }>(query, {
      checkoutId,
      lineItems,
    });

    if (data.checkoutLineItemsUpdate.checkoutUserErrors.length > 0) {
      console.error('Update checkout errors:', data.checkoutLineItemsUpdate.checkoutUserErrors);
      return null;
    }

    return data.checkoutLineItemsUpdate.checkout;
  } catch (error) {
    console.error('Error updating checkout:', error);
    return null;
  }
}

/**
 * Remove line items from checkout
 */
export async function removeFromCheckout(
  checkoutId: string,
  lineItemIds: string[]
): Promise<ShopifyCheckout | null> {
  const query = `
    mutation RemoveFromCheckout($checkoutId: ID!, $lineItemIds: [ID!]!) {
      checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
        checkout {
          id
          webUrl
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
              }
            }
          }
          subtotalPriceV2 {
            amount
            currencyCode
          }
          totalPriceV2 {
            amount
            currencyCode
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      checkoutLineItemsRemove: {
        checkout: ShopifyCheckout;
        checkoutUserErrors: Array<{ field: string; message: string }>;
      };
    }>(query, {
      checkoutId,
      lineItemIds,
    });

    if (data.checkoutLineItemsRemove.checkoutUserErrors.length > 0) {
      console.error('Remove from checkout errors:', data.checkoutLineItemsRemove.checkoutUserErrors);
      return null;
    }

    return data.checkoutLineItemsRemove.checkout;
  } catch (error) {
    console.error('Error removing from checkout:', error);
    return null;
  }
}

/**
 * Check if Shopify is configured
 */
export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

export type { ShopifyProduct, ShopifyCheckout };

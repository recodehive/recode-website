/**
 * Docusaurus Plugin to serve the Merch API during development
 * Proxies requests to Shopify to hide the Storefront API token
 */
module.exports = function merchApiPlugin(context, options) {
  return {
    name: 'merch-api-plugin',
    configureWebpack(config, isServer, utils) {
      if (isServer) return {};

      return {
        devServer: {
          setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
              throw new Error('webpack-dev-server is not defined');
            }

            // Handler for /api/merch
            devServer.app.post('/api/merch', async (req, res) => {
              const domain = process.env.SHOPIFY_STORE_DOMAIN;
              const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

              if (!domain || !token) {
                console.error("Merch API Error: Shopify credentials missing in .env");
                return res.status(500).json({ 
                  success: false, 
                  error: "Shopify credentials missing. Please add SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN to your .env file." 
                });
              }

              try {
                const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
                  method: 'POST',
                  headers: { 
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': token,
                  },
                  body: JSON.stringify(req.body)
                });

                const result = await response.json();
                res.json(result);
              } catch (error) {
                console.error("Merch API internal error:", error);
                res.status(500).json({ success: false, error: error.message });
              }
            });

            return middlewares;
          },
        },
      };
    },
  };
};

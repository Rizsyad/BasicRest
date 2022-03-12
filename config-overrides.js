const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@redux": "src/redux",
    "@utilities": "src/utilities",
    "@componentsRespone": "src/components/Request",
    "@tabContentRespone": "src/components/Respone/TabsContent",
    "@componentsRequest": "src/components/Request",
    "@tabContentRequest": "src/components/Request/TabsContent",
  })(config);

  return config;
};

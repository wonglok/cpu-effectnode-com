const withPlugins = require("next-compose-plugins");
const transpileModules = require("next-transpile-modules")([
  "three",
  // "@react-three/fiber",
]);

module.exports = withPlugins([transpileModules]);

//yarn add next-compose-plugins next-transpile-modules three drei react-three-fiber

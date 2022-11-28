//const basePath = process.cwd();
const { startCreating, buildSetup } = require('./src/main.js');

(async () => {
  await buildSetup();
  await startCreating(15);
})();

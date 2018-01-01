exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
  './test/devices.spec.js'
  ],
  params: require('./test_data.json')
};

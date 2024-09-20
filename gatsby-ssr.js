const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('script', {
      key: "goatcounter",
      'data-goatcounter': "https://sunghj1118.goatcounter.com/count",
      async: true,
      src: "//gc.zgo.at/count.js"
    })
  ]);
};
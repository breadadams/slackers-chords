module.exports = function (api) {
  return {
    presets: ["next/babel"],
    plugins: [
      ["styled-components", { ssr: true, displayName: !api.env("production") }]
    ]
  };
};

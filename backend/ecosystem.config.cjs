module.exports = {
  apps: [
    {
      name: "Pediasense API Server",
      script: "app.js",
      node_args: "--import ./loader.js",
      autorestart: true,
      watch: false,
    },
  ],
};

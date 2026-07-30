module.exports = {
  apps: [
    {
      name: "bacekhand-api",
      script: "./src/server.js",

      // Mode
      exec_mode: "fork",
      instances: 1,

      // Auto Restart
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",

      // Environment Development
      env: {
        NODE_ENV: "development",
        PORT: 3002,
      },

      // Environment Production
      env_production: {
        NODE_ENV: "production",
        PORT: 3002,
      },

      // Log
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
    },
  ],
};
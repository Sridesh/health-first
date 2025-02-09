import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import basicSsl from "@vitejs/plugin-basic-ssl";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, "../certs/localhost-key.pem")
      ),
      cert: fs.readFileSync(path.resolve(__dirname, "../certs/localhost.pem")),
    },
  },
});

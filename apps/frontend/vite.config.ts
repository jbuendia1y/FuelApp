import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

import {config as dotenvConfig} from "dotenv"
dotenvConfig()

// https://vitejs.dev/config/
export default ({mode}) =>{
  
  return defineConfig({
    plugins: [react({
      jsxImportSource: "@emotion/react",
      babel:{
        plugins:["@emotion/babel-plugin"]
      }
    })],
  
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  
    esbuild:{
      jsxFactory:"jsx",
      jsxInject:"import {jsx} from '@emotion/react'",
    },
  
    build: {
      manifest: true,
    },

    define:{
      "process.env":{
        SERVER_BASE_URL : process.env.SERVER_BASE_URL,
        ENTERPRISE_NAME : process.env.ENTERPRISE_NAME,
      }
    }
  })
}
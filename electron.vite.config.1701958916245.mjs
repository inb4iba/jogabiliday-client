// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
var __electron_vite_injected_dirname = "C:\\Users\\iba19\\dev\\jogabilidade\\jogabiliday";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__electron_vite_injected_dirname, "src/preload/main/preload.ts"),
          orelo: resolve(__electron_vite_injected_dirname, "src/preload/orelo/preload.ts"),
          tipa: resolve(__electron_vite_injected_dirname, "src/preload/tipa/preload.ts"),
          oreloView: resolve(__electron_vite_injected_dirname, "src/preload/orelo/orelo.ts"),
          tipaView: resolve(__electron_vite_injected_dirname, "src/preload/tipa/tipa.ts")
        }
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      }
    },
    plugins: [react()]
  }
});
export {
  electron_vite_config_default as default
};

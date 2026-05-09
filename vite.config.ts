import atomicoVite from "@atomico/vite";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/seichi-template/",
	plugins: [atomicoVite()],
});

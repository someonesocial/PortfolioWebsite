import { defineConfig } from "vite";

// Polyfill für crypto.getRandomValues
if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = {};
}
if (typeof globalThis.crypto.getRandomValues === 'undefined') {
  globalThis.crypto.getRandomValues = (arr) => {
    const crypto = require('crypto');
    return crypto.randomFillSync(arr);
  };
}

export default defineConfig({
  // base: "/PortfolioWebsite/",
});

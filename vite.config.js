import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})


// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';

// const NEXON_BASE_URL = 'https://www.nexon.com';

// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     proxy: {
//       '/api/lookup': {
//         target: NEXON_BASE_URL,
//         // ... (existing rewrite function remains the same)
//         rewrite: (path) => {
//             const newPath = path.replace('/api/lookup', '/api/maplestory/rankings/search');
//             return `${newPath}&search_type=character-name`;
//         },
//         changeOrigin: true,
//         secure: true,
//         // 🚨 ADD THIS HEADERS BLOCK 🚨
//         headers: {
//             // This tricks the CDN into thinking the request originated from the Nexon site.
//             'Referer': `${NEXON_BASE_URL}/`,
//             // This can sometimes help ensure the host is correctly identified.
//             'Host': 'www.nexon.com',
//             // Setting a common User-Agent can also help bypass simple blocks
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
//         }
//       },
//     },
//   },
// });
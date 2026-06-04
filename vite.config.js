import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import vitePrerender from 'vite-plugin-prerender'

// vite-plugin-prerender ships CJS internals — use createRequire to pull
// PuppeteerRenderer into this ESM config file
const require = createRequire(import.meta.url)
const PuppeteerRenderer = require('@prerenderer/renderer-puppeteer')

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ─── Supabase credentials (read-only anon key — safe to use at build time) ───
const SUPABASE_URL = 'https://xxsbhmnnstzhatmoivxp.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4c2JobW5uc3R6aGF0bW9pdnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzczMDAsImV4cCI6MjA2Mjk1MzMwMH0.p8UVJF_QzsFh0yJFTtHbJ8pdrjR9LSDg0xjIGrZNuK0'

// ─── Static routes — pre-rendered unconditionally ────────────────────────────
const STATIC_ROUTES = [
  '/',
  '/all-cars',
  '/classic-cars',
  '/modern-classics',
  '/bikes',
  '/automobiles',
  '/about-us',
  '/how-to-sell-with-us',
]

// ─── Dynamic routes — fetched from Supabase at build time ────────────────────
async function getDynamicCarRoutes() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/cars?select=carType,slugName`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    )

    if (!res.ok) throw new Error(`Supabase returned ${res.status}`)

    const cars = await res.json()
    const routes = cars.map((car) => `/${car.carType}/${car.slugName}`)

    console.log(`[prerender] Fetched ${routes.length} car listing routes from Supabase`)
    return routes
  } catch (err) {
    // Non-fatal — static routes will still be pre-rendered
    console.warn(`[prerender] Could not fetch car routes: ${err.message}`)
    console.warn(`[prerender] Only static routes will be pre-rendered this build`)
    return []
  }
}

// ─── Vite config ─────────────────────────────────────────────────────────────
export default defineConfig(async () => {
  const dynamicRoutes = await getDynamicCarRoutes()
  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes]

  console.log(
    `[prerender] ${allRoutes.length} total routes` +
    ` (${STATIC_ROUTES.length} static + ${dynamicRoutes.length} car listings)`
  )

  return {
    plugins: [
      react(),
      vitePrerender({
        staticDir: path.join(__dirname, 'dist'),
        routes: allRoutes,
        renderer: new PuppeteerRenderer({
          // Wait 3 s for React to fetch data from Supabase and re-render.
          // Supabase queries typically resolve in < 1 s; 3 s is a safe buffer.
          // Build time estimate: ~255 routes × 3 s ≈ 13 minutes per build.
          renderAfterTime: 3000,
          headless: true,
          // Required on Linux CI environments; harmless on macOS
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }),
      }),
    ],

    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  }
})

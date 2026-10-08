import { defineConfig, devices } from "@playwright/test"

const port = Number(process.env.PORT ?? 3100)
const baseURL = process.env.BASE_URL ?? `http://localhost:${port}`
// Uses the Edge (or Chrome) already installed on this machine, so no Playwright browser download is needed.
// Set PW_CHANNEL=chrome to use Chrome instead.
const channel = process.env.PW_CHANNEL ?? "msedge"

export default defineConfig({
    testDir: "./tests",
    outputDir: process.env.PW_OUTPUT_DIR ?? "test-results",
    fullyParallel: true,
    reporter: "list",
    use: {
        baseURL,
        trace: "retain-on-failure",
        // Animations are switched off unless a test opts in, which keeps parallel runs fast and stable
        reducedMotion: "reduce",
    },
    projects: [
        { name: "desktop", use: { channel, viewport: { width: 1440, height: 900 } } },
        { name: "mobile", use: { ...devices["Pixel 7"], channel } },
    ],
    // Runs against the production build: `npm run build` first. Set BASE_URL to test a deployed site instead.
    webServer: process.env.BASE_URL
        ? undefined
        : {
            command: `npm run start -- -p ${port}`,
            url: `${baseURL}/id`,
            reuseExistingServer: true,
            timeout: 120_000,
        },
})

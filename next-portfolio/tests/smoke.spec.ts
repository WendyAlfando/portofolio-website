import { expect, test } from "@playwright/test"

const pages = ["/id", "/en", "/id/blog", "/en/blog", "/id/blog/rpa-menghemat-waktu"]

test.describe("routing", () => {
    test.describe("Indonesian browser", () => {
        test.use({ locale: "id-ID" })

        test("root redirects to /id", async ({ page }) => {
            await page.goto("/")
            await expect(page).toHaveURL(/\/id$/)
        })
    })

    test.describe("English browser", () => {
        test.use({ locale: "en-US" })

        test("root redirects to /en", async ({ page }) => {
            await page.goto("/")
            await expect(page).toHaveURL(/\/en$/)
        })
    })

    test("old blog URLs redirect to the Indonesian blog", async ({ page }) => {
        await page.goto("/blog/rpa-menghemat-waktu")
        await expect(page).toHaveURL(/\/id\/blog\/rpa-menghemat-waktu$/)
    })

    test("unknown pages return 404", async ({ page }) => {
        for (const path of ["/xyz", "/id/halaman-tidak-ada", "/en/blog/rpa-menghemat-waktu"]) {
            const response = await page.goto(path)
            expect(response?.status(), path).toBe(404)
        }
    })
})

test.describe("home page", () => {
    test("renders one h1 with the display font", async ({ page }) => {
        await page.goto("/id")
        await expect(page.locator("html")).toHaveAttribute("lang", "id")
        const h1 = page.locator("h1")
        await expect(h1).toHaveCount(1)
        await expect(h1).toHaveText("Wendy Alfando")
        expect(await h1.evaluate((el) => getComputedStyle(el).fontFamily)).toMatch(/playfair/i)
        expect(await page.locator("body").evaluate((el) => getComputedStyle(el).fontFamily)).toMatch(/geist/i)
    })

    test("language switch opens the English page", async ({ page }) => {
        await page.goto("/id")
        await page.getByRole("group", { name: "Pilih bahasa" }).getByRole("link", { name: /^en$/i }).click()
        await expect(page).toHaveURL(/\/en$/)
        await expect(page.locator("html")).toHaveAttribute("lang", "en")
        await expect(page.getByRole("heading", { level: 2, name: "Bridging business needs and technical teams" })).toBeVisible()
    })

    test("theme toggle switches between dark and light", async ({ page }) => {
        await page.goto("/id")
        await expect(page.locator("html")).toHaveClass(/dark/)
        await page.getByRole("button", { name: "Ganti tema terang/gelap" }).click()
        await expect(page.locator("html")).not.toHaveClass(/dark/)
    })

    test("hero photo is sharp on high-density screens", async ({ page }) => {
        await page.goto("/id")
        const photo = page.getByRole("img", { name: "Foto Wendy Alfando" })
        await expect(photo).toBeVisible()
        await expect.poll(() => photo.evaluate((el: HTMLImageElement) => el.currentSrc)).toContain("w=")
        // naturalWidth is density-corrected for srcset images, so read the width the browser actually requested
        const { requested, needed } = await photo.evaluate((el: HTMLImageElement) => ({
            requested: Number(new URL(el.currentSrc).searchParams.get("w")),
            needed: Math.round(el.getBoundingClientRect().width * window.devicePixelRatio),
        }))
        expect(requested).toBeGreaterThanOrEqual(needed)
    })

    test("SEO tags point at the right URLs", async ({ page }) => {
        await page.goto("/id")
        const canonical = await page.locator('link[rel="canonical"]').getAttribute("href")
        expect(canonical).toMatch(/\/id$/)
        expect(canonical).not.toContain("portofolio-website-pi")
        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en$/)
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/)
        const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}")
        expect(jsonLd["@type"]).toBe("Person")
    })
})

test.describe("every page", () => {
    test("has no horizontal overflow", async ({ page }) => {
        for (const path of pages) {
            await page.goto(path)
            const overflow = await page.evaluate(
                () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
            )
            expect(overflow, path).toBeLessThanOrEqual(0)
        }
    })

    test("gives every link and button an accessible name", async ({ page }) => {
        for (const path of pages) {
            await page.goto(path)
            const unnamed = await page.locator("a, button").evaluateAll((elements) =>
                elements
                    .filter((el) => !(el.textContent?.trim() || el.getAttribute("aria-label") || el.getAttribute("title")))
                    .map((el) => el.outerHTML.slice(0, 120)),
            )
            expect(unnamed, path).toEqual([])
        }
    })
})

test.describe("navigation", () => {
    test("header links lead back to home sections from a blog post", async ({ page, isMobile }) => {
        await page.goto("/id/blog/rpa-menghemat-waktu")
        if (isMobile) await page.getByRole("button", { name: "Buka menu" }).click()
        await page.getByRole("navigation", { name: "Navigasi utama" }).getByRole("link", { name: "Kontak" }).click()
        await expect(page).toHaveURL(/\/id#contact$/)
        await expect(page.locator("#contact")).toBeInViewport()
    })
})

test.describe("blog", () => {
    test("post renders its markdown properly", async ({ page }) => {
        await page.goto("/id/blog/rpa-menghemat-waktu")
        await expect(page.locator("h1")).toHaveCount(1)
        await expect(page.locator(".prose ol > li")).toHaveCount(6)
        await expect(page.locator(".prose p:empty")).toHaveCount(0)
        await expect(page.locator('.prose a[href="/id#contact"]')).toHaveCount(1)
    })

    test("English blog index explains the article language", async ({ page }) => {
        await page.goto("/en/blog")
        await expect(page.getByText("Articles are currently written in Indonesian.")).toBeVisible()
        await page.getByRole("link", { name: /Bagaimana RPA/ }).click()
        await expect(page).toHaveURL(/\/id\/blog\/rpa-menghemat-waktu$/)
    })
})

test.describe("contact form", () => {
    test("shows a confirmation after sending", async ({ page }) => {
        // Never hit the real Formspree endpoint from tests
        await page.route("https://formspree.io/**", (route) =>
            route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }),
        )
        await page.goto("/id")
        const form = page.locator("form")
        await form.getByLabel("Nama").fill("Tes Otomatis")
        await form.getByLabel("Email").fill("tes@example.com")
        await form.getByLabel("Pesan").fill("Halo, ini pesan dari tes Playwright.")
        await form.getByRole("button", { name: "Kirim pesan" }).click()
        await expect(form.getByRole("status")).toHaveText("Terima kasih! Pesan Anda sudah terkirim.")
    })

    test("shows an error when sending fails", async ({ page }) => {
        await page.route("https://formspree.io/**", (route) => route.fulfill({ status: 500, body: "" }))
        await page.goto("/en")
        const form = page.locator("form")
        await form.getByLabel("Name").fill("Automated Test")
        await form.getByLabel("Email").fill("test@example.com")
        await form.getByLabel("Message").fill("Hello, this is a Playwright test message.")
        await form.getByRole("button", { name: "Send message" }).click()
        await expect(form.getByRole("status")).toHaveText(/couldn't be sent/)
    })
})

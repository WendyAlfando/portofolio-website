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

test.describe("motion", () => {
    const featuredMetric = "#projects article dl.grid dd"

    test("metrics show their final value when motion is reduced", async ({ page }) => {
        await page.goto("/id")
        await expect(page.locator(featuredMetric).first()).toHaveText("5+")
    })

    test.describe("with animations on", () => {
        test.use({ reducedMotion: "no-preference" })

        test("metrics count up to their real value once scrolled into view", async ({ page }) => {
            await page.goto("/id")
            const metric = page.locator(featuredMetric).first()
            // Below the fold it waits at zero, then counts up when it comes into view
            await expect(metric).toHaveText("0+")
            await metric.scrollIntoViewIfNeeded()
            await expect(metric).toHaveText("5+")
        })

        test("theme toggle still switches the theme while animating", async ({ page }) => {
            await page.goto("/id")
            await expect(page.locator("html")).toHaveClass(/dark/)
            await page.getByRole("button", { name: "Ganti tema terang/gelap" }).click()
            await expect(page.locator("html")).not.toHaveClass(/dark/)
            await page.reload()
            await expect(page.locator("html")).not.toHaveClass(/dark/)
        })

        test("splash screen plays once per session", async ({ page }) => {
            await page.goto("/id")
            const splash = page.locator(".splash")
            await expect(splash).toHaveCSS("display", "grid")
            await expect(splash).toBeHidden({ timeout: 5000 })
            await page.reload()
            await expect(page.locator("html")).toHaveAttribute("data-splash", "seen")
            await expect(splash).toHaveCSS("display", "none")
        })

        test("typing effect cycles through the roles", async ({ page }) => {
            await page.goto("/id")
            const typed = page.locator("#hero-title").locator("xpath=preceding-sibling::p[1]").locator("span[aria-hidden]").first()
            await expect(typed).toHaveText("Business Analyst")
            await expect(typed).not.toHaveText("Business Analyst", { timeout: 8000 })
        })

        test("skill bars fill up once scrolled into view", async ({ page }) => {
            await page.goto("/id")
            const card = page.locator("#skills [data-armed]").first()
            const bar = card.locator(".skill-fill").first()
            expect(await bar.evaluate((el) => el.getBoundingClientRect().width)).toBe(0)
            await card.scrollIntoViewIfNeeded()
            await expect(card).toHaveAttribute("data-in-view", "true")
            await expect
                .poll(() => bar.evaluate((el) => el.getBoundingClientRect().width / el.parentElement!.getBoundingClientRect().width))
                .toBeGreaterThan(0.85)
        })

        test("case study cards tilt toward the mouse", async ({ page, isMobile }) => {
            test.skip(isMobile, "tilt is mouse-only")
            await page.goto("/id")
            const card = page.locator("#projects .tilt-card").first()
            await card.scrollIntoViewIfNeeded()
            const box = (await card.boundingBox())!
            await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.2)
            await expect(card).toHaveAttribute("data-tilting", "true")
            // Pointer near the top-right corner: tilts back (positive X) and to the right (positive Y)
            const angle = (name: string) => card.evaluate((el, prop) => parseFloat(el.style.getPropertyValue(prop)), name)
            await expect.poll(() => angle("--rx")).toBeGreaterThan(1)
            await expect.poll(() => angle("--ry")).toBeGreaterThan(1)
        })

        test("custom cursor follows the mouse on desktop", async ({ page, isMobile }) => {
            test.skip(isMobile, "the cursor dot is for a mouse only")
            await page.goto("/id")
            await page.mouse.move(400, 300)
            await page.mouse.move(420, 320)
            await expect(page.locator('div[data-visible="true"].fixed')).toHaveCount(1)
        })
    })
})

test.describe("floating actions", () => {
    test("WhatsApp button pops in and back-to-top returns to the top", async ({ page }) => {
        await page.goto("/id")
        const whatsapp = page.getByRole("link", { name: "Chat via WhatsApp" })
        await expect(whatsapp).toBeVisible({ timeout: 6000 })
        const backToTop = page.getByRole("button", { name: "Kembali ke atas" })
        await expect(backToTop).toBeHidden()
        await page.locator("#skills").scrollIntoViewIfNeeded()
        await expect(backToTop).toBeVisible()
        await backToTop.click()
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50)
    })

    test("skill bars are full when motion is reduced", async ({ page }) => {
        await page.goto("/id")
        const bar = page.locator("#skills .skill-fill").first()
        const ratio = await bar.evaluate((el) => el.getBoundingClientRect().width / el.parentElement!.getBoundingClientRect().width)
        expect(ratio).toBeGreaterThan(0.85)
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

import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth"
import { Browser } from 'puppeteer';
import chromium from '@sparticuz/chromium';
// import chromium from '@sparticuz/chromium';
puppeteer.use(StealthPlugin());

const main = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: await chromium.executablePath(),
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
        });
        const page = await browser.newPage();
        const BASE_URL = "https://bot.sannysoft.com/";
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
        await page.screenshot({"path":"bot.jpeg"})
        await browser.close()
    } catch (error) {
        console.error('An error occurred with Amazon scraping:', error);
        return [];
    }
}
main()

/*
{
    args: [...chromium.args, 
        "--no-sandbox", 
        "--disable-setuid-sandbox", 
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu"],
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport
}
*/
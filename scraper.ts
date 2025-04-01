import express from "express";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import chromium from '@sparticuz/chromium';
import { Response } from "express";
import path from "path";

puppeteer.use(StealthPlugin());

const app = express();
const PORT = process.env.PORT || 3000;

const takeScreenshot = async () => {
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

        const screenshotPath = path.resolve("bot.jpeg"); // Ensure absolute path
        await page.screenshot({ path: screenshotPath });

        console.log("Screenshot taken");
        await browser.close();
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

// **API to Get the Screenshot**
app.use(express.static(path.resolve("."))); // Serve current directory

app.get("/screenshot", async ( res: Response) => {
    await takeScreenshot();
    console.log(res);
    res.send("File ready at /bot.jpeg"); 
    res.sendFile(path.resolve("bot.jpeg"));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
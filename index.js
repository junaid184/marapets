import puppeter from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { openWebsite } from './function.js'
puppeter.use(StealthPlugin())
const puppeterdiplay = (async () => {
    const browser = await puppeter.launch({
        headless: false,
        defaultViewpageort: null,
        args: ["--start-maximized"],
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        userDataDir: "C:/Users/GOOOD/AppData/Local/Google/Chrome/User",

    })
    let page = await browser.newPage();
    await page.setViewport({
        width: 1400,
        height: 700,
        deviceScaleFactor: 2,
    });
    const marapetsUrl = 'https://www.marapets.com/elger.php'
    await openWebsite(page, marapetsUrl);
    //browser close
    // await browser.close()
})
puppeterdiplay()
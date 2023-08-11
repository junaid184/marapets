export const openWebsite = async (page, url) => {
    try {
        await page.goto(url);
        console.log("website is oppened")

        let tryAgainButton = await page.evaluate(() => { //finds try again button
            const element = document.querySelector('body > div.marapetsmax > div > div.maralayout.sitecontent > div.maralayoutmiddle > div.middleit > form > input[type=submit]')
            return element;
        })

        if (tryAgainButton) {
            console.log('try again button found');
            await page.click('body > div.marapetsmax > div > div.maralayout.sitecontent > div.maralayoutmiddle > div.middleit > form > input[type=submit]', { timeout: 50000, visible: true })
        }

        let OpenQuestButton = await page.evaluate(() => { //finds accept quest button
            const Element = document.querySelector('body > div.marapetsmax > div > div.maralayout.sitecontent > div.maralayoutmiddle > div.bigger.middleit > form > input[type=submit]')
            return Element
        });

        console.log("finding quest button")
        if (OpenQuestButton) {
            await page.click('body > div.marapetsmax > div > div.maralayout.sitecontent > div.maralayoutmiddle > div.bigger.middleit > form > input[type=submit]', { visible: true });
            console.log("quest button clicked")
        }
        let noOfItem = await noOfItems(page); //get the no of items present
        console.log(noOfItem);

        await buyItems(page, noOfItem); //buys the items
    }
    catch (e) {
        console.log("error: ", e)
    }
}

const noOfItems = async (page) => {
    try {

        // Replace the selector with the appropriate CSS selector for the parent div

        const parentSelector = 'div.flex-table2';

        // Find the parent div element
        const parentElement = await page.$(parentSelector);

        if (parentElement) {
            // Get the immediate children of the parent div element
            const children = await parentElement.$$('div.width33'); // Use the > child combinator
            return children.length;
        } else {
            console.log('Parent div not found.');
        }
    }
    catch (e) {
        console.log("problem in getting the numbers of items: ", e.message);
    }
}

const buyItems = async (page, noOfItems) => {

    try {
        //for item buying one by one
        for (var i = 1; i <= noOfItems; i++) {
            await page.waitForTimeout(5000);
            await page.click(`body > div.marapetsmax > div > div.maralayout.sitecontent > div.maralayoutmiddle > div.bigsearchbox.middleit > div.flex-table2 > div:nth-child(${i}) > div.petpadding > a > b`, { visible: true, timeout: 50000 });
            console.log("clicked on check price");
            await page.waitForTimeout(5000);
            console.log("finding buy link");
            let href = await page.evaluate(() => {
                const element = document.querySelector('#showpricechecker > div > div.flex-table7 > div.flex-table12.pricecheckcontent > div:nth-child(3) > a')
                const herf = element.getAttribute('href')
                return herf;
            })
            console.log(`buy link: ${href}`);
            console.log("now going to buy link")
            await page.goto(`https://marapets.com/${href}`);
            await page.goBack();
            await page.waitForTimeout(5000);
        }
        await completeQuest(page);

    }

    catch (e) {
        console.log("problem in buying items: ", e.message);
    }
}

const completeQuest = async (page) => {
    console.log('clicking on Complete Quest');
    await page.click('input[value="Complete Quest"]', { visible: true, timeout: 50000 });
    console.log('clicked')
    await page.waitForSelector('input[value="Go Back"');
    console.log('waiting for Go Back')
    await page.click('input[value="Go Back"]', { visible: true, timeout: 50000 });
    console.log('clicked on Go Back');
}

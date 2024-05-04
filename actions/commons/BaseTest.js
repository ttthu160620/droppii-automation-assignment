const { Builder, until } = require("selenium-webdriver");
require("selenium-webdriver/chrome")
const logger = require("../../log4js/log4jsConfig");
var addContext = require("mochawesome/addContext");
let path = require("path")
let fs = require("fs")

const webURL = "https://magento.softwaretestingboard.com/"
class BaseTest {

    constructor() {
        this.driver = new Builder()
            .forBrowser('chrome')
            .build();
    }

    openHomePage() {
        this.driver.manage().setTimeouts({ implicit: 15000 });
        this.driver.manage().window().maximize();
        this.driver.get(webURL);
        return this.driver;
    }

    async closeBrowser() {
        await this.driver.quit();
    }

    takeScreenshotAfterTest(status, fileTitle, currentObject) {
        if (status === 'failed') {
            console.log("-------------------FAILED-----------------");
            const imageFileName = fileTitle + '.jpeg';
            this.driver.takeScreenshot().then(
                function(image) {
                    const screenshotsDir = path.join(__dirname, '..', '..', 'screenshots/');
                    fs.writeFileSync(path.join(screenshotsDir, imageFileName), image, 'base64');
                }
            );
            addContext (currentObject, 'Following comes the failed test image');
            addContext (currentObject, path.join('..', 'screenshots/', imageFileName));
        }
    }
}

module.exports = new BaseTest();
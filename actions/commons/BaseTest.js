const { Builder, until } = require("selenium-webdriver");
require("selenium-webdriver/chrome")
const logger = require("../../log4js/log4jsConfig");
var addContext = require("mochawesome/addContext");
let path = require("path")

const webURL = "https://magento.softwaretestingboard.com/"
class BaseTest {

    constructor() {
        this.driver = new Builder()
            .forBrowser('chrome')
            .build();
    }

    openHomePage() {
        this.driver.manage().setTimeouts({ implicit: 1000 });
        this.driver.manage().window().maximize();
        this.driver.get(webURL);
        return this.driver;
    }

    closeBrowser() {
        this.driver.quit();
    }

    // takeScreenshotAfterTest(status, fileTitle, testcase){
    //     if(status == 'passed'){
    //         logger.info("-------------------PASSED-----------------");
    //     }
    //     if(status == 'failed'){
    //         logger.info("-------------------FAILED-----------------");
    //         let imageFileName = fileTitle + '.jpeg';
    //         this.driver.takeScreenshot().then(
    //             function(image){
    //                 require('fs').writeFileSync(path.join(__dirname, '.', 'screenshots', imageFileName), image, 'base64')
    //             }
    //         )
    //         addContext(testcase,'Following comes the failed test image')
    //         addContext(testcase, '../screenshots/' + imageFileName)
    //     }
    // }

    takeScreenshotAfterTest(status, fileTitle, testcase) {
        if (status === 'failed') {
            console.log("-------------------FAILED-----------------");
            const imageFileName = fileTitle + '.jpeg';
            this.driver.takeScreenshot().then(
                function(image) {
                    const screenshotsDir = path.join(__dirname, '..', '..', 'screenshots');
                    fs.writeFileSync(path.join(screenshotsDir, imageFileName), image, 'base64');
                }
            );
            addContext(testcase, 'Following comes the failed test image');
            addContext(testcase, path.join('..', 'screenshots', imageFileName));
        }
    }
}

module.exports = new BaseTest();
const baseTest = require("../actions/commons/BaseTest")
const logger = require("../log4js/log4jsConfig");
const homepage = require("../actions/pageObjects/HomePage");
var addContext = require("mochawesome/addContext");

describe("Register", function(){
    let driver = null;

    before("Open Homepage", async function(){
        driver = await baseTest.openHomePage();
        homepage.constructorDriver(driver);
    });

    // this.beforeEach("Click to Register Link", async function(){
    //     log.info("Register: Navigate to Register page");
        
    // });

    
    it("TC01 Register with empty value", async function(){
        logger.info("=========================")
        await driver.sleep(2000)
        await homepage.verifyHomepageLogoIsDisplayed();
    });

    this.afterEach(function(){
        baseTest.takeScreenshotAfterTest(this.currentTest.state, this.currentTest.title, this)
        // if(this.currentTest.state == 'passed'){
        //     logger.info("-------------------PASSED-----------------");
        // }
        // if(this.currentTest.state == 'failed'){
        //     logger.info("-------------------FAILED-----------------");
        //     let imageFileName = this.currentTest.title + '.jpeg';
        //     driver.takeScreenshot().then(
        //         function(image){
        //             require('fs').writeFileSync('./screenshots/' + imageFileName, image, 'base64')
        //         }
        //     )
        //     addContext(this,'Following comes the failed test image')
        //     addContext(this, '../screenshots/' + imageFileName)
        // }
    });

    after("Close browser", function(){
        baseTest.closeBrowser();
    })
});
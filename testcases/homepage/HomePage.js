const baseTest = require("../../actions/commons/BaseTest")
const logger = require("../../log4js/log4jsConfig");
const homepage = require("../../actions/pageObjects/HomePageObjects");

describe("HomePage", async function () {
    let driver = null;

    before("Open Homepage", async function () {
        logger.info("Pre-Condition - 01: Open homepage");
        driver = await baseTest.openHomePage();
        homepage.constructorDriver(driver);
    });

    it("TC01 - Homepage - Verify homepage displays successfully after navigate to website", async function () {
        logger.info("Homepage - Step 01: Verify homepage logo is displayed")
        await homepage.verifyHomepageLogoIsDisplayed('see')
        logger.info("Homepage - Step 02: click on signin button")
    });

    this.afterEach(function () {
        baseTest.takeScreenshotAfterTest(this.currentTest.state, this.currentTest.title, this)
    });

    after("Close browser", async function () {
        await baseTest.closeBrowser()
    });
})
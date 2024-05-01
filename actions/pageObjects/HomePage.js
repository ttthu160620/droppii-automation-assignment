let BasePage = require("../commons/BasePage.js")
let chai = import("chai")
let homePageUi = require("../../interfaces/HomePageUIs.js")

class HomePage extends BasePage {
    // homepageLogo = "//header[@class='page-header']//div[contains(@class,'content')]//a[@class='logo']";

    driver = null 
    constructor(){
        super();
    }

    constructorDriver(constructorDriver){
        this.driver = constructorDriver
    }

    async verifyHomepageLogoIsDisplayed(){
        // this.waitForElementVisible(this.driver, homePageUi.homePageLogo)
        // console.log("===========" + await this.isElementDisplayed(this.driver, homePageUi.homePageLogo));
        // (await chai).assert.isTrue(true, "aaaaaa");
        (await chai).assert.isTrue(await this.isElementDisplayed(this.driver,homePageUi.homePageLogo), 'aaaaaa')
        // console.log("==================" + homePageUi.homePageLogo)
    }
}

module.exports = new HomePage();
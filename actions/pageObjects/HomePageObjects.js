let BasePage = require("../commons/BasePage.js")
let chai = import("chai")
let homePageData = require("../../testdata/homepage.json")
let logger = require("../../log4js/log4jsConfig");
let assert = require("assert")

const homePageLogo = "//header[@class='page-header']//div[contains(@class,'content')]//a[@class='logo']"
const signInOrUpLink = "//header[@class='page-header']//a[contains(text(),'%s')]"
const userNamePanel = "//div[@class='panel header']"
const userNamePanel_userNameWelcomeText = userNamePanel + "//span[@class='logged-in']"
const userNamePanel_dropdownIcon = userNamePanel + "//span[@class='customer-name']//button[contains(@class,'switch')]"
const userNamePanel_userNameMenu = userNamePanel + "//div[@class='customer-menu']//ul[@class='header links']"
const userNamePanel_userNameMenu_optionText = userNamePanel_userNameMenu + "//a[contains(text(),'%s')]"

class HomePage extends BasePage {
    driver = null
    constructor() {
        super();
    }

    constructorDriver(constructorDriver) {
        this.driver = constructorDriver
    }

    async verifyHomepageLogoIsDisplayed(status) {
        if (status == 'see') {
            (await chai).assert.isTrue(await this.waitUntilElementIsDisplayed(this.driver, homePageLogo), 'Home page logo should be displayed')
        } else {
            (await chai).assert.isTrue(await this.waitUntilElementIsNotDisplayed(this.driver, homePageLogo), 'Home page logo should not be displayed')
        }
    }

    translateHomePageText(text) {
        if (text == 'Sign In') {
            text = homePageData.headerPage.signInLink
        } else if (text == 'Create an account') {
            text = homePageData.headerPage.signUpLink
        } else if (text == 'Sign Out'){
            text = homePageData.customerMenu.signOutOption
        }
        return text;
    }

    async clickOnSignInOrSignUpLink(linkButton) {
        linkButton = this.translateHomePageText(linkButton)
        let linkButtonXpath = this.getDynamicLocator(signInOrUpLink, linkButton)
        await this.waitForElementClickable(this.driver, linkButtonXpath)
        await this.clickToElement(this.driver, linkButtonXpath)
    }

    async verifyWelcomeCustomerTextDisplayed(welcomeText) {
        let actualText = await this.getElementText(this.driver, userNamePanel_userNameWelcomeText)
        logger.info('Expected text: ' + welcomeText + ' Actual text: ' + actualText)
        assert.equal(actualText, welcomeText, "Welcome customer text is: " + actualText)
    }

    async clickOnCustomerDroppdownIcon() {
        await this.waitForElementClickable(this.driver, userNamePanel_dropdownIcon)
        await this.clickToElement(this.driver, userNamePanel_dropdownIcon)
    }

    async verifyCustomerMenuDisplayed(status) {
        if (status == 'see') {
            (await chai).assert.isTrue(await this.waitUntilElementIsDisplayed(this.driver, userNamePanel_userNameMenu))
        } else {
            (await chai).assert.isTrue(await this.waitUntilElementIsNotDisplayed(this.driver, userNamePanel_userNameMenu))
        }
    }

    async verifyOptionOnCustomerMenuDisplayed(status, option){
        option = this.translateHomePageText(option)
        let optionXpath = this.getDynamicLocator.call(this, userNamePanel_userNameMenu_optionText, option)
        if(status == 'see'){
            (await chai).assert.isTrue(await this.waitUntilElementIsDisplayed(this.driver, optionXpath))
        } else {
            (await chai).assert.isTrue(await this.waitUntilElementIsNotDisplayed(this.driver, optionXpath))
        }
    }

    async clickOnOptionOnCustomerMenu(option){
        option = this.translateHomePageText(option)
        let optionXpath = this.getDynamicLocator(userNamePanel_userNameMenu_optionText, option)
        await this.waitForElementClickable(this.driver, optionXpath)
        await this.clickToElement(this.driver, optionXpath)
    }

}

module.exports = new HomePage();
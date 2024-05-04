let BasePage = require("../commons/BasePage")
let commonData = require("../../testdata/commonPage.json")
let chai = import("chai")

const pageTitleText = "//h1[@class='page-title']//span[text()='%s']"

class CommonPage extends BasePage {
    driver = null
    constructor() {
        super();
    }

    constructorDriver(constructorDriver) {
        this.driver = constructorDriver
    }

    translatePageHeader(text) {
        if (text == 'Create New Customer Account') {
            text = commonData.pageHeader.createNewCustomerAccount
        } else if (text == 'Customer Login') {
            text = commonData.pageHeader.customerLogin
        } else if (text == 'My Account'){
            text = commonData.pageHeader.myAccount
        } else if (text == 'You are signed out'){
            text = commonData.pageHeader.youAreSignedOut
        }
        return text;
    }

    async getRandomEmail(){
        return 'Thutran' + this.getRandomNumber(9999) + '@gmail.com'
    }

    async verifyPageHeaderHasTextIsDisplayed(header) {
        header = this.translatePageHeader(header)
        let headerXpath = await this.getDynamicLocator.call(this, pageTitleText, header);
        (await chai).assert.isTrue(await this.waitUntilElementIsDisplayed(this.driver, headerXpath), header + " should be displayed")
    }

}

module.exports = new CommonPage();
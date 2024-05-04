let BasePage = require("../commons/BasePage")
let myAccountData = require("../../testdata/myAccountPage.json")
let chai = import("chai")

const successfulRegisterMessage = "//div[@class='page messages']//div[text()='%s']"

class MyAccountPage extends BasePage {
    driver = null
    constructor() {
        super();
    }

    constructorDriver(constructorDriver) {
        this.driver = constructorDriver
    }

    translateMyAccountText(text) {
        if (text == 'Thank you for registering with Main Website Store') {
            text = myAccountData.successfulRegisterMessage
        }

        return text
    }

    async verifySuccessfulRegisterMessageDisplayed(status, message) {
        message = this.translateMyAccountText(message)
        let messageXpath = this.getDynamicLocator.call(this, successfulRegisterMessage, message)
        if(status == 'see'){
            (await chai).assert.isTrue(await this.waitUntilElementIsDisplayed(this.driver, messageXpath))
        } else {
            (await chai).assert.isTrue(await this.waitUntilElementIsNotDisplayed(this.driver, messageXpath))
        }
        
    }

}

module.exports = new MyAccountPage();
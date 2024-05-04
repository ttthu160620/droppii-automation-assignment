let BasePage = require("../commons/BasePage")
let signUpData = require("../../testdata/signUpPage.json")
let logger = require("../../log4js/log4jsConfig")

const signUpForm = "//form[@id='form-validate']"
const signUpForm_fieldTextbox = signUpForm + "//span[text()='%s']/ancestor::div[contains(@class,'field')]//input"
const signUpFrom_createAccountButton = signUpForm + "//button[contains(@class,'submit')]"

class SignUpPage extends BasePage {
    driver = null
    constructor() {
        super();
    }

    constructorDriver(constructorDriver) {
        this.driver = constructorDriver
    }

    translateCreateNewAccountText(text) {
        if (text == 'First Name') {
            text = signUpData.textboxLabel.firstNameLabel
        } else if (text == 'Last Name') {
            text = signUpData.textboxLabel.lastNameLabel
        } else if (text == 'Email') {
            text = signUpData.textboxLabel.emailLabel
        } else if (text == 'Password') {
            text = signUpData.textboxLabel.passwordLabel
        } else if (text == 'Confirm Password') {
            text = signUpData.textboxLabel.confirmPassword
        }
        return text
    }

    async inputValueIntoTextbox(labelName, value) {
        labelName = this.translateCreateNewAccountText(labelName)
        let textboxXpath = this.getDynamicLocator(signUpForm_fieldTextbox, labelName)
        logger.info("I input value: " + value + " into textbox: " + labelName)
        await this.waitForElementVisible(this.driver, textboxXpath)
        await this.sendKeyTextbox(this.driver, textboxXpath, value)
    }

    async clickOnCreateAnAccountButton(){
        await this.waitForElementClickable(this.driver, signUpFrom_createAccountButton)
        await this.clickToElement(this.driver, signUpFrom_createAccountButton)
    }

}

module.exports = new SignUpPage();
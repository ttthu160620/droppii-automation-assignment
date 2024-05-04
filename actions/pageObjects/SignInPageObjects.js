let BasePage = require("../commons/BasePage")
let signInData = require("../../testdata/signInPage.json")
let logger = require("../../log4js/log4jsConfig");

const signInForm = "//form[@id='login-form']"
const signInForm_fieldTextbox = signInForm + "//span[text()='%s']/ancestor::div[contains(@class,'field')]//input"
const signInForm_signInButton = signInForm + "//button[contains(@class,'login') and contains(@class,'primary')]"

class SignInPage extends BasePage {
    driver = null
    constructor() {
        super();
    }

    constructorDriver(constructorDriver) {
        this.driver = constructorDriver
    }

    translateSignInFormText(text){
        if(text == 'Email'){
            text = signInData.signInForm.textboxLabel.email
        } else if(text == 'Password'){
            text = signInData.signInForm.textboxLabel.password
        }
        return text
    }

    async inputValueIntotextboxOnSignInForm(labelName, value) {
        labelName = this.translateSignInFormText(labelName)
        let textboxXpath = await this.getDynamicLocator(signInForm_fieldTextbox, labelName)
        logger.info("I input value: " + value + " into textbox: " + labelName)
        await this.waitForElementVisible(this.driver, textboxXpath)
        await this.sendKeyTextbox(this.driver, textboxXpath, value)
    }

    async clickOnSignInButton(){
        await this.waitForElementClickable(this.driver, signInForm_signInButton)
        await this.clickToElement(this.driver, signInForm_signInButton)
    }

}

module.exports = new SignInPage();
let baseTest = require("../../actions/commons/BaseTest")
let logger = require("../../log4js/log4jsConfig");
let homepage = require("../../actions/pageObjects/HomePageObjects");
let signUpPage = require("../../actions/pageObjects/SignUpPageObjects")
let commonPage = require("../../actions/pageObjects/CommonPageObjects")
let myAccountPage = require("../../actions/pageObjects/MyAccountPageObjects")

describe("Sign Up", async function () {
    let driver = null;

    before("Open Homepage", async function () {
        logger.info("Pre-Condition - 01: Open homepage");
        driver = await baseTest.openHomePage();
        homepage.constructorDriver(driver);
        signUpPage.constructorDriver(driver)
        commonPage.constructorDriver(driver)
        myAccountPage.constructorDriver(driver)
        await homepage.verifyHomepageLogoIsDisplayed('see')
    });

    it("TC01 - Sign Up - Verify that user can create new customer account successfully with valid data", async function () {
        logger.info("Sign Up - Step 01: Click on Create an Account link")
        await homepage.clickOnSignInOrSignUpLink('Create an account')

        logger.info("Sign Up - Stepp 02: Verify Create new customer account header is displayed")
        await commonPage.verifyPageHeaderHasTextIsDisplayed('Create New Customer Account')

        logger.info("Sign Up - Step 03: Input value: Thu into First name textbox")
        await signUpPage.inputValueIntoTextbox('First Name', 'Thu')

        logger.info("Sign Up - Step 04: Input value: Tran into Last name textbox")
        await signUpPage.inputValueIntoTextbox('Last Name', 'Tran')

        logger.info("Sign Up - Step 04: Input value into Email textbox")
        await signUpPage.inputValueIntoTextbox('Email', await commonPage.getRandomEmail())

        logger.info("Sign Up - Step 05: Input value: Abcd@12345 into Password textbox")
        await signUpPage.inputValueIntoTextbox('Password', 'Abcd@12345')

        logger.info("Sign Up - Step 06: Input value: Abcd@12345 into Confirm Password textbox")
        await signUpPage.inputValueIntoTextbox('Confirm Password', 'Abcd@12345')

        logger.info("Sign Up - Step 07: Click on Create an Account button")
        await signUpPage.clickOnCreateAnAccountButton()

        logger.info("Sign Up - Step 08: Verify successful register message dispplayed on My Account Page")
        await commonPage.verifyPageHeaderHasTextIsDisplayed('My Account')
        await myAccountPage.verifySuccessfulRegisterMessageDisplayed('see', 'Thank you for registering with Main Website Store')
    });

    this.afterEach(function () {
        baseTest.takeScreenshotAfterTest(this.currentTest.state, this.currentTest.title, this)
    });

    after("Close browser", async function () {
        // await baseTest.closeBrowser()
    });
})
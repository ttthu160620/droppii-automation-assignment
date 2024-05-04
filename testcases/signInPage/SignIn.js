let baseTest = require("../../actions/commons/BaseTest")
let logger = require("../../log4js/log4jsConfig");
let homepage = require("../../actions/pageObjects/HomePageObjects");
let signUpPage = require("../../actions/pageObjects/SignUpPageObjects")
let signInPage = require("../../actions/pageObjects/SignInPageObjects")
let commonPage = require("../../actions/pageObjects/CommonPageObjects")
let myAccountPage = require("../../actions/pageObjects/MyAccountPageObjects")

describe("Sign In", async function () {
    let driver = null;
    let firstName = 'Thu'
    let lastName = 'Tran'
    let email = await commonPage.getRandomEmail()
    let password = 'Abcd@12345'
    let welcomeText = 'Welcome, ' + firstName + ' ' + lastName + '!'

    before("Create an new account", async function () {
        logger.info("Pre-Condition - 01: Open homepage");
        driver = await baseTest.openHomePage();
        homepage.constructorDriver(driver);
        signUpPage.constructorDriver(driver)
        commonPage.constructorDriver(driver)
        myAccountPage.constructorDriver(driver)
        signInPage.constructorDriver(driver)
        await homepage.verifyHomepageLogoIsDisplayed('see')

        logger.info("Pre-Condition - 02: Create an new account");
        await homepage.clickOnSignInOrSignUpLink('Create an account')
        await commonPage.verifyPageHeaderHasTextIsDisplayed('Create New Customer Account')
        await signUpPage.inputValueIntoTextbox('First Name', firstName)
        await signUpPage.inputValueIntoTextbox('Last Name', lastName)
        await signUpPage.inputValueIntoTextbox('Email', email)
        await signUpPage.inputValueIntoTextbox('Password', password)
        await signUpPage.inputValueIntoTextbox('Confirm Password', password)
        await signUpPage.clickOnCreateAnAccountButton()
        await commonPage.verifyPageHeaderHasTextIsDisplayed('My Account')
        await myAccountPage.verifySuccessfulRegisterMessageDisplayed('see', 'Thank you for registering with Main Website Store')

        logger.info("Pre-Condition - 03: Sign out and back to home page");
        await homepage.verifyWelcomeCustomerTextDisplayed(welcomeText)
        await homepage.clickOnCustomerDroppdownIcon()
        await homepage.verifyCustomerMenuDisplayed('see')
        await homepage.verifyOptionOnCustomerMenuDisplayed('see', 'Sign Out')
        await homepage.clickOnOptionOnCustomerMenu('Sign Out')
        await commonPage.verifyPageHeaderHasTextIsDisplayed('You are signed out')
    });

    it("TC01 - Sign In - Verify that user can login successfully with valid data", async function () {
        logger.info("Sign In - Step 01: Click on Sign In link")
        await homepage.clickOnSignInOrSignUpLink('Sign In')

        logger.info("Sign In - Step 02: Verify Customer Login displayed")
        await commonPage.verifyPageHeaderHasTextIsDisplayed('Customer Login')

        logger.info("Sign In - Step 03: Input value into email textbox")
        await signInPage.inputValueIntotextboxOnSignInForm('Email', email)

        logger.info("Sign In - Step 04: Input value into password textbox")
        await signInPage.inputValueIntotextboxOnSignInForm('Password', password)

        logger.info("Sign In - Step 05: Click on Sign in button")
        await signInPage.clickOnSignInButton();

        logger.info("Sign In - Step 06: Verify login successfullys")
        await homepage.verifyWelcomeCustomerTextDisplayed(welcomeText)
    });

    this.afterEach(function () {
        baseTest.takeScreenshotAfterTest(this.currentTest.state, this.currentTest.title, this)
    });

    after("Close browser", async function () {
        await baseTest.closeBrowser()
    });
})
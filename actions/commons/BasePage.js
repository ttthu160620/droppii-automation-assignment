const { By, until } = require("selenium-webdriver");
const logger = require("../../log4js/log4jsConfig");
const LONG_TIMEOUT = 15000;

class PageBase {

	openPageUrl(driver, pageUrl) {
		driver.get(pageUrl);
	}

	refreshPage(driver) {
		driver.navigate().refresh();
	}

	waitForAlertPresence(driver) {
		return driver.wait(until.alertIsPresent(), LONG_TIMEOUT);
	}

	acceptAlert(driver) {
		let alert = this.waitForAlertPresence(driver);
		alert.accept();
	}

	cancelAlert(driver) {
		let alert = this.waitForAlertPresence(driver);
		alert.dismiss();
	}

	getAlertText(driver) {
		let alert = this.waitForAlertPresence(driver);
		return alert.getText();
	}

	senkeyAlert(driver, textValue) {
		let alert = this.waitForAlertPresence(driver);
		alert.sendKeys(textValue);
	}

	getByXpath(xpathLocator) {
		return By.xpath(xpathLocator);
	}

	getWebElement(driver, xpathLocator) {
		return driver.findElement(this.getByXpath(xpathLocator));
	}

	getListWebElements(driver, xpathLocator) {
		return driver.findElements(this.getByXpath(xpathLocator));
	}

	getListElementsSize(driver, xpathLocator) {
		return this.getListWebElements(driver, xpathLocator).size();
	}

	sendKeyTextbox(driver, xpathLocator, textValue) {
		let element = this.getWebElement(driver, xpathLocator);
		element.clear();
		element.sendKeys(textValue);
	}

	clickToElement(driver, xpathLocator) {
		this.getWebElement(driver, xpathLocator).click();
	}

	clickToElementByJS(driver, xpathLocator) {
		driver.executeScript("arguments[0].click();", this.getWebElement(driver, xpathLocator));
	}

	getElementText(driver, xpathLocator) {
		return this.getWebElement(driver, xpathLocator).getText();
	}

	getElementAttributeValue(driver, xpathLocator, attributeName) {
		return this.getWebElement(driver, xpathLocator).getAttribute(attributeName);
	}

	getRandomNumber(max) {
		return Math.floor(Math.random() * max);
	}

	hoverMouseToElement(driver, xpathLocator) {
		let actions = driver.actions();
		let element = this.getWebElement(driver, xpathLocator);
		actions.move({ duration: 3000, origin: element, x: 0, y: 0 }).perform();
	}

	getElementValidationMessage(driver, xpathLocator) {
		return driver.executeScript("return arguments[0].validationMessage;", this.getWebElement(xpathLocator));
	}

	isElementDisplayed(driver, xpathLocator) {
		return this.getWebElement(driver, xpathLocator).isDisplayed();
	}

	isElementSelected(driver, xpathLocator) {
		return this.getWebElement(driver, xpathLocator).isSelected();
	}

	isElementEnabled(driver, xpathLocator) {
		return this.getWebElement(driver, xpathLocator).isEnabled();
	}

	checkToDefaultCheckboxRadio(driver, xpathLocator) {
		let element = this.getWebElement(driver, xpathLocator);
		if (!element.isSelected()) {
			element.click();
		}
	}

	scrollToViewByJS(driver, xpathLocator) {
		driver.executeScript("arguments[0].scrollIntoView(true);", xpathLocator);
	}

	waitForElementClickable(driver, xpathLocator) {
		driver.wait(until.elementLocated(this.getByXpath(xpathLocator)), LONG_TIMEOUT);
	}

	waitForElementVisible(driver, xpathLocator) {
		let element = this.getWebElement(driver, xpathLocator);
		driver.wait(until.elementIsVisible(element), LONG_TIMEOUT);
	}

	getCurrentDate() {
		var today = new Date();
		return today.getDate() + '/' + (today.getMonth() + 1) + '/' + (today.getYear() + 1900);
	}

	getDynamicLocator(str, ...arr) {
		for (let i = 0; i < arr.length; i++) {
			str = str.replace('%s', arr[i]);
		}
		return str;
	}

	async waitUntilElementIsDisplayed(driver, elementXpath, elementName) {
		logger.info("Wait for element displayed: " + elementName);
		await driver.manage().setTimeouts({ implicit: 0 });
		try {
			await driver.wait(async function () {
				try {
					let ele = this.getWebElement(driver, xpathLocator);
					if (await ele.isDisplayed()) {
						logger.info(elementXpath + " is displayed ");
						return true;
					} else {
						logger.info(elementXpath + " is Not displayed ");
						return false;
					}
				} catch (e) {
					logger.info("Does not displayed element: " + elementXpath);
					return false;
				}
			}, LONG_TIMEOUT);
			await driver.manage().setTimeouts({ implicit: LONG_TIMEOUT });
			return true;
		} catch (e) {
			logger.info(e.message);
			await driver.manage().setTimeouts({ implicit: LONG_TIMEOUT });
			return false;
		}
	}
}

module.exports = PageBase;
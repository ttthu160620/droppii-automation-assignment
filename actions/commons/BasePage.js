const { By, until } = require("selenium-webdriver");
const logger = require("../../log4js/log4jsConfig");
const LONG_TIMEOUT = 15000;
const SHORT_TIMEOUT = 5000;

class PageBase {

	getByXpath(xpathLocator) {
		return By.xpath(xpathLocator);
	}

	getWebElement(driver, xpathLocator) {
		return driver.findElement(this.getByXpath(xpathLocator));
	}

	async getListWebElements(driver, xpathLocator) {
		return await driver.findElements(this.getByXpath(xpathLocator));
	}

	async getListElementsSize(driver, xpathLocator) {
		return await this.getListWebElements(driver, xpathLocator).size();
	}

	async sendKeyTextbox(driver, xpathLocator, textValue) {
		let element = await this.getWebElement(driver, xpathLocator);
		await element.clear();
		await element.sendKeys(textValue);
	}

	async clickToElement(driver, xpathLocator) {
		logger.info("Click on element xpath: " + xpathLocator);
		await this.getWebElement(driver, xpathLocator).click();
	}

	getElementText(driver, xpathLocator) {
		return this.getWebElement(driver, xpathLocator).getText();
	}

	getRandomNumber(max) {
		return Math.floor(Math.random() * max);
	}

	hoverMouseToElement(driver, xpathLocator) {
		let actions = driver.actions();
		let element = this.getWebElement(driver, xpathLocator);
		actions.move({ duration: 3000, origin: element, x: 0, y: 0 }).perform();
	}

	async isElementDisplayed(driver, xpathLocator) {
		return await this.getWebElement(driver, xpathLocator).isDisplayed();
	}

	async isElementSelected(driver, xpathLocator) {
		return await this.getWebElement(driver, xpathLocator).isSelected();
	}

	async isElementEnabled(driver, xpathLocator) {
		return await this.getWebElement(driver, xpathLocator).isEnabled();
	}

	scrollToViewByJS(driver, xpathLocator) {
		driver.executeScript("arguments[0].scrollIntoView(true);", xpathLocator);
	}

	async waitForElementClickable(driver, xpathLocator) {
		await driver.wait(until.elementLocated(this.getByXpath(xpathLocator)), LONG_TIMEOUT);
	}

	async waitForElementVisible(driver, xpathLocator) {
		let element = await this.getWebElement(driver, xpathLocator);
		driver.wait(until.elementIsVisible(element), LONG_TIMEOUT);
	}

	getDynamicLocator(str, ...arr) {
		for (let i = 0; i < arr.length; i++) {
			str = str.replace('%s', arr[i]);
		}
		return str;
	}

	overrideImplicitTimeOut(driver, timeout) {
		driver.manage().setTimeouts({ implicit: timeout });
	}

	async waitUntilElementIsDisplayed(driver, xpathLocator) {
		logger.info("Wait for element is displayed: " + xpathLocator);
		this.overrideImplicitTimeOut(driver, 0);
		
		try {
			await driver.wait(async () => {
				try {
					if (await this.isElementDisplayed(driver, xpathLocator)) {
						logger.info(xpathLocator + " is displayed ");
						return true;
					} else {
						logger.info(xpathLocator + " is not displayed ");
						return false;
					}
				} catch (e) {
					logger.info(e.message);
					logger.info("Does not displayed element: " + xpathLocator);
					return false;
				}
			}, LONG_TIMEOUT);
			this.overrideImplicitTimeOut(driver, LONG_TIMEOUT);
			return true;
		
		} catch (e) {
			logger.info(e.message);
			this.overrideImplicitTimeOut(driver, LONG_TIMEOUT);
			return false;
		}
	}


	async waitUntilElementIsNotDisplayed(driver, xpathLocator) {
		logger.info("Wait for element is not displayed: " + xpathLocator);
		this.overrideImplicitTimeOut(driver, 0);
		try {
			await driver.wait(async () => {
				try {
					if (await this.isElementDisplayed(driver, xpathLocator)) {
						logger.info(xpathLocator + " is displayed");
						return false;
					} else {
						logger.info(xpathLocator + " is not displayed");
						return true;
					}
				} catch (e) {
					logger.info(e.message);
					logger.info("Does not displayed element: " + xpathLocator);
					return true;
				}
			}, LONG_TIMEOUT);
			this.overrideImplicitTimeOut(driver, LONG_TIMEOUT);
			return true;
		} catch (e) {
			logger.info(e.message);
			this.overrideImplicitTimeOut(driver, LONG_TIMEOUT);
			return false;
		}
	}

	async isElementUndisplayed(driver, xpathLocator) {
		this.overrideImplicitTimeOut(driver, SHORT_TIMEOUT);
		const listElement = await this.getListWebElements(driver, xpathLocator);
		this.overrideImplicitTimeOut(driver, LONG_TIMEOUT);
		if (listElement.length == 0) {
			logger.info("Element not in DOM");
			return true;
		} else if (listElement.length > 0 && !listElement[0].isDisplayed()) {
			logger.info("Element in DOM but undisplay");
			return true;
		} else {
			logger.info("Element in DOM and display");
			return false;
		}
	}
}

module.exports = PageBase;
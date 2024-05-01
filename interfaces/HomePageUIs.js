const HOME_PAGE_LOGO = "//header[@class='page-header']//div[contains(@class,'content')]//a[@class='log']"

class HomePageUIs{
    get homePageLogo(){
        return HOME_PAGE_LOGO;
    }
}

module.exports = new HomePageUIs()
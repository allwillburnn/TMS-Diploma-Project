class MainPage {

    // Locators

    private loginButtonLocator: string = "//div[@class='auth-bar__item auth-bar__item--text']";
    private loginFormLocator: string = "//div[@class='auth-form__body']/div/div[contains(text(), 'Вход')]";
    private firstAutoArticleLocator: string = "(//h2/a[contains(text(), 'Авто')]/../../../ul/li)[1]";
    private firstAutoArticleTitleLocator: string = `${this.firstAutoArticleLocator}//a/div/span[contains(@class, 'text')]`;
    private searchFieldLocator: string = "//input[contains(@class, 'fast-search')]";
    private catalogLocator: string = "//a[contains(@class, 'b-main-navigation__link')]/span[text()='Каталог']";

    // Elements 

    private get loginButtonElement() {
        return cy.xpath(this.loginButtonLocator);
    }

    private get loginFormElement() {
        return cy.xpath(this.loginFormLocator);
    }

    private get firstAutoArticleElement() {
        return cy.xpath(this.firstAutoArticleLocator);
    }

    private get firstAutoTitleElement() {
        return cy.xpath(this.firstAutoArticleTitleLocator);
    }

    private get searchFieldElement() {
        return cy.xpath(this.searchFieldLocator);
    }

    private get catalogElement() {
        return cy.xpath(this.catalogLocator);
    }

    // Methods

    goToLogin() {
        this.loginButtonElement.click();
        this.loginFormElement.should("be.visible");
    }

    getFirstArticleTitle() {
        return this.firstAutoTitleElement.invoke('text');
    }

    goToFirstAutoArticle() {
        this.firstAutoArticleElement.click();
    }

    performSearch(searchQuery: string) {
        this.searchFieldElement.type(searchQuery);
    }

    goToCatalog() {
        this.catalogElement.click();
    }

}

export const mainPage: MainPage = new MainPage();
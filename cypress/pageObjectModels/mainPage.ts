class MainPage {

    // Locators

    private loginButtonLocator: string = "//div[@class='auth-bar__item auth-bar__item--text']";
    private loginFormLocator: string = "//div[@class='auth-form__body']/div/div[contains(text(), 'Вход')]";
    private firstAutoArticleLocator: string = "(//h2/a[contains(text(), 'Авто')]/../../../ul/li)[1]";
    private firstAutoArticleTitleLocator: string = `${this.firstAutoArticleElement}//a/div/span[contains(@class, 'text')]`;

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

    // Methods

    goToLogin() {
        this.loginButtonElement.click();
        this.loginFormElement.should("be.visible");
    }

    getFirstArticleTitle(): string {
        let actualTitle: string = "";
        this.firstAutoTitleElement.invoke('text').then((title) => { actualTitle = title });
        return actualTitle;
    }

    goToFirstAutoArticle() {
        this.firstAutoArticleElement.click();
    }

}

export const mainPage: MainPage = new MainPage();
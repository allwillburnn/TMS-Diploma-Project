class MainPage {

    // Locators

    private loginButtonLocator: string = "//div[@class='auth-bar__item auth-bar__item--text']";
    private loginFormLocator: string = "//div[@class='auth-form__body']/div/div[contains(text(), 'Вход')]";
    private firstAutoArticleLocator: string = "(//h2/a[contains(text(), 'Авто')]/../../../ul/li)[1]";
    private firstAutoArticleTitleLocator: string = `${this.firstAutoArticleLocator}//a/div/span[contains(@class, 'text')]`;
    private searchFieldLocator: string = "//input[contains(@class, 'fast-search')]";
    private catalogLocator: string = "//a[contains(@class, 'b-main-navigation__link')]/span[text()='Каталог']";
    private cartButtonLocator: string = "//a[@class='b-top-profile__cart']";
    private kursLocator: string = "//span[@class='_u js-currency-amount']";
    private kursDateLocator: string = "//th[@class='th-first']";
    private usdRateTableLocator: string = "//b[normalize-space()='1 USD']";
    private eurRateTableLocator: string = "//b[normalize-space()='1 EUR']";
    private rubRateTableLocator: string = "//b[normalize-space()='100 RUB']";
    private realEstateButtonLocator: string = "//span[@class='b-main-navigation__text'][contains(text(),'Дома и квартиры')]";
    private supportButtonLocator: string = "//a[contains(text(),'Поддержка пользователей')]";

    // Elements 

    private get loginButtonElement() {
        return cy.xpath(this.loginButtonLocator);
    }

    private get usdRateTableElement() {
        return cy.xpath(this.usdRateTableLocator);
    }

    private get eurRateTableElement() {
        return cy.xpath(this.eurRateTableLocator);
    }

    private get rubRateTableElement() {
        return cy.xpath(this.rubRateTableLocator);
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

    private get cartButtonElement() {
        return cy.xpath(this.cartButtonLocator);
    }

    private get kursElement() {
        return cy.xpath(this.kursLocator);
    }

    private get kursDateElement() {
        return cy.xpath(this.kursDateLocator);
    }

    private get realEstateButtonElement() {
        return cy.xpath(this.realEstateButtonLocator);
    }

    // Methods

    goToLogin() {
        this.loginButtonElement.click();
        this.loginFormElement.should("be.visible");
    }

    goToKursAndValidate() {
        this.kursElement.click();
        cy.title().should('contain', 'Лучшие курсы валют');
        const currentFullDate: Date = new Date();
        const currentDate: number = currentFullDate.getDate();
        this.kursDateElement.invoke('text').then((element) => {
            expect(+element.split(' ')[0]).equal(currentDate);
        })
        this.usdRateTableElement.should('be.visible')
        this.eurRateTableElement.should('be.visible')
        this.rubRateTableElement.should('be.visible');
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

    goToCart() {
        this.cartButtonElement.click();
    }

    goToRentAndVerify() {
        this.realEstateButtonElement.trigger('mouseover');
        cy.xpath("(//span[contains(text(),'Минск')])[4]").click();
        cy.title().should('contain', 'аренда');
        cy.xpath("//div[@id='map']").should('be.visible');
    }

    goToSupportPageAndVerify() {
        cy.xpath(this.supportButtonLocator).click();
        cy.title().should('contain', 'Запрос в службу поддержки');
    }

}

export const mainPage: MainPage = new MainPage();
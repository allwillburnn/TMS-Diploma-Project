class CatalogPage {
    // Locators

    private computersCategoryLocator: string = "//li//span[contains(text(), 'Компьютеры')]";
    private electronicsCategoryLocator: string = "//li//span[contains(text(), 'Электроника')]";
    private tvVideoSubcategoryLocator: string = "//div[contains(text(), 'Телевидение')]";
    private tvSubCategoryLocator: string = "(//span[contains(text(),'Телевизоры')])[2]";
    private laptopsPcMonitorsSubcategoryLocator: string = "//div[contains(text(),'Ноутбуки, компьютеры, мониторы')]";
    private laptopsSubSubCategoryLocator: string = "//div[contains(@class,'catalog-navigation-list__aside-item_active')]//span[contains(text(),'Ноутбуки')]";

    // Elements

    private get computersCategoryElement(): Cypress.Chainable {
        return cy.xpath(this.computersCategoryLocator);
    }

    private get laptopsPcMonitorsSubcategoryElement(): Cypress.Chainable {
        return cy.xpath(this.laptopsPcMonitorsSubcategoryLocator);
    }

    private get laptopsSubSubCategoryElement(): Cypress.Chainable {
        return cy.xpath(this.laptopsSubSubCategoryLocator);
    }

    private get electronicsCategoryElement(): Cypress.Chainable {
        return cy.xpath(this.electronicsCategoryLocator);
    }

    // Methods

    openComputersCategory(): void {
        this.computersCategoryElement.click();
    }

    openElectronicsCategory(): void {
        this.electronicsCategoryElement.click();
    }

    openTvVideoCategory(): void {
        cy.xpath(this.tvVideoSubcategoryLocator).click();
    }

    openTvCategoryAndVerify(): void {
        cy.xpath(this.tvSubCategoryLocator).click();
        cy.title().should('contain', 'Телевизор');
    }

    openLaptopsPcMonitorsSubcategory(): void {
        this.laptopsPcMonitorsSubcategoryElement.click();
    }

    goToLaptopsPageAndVerify(): void {
        this.laptopsSubSubCategoryElement.click();
        cy.title().should('contain', 'Ноутбук');
    }

}

export const catalogPage: CatalogPage = new CatalogPage();
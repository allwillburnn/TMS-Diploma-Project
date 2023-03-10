class CatalogPage {
    // Locators

    private computersCategoryLocator: string = "//li//span[contains(text(), 'Компьютеры')]";
    private laptopsPcMonitorsSubcategoryLocator: string = "//div[contains(text(),'Ноутбуки, компьютеры, мониторы')]";
    private laptopsSubSubCategoryLocator: string = "//div[contains(@class,'catalog-navigation-list__aside-item_active')]//span[contains(text(),'Ноутбуки')]";

    // Elements

    private get computersCategoryElement() {
        return cy.xpath(this.computersCategoryLocator);
    }

    private get laptopsPcMonitorsSubcategoryElement() {
        return cy.xpath(this.laptopsPcMonitorsSubcategoryLocator);
    }

    private get laptopsSubSubCategoryElement() {
        return cy.xpath(this.laptopsSubSubCategoryLocator);
    }

    // Methods

    goToComputersCategory() {
        this.computersCategoryElement.click();
    }

    goToLaptopsPcMonitorsCubcategory() {
        this.laptopsPcMonitorsSubcategoryElement.click();
    }

    goToLaptopsPageAndVerify() {
        this.laptopsSubSubCategoryElement.click();
        cy.title().should('contain', 'Ноутбук');
    }

}

export const catalogPage: CatalogPage = new CatalogPage();
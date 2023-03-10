import { valueFilter } from "../const/regExp";
class CategoryCatalogPage {

    private initialCounterValue: number = null;
    private filteredCounterValue: number = null;

    // Locators

    private showAllVendorsButtonLocator: string = "(//div[@class='schema-filter-control__item'])[1]";
    private productsFoundedcounterLocator: string = "(//span[@class='schema-filter-button__sub schema-filter-button__sub_main'])[1]";
    private choosenVendorFiltersLocator: string = "//div[@title='Производитель']";
    private choosenFrequencyFilterLocator: string = "//div[@title='Частота матрицы']";
    private choosenSuperpriceFilterLocator: string = "//span[contains(text(),'Суперцена')]";
    private frequencyFilterFromLocator: string = "(//select[@class='schema-filter-control__item'])[9]";
    private frequencyFilterToLocator: string = "(//select[@class='schema-filter-control__item'])[10]";
    private superpriceFilterLocator: string = "//label[@class='schema-filter__bonus-item schema-filter__bonus-item_additional']";
    private superpriceLabelLocator: string = "//div[@class='schema-product__hot']";
    private priceSchemaLocator: string = "//div[@class='schema-product__price']";

    // Elements

    private get showAllVendorsButtonElement() {
        return cy.xpath(this.showAllVendorsButtonLocator);
    }

    private get productsFoundedcounterElement() {
        return cy.xpath(this.productsFoundedcounterLocator);
    }

    private get choosenVendorFiltersElement() {
        return cy.xpath(this.choosenVendorFiltersLocator);
    }

    private get choosenFrequencyFilterElement() {
        return cy.xpath(this.choosenFrequencyFilterLocator);
    }

    private get choosenSuperpriceFilterElement() {
        return cy.xpath(this.choosenSuperpriceFilterLocator);
    }

    private get frequencyFilterFromElement() {
        return cy.xpath(this.frequencyFilterFromLocator);
    }

    private get frequencyFilterToElement() {
        return cy.xpath(this.frequencyFilterToLocator);
    }

    private get superpriceFilterElement() {
        return cy.xpath(this.superpriceFilterLocator);
    }

    private get priceSchemaElement() {
        return cy.xpath(this.priceSchemaLocator);
    }

    private get superpriceLabelElements() {
        return cy.xpath(this.superpriceLabelLocator);
    }

    // Methods

    chooseVendorAndVerifyFilterApplied(vendorName: string) {
        this.showAllVendorsButtonElement.click();
        this.productsFoundedcounterElement.invoke('text')
            .then((value) => { this.initialCounterValue = +value.replace(valueFilter, '') });
        cy.xpath(`//div[@class='schema-filter-popover__column-item']//span[@class='schema-filter__checkbox-text'][normalize-space()='${vendorName}']/../span/span`)
            .click();
        this.choosenVendorFiltersElement.should('contain.text', vendorName)
            .wait(1500)
            .then(() => {
                this.productsFoundedcounterElement.invoke('text')
                    .then((value) => { this.filteredCounterValue = +value.replace(valueFilter, '') }).then(() => {
                        expect(this.filteredCounterValue).lessThan(this.initialCounterValue);
                        this.initialCounterValue = this.filteredCounterValue;
                    });
            });
    }

    // Next methods associated with each other (Should be used one after one)

    chooseFrequencyAndVerifyFilterApplied(hzValueFrom: number, hzValueTo: number, vendorName: string) {
        this.frequencyFilterFromElement.select(`${hzValueFrom} Гц`);
        this.frequencyFilterToElement.select(`${hzValueTo} Гц`);
        this.choosenFrequencyFilterElement.should('contain.text', `${hzValueFrom} Гц — ${hzValueTo} Гц`)
            .wait(1500)
            .then(() => {
                this.productsFoundedcounterElement.invoke('text')
                    .then((value) => { this.filteredCounterValue = +value.replace(valueFilter, '') }).then(() => {
                        expect(this.filteredCounterValue).lessThan(this.initialCounterValue);
                        this.initialCounterValue = this.filteredCounterValue;
                    });
            });
        this.choosenVendorFiltersElement.should('contain.text', vendorName);
    }

    chooseSuperpriceAndVerifyFilterApplied() {
        this.superpriceFilterElement.click();
        this.choosenSuperpriceFilterElement.should('contain.text', "Суперцена");
        this.superpriceLabelElements.then((value) => {
            this.superpriceLabelElements.should('have.length', value.length);
        })
    }

    clearVendorAndVerifyFilterDeleted(hzValueFrom: number, hzValueTo: number, vendorName: string) {
        this.showAllVendorsButtonElement.click();
        cy.xpath(`//div[@class='schema-filter-popover__column-item']//span[@class='schema-filter__checkbox-text'][normalize-space()='${vendorName}']/../span/span`)
            .click();
        this.choosenVendorFiltersElement.should('not.exist');
        this.choosenFrequencyFilterElement.should('contain.text', `${hzValueFrom} Гц — ${hzValueTo} Гц`);
        this.choosenSuperpriceFilterElement.should('contain.text', "Суперцена");
    }

}

export const categoryCatalogPage: CategoryCatalogPage = new CategoryCatalogPage();
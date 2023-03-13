import { valueFilter } from "../const/regExp";

class RentPage {

    private initialAdvertsCounterValue: number = null;
    private advertsCounterAfterFilterValue: number = null;

    // Locators

    private advertsLocator: string = "//div[@class='classifieds-bar__item']";
    private flatFilterLocator: string = "//span[contains(text(),'Квартира')]";
    private apartmentsTypeLocator: string = "//span[@class='classified__caption-item classified__caption-item_type']";
    private priceToLocator: string = "//input[@id='search-filter-price-to']";
    private flatPriceLocator: string = "//span[contains(@data-bind, 'USD')]";
    private metroFilterLocator: string = "//div[contains(text(), 'Метро')]";
    private priceSortButtonLocator: string = "//div[@class='dropdown dropdown_right']";
    private firstFlatAdvertLocator: string = "(//a[@class='classified'])[1]";

    // Elements

    private get advertsCounterElement() {
        return cy.xpath(this.advertsLocator).invoke('text');
    }

    // Methods

    setFlatFilterAndVerify() {
        this.advertsCounterElement.then((value) => {
            this.initialAdvertsCounterValue = +value.replace(valueFilter, '');
        });
        cy.xpath(this.flatFilterLocator).click();
        cy.wait(1000);
        cy.xpath(this.apartmentsTypeLocator).each((type) => {
            cy.wrap(type).should('not.contain.text', 'Комната');
            cy.wrap(type).invoke('text').should('be.oneOf', ['1к', '2к', '3к', '4к', '5к', '6к']);
        });
        this.advertsCounterElement.then((value) => {
            this.advertsCounterAfterFilterValue = +value.replace(valueFilter, '');
            expect(this.advertsCounterAfterFilterValue).lessThan(this.initialAdvertsCounterValue);
        });
    }

    setRoomsFilterAndVerify(rooms: number) {
        this.advertsCounterElement.then((value) => {
            this.initialAdvertsCounterValue = +value.replace(valueFilter, '');
        });
        cy.xpath(`//span[normalize-space()='${rooms}']`).click();
        cy.wait(1000);
        cy.xpath(this.apartmentsTypeLocator).each((type) => {
            cy.wrap(type).should('contain.text', `${rooms}к`);
        });
        this.advertsCounterElement.then((value) => {
            this.advertsCounterAfterFilterValue = +value.replace(valueFilter, '');
            expect(this.advertsCounterAfterFilterValue).lessThan(this.initialAdvertsCounterValue);
        });
    }

    setPriceFilterAndVerify(price: number) {
        this.advertsCounterElement.then((value) => {
            this.initialAdvertsCounterValue = +value.replace(valueFilter, '');
        });
        cy.xpath(this.priceToLocator).clear().type(`${price}{enter}`);
        cy.wait(1000);
        cy.xpath(this.flatPriceLocator).each((value) => {
            cy.wrap(value).invoke('text').then((value) => {
                let flatPrice: number = +value;
                expect(flatPrice).lte(price);
            });
        });
        this.advertsCounterElement.then((value) => {
            this.advertsCounterAfterFilterValue = +value.replace(valueFilter, '');
            expect(this.advertsCounterAfterFilterValue).lessThan(this.initialAdvertsCounterValue);
        });
    }

    setDistanceFromMetroAndVerify(distance: string) {
        this.advertsCounterElement.then((value) => {
            this.initialAdvertsCounterValue = +value.replace(valueFilter, '');
        });
        cy.xpath(this.metroFilterLocator).click();
        cy.xpath(`//li[contains(text(),'${distance}')]`).click();
        cy.wait(1000);
        this.advertsCounterElement.then((value) => {
            this.advertsCounterAfterFilterValue = +value.replace(valueFilter, '');
            expect(this.advertsCounterAfterFilterValue).lessThan(this.initialAdvertsCounterValue);
        });
    }

    sortByPriceAndVerify(sortDirection: string) {
        let initialAdvId: string = "";
        cy.xpath(this.firstFlatAdvertLocator).invoke('attr', 'data-id').then((id) => {
            initialAdvId = id;
        })
        cy.xpath(this.priceSortButtonLocator).click();
        cy.xpath(`//li[contains(text(),'${sortDirection}')]`).click();
        cy.wait(1000);
        cy.xpath(this.firstFlatAdvertLocator).invoke('attr', 'data-id').then((id) => {
            expect(id).not.eq(initialAdvId);
        })

    }

}

export const rentPage: RentPage = new RentPage();
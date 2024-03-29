import { commaFIlter } from "../const/regExp";

class KursPage {

    // Locators

    private buyCurrencyButtonLocator: string = "//label[contains(text(),'Купить')]";
    private currencyValueInputLocator: string = "//input[@id='amount-in']";
    private currencyTypeLocator: string = "//select[@id='currency-in']";
    private convertedCurrencyAmmountLocator: string = "//b[@class='js-cur-result']";
    private eurBankSellLocator: string = "(//p[contains(@class, 'value')]/b)[5]";

    // Elements

    private get buyCurrencyButtonElement(): Cypress.Chainable {
        return cy.xpath(this.buyCurrencyButtonLocator);
    }

    private get currencyValueInputElement(): Cypress.Chainable {
        return cy.xpath(this.currencyValueInputLocator);
    }

    private get currencyTypeElement(): Cypress.Chainable {
        return cy.xpath(this.currencyTypeLocator);
    }

    private get convertedCurrencyAmmountElement(): Cypress.Chainable {
        return cy.xpath(this.convertedCurrencyAmmountLocator);
    }

    private get eurBankSellElement(): Cypress.Chainable {
        return cy.xpath(this.eurBankSellLocator);
    }

    // Methods

    chooseBuyCurrency(): void {
        this.buyCurrencyButtonElement.click();
    }

    enterAmmountAndValidate(inputValue: string, testAmmount: number): void {
        this.currencyValueInputElement.type(inputValue).then(() => {
            this.currencyValueInputElement.invoke('attr', 'value').should('equal', `${testAmmount}`);
        });
    }

    clearCurrencyInputField(): void {
        this.currencyValueInputElement.clear();
    }

    changeCurrencyType(currencyType: string): void {
        this.currencyTypeElement
            .contains(currencyType)
            .invoke('index')
            .then((index) => {
                this.currencyTypeElement.select(index);
            })
    }

    validateConvertedAmmount(inputValue: number): void {
        let bankSellEur: number = null;
        let convertedAmmount: number = null;
        this.convertedCurrencyAmmountElement.invoke('text')
            .then((text) => {
                convertedAmmount = +text.replace(commaFIlter, '.');
            })
        this.eurBankSellElement.invoke('text')
            .then((text) => {
                bankSellEur = +text.replace(commaFIlter, '.');
                expect(convertedAmmount.toFixed(3)).equal((bankSellEur * inputValue).toFixed(3));
            })
    }

}

export const kursPage: KursPage = new KursPage();
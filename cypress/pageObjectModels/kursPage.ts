import { commaFIlter } from "../const/regExp";

class KursPage {

    // Locators

    private buyCurrencyButtonLocator: string = "//label[contains(text(),'Купить')]";
    private currencyValueInputLocator: string = "//input[@id='amount-in']";
    private currencyTypeLocator: string = "//select[@id='currency-in']";
    private convertedCurrencyAmmountLocator: string = "//b[@class='js-cur-result']";
    private eurBankSellLocator: string = "(//p[contains(@class, 'value rise')]/b)[5]";

    // Elements

    private get buyCurrencyButtonElement() {
        return cy.xpath(this.buyCurrencyButtonLocator);
    }

    private get currencyValueInputElement() {
        return cy.xpath(this.currencyValueInputLocator);
    }

    private get currencyTypeElement() {
        return cy.xpath(this.currencyTypeLocator);
    }

    private get convertedCurrencyAmmountElement() {
        return cy.xpath(this.convertedCurrencyAmmountLocator);
    }

    private get eurBankSellElement() {
        return cy.xpath(this.eurBankSellLocator);
    }

    // Methods

    chooseBuyCurrency() {
        this.buyCurrencyButtonElement.click();
    }

    enterAmmountAndValidate(inputValue: any, testAmmount: any) {
        this.currencyValueInputElement.type(inputValue).then(() => {
            this.currencyValueInputElement.invoke('attr', 'value').should('equal', `${testAmmount}`);
        });
    }

    clearCurrencyInputField() {
        this.currencyValueInputElement.clear();
    }

    changeCurrencyType(currencyType: string) {
        this.currencyTypeElement
            .contains(currencyType)
            .invoke('index')
            .then((index) => {
                this.currencyTypeElement.select(index);
            })
    }

    validateConvertedAmmount(inputValue: number) {
        let bankSellEur: number = null;
        let convertedAmmount: number = null;
        this.convertedCurrencyAmmountElement.invoke('text')
            .then((text) => {
                convertedAmmount = +text.replace(commaFIlter, '.');
            })
        this.eurBankSellElement.invoke('text')
            .then((text) => {
                bankSellEur = +text.replace(commaFIlter, '.');
                expect(convertedAmmount).equal(bankSellEur * inputValue);
            })
    }

}

export const kursPage: KursPage = new KursPage();
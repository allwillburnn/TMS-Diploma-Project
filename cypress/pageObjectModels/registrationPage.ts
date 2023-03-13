class RegistrationPage {

    // Locators

    private emailFieldLocator: string = "input[type='email']";
    private passwordFieldLocator: string = "input[placeholder='Придумайте пароль']";
    private repeatPasswordFieldLocator: string = "input[placeholder='Повторите пароль']";
    private acceptTosLocator: string = ".i-checkbox__faux";
    private registerNewAccountButtonLocator: string = "button[type='submit']";
    private missedPasswordLocator: string = "(//div[contains(@class, 'auth-form__description_error')])[1]";
    private missedRepeatPasswordLocator: string = "(//div[contains(@class, 'auth-form__description_error')])[2]";
    private strongPasswordAnnotationLocator: string = "//div[contains(text(), 'Очень надежный пароль')]";
    private confirmEmailFormLocator: string = "//div[contains(text(), 'Подтвердите')]";
    private goToMailButtonLocator: string = "//a[contains(text(), 'Перейти в почту')]";

    // Elements

    private get emailFieldElement(): Cypress.Chainable {
        return cy.get(this.emailFieldLocator);
    }

    private get passwordFieldElement(): Cypress.Chainable {
        return cy.get(this.passwordFieldLocator);
    }

    private get repeatPasswordFieldElement(): Cypress.Chainable {
        return cy.get(this.repeatPasswordFieldLocator);
    }

    private get acceptTosElement(): Cypress.Chainable {
        return cy.get(this.acceptTosLocator);
    }

    private get registerNewAccountButtonElement(): Cypress.Chainable {
        return cy.get(this.registerNewAccountButtonLocator);
    }

    private get missedPasswordElement(): Cypress.Chainable {
        return cy.xpath(this.missedPasswordLocator);
    }

    private get missedRepeatPasswordElement(): Cypress.Chainable {
        return cy.xpath(this.missedRepeatPasswordLocator);
    }

    private get strongPasswordAnnotationElement(): Cypress.Chainable {
        return cy.xpath(this.strongPasswordAnnotationLocator);
    }

    private get confirmEmailFormElement(): Cypress.Chainable {
        return cy.xpath(this.confirmEmailFormLocator);
    }

    private get goToMailButtonElement(): Cypress.Chainable {
        return cy.xpath(this.goToMailButtonLocator);
    }

    // Methods

    setEmail(email: string): void {
        this.emailFieldElement.type(email);
    }

    setPassword(password: string): void {
        this.passwordFieldElement.type(password);
    }

    setRepeatPassword(password: string): void {
        this.repeatPasswordFieldElement.type(password);
    }

    acceptTos(): void {
        this.acceptTosElement.click();
    }

    registerAccount(): void {
        this.registerNewAccountButtonElement.click();
    }

    verifyMissedPasswordDescription(): void {
        this.passwordFieldElement.should("have.css", "background-color", "rgb(255, 231, 230)");
        this.missedPasswordElement.should("be.visible");
    }

    verifyRepeatedMissedPasswordDescription(): void {
        this.repeatPasswordFieldElement.should("have.css", "background-color", "rgb(255, 231, 230)");
        this.missedRepeatPasswordElement.should("be.visible");
    }

    verifyStrenghtPasswordDescription(): void {
        this.strongPasswordAnnotationElement.should("be.visible");
    }

    verifyConfirmEmailButtonIsActive(): void {
        this.confirmEmailFormElement.should("be.visible");
        this.goToMailButtonElement.should("be.visible");
    }

}

export const registrationPage: RegistrationPage = new RegistrationPage();
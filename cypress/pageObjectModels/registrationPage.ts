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

    private get emailFieldElement() {
        return cy.get(this.emailFieldLocator);
    }

    private get passwordFieldElement() {
        return cy.get(this.passwordFieldLocator);
    }

    private get repeatPasswordFieldElement() {
        return cy.get(this.repeatPasswordFieldLocator);
    }

    private get acceptTosElement() {
        return cy.get(this.acceptTosLocator);
    }

    private get registerNewAccountButtonElement() {
        return cy.get(this.registerNewAccountButtonLocator);
    }

    private get missedPasswordElement() {
        return cy.xpath(this.missedPasswordLocator);
    }

    private get missedRepeatPasswordElement() {
        return cy.xpath(this.missedRepeatPasswordLocator);
    }

    private get strongPasswordAnnotationElement() {
        return cy.xpath(this.strongPasswordAnnotationLocator);
    }

    private get confirmEmailFormElement() {
        return cy.xpath(this.confirmEmailFormLocator);
    }

    private get goToMailButtonElement() {
        return cy.xpath(this.goToMailButtonLocator);
    }

    // Methods

    setEmail(email: string) {
        this.emailFieldElement.type(email);
    }

    setPassword(password: string) {
        this.passwordFieldElement.type(password);
    }

    setRepeatPassword(password: string) {
        this.repeatPasswordFieldElement.type(password);
    }

    acceptTos() {
        this.acceptTosElement.click();
    }

    registerAccount() {
        this.registerNewAccountButtonElement.click();
    }

    verifyMissedPasswordDescription() {
        this.passwordFieldElement.should("have.css", "background-color", "rgb(255, 231, 230)");
        this.missedPasswordElement.should("be.visible");
    }

    verifyRepeatedMissedPasswordDescription() {
        this.repeatPasswordFieldElement.should("have.css", "background-color", "rgb(255, 231, 230)");
        this.missedRepeatPasswordElement.should("be.visible");
    }

    verifyStrenghtPasswordDescription() {
        this.strongPasswordAnnotationElement.should("be.visible");
    }

    verifyConfirmEmailButtonIsActive() {
        this.confirmEmailFormElement.should("be.visible");
        this.goToMailButtonElement.should("be.visible");
    }

}

export const registrationPage: RegistrationPage = new RegistrationPage();
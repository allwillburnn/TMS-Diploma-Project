class LoginPage {

    // Locators

    private usernameFieldLocator: string = "input[placeholder='Ник или e-mail']";
    private passwordFieldLocator: string = "input[placeholder='Пароль']";
    private loginButtonLocator: string = "//button[contains(text(),'Войти')]";
    private captchaOnLoginLocator: string = "//div[@class='auth-form__title auth-form__title_base auth-form__title_condensed-other']";
    private registrationButtonLocator: string = "//a[contains(text(),'Зарегистрироваться на Onlíner')]";
    private registrationFormLocator: string = "//div[@class='auth-form__body']/div/div[contains(text(), 'Регистрация')]";

    // Elements

    private get usernameFieldElement(): Cypress.Chainable {
        return cy.get(this.usernameFieldLocator);
    }

    private get passwordFieldElement(): Cypress.Chainable {
        return cy.get(this.passwordFieldLocator);
    }

    private get loginButtonElement(): Cypress.Chainable {
        return cy.xpath(this.loginButtonLocator);
    }

    private get captchaOnLoginElement(): Cypress.Chainable {
        return cy.xpath(this.captchaOnLoginLocator);
    }

    private get registrationButtonElement(): Cypress.Chainable {
        return cy.xpath(this.registrationButtonLocator);
    }

    private get registrationFormElement(): Cypress.Chainable {
        return cy.xpath(this.registrationFormLocator);
    }

    // Methods

    setUsernameOnLoginPage(username: string): void {
        this.usernameFieldElement.type(username);
    }

    setPasswordOnLoginPage(password: string): void {
        this.passwordFieldElement.type(password);
    }

    login(): void {
        this.loginButtonElement.click();
    }

    verifyCaptcha(status: string): void {
        this.captchaOnLoginElement.should(status);
    }

    goToRegistrationPage(): void {
        this.registrationButtonElement.click();
        this.registrationFormElement.should("be.visible");
    }
}

export const loginPage: LoginPage = new LoginPage();
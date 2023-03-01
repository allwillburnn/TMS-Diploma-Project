class LoginPage {

    // Locators

    private usernameFieldLocator: string = "input[placeholder='Ник или e-mail']";
    private passwordFieldLocator: string = "input[placeholder='Пароль']";
    private loginButtonLocator: string = "//button[contains(text(),'Войти')]";
    private captchaOnLoginLocator: string = "//div[@class='auth-form__title auth-form__title_base auth-form__title_condensed-other']";
    private registrationButtonLocator: string = "//a[contains(text(),'Зарегистрироваться на Onlíner')]";
    private registrationFormLocator: string = "//div[@class='auth-form__body']/div/div[contains(text(), 'Регистрация')]";

    // Elements

    private get usernameFieldElement() {
        return cy.get(this.usernameFieldLocator);
    }

    private get passwordFieldElement() {
        return cy.get(this.passwordFieldLocator);
    }

    private get loginButtonElement() {
        return cy.xpath(this.loginButtonLocator);
    }

    private get captchaOnLoginElement() {
        return cy.xpath(this.captchaOnLoginLocator);
    }

    private get registrationButtonElement() {
        return cy.xpath(this.registrationButtonLocator);
    }

    private get registrationFormElement() {
        return cy.xpath(this.registrationFormLocator);
    }

    // Methods

    setUsernameOnLoginPage(username: string) {
        this.usernameFieldElement.type(username);
    }

    setPasswordOnLoginPage(password: string) {
        this.passwordFieldElement.type(password);
    }

    login() {
        this.loginButtonElement.click();
    }

    verifyCaptcha(status: string) {
        this.captchaOnLoginElement.should(status);
    }

    goToRegistrationPage() {
        this.registrationButtonElement.click();
        this.registrationFormElement.should("be.visible");
    }
}

export const loginPage: LoginPage = new LoginPage();
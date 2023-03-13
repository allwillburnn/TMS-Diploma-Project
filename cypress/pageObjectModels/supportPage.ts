import { emailPattern } from "../const/regExp";

class SupportPage {

    // Locators

    private nameInputLocator: string = "//input[@id='id_name']";
    private emailInputLocator: string = "//input[@id='id_email']";
    private problemTypeSelectLocator: string = "//select[@id='id_type']";
    private problemLocationSelectLocator: string = "//select[@id='id_project']";
    private shortProblemDescriptionInputLocator: string = "//input[@id='id_subject']";
    private fullProblemDescriptionTextareaLocator: string = "//textarea[@id='id_description']";
    private captchaInputLocator: string = "//input[@id='id_captcha']";
    private captchaLocator: string = "//img[@alt='Captcha']";
    private sendRequestButtonLocator: string = "//input[@name='supportform[submit]']";

    // Elements

    private get nameInputElement() {
        return cy.xpath(this.nameInputLocator);
    }

    private get emailInputElement() {
        return cy.xpath(this.emailInputLocator);
    }

    private get problemTypeSelectElement() {
        return cy.xpath(this.problemTypeSelectLocator);
    }

    private get problemLocationSelectElement() {
        return cy.xpath(this.problemLocationSelectLocator);
    }

    private get sendRequestButtonElement() {
        return cy.xpath(this.sendRequestButtonLocator);
    }

    private get shortProblemDescriptionInputElement() {
        return cy.xpath(this.shortProblemDescriptionInputLocator);
    }

    private get fullProblemDescriptionTextareaElement() {
        return cy.xpath(this.fullProblemDescriptionTextareaLocator);
    }

    // Methods

    fillNameAndVerify(nameValue: string) {
        this.nameInputElement.type(nameValue);
        this.nameInputElement.should('have.value', nameValue);
    }

    clearNameAndVerify() {
        this.nameInputElement.clear();
        this.nameInputElement.blur();
        this.nameInputElement.should('have.value', 'Anonymous');
    }

    fillEmailAndVerify(email: string) {
        this.emailInputElement.type(email);
        this.emailInputElement.blur()
            .then(() => {
                if (emailPattern.test(email)) {
                    this.emailInputElement.should('have.value', email).and('have.attr', 'class', 'i-p valid');
                } else {
                    this.emailInputElement.should('have.attr', 'class', 'i-p error');
                }
            });
    }

    clearEmailAndVerify() {
        this.emailInputElement.clear();
        this.emailInputElement.blur();
    }

    verifyDropdowns() {
        this.problemTypeSelectElement.should('be.visible');
        cy.xpath(`${this.problemTypeSelectLocator}/option`).should('have.length.greaterThan', 1);
        this.problemLocationSelectElement.should('be.visible');
        cy.xpath(`${this.problemLocationSelectLocator}/option`).should('have.length.greaterThan', 1);
    }

    verifyCaptcha() {
        cy.xpath(this.captchaInputLocator).should('be.visible');
        cy.xpath(this.captchaLocator).should('be.visible');
    }

    verifySendRequestButtonIsEnabled() {
        this.sendRequestButtonElement.should('be.visible');
        this.sendRequestButtonElement.should('be.enabled');
    }

    verifyShortProblemDescriptionInput(shortProblemDescription: string) {
        this.shortProblemDescriptionInputElement.should('be.visible');
        this.shortProblemDescriptionInputElement.type(shortProblemDescription);
        this.shortProblemDescriptionInputElement.should('have.value', shortProblemDescription);
    }

    verifyFullProblemDescriptionTextarea(fullProblemDescription: string) {
        this.fullProblemDescriptionTextareaElement.should('be.visible');
        this.fullProblemDescriptionTextareaElement.type(fullProblemDescription);
        this.fullProblemDescriptionTextareaElement.should('have.value', fullProblemDescription);
    }

}

export const supportPage: SupportPage = new SupportPage();
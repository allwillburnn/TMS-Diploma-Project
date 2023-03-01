import { username, password, validNewEmail } from "../const/credentials";
import { mainPage } from "../pageObjectModels/mainPage";
import { loginPage } from "../pageObjectModels/loginPage";
import { registrationPage } from "../pageObjectModels/registrationPage";

describe("Onliner main features (Logged in)", () => {

    beforeEach(() => {
        cy.visit('/');
    })

    it("User is trying to login with valid credentials (Should see captcha)", () => {
        mainPage.goToLogin();
        loginPage.setUsernameOnLoginPage(username);
        loginPage.setPasswordOnLoginPage(password);
        loginPage.login();
        loginPage.verifyCaptcha("be.visible");
    })

    it("User can create new account", () => {
        mainPage.goToLogin();
        loginPage.goToRegistrationPage();
        registrationPage.setEmail(validNewEmail);
        registrationPage.acceptTos();
        registrationPage.registerAccount();
        registrationPage.verifyMissedPasswordDescription();
        registrationPage.verifyRepeatedMissedPasswordDescription();
        registrationPage.setPassword(password);
        registrationPage.setRepeatPassword(password);
        registrationPage.verifyStrenghtPasswordDescription();
        registrationPage.registerAccount();
        registrationPage.verifyConfirmEmailButtonIsActive();
    })

})
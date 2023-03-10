import { username, password, validNewEmail } from "../const/credentials";
import { mainPage } from "../pageObjectModels/mainPage";
import { loginPage } from "../pageObjectModels/loginPage";
import { registrationPage } from "../pageObjectModels/registrationPage";
import { searchIFrame } from "../pageObjectModels/iframes/searchIFrame";
import { searchQueryWithCategory, searchQuery } from "../const/searchQueries";
import { categoryCatalogPage } from "../pageObjectModels/categoryCatalogPage";
import { catalogPage } from "../pageObjectModels/catalogPage";
import { vendorName, frequency } from "../const/filters";
import { kursPage } from "../pageObjectModels/kursPage";

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

    it("User can perform search", () => {
        /* Search works now only from iframe, but we need to initialize search field on main page first.
        Sometimes that work reverted...
        */
        mainPage.performSearch(searchQueryWithCategory[0]);
        searchIFrame.validateSearchIFrameIsVisible();
        searchIFrame.validateCategorySearchResults(searchQueryWithCategory[1]);
        searchIFrame.clearSearchFieldAndValidateEmpty();
        searchIFrame.performSearch(searchQuery);
        searchIFrame.validateSearchResults(searchQuery);
        searchIFrame.goToFirstFoundedProductAndValidate(searchQuery);
    })

    it("User can use filter", () => {
        mainPage.goToCatalog();
        catalogPage.goToComputersCategory();
        catalogPage.goToLaptopsPcMonitorsCubcategory();
        catalogPage.goToLaptopsPageAndVerify();
        categoryCatalogPage.chooseVendorAndVerifyFilterApplied(vendorName);
        categoryCatalogPage.chooseFrequencyAndVerifyFilterApplied(frequency[0], frequency[1], vendorName);
        categoryCatalogPage.chooseSuperpriceAndVerifyFilterApplied();
        categoryCatalogPage.clearVendorAndVerifyFilterDeleted(frequency[0], frequency[1], vendorName);
    })

    it("Currency converter is working correctly", () => {
        const currencyAmmount: number = Math.floor(Math.random() * 991 + 10);
        mainPage.goToKursAndValidate();
        kursPage.chooseBuyCurrency();
        kursPage.enterAmmountAndValidate("test", 100);
        kursPage.clearCurrencyInputField();
        kursPage.enterAmmountAndValidate(currencyAmmount, currencyAmmount);
        kursPage.changeCurrencyType("EUR");
        kursPage.validateConvertedAmmount(currencyAmmount);
    })

})
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
import { rentPage } from "../pageObjectModels/rentPage";
import { supportPage } from "../pageObjectModels/supportPage";
import { userData } from "../const/supportRequestData";
import { productPage } from "../pageObjectModels/productPage";
import { comparsionPage } from "../pageObjectModels/comparsionPage";

describe("Onliner main features (Not logged in)", () => {

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
        // Sometimes search query works correctly only from iframe, but we need to initialize search field on main page first anyway (Seems like a Cypress type "feature")
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
        catalogPage.openComputersCategory();
        catalogPage.openLaptopsPcMonitorsSubcategory();
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
        kursPage.enterAmmountAndValidate(currencyAmmount.toString(), currencyAmmount);
        kursPage.changeCurrencyType("EUR");
        kursPage.validateConvertedAmmount(currencyAmmount);
    })

    it("Real estate catalog works correctly", () => {
        mainPage.goToRentAndVerify();
        rentPage.setFlatFilterAndVerify();
        rentPage.setRoomsFilterAndVerify(2);
        rentPage.setPriceFilterAndVerify(500);
        rentPage.setDistanceFromMetroAndVerify('Возле метро');
        rentPage.sortByPriceAndVerify('Сначала дорогие');
    })

    it("The user can contact support", () => {
        mainPage.goToSupportPageAndVerify();
        supportPage.fillNameAndVerify(userData.correctName);
        supportPage.clearNameAndVerify();
        supportPage.fillEmailAndVerify(userData.incorrectEmail);
        supportPage.clearEmailAndVerify();
        supportPage.fillEmailAndVerify(userData.correctEmail);
        supportPage.verifyDropdowns();
        supportPage.verifyShortProblemDescriptionInput(userData.shortProblemDescription);
        supportPage.verifyFullProblemDescriptionTextarea(userData.fullProblemDescription);
        supportPage.verifyCaptcha();
        supportPage.verifySendRequestButtonIsEnabled();
    })

    it("Products comparsion works correctly", () => {
        let addedToComparsionProductsTitles: string[] = [];
        let productTitlesOnComparsionPageArray: string[] = [];
        mainPage.goToCatalog();
        catalogPage.openElectronicsCategory();
        catalogPage.openTvVideoCategory();
        catalogPage.openTvCategoryAndVerify();
        categoryCatalogPage.openProductPageAndVerify(2);
        productPage.addProductToComparsionAndVerify(addedToComparsionProductsTitles);
        productPage.returnToCatalogPage();
        categoryCatalogPage.openProductPageAndVerify(3);
        productPage.addProductToComparsionAndVerify(addedToComparsionProductsTitles);
        categoryCatalogPage.goToComparsionPageAndVerify();
        comparsionPage.getProductsTitlesInComparsion().each((title) => {
            productTitlesOnComparsionPageArray.push(title.text());
        })
            .then(() => {
                expect(productTitlesOnComparsionPageArray).to.include.members(addedToComparsionProductsTitles);
            });

    })

})
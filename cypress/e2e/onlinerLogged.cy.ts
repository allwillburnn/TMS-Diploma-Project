import { oss } from "../const/cookies";
import { mainPage } from "../pageObjectModels/mainPage";
import { articlePage } from "../pageObjectModels/articlePage";

describe("Onliner main features (Logged in)", () => {

    beforeEach(() => {
        cy.setCookie('logged_in', '1', { domain: ".onliner.by", secure: true, sameSite: "lax" });
        cy.setCookie('oss', oss, { domain: '.onliner.by', httpOnly: true, secure: true, sameSite: "lax" });
        cy.getCookie('oss').should('have.property', 'value', oss);
        cy.visit('/');
    })

    // Test will fail if there's no new article after previsious run

    it.skip("User can react to article (Once)", () => {
        mainPage.getFirstArticleTitle().then(expectedArticleTitle => {
            mainPage.goToFirstAutoArticle();
            articlePage.validateArticleTitle(expectedArticleTitle);
            articlePage.verifyReactionCounter();
        });
        articlePage.verifyReactionBarStatus("st-reacted");
    })

})
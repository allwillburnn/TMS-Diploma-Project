import { logIn } from "../helpers/logIn";
import { mainPage } from "../pageObjectModels/mainPage";
import { articlePage } from "../pageObjectModels/articlePage";
import { oss } from "../const/cookies";

describe("Onliner main features (Logged in)", () => {

    beforeEach(() => {
        logIn(oss);
        cy.visit('/');
    })

    // Test can fail if there's no new article after previsious run (user can react once)

    it("User can react to article (Once)", () => {
        mainPage.getFirstArticleTitle().then(expectedArticleTitle => {
            mainPage.goToFirstAutoArticle();
            articlePage.validateArticleTitle(expectedArticleTitle);
            articlePage.verifyReactionCounter();
        });
        articlePage.verifyReactionBarStatus("st-reacted");
    })

})
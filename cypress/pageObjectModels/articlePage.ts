class ArticlePage {

    // Locators

    private articleTitleLocator: string = "div[class='news-header__title'] h1";
    private firstReactionLocator: string = "(//div[@class='st-btn st-first'])[1]";
    private firstReactionCounterLocator: string = "(//div[contains(@class, 'st-btn')]/span)[1]";
    private reactionSectionLocator: string = "//div[contains(@class, 'sharethis')]";

    // Elements

    private get articleTitleElement() {
        return cy.get(this.articleTitleLocator);
    }

    private get firstReactionElement() {
        return cy.xpath(this.firstReactionLocator);
    }

    private get firstReactionCounterElement() {
        return cy.xpath(this.firstReactionCounterLocator);
    }

    private get reactionSectionElement() {
        return cy.xpath(this.reactionSectionLocator);
    }

    // Methods

    getArticleTitle(): string {
        let articleTitle: string = "";
        this.articleTitleElement.invoke('text').then((title) => { articleTitle = title });
        return articleTitle;
    }

    validateArticleTitle(expectedArticleTitle: string) {
        this.articleTitleElement.should("contain.text", expectedArticleTitle);
    }

    setReaction() {
        this.firstReactionElement.click();
    }

    getReactionCounterValue() {
        return this.firstReactionCounterElement.invoke('text');
    }

    verifyReactionCounter() {
        this.getReactionCounterValue().then(value => {
            const counterValue: number = +value;
            this.setReaction();
            this.getReactionCounterValue().then(newValue => {
                const newCounterValue: number = +newValue;
                expect(newCounterValue).to.equal(counterValue + 1);
            })
        })
    }

    verifyReactionBarStatus(status: string) {
        this.reactionSectionElement.should('have.class', status);
    }

}

export const articlePage: ArticlePage = new ArticlePage();


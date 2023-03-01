class ArticlePage {

    // Locators

    private articleTitleLocator: string = "div[class='news-header__title'] h1";

    // Elements

    private get articleTitleElement() {
        return cy.get(this.articleTitleLocator);
    }

    // Methods

    getArticleTitle(): string {
        let articleTitle: string = "";
        this.articleTitleElement.invoke('text').then((title) => { articleTitle = title });
        return articleTitle;
    }

    validateArticleTitle(expectedArticleTitle: string) {
        this.articleTitleElement.should('have.text', expectedArticleTitle);
    }

}

export const articlePage: ArticlePage = new ArticlePage();


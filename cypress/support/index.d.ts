declare namespace Cypress {
    interface Chainable<Subject = any> {
        getIFrameBody(xpath: string): Chainable<any>;
    }
}
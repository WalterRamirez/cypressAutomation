export class WindowPage {
    validateWindowForm(subject, text) {
        cy.contains('nb-card', 'Window Form').contains('button', 'Open window form').click()
        
        cy.contains('nb-window', 'Window').should('be.visible')

        cy.contains('nb-window', 'Window').then($window => {
            cy.wrap($window).should('have.class', 'full-screen')

            // Minimize
            cy.wrap($window).find('button nb-icon[icon="minus-outline"]').click()
            cy.wrap($window).should('have.class', 'minimized')

            // Full Screen
            cy.wrap($window).find('button nb-icon[icon="minus-outline"]').click()
            cy.wrap($window).should('have.class', 'full-screen')

            // Maximize
            cy.wrap($window).find('button nb-icon[icon="collapse-outline"]').click()
            cy.wrap($window).should('have.class', 'maximized')

            // Full Screen
            cy.wrap($window).find('button nb-icon[icon="expand-outline"]').click()
            cy.wrap($window).should('have.class', 'full-screen')

            // Fill
            cy.wrap($window).find('form').then($form => {
                cy.wrap($form).find('input').clear().type(subject)
                cy.wrap($form).find('textarea').clear().type(text)
            })

            // Close
            cy.wrap($window).find('button nb-icon[icon="close-outline"]').click()
        })

        cy.contains('nb-window', 'Window').should('not.exist')
    }

    validateWindoFormWithTemplate() {
        cy.contains('nb-card', 'Window Form').contains('button', 'Open window with template').click()
        
        cy.contains('nb-window', 'Window content from template').should('be.visible')

        cy.contains('nb-window', 'Window content from template').then($window => {
            cy.wrap($window).should('have.class', 'full-screen')

            // Minimize
            cy.wrap($window).find('button nb-icon[icon="minus-outline"]').click()
            cy.wrap($window).should('have.class', 'minimized')

            // Full Screen
            cy.wrap($window).find('button nb-icon[icon="minus-outline"]').click()
            cy.wrap($window).should('have.class', 'full-screen')

            // Maximize
            cy.wrap($window).find('button nb-icon[icon="collapse-outline"]').click()
            cy.wrap($window).should('have.class', 'maximized')

            // Full Screen
            cy.wrap($window).find('button nb-icon[icon="expand-outline"]').click()
            cy.wrap($window).should('have.class', 'full-screen')

            // Close
            cy.wrap($window).find('button nb-icon[icon="close-outline"]').click()
        })
        cy.contains('nb-window', 'Window content from template').should('not.exist')
    }

    validateWindowWithBackdrop() {
        cy.contains('nb-card', 'Window Without Backdrop').contains('button', 'Open window with backdrop').click()
        
        cy.contains('nb-window', 'Window content from template').should('be.visible')

        cy.contains('nb-window', 'Window content from template').then($window => {
            cy.wrap($window).should('have.class', 'full-screen')

            // Minimize
            cy.wrap($window).find('button nb-icon[icon="minus-outline"]').click()
            cy.wrap($window).should('have.class', 'minimized')

            // Full Screen
            cy.wrap($window).find('button nb-icon[icon="minus-outline"]').click()
            cy.wrap($window).should('have.class', 'full-screen')

            // Maximize
            cy.wrap($window).find('button nb-icon[icon="collapse-outline"]').click()
            cy.wrap($window).should('have.class', 'maximized')

            // Full Screen
            cy.wrap($window).find('button nb-icon[icon="expand-outline"]').click()
            cy.wrap($window).should('have.class', 'full-screen')

            // Validate Backdrop
            cy.get('body').click('top')
        })
        cy.contains('nb-window', 'Window content from template').should('not.exist')
    }

    validateWindowWithoutBackdrop() {
        cy.contains('nb-card', 'Window Without Backdrop').contains('button', 'Open window without backdrop').click()
        
        cy.contains('nb-window', 'Window without backdrop').should('be.visible')

        cy.contains('nb-window', 'Window without backdrop').then($window => {
            cy.wrap($window).should('have.class', 'full-screen')

            // Minimize
            cy.wrap($window).find('button nb-icon[icon="minus-outline"]').click()
            cy.wrap($window).should('have.class', 'minimized')

            // Full Screen
            cy.wrap($window).find('button nb-icon[icon="minus-outline"]').click()
            cy.wrap($window).should('have.class', 'full-screen')

            // Maximize
            cy.wrap($window).find('button nb-icon[icon="collapse-outline"]').click()
            cy.wrap($window).should('have.class', 'maximized')

            // Full Screen
            cy.wrap($window).find('button nb-icon[icon="expand-outline"]').click()
            cy.wrap($window).should('have.class', 'full-screen')

            // Validate Backdrop
            cy.get('body').click('top')
            cy.wrap($window).should('be.visible')

            // Close
            cy.wrap($window).find('button nb-icon[icon="close-outline"]').click()
        })
        cy.contains('nb-window', 'Window content from template').should('not.exist')
    }
}

export const onWindowPage = new WindowPage()
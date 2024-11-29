export class DialogPage {
    validateSingleDialogs(){
        cy.contains('nb-card', 'Open Dialog').then($dialogCard => {
            cy.wrap($dialogCard).contains('button', 'Open Dialog with component').click()
            cy.get('.cdk-overlay-container').should('be.visible')
            cy.contains('nb-card', 'This is a title passed to the dialog component').should('be.visible')
            cy.get('nb-card').contains('button', 'Dismiss Dialog').click()
            cy.get('.cdk-overlay-container').should('not.be.visible')

            cy.wrap($dialogCard).contains('button', 'Open Dialog with template').click()
            cy.get('.cdk-overlay-container').should('be.visible')
            cy.contains('nb-card', 'Template Dialog').should('be.visible')
            cy.get('nb-card').contains('button', 'Close Dialog').click()
            cy.get('.cdk-overlay-container').should('not.be.visible')
        })
    }

    validateBackdropDialogs(){
        cy.contains('nb-card', 'Open Without Backdrop').then($dialogCard => {
            cy.wrap($dialogCard).contains('button', 'Open Dialog with backdrop').click()
            cy.get('.cdk-overlay-container').should('be.visible')
            cy.get('.cdk-overlay-backdrop-showing').should('exist')
            cy.contains('nb-card', 'This is a title passed to the dialog component').should('be.visible')
            cy.get('nb-card').contains('button', 'Dismiss Dialog').click()
            cy.get('.cdk-overlay-container').should('not.be.visible')

            cy.wrap($dialogCard).contains('button', 'Open Dialog without backdrop').click()
            cy.get('.cdk-overlay-container').should('be.visible')
            cy.get('.cdk-overlay-backdrop-showing').should('not.exist')
            cy.contains('nb-card', 'Template Dialog').should('be.visible')
            cy.get('nb-card').contains('button', 'Close Dialog').click()
            cy.get('.cdk-overlay-container').should('not.be.visible')
        })
    }

    validateEscCloseDialogs(){
        cy.contains('nb-card', 'Open Without Esc Close').then($dialogCard => {
            cy.wrap($dialogCard).contains('button', 'Open Dialog with esc close').click()
            cy.get('.cdk-overlay-container').should('be.visible')
            cy.contains('nb-card', 'This is a title passed to the dialog component').should('be.visible')
            cy.contains('nb-card', 'This is a title passed to the dialog component')
            .trigger('keydown', {key: 'Escape', keyCode: 27, code: 'Escape', which: 27})
            .trigger('keyup', {key: 'Escape', keyCode: 27, code: 'Escape', which: 27})
            cy.get('.cdk-overlay-container').should('not.be.visible')

            cy.wrap($dialogCard).contains('button', 'Open Dialog without esc close').click()
            cy.get('.cdk-overlay-container').should('be.visible')
            cy.contains('nb-card', 'Template Dialog').should('be.visible')
            cy.contains('nb-card', 'Template Dialog')
            .trigger('keydown', {key: 'Escape', keyCode: 27, code: 'Escape', which: 27})
            .trigger('keyup', {key: 'Escape', keyCode: 27, code: 'Escape', which: 27})
            cy.contains('nb-card', 'Template Dialog').should('be.visible')
            cy.get('nb-card').contains('button', 'Close Dialog').click()
            cy.get('.cdk-overlay-container').should('not.be.visible')
        })
    }

    validateNoBackdropDialogs(){
        cy.contains('nb-card', 'Open Without Backdrop Click').then($dialogCard => {
            cy.wrap($dialogCard).contains('button', 'Open Dialog with backdrop click').click()
            cy.get('.cdk-overlay-container').should('be.visible')
            cy.contains('nb-card', 'This is a title passed to the dialog component').should('be.visible')
            cy.get('body').click('top')
            cy.get('.cdk-overlay-container').should('not.be.visible')

            cy.wrap($dialogCard).contains('button', 'Open without backdrop click').click()
            cy.get('.cdk-overlay-container').should('be.visible')
            cy.contains('nb-card', 'Template Dialog').should('be.visible')
            cy.get('body').click('top')
            cy.contains('nb-card', 'Template Dialog').should('be.visible')
            cy.get('nb-card').contains('button', 'Close Dialog').click()
            cy.get('.cdk-overlay-container').should('not.be.visible')
        })
    }

    validateDialogWithResult(name){
        cy.contains('nb-card', 'Return Result From Dialog').then($dialogCard => {
            cy.wrap($dialogCard).contains('button', 'Enter Name').click()
            cy.get('.cdk-overlay-container').should('be.visible')
            cy.contains('nb-card', 'Enter your name').should('be.visible')
            cy.contains('nb-card', 'Enter your name').find('input').clear().type(name)
            cy.contains('nb-card', 'Enter your name').contains('button', 'Submit').click()
            cy.get('.cdk-overlay-container').should('not.be.visible')
            cy.wrap($dialogCard).should('contain.text', name)
        })
    }
}

export const onDialogPage = new DialogPage()
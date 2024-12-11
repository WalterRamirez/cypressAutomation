describe('Shadow DOM', () => {
    it('Access Shadow DOM', () => {
        cy.visit('https://radogado.github.io/shadow-dom-demo')

        // The Id mut be in the shadow level, not the root level
        cy.get('#app').shadow().find('#container')
        
        // It will fail since the body is not the root of the shadow DOM
        // cy.get('body').shadow().find('#container')
    })
})
export class AccordionPage {
    walkToggleWithExternalController() {
        cy.get('nb-accordion').not('[multi]').find('nb-accordion-item').then($items => {
            cy.wrap($items).each(($item, index) => {
                if (index === 0) {// expand using toggle button
                    cy.contains('button', 'Toggle First Item').click()
                    cy.wrap($item).should('have.class', 'expanded')
                    cy.contains('button', 'Toggle First Item').click()
                    cy.wrap($item).should('have.class', 'collapsed')
                }
                cy.wrap($item).find('g g').click()
                cy.wrap($item).should('have.class', 'expanded')
                cy.wrap($item).find('g g').click()
                cy.wrap($item).should('have.class', 'collapsed')
            })
        })
    }

    walkSingleToggle() {
        cy.get('nb-accordion[multi]').find('nb-accordion-item').then($items => {
            cy.wrap($items).each(($item) => {
                cy.wrap($item).find('g g').click()
                cy.wrap($item).should('have.class', 'expanded')
                cy.wrap($item).find('g g').click()
                cy.wrap($item).should('have.class', 'collapsed')
            })
        })}

    navigateToggleWithExternalController(navSteps) {
        cy.get('nb-accordion').not('[multi]').find('nb-accordion-item').then(($items) => {
            navSteps.forEach((step) => {
                if (step === 0) {
                    cy.contains('button', 'Toggle First Item').click()
                } else {
                    cy.wrap($items).eq(step - 1).click()
                }
                cy.wrap($items).eq(step === 0 ? 0 : step - 1).should('have.class', 'expanded')
            })
        })
    }

    // [1, 3, 1, 2, 1, 3, 2, 1]
    navigateSingleToggle(navSteps){
        cy.get('nb-accordion[multi]').find('nb-accordion-item').its('length').then((length) => {
            let status = Array(length).fill(false);
            
            cy.get('nb-accordion[multi]').find('nb-accordion-item').then(($items) => {
                navSteps.forEach((step) => {
                    cy.wrap($items).eq(step - 1).find('g g').click()
                    status[step - 1] = !status[step - 1]
                    cy.wrap($items).eq(step - 1).should('have.class', status[step - 1] ? 'expanded' : 'collapsed')
                })
            })
        }
    )}
}

export const onAccordionPage = new AccordionPage()
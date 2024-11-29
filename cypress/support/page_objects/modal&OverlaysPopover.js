export class PopoverPage {
    static popoverTooltip = 'Hello, how are you today?'
    static firstTab = "What's up?"
    static secondTab = "Second Tab"
    static cardTitle = "Hello!"
    static popoverText = "Popover!"

    validatePopoverPosition() {
        cy.contains('nb-card', 'Popover Position').then($card => {
            cy.wrap($card).contains('button', 'Left').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-popover.nb-overlay-left').should('be.visible').should('contain.text', PopoverPage.popoverTooltip)
            cy.wrap($card).contains('button', 'Left').trigger('mouseleave')

            cy.wrap($card).contains('button', 'Top').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-popover.nb-overlay-top').should('be.visible').should('contain.text', PopoverPage.popoverTooltip)
            cy.wrap($card).contains('button', 'Top').trigger('mouseleave')

            cy.wrap($card).contains('button', 'Bottom').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-popover.nb-overlay-bottom').should('be.visible').should('contain.text', PopoverPage.popoverTooltip)
            cy.wrap($card).contains('button', 'Bottom').trigger('mouseleave')

            cy.wrap($card).contains('button', 'Right').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-popover.nb-overlay-right').should('be.visible').should('contain.text', PopoverPage.popoverTooltip)
            cy.wrap($card).contains('button', 'Right').trigger('mouseleave')
        })
    }

    validateSimplePopovers() {
        cy.contains('nb-card', 'Simple Popovers').then($card => {
            cy.wrap($card).contains('button', 'on click').click()
            cy.get('nb-popover').should('be.visible').should('contain.text', PopoverPage.popoverTooltip)

            cy.wrap($card).contains('button', 'on hover').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-popover').should('be.visible').should('contain.text', PopoverPage.popoverTooltip)
            cy.wrap($card).contains('button', 'on hover').trigger('mouseleave')

            cy.wrap($card).contains('button', 'on hint').trigger('mouseenter')
            cy.get('nb-popover').should('be.visible').should('contain.text', PopoverPage.popoverTooltip)
            cy.wrap($card).contains('button', 'on hint').trigger('mouseleave')
        })
    }

    validateTemplatePopovers(email, subject, message) {
        cy.contains('nb-card', 'Template Popovers').then($card => {
            cy.wrap($card).contains('button', 'With tabs').click()
            cy.get('nb-popover nb-tabset').should('be.visible').find('li.active').should('contain.text', PopoverPage.firstTab)

            cy.get('nb-popover nb-tabset').contains('li', PopoverPage.secondTab).click()
            cy.get('nb-popover nb-tabset').should('be.visible').find('li.active').should('contain.text', PopoverPage.secondTab)
            
            cy.wrap($card).contains('button', 'With tabs').click()
            cy.get('nb-popover nb-tabset').should('not.exist')

            cy.wrap($card).contains('button', 'With form').click()
            cy.get('nb-popover form').should('be.visible').then($form => {
                cy.wrap($form).find('[placeholder="Recipients"]').clear().type(email)
                cy.wrap($form).find('[placeholder="Subject"]').clear().type(subject)
                cy.wrap($form).find('[placeholder="Message"]').clear().type(message)
                cy.wrap($form).submit()

                cy.wrap($card).contains('button', 'With form').click()
                cy.wrap($form).should('not.exist')
            })

            cy.wrap($card).contains('button', 'With card').click()
            cy.get('nb-popover nb-card').should('be.visible').should('contain.text', PopoverPage.cardTitle)

            cy.wrap($card).contains('button', 'With card').click()
            cy.get('nb-popover nb-card').should('not.exist')
        })
    }

    validateComponentPopovers(email, subject, message) {
        cy.contains('nb-card', 'Component Popovers').then($card => {
            cy.wrap($card).contains('button', 'With tabs').click()
            cy.get('nb-popover nb-tabset').should('be.visible').find('li.active').should('contain.text', PopoverPage.firstTab)

            cy.get('nb-popover nb-tabset').contains('li', PopoverPage.secondTab).click()
            cy.get('nb-popover nb-tabset').should('be.visible').find('li.active').should('contain.text', PopoverPage.secondTab)
            
            cy.wrap($card).contains('button', 'With tabs').click()
            cy.get('nb-popover nb-tabset').should('not.exist')

            cy.wrap($card).contains('button', 'With form').click()
            cy.get('nb-popover form').should('be.visible').then($form => {
                cy.wrap($form).find('[placeholder="Recipients"]').clear().type(email)
                cy.wrap($form).find('[placeholder="Subject"]').clear().type(subject)
                cy.wrap($form).find('[placeholder="Message"]').clear().type(message)
                cy.wrap($form).submit()

                cy.wrap($card).contains('button', 'With form').click()
                cy.wrap($form).should('not.exist')
            })

            cy.wrap($card).contains('button', 'With card').click()
            cy.get('nb-popover nb-card').should('be.visible').should('contain.text', PopoverPage.cardTitle)

            cy.wrap($card).contains('button', 'With card').click()
            cy.get('nb-popover nb-card').should('not.exist')
        })
    }

    validateEventDeboucing() {
        cy.contains('nb-card', 'Event Debouncing').find('button').each($button => {
            cy.wrap($button).trigger('mouseenter').trigger('mouseover')
            cy.get('nb-popover').should('be.visible').should('contain.text', PopoverPage.popoverText)
            cy.wrap($button).trigger('mouseleave')
        })
    }
}

export const onPopoverPage = new PopoverPage()
export class PopoverPage {
    static popoverTooltip = 'Hello, how are you today?'

    validatePopoverPosition() {
        cy.contains('nb-card', 'Popover Position').then($card => {
            
        })
    }

    validateSimplePopovers() {
        cy.contains('nb-card', 'Simple Popovers').then($card => {
            
        })
    }

    validateTemplatePopovers(email, subject, message) {
        cy.contains('nb-card', 'Template Popovers').then($card => {
            
        })
    }

    validateComponentPopovers(email, subject, message) {
        cy.contains('nb-card', 'Component Popovers').then($card => {
            
        })
    }

    validateEventDeboucing() {
        cy.contains('nb-card', 'Event Debouncing').then($card => {
            
        })
    }
}

export const onPopoverPage = new PopoverPage()
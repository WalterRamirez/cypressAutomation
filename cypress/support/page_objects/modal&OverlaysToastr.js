export class ToastrPage {

    static Position = Object.freeze({
        TOP_RIGHT: "top-right",
        TOP_LEFT: "top-left",
        BOTTOM_RIGHT: "bottom-right",
        BOTTOM_LEFT: "bottom-left",
        TOP_START: "top-start",
        TOP_END: "top-end",
        BOTTOM_START: "bottom-start",
        BOTTOM_END: "bottom-end"
    })

    static Type = Object.freeze({
        PRIMARY: "primary",
        SUCCESS: "success",
        INFO: "info",
        WARNING: "warning",
        DANGER: "danger"
    })

    validateToastrConfiguration(position, title, content, duration, type, hideOnClick, preventArisingOfDuplicate, showWithIcon) {
        cy.contains('nb-card', 'Toaster configuration').then($form => {
            // Select Position
            cy.wrap($form).contains('.form-group','Position:').then($selector => {
                cy.wrap($selector).find('button.select-button').click()
                cy.get('.options-list').contains('nb-option', position).click()
                cy.get('nb-select').should('contain', position);
            })
            // Insert Title
            cy.wrap($form).contains('.form-group','Title:').find('input').clear().type(title)
            // Insert Content
            cy.wrap($form).contains('.form-group','Content:').find('input').clear().type(content)
            //Insert Timeout
            cy.wrap($form).contains('.form-group','Time to hide toast').find('input').clear().type(duration)
            // Select Type
            cy.wrap($form).contains('.form-group','Toast type:').then($selector => {
                cy.wrap($selector).find('button.select-button').click()
                cy.get('.options-list').contains('nb-option', type).click()
                cy.get('nb-select').should('contain', type);
            })
            // Hide On Click
            cy.wrap($form).contains('nb-checkbox', 'Hide on click').find('span.custom-checkbox').then($checkbox => {
                const isChecked = $checkbox.attr('class').includes('checked')
                if (hideOnClick != isChecked) {
                    cy.wrap($checkbox).click()
                }
            })
            // Prevent Arising
            cy.wrap($form).contains('nb-checkbox','Prevent arising of duplicate toast').find('span.custom-checkbox').then($checkbox => {
                const isChecked = $checkbox.attr('class').includes('checked')
                if (preventArisingOfDuplicate != isChecked) {
                    cy.wrap($checkbox).click()
                }
            })
            // Show Icon
            cy.wrap($form).contains('nb-checkbox','Show toast with icon').find('span.custom-checkbox').then($checkbox => {
                const isChecked = $checkbox.attr('class').includes('checked')
                if (showWithIcon != isChecked) {
                    cy.wrap($checkbox).click()
                }
            })

            // Click Show Toast
            cy.wrap($form).contains('button', 'Show toast').click()
        })

        // Verify Configuration
        cy.get('.cdk-global-overlay-wrapper').then($container => {
            cy.wrap($container).find('nb-toast').should('be.visible').then($toast => {

                // Validate Position
                switch (position) {
                    case ToastrPage.Position.TOP_RIGHT:
                    case ToastrPage.Position.TOP_END:
                        cy.wrap($container).should('have.css', 'justify-content', 'flex-end').should('have.css', 'align-items', 'flex-start')
                        break
                    case ToastrPage.Position.TOP_LEFT:
                    case ToastrPage.Position.TOP_START:
                        cy.wrap($container).should('have.css', 'justify-content', 'flex-start').should('have.css', 'align-items', 'flex-start')
                        break
                    case ToastrPage.Position.BOTTOM_RIGHT:
                    case ToastrPage.Position.BOTTOM_END:
                        cy.wrap($container).should('have.css', 'justify-content', 'flex-end').should('have.css', 'align-items', 'flex-end')
                        break
                    case ToastrPage.Position.BOTTOM_LEFT:
                    case ToastrPage.Position.BOTTOM_START:
                        cy.wrap($container).should('have.css', 'justify-content', 'flex-start').should('have.css', 'align-items', 'flex-end')
                }

                // Validate Title
                cy.wrap($toast).find('.title').should('contain.text', title)

                // validate Content
                cy.wrap($toast).find('.message').should('contain.text', content)

                // Validate Type
                cy.wrap($toast).should('have.class', `status-${type}`)

                // Validate Show Icon
                if (showWithIcon) {
                    cy.wrap($toast).should('have.class', `has-icon`)
                } else {
                    cy.wrap($toast).should('not.have.class', `has-icon`)
                }

                // Validate Arising of Duplicate
                //cy.contains('nb-card', 'Toaster configuration').contains('button', 'Show toast').click()
                //if (preventArisingOfDuplicate) {
                //    cy.wrap($container).find('nb-toast').its('length').should('be', 1)
                //} else {
                //    cy.wrap($container).find('nb-toast').its('length').should('be.at.least', 2)
                //}

                // validate Hide on Click
                if (hideOnClick) {
                    cy.wrap($toast).click()
                } else {
                    // Validate Duration
                    cy.wait(duration)
                }

                cy.wrap($container).find('nb-toast').should('not.exist')

                // Refresh the Page to clear the cache
                cy.reload()
            })
        })
    }
}

export const onToastrPage = new ToastrPage()
export class TooltipPage {
    static tooltipText = 'This is a tooltip'
    
    validateTooltipWithIcon() {
        cy.contains('nb-card', 'Tooltip With Icon').then($card => {
            cy.wrap($card).contains('button', 'Show Tooltip').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-tooltip').should('be.visible').should('contain.text', TooltipPage.tooltipText)
            cy.get('nb-tooltip').find('nb-icon[ng-reflect-icon="home-outline"]').should('be.visible')
            cy.wrap($card).contains('button', 'Show Tooltip').trigger('mouseleave')
            cy.get('nb-tooltip').should('not.exist')

            cy.wrap($card).contains('button[nbtooltipicon="alert-triangle"]', 'Show Tooltip').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-tooltip').find('nb-icon[ng-reflect-icon="alert-triangle"]').should('be.visible')
            cy.wrap($card).contains('button[nbtooltipicon="alert-triangle"]', 'Show Tooltip').trigger('mouseleave')
            cy.get('nb-tooltip').should('not.exist')
        })
    }
    
    validateTooltipPlacements() {
        cy.contains('nb-card', 'Tooltip Placements').then($card => {
            cy.wrap($card).contains('button', 'Top').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-tooltip').should('be.visible').should('contain.text', TooltipPage.tooltipText)
            cy.wrap($card).contains('button', 'Top').trigger('mouseleave')
            cy.get('nb-tooltip').should('not.exist')

            cy.wrap($card).contains('button', 'Right').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-tooltip').should('be.visible').should('contain.text', TooltipPage.tooltipText)
            cy.wrap($card).contains('button', 'Right').trigger('mouseleave')
            cy.get('nb-tooltip').should('not.exist')

            cy.wrap($card).contains('button', 'Bottom').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-tooltip').should('be.visible').should('contain.text', TooltipPage.tooltipText)
            cy.wrap($card).contains('button', 'Bottom').trigger('mouseleave')
            cy.get('nb-tooltip').should('not.exist')

            cy.wrap($card).contains('button', 'Left').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-tooltip').should('be.visible').should('contain.text', TooltipPage.tooltipText)
            cy.wrap($card).contains('button', 'Left').trigger('mouseleave')
            cy.get('nb-tooltip').should('not.exist')
        })
    }

    validateColoredTooltips() {
        cy.contains('nb-card', 'Colored Tooltips').then($card => {
            cy.wrap($card).contains('button', 'Default').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-tooltip').should('be.visible').should('contain.text', TooltipPage.tooltipText)
            cy.wrap($card).contains('button', 'Default').trigger('mouseleave')
            cy.get('nb-tooltip').should('not.exist')

            cy.wrap($card).contains('button', 'Primary').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-tooltip').should('be.visible').should('contain.text', TooltipPage.tooltipText).should('have.class', 'status-primary')
            cy.wrap($card).contains('button', 'Primary').trigger('mouseleave')
            cy.get('nb-tooltip').should('not.exist')

            cy.wrap($card).contains('button', 'Success').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-tooltip').should('be.visible').should('contain.text', TooltipPage.tooltipText).should('have.class', 'status-success')
            cy.wrap($card).contains('button', 'Success').trigger('mouseleave')
            cy.get('nb-tooltip').should('not.exist')

            cy.wrap($card).contains('button', 'Danger').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-tooltip').should('be.visible').should('contain.text', TooltipPage.tooltipText).should('have.class', 'status-danger')
            cy.wrap($card).contains('button', 'Danger').trigger('mouseleave')
            cy.get('nb-tooltip').should('not.exist')

            cy.wrap($card).contains('button', 'Info').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-tooltip').should('be.visible').should('contain.text', TooltipPage.tooltipText).should('have.class', 'status-info')
            cy.wrap($card).contains('button', 'Info').trigger('mouseleave')
            cy.get('nb-tooltip').should('not.exist')

            cy.wrap($card).contains('button', 'Warning').trigger('mouseenter').trigger('mouseover')
            cy.get('nb-tooltip').should('be.visible').should('contain.text', TooltipPage.tooltipText).should('have.class', 'status-warning')
            cy.wrap($card).contains('button', 'Warning').trigger('mouseleave')
            cy.get('nb-tooltip').should('not.exist')
        })
    }
}

export const onTooltipPage = new TooltipPage()
/// <reference types="cypress" />

export class TreeGridPage {
    expandComponentAndValidate(component) {
        cy.get('table tbody').contains('tr', component.NAME).then($row => {
            // Validate current Row Group
            cy.wrap($row).find('td').then($rowComponents => {
                cy.wrap($rowComponents).eq(0).should('contain.text', component.NAME)
                cy.wrap($rowComponents).eq(1).should('contain.text', component.SIZE)
                cy.wrap($rowComponents).eq(2).should('contain.text', component.KIND)
                cy.wrap($rowComponents).eq(3).should('contain.text', component.ITEMS)
            })
             // Expand Row Group
             cy.wrap($row).find('nb-icon g g').invoke('attr', 'data-name').then (attr => {
                if (attr.includes('right')){
                    cy.wrap($row).find('nb-icon').click()
                }
             })
        })

        cy.get('table tbody tr').each(($row, index) => {
            cy.wrap($row).find('td').eq(0).invoke('text').then($rowName => {
                if($rowName.trim() == component.NAME) {
                    // Validate each element below current element
                    cy.get('table tbody tr').then($rows => {
                        component.CONTENT.forEach($contentElement => {
                            cy.wrap($rows).eq(index + 1).find('td').then($rowComponents => {
                                cy.wrap($rowComponents).eq(0).should('contain.text', $contentElement.NAME)
                                cy.wrap($rowComponents).eq(1).should('contain.text', $contentElement.SIZE)
                                cy.wrap($rowComponents).eq(2).should('contain.text', $contentElement.KIND)
                                cy.wrap($rowComponents).eq(3).should('contain.text', $contentElement.ITEMS)
                            })
                            index++
                        })
                    })
                }
            })
        })
    }

    validateSearch(criteria, nodesList) {
        cy.get('.search-input').clear().type(criteria).wait(500)
        let matches = this.#filterByCriteria(criteria, nodesList)

        if (matches.length != 0){
            cy.get('table tbody tr').each(($row, index) => {
                cy.wrap($row).find('td').then($rowComponents => {
                    cy.wrap($rowComponents).eq(0).should('contain.text', matches[index].NAME)
                    cy.wrap($rowComponents).eq(1).should('contain.text', matches[index].SIZE)
                    cy.wrap($rowComponents).eq(2).should('contain.text', matches[index].KIND)
                    cy.wrap($rowComponents).eq(3).should('contain.text', matches[index].ITEMS)
                })
            })
        }
    }

    #filterByCriteria(criteria, matchList) {
        let response = []
        matchList.forEach($component => {
            if ($component.NAME.toLowerCase().includes(criteria.toLowerCase())
            || $component.SIZE.toLowerCase().includes(criteria.toLowerCase())
            || $component.KIND.toLowerCase().includes(criteria.toLowerCase())
            || `${$component.ITEMS}`.toLowerCase().includes(criteria.toLowerCase())) {
                    response.push($component)
            }
            $component.CONTENT.forEach($node => {
                if ($node.NAME.toLowerCase().includes(criteria.toLowerCase())
                    || $node.SIZE.toLowerCase().includes(criteria.toLowerCase())
                    || $node.KIND.toLowerCase().includes(criteria.toLowerCase())
                    || `${$node.ITEMS}`.toLowerCase().includes(criteria.toLowerCase())) {
                            response.push($component)
                            response.push($node)
                    }
            })
        })
        // Cleaning list from duplicated items
        return Array.from(
            new Set(response.map((obj) => JSON.stringify(obj)))
          ).map((str) => JSON.parse(str))
    }
}

export const onTreeGridPage = new TreeGridPage()
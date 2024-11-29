export class SmartTable {
    static ID = "ID"
    static FIRSTNAME = "First Name"
    static LASTNAME = "Last Name"
    static USERNAME = "Username"
    static EMAIL = "E-mail"
    static AGE = "Age"

    addNewRecord(id, firstName, lastName, userName, email, age) {
        cy.get('th[ng2-st-add-button]').click()
        cy.get('tr[ng-reflect-create-confirm]').then(($insertRow) => {
            if (id !== "") {
                cy.wrap($insertRow).find('[placeholder="' + SmartTable.ID + '"]').type(id)
            }
            if (firstName !== "") {
                cy.wrap($insertRow).find('[placeholder="' + SmartTable.FIRSTNAME + '"]').type(firstName)
            }
            if (lastName !== "") {
                cy.wrap($insertRow).find('[placeholder="' + SmartTable.LASTNAME + '"]').type(lastName)
            }
            if (userName !== "") {
                cy.wrap($insertRow).find('[placeholder="' + SmartTable.USERNAME + '"]').type(userName)
            }
            if (email !== "") {
                cy.wrap($insertRow).find('[placeholder="' + SmartTable.EMAIL + '"]').type(email)
            }
            if (age !== "") {
                cy.wrap($insertRow).find('[placeholder="' + SmartTable.AGE + '"]').type(age)
            }
            cy.wrap($insertRow).find('.ng2-smart-action-add-create').click()
        })

        cy.get('tbody tr').first().find('td').then($tableColumns => {
            if (id !== "") {
                cy.wrap($tableColumns).eq(1).should('contain.text', id)
            }
            if (firstName !== "") {
                cy.wrap($tableColumns).eq(2).should('contain.text', firstName)
            }
            if (lastName !== "") {
                cy.wrap($tableColumns).eq(3).should('contain.text', lastName)
            }
            if (userName !== "") {
                cy.wrap($tableColumns).eq(4).should('contain.text', userName)
            }
            if (email !== "") {
                cy.wrap($tableColumns).eq(5).should('contain.text', email)
            }
            if (age !== "") {
                cy.wrap($tableColumns).eq(6).should('contain.text', age)
            }
        })
    }

    getRecordByField(fieldID, value, expectedId, expectedFirstName, expectedLastName, expectedUserName, expectedEmail, expectedAge) {
        cy.get('tr.ng2-smart-filters').then(() => {
            cy.get('[placeholder="' + fieldID + '"]').clear().type(value)
            cy.wait(500)
            cy.get('tbody tr').first().find('td').then($tableColumns => {
                cy.wrap($tableColumns).eq(1).should('contain.text', expectedId)
                cy.wrap($tableColumns).eq(2).should('contain.text', expectedFirstName)
                cy.wrap($tableColumns).eq(3).should('contain.text', expectedLastName)
                cy.wrap($tableColumns).eq(4).should('contain.text', expectedUserName)
                cy.wrap($tableColumns).eq(5).should('contain.text', expectedEmail)
                cy.wrap($tableColumns).eq(6).should('contain.text', expectedAge)
            })
        })
    }

    updateRecord(fieldID, value, newId, newFirstName, newLastName, newUserName, newEmail, newAge) {
        cy.get('tr.ng2-smart-filters').then(() => {
            cy.get('[placeholder="' + fieldID + '"]').clear().type(value)
            cy.wait(500)

            cy.get('tbody tr').first().find('td').then($tableColumns => {
                cy.wrap($tableColumns).find('.nb-edit').click().then(() => {

                })
            })

            cy.get('tr.ng2-smart-row').then(($editRow) => {
                if (newId !== "") {
                    cy.wrap($editRow).find('[placeholder="' + SmartTable.ID + '"]').clear().type(newId)
                }
                if (newFirstName !== "") {
                    cy.wrap($editRow).find('[placeholder="' + SmartTable.FIRSTNAME + '"]').clear().type(newFirstName)
                }
                if (newLastName !== "") {
                    cy.wrap($editRow).find('[placeholder="' + SmartTable.LASTNAME + '"]').clear().type(newLastName)
                }
                if (newUserName !== "") {
                    cy.wrap($editRow).find('[placeholder="' + SmartTable.USERNAME + '"]').clear().type(newUserName)
                }
                if (newEmail !== "") {
                    cy.wrap($editRow).find('[placeholder="' + SmartTable.EMAIL + '"]').clear().type(newEmail)
                }
                if (newAge !== "") {
                    cy.wrap($editRow).find('[placeholder="' + SmartTable.AGE + '"]').clear().type(newAge)
                }
                cy.wrap($editRow).find('.ng2-smart-action-edit-save').click()
            })
    
            cy.get('tbody tr').first().find('td').then($tableColumns => {
                if (newId !== "") {
                    cy.wrap($tableColumns).eq(1).should('contain.text', newId)
                }
                if (newFirstName !== "") {
                    cy.wrap($tableColumns).eq(2).should('contain.text', newFirstName)
                }
                if (newLastName !== "") {
                    cy.wrap($tableColumns).eq(3).should('contain.text', newLastName)
                }
                if (newUserName !== "") {
                    cy.wrap($tableColumns).eq(4).should('contain.text', newUserName)
                }
                if (newEmail !== "") {
                    cy.wrap($tableColumns).eq(5).should('contain.text', newEmail)
                }
                if (newAge !== "") {
                    cy.wrap($tableColumns).eq(6).should('contain.text', newAge)
                }
            })

            cy.get('tbody tr').first().find('td').then($tableColumns => {
                cy.wrap($tableColumns).eq(1).should('contain.text', newId)
                cy.wrap($tableColumns).eq(2).should('contain.text', newFirstName)
                cy.wrap($tableColumns).eq(3).should('contain.text', newLastName)
                cy.wrap($tableColumns).eq(4).should('contain.text', newUserName)
                cy.wrap($tableColumns).eq(5).should('contain.text', newEmail)
                cy.wrap($tableColumns).eq(6).should('contain.text', newAge)
            })
        })
    }

    deleteRecord(fieldID, value) {
        cy.get('tr.ng2-smart-filters').then(() => {
            cy.get('[placeholder="' + fieldID + '"]').clear().type(value)
            cy.wait(500)

            cy.get('tbody tr').first().find('td').then($tableColumns => {
                cy.wrap($tableColumns).find('.nb-trash').click()
            })
        })
        cy.get('tbody tr').each(tableRow => {
            cy.wrap(tableRow).should('contain', 'No data found')
        })
    }
}

export const onSmartTablePage = new SmartTable()
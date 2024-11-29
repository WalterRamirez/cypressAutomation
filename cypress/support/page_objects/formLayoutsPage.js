export class FormLayoutsPage {

    submitInlineFormData(fullName, email, rememberMe) {
        cy.contains('nb-card', 'Inline form').find('form').then($form => {
            cy.wrap($form).find('[placeholder="Jane Doe"]').type(fullName)
            cy.wrap($form).find('[placeholder="Email"]').type(email)
            if (rememberMe){
                cy.wrap($form).find('[type="checkbox"]').check({force: true})
            } else {
                cy.wrap($form).find('[type="checkbox"]').uncheck({force: true})
            }

            cy.wrap($form).submit()
        })
    }

    submitUsingTheGrid(email, password, selectedRadio) {
        cy.contains('nb-card', 'Using the Grid').find('form').then($form => {
            cy.wrap($form).find('#inputEmail1').type(email)
            cy.wrap($form).find('#inputPassword2').type(password)
            // Using :not([disabled]) in order to filter only disabled radio buttons
            cy.wrap($form).find('nb-radio:not([disabled])').each(($radioButton, index) => {
                cy.wrap($radioButton).find('input[type="radio"]').then($radioInput => {
                    if ($radioButton.text().trim() === selectedRadio) {
                        cy.wrap($radioInput).click({force: true})
                    }
                })
            })
            cy.wrap($form).submit()
        })
    }

    submitBasicForm(email, password, checkBox) {
        cy.contains('nb-card', 'Basic form').find('form').then($form => {
            cy.wrap($form).find('#exampleInputEmail1').type(email)
            cy.wrap($form).find('#exampleInputPassword1').type(password)
            if (checkBox){
                cy.wrap($form).find('[type="checkbox"]').check({force: true})
            } else {
                cy.wrap($form).find('[type="checkbox"]').uncheck({force: true})
            }
            cy.wrap($form).submit()
        })
    }

    submitFormWithoutLabels(recipients, subject, message) {
        cy.contains('nb-card', 'Form without labels').find('form').then($form => {
            cy.wrap($form).find('[placeholder="Recipients"]').type(recipients)
            cy.wrap($form).find('[placeholder="Subject"]').type(subject)
            cy.wrap($form).find('[placeholder="Message"]').type(message)
            
            cy.wrap($form).submit()
        })
    }

    submitBlockForm(fName, lName, email, website) {
        cy.contains('nb-card', 'Block form').find('nb-card-body').then($cardBody => {
            cy.wrap($cardBody).find('#inputFirstName').type(fName)
            cy.wrap($cardBody).find('#inputLastName').type(lName)
            cy.wrap($cardBody).find('#inputEmail').type(email)
            cy.wrap($cardBody).find('#inputWebsite').type(website)
            
            cy.wrap($cardBody).find('[type="submit"]').click()
        })
    }

    submitHorizontalForm(email, password, rememberMe) {
        cy.contains('nb-card', 'Horizontal form').find('form').then($form => {
            cy.wrap($form).find('#inputEmail3').type(email)
            cy.wrap($form).find('#inputPassword3').type(password)
            if (rememberMe){
                cy.wrap($form).find('[type="checkbox"]').check({force: true})
            } else {
                cy.wrap($form).find('[type="checkbox"]').uncheck({force: true})
            }
            cy.wrap($form).submit()
        })
    }

}

export const onFormLayoutsPage = new FormLayoutsPage()
/// <reference types="cypress" />

describe('First Test Suite', () => {
    it('First Test', () => {
        cy.visit('/')
        cy.contains('Form').click()
        cy.contains('Form Layouts').click()

        // By Tag Name
        cy.get('input')

        // By ID
        cy.get('#inputEmail1')

        // By Class value
        cy.get('.input-full-width')

        // By Attribute Name
        cy.get('[fullwidth]')

        // By Attribute and Value
        cy.get('[placeholder="Email"]')

        // By Entire Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by two attributes
        cy.get('[placeholder="Email"][fullwidth]')

        // tag, attribute id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // by Cypress test ID
        cy.get('[data-cy="imputEmail1"]')
    })

    it('Second Test', () => {
        cy.visit('/')
        cy.contains('Form').click()
        cy.contains('Form Layouts').click()

        // get() - find elements on  th epage by locator globally
        // contains() - find clid elements by locator
        // find() - find HTML text and by text and locator
        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button', 'Sign in')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')

        // Chaining
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    })

    it('save subject of the command', () => {
        cy.visit('/')
        cy.contains('Form').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        // CANT DO THINGS LIKE THIS
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password')

        // Using ALIAS
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        // USING Cypress Then
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    it('Extract text values', () => {
        cy.visit('/')
        cy.contains('Form').click()
        cy.contains('Form Layouts').click()

        // 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // 2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(label).should('contain', 'Email address')
        })

        // 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })
        cy.get('[for="exampleInputEmail1"]').invoke('text').should('contain', 'Email address')
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address')

        // 4
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })

        // 5
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com').then(property => {
            expect(property).to.equal('test@test.com')
        })
    })

    it('Radio Buttons', () => {
        cy.visit('/')
        cy.contains('Form').click()
        cy.contains('Form Layouts').click()


        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).eq(0).check({ force: true }).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({ force: true })
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
    })

    it('CheckBoxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({ force: true })
        cy.get('[type="checkbox"]').uncheck({ force: true })

        cy.get('[type="checkbox"]').eq(0).click({ force: true })
        cy.get('[type="checkbox"]').eq(1).check({ force: true })

    })

    it('Datepickers', () => {

        function selectDayFromCurrent(days) {
            let date = new Date()
            date.setDate(date.getDate() + days)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleDateString('en-US', { month: 'short' })
            let futureYear = date.getFullYear()
            let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(days)
                } else {
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                }
            })
            return dateToAssert
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            const dateToAssert = selectDayFromCurrent(1500)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
            cy.wrap(input).should('have.value', dateToAssert)
        })
    })

    it('Dropdowns', () => {
        cy.visit('/')

        // 1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')

        // 2
        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click()

            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()

                cy.wrap(dropDown).should('contain', itemText)

                if (index < 3) {
                    cy.wrap(dropDown).click()
                }
            })
        })
    })

    it('Tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1 Get row by Text
        cy.get('tbody').contains('tr', 'Larry').then(row => {
            cy.wrap(row).find('.nb-edit').click()
            cy.wrap(row).find('[placeholder="Age"]').clear().type('35')
            cy.wrap(row).find('.nb-checkmark').click()

            cy.wrap(row).find('td').eq(6).should('contain.text', '35')
        })

        // 2 Get row By index
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(row => {
            cy.wrap(row).find('[placeholder="First Name"]').type('John')
            cy.wrap(row).find('[placeholder="Last Name"]').type('Doe')

            cy.wrap(row).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain.text', 'John')
            cy.wrap(tableColumns).eq(3).should('contain.text', 'Doe')
        })

        // 3 Using table filtering
        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)

            cy.get('tbody tr').each(tableRow => {
                if (age == 200) {
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain.text', age)
                }
            })
        })


    })

    it('Tooltips', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain.text', 'This is a tooltip')
    })

    it('Dialog Boxes', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        // 2
        // const stub = cy.stub()
        // cy.on('window:confirm', stub)
        // cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
        //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        // })

        // 3
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)
    })
})
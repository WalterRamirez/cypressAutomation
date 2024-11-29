export class DatePickerPage {

    selectCommonDatepickerDateFromToday(dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then($input => {
            cy.wrap($input).click()
            const dateToAssert = this.#selectDesiredDate('nb-calendar', this.#getDateFromCurrent(dayFromToday))
            cy.wrap($input).invoke('prop', 'value').should('contain', dateToAssert)
            cy.wrap($input).should('have.value', dateToAssert)
        })
    }

    selectCommonDatepickerSpecificDate(day, month, year) {
        cy.contains('nb-card', 'Common Datepicker').find('input').should('be.visible').then($input => {
            cy.wrap($input).click()
            const dateToAssert = this.#selectDesiredDate('nb-calendar', new Date(year, month - 1, day))
            cy.wrap($input).invoke('prop', 'value').should('contain', dateToAssert)
            cy.wrap($input).should('have.value', dateToAssert)
        })
    }

    selectDatepickerWithRangeFromToday(startDaysFromToday, endDaysFromToday) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then($input => {
            cy.wrap($input).click()
            if (endDaysFromToday < startDaysFromToday) {
                let pivot = endDaysFromToday
                endDaysFromToday = startDaysFromToday
                startDaysFromToday = pivot
            }
            const startDateToAssert = this.#selectDesiredDate('nb-calendar-range', this.#getDateFromCurrent(startDaysFromToday))
            const endDateToAssert = this.#selectDesiredDate('nb-calendar-range', this.#getDateFromCurrent(endDaysFromToday))
            cy.wrap($input).invoke('prop', 'value').should('contain', `${startDateToAssert} - ${endDateToAssert}`)
            cy.wrap($input).should('have.value', `${startDateToAssert} - ${endDateToAssert}`)
        })
    }

    selectDatepickerSpecificDates(startDay, startMonth, startYear, endDay, endMonth, endYear) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then($input => {
            cy.wrap($input).click()
            let startDate = new Date(startYear, startMonth - 1, startDay)
            let endDate = new Date(endYear, endMonth - 1, endDay)
            if (endDate < startDate) {
                let pivot = endDate
                endDate = startDate
                startDate = pivot
            }
            const startDateToAssert = this.#selectDesiredDate('nb-calendar-range', startDate)
            const endDateToAssert = this.#selectDesiredDate('nb-calendar-range', endDate)
            cy.wrap($input).invoke('prop', 'value').should('contain', `${startDateToAssert} - ${endDateToAssert}`)
            cy.wrap($input).should('have.value', `${startDateToAssert} - ${endDateToAssert}`)
        })
    }

    selectDatepickerDateFromTodayWithLimits(dayFromToday) {
        cy.contains('nb-card', 'Datepicker With Disabled Min Max Values').find('input').then($input => {
            cy.wrap($input).click()
            const dateToAssert = this.#selectDesiredDate('nb-calendar', this.#getDateFromCurrent(dayFromToday))
            cy.wrap($input).invoke('prop', 'value').should('contain', dateToAssert)
            cy.wrap($input).should('have.value', dateToAssert)
        })
    }

    selectCommonDatepickerSpecificDateWithLimits(day, month, year) {
        cy.contains('nb-card', 'Datepicker With Disabled Min Max Values').find('input').should('be.visible').then($input => {
            cy.wrap($input).click()
            const dateToAssert = this.#selectDesiredDate('nb-calendar', new Date(year, month - 1, day))
            cy.wrap($input).invoke('prop', 'value').should('contain', dateToAssert)
            cy.wrap($input).should('have.value', dateToAssert)
        })
    }

    /**
     * Allows to select an specific day counting from today
     * 
     * @param {Int} days 
     * @returns 
     */
    #getDateFromCurrent(days) {
        let desiredDate = new Date()
        desiredDate.setDate(desiredDate.getDate() + days)
        return desiredDate
    }

    /**
     * Used to select the desired Date in the calendar
     * 
     * @param {Date} desiredDate 
     * @returns 
     */
    #selectDesiredDate(calendarType, desiredDate) {
        if (isNaN(desiredDate)) {
            assert.fail('Error in Expected Date')
        }

        let desiredDay = desiredDate.getDate()
        let desiredMonth = desiredDate.toLocaleDateString('en-US', { month: 'short' })
        let desiredYear = desiredDate.getFullYear()
        let expectedDate = `${desiredMonth} ${desiredDay}, ${desiredYear}`

        this.#selectYearFromDatePicker(calendarType, desiredDate.getFullYear())
        this.#selectMonthFromDatePicker(desiredDate.toLocaleDateString('en-US', { month: 'short' }))
        this.#selectDayFromDatePicker(desiredDate.getDate())

        return expectedDate
    }

    /**
     * Used to Select the desired Year
     * 
     * @param {String} desiredYear
     */
    #selectYearFromDatePicker(calendarType, desiredYear) {
        cy.get(calendarType).then(($calendar) => {
            cy.wrap($calendar).find('nb-calendar-navigation button').click().then(() => {
                this.#findByYear($calendar, desiredYear)
                cy.get('.year-cell').contains(`${desiredYear}`).click()
            })
        })
    }

    /**
     * Used to navigate around Years in order to get Calendar card with desired Year
     * @param {Calendar} calendar 
     * @param {String} desiredYear 
     */
    #findByYear(calendar, desiredYear) {
        cy.get('.year-cell').then($limits => {
            cy.wrap($limits[0]).invoke('text').then(($text) => {
                if ($text > desiredYear) {
                    cy.wrap(calendar).find('[data-name="chevron-left"]').click()
                    this.#findByYear(calendar, desiredYear)
                    return
                }
            })
            cy.wrap($limits[$limits.length - 1]).invoke('text').then(($text) => {
                if ($text < desiredYear) {
                    cy.wrap(calendar).find('[data-name="chevron-right"]').click()
                    this.#findByYear(calendar, desiredYear)
                    return
                }
            })
        })
    }

    /**
     * Used to Select the desired Month
     * @param {String} desiredMonth 
     */
    #selectMonthFromDatePicker(desiredMonth) {
        cy.get('.month-cell').contains(desiredMonth).click()
    }

    /**
     * Used to Select the desired Day
     * @param {Int} desiredDay 
     */
    #selectDayFromDatePicker(desiredDay) {
        cy.get('.day-cell').not('.bounding-month').contains(desiredDay).click()
    }
}

export const onDatePickerPage = new DatePickerPage();
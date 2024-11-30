export class CalendarPage {

    selectCommonDatepickerDateFromToday(dayFromToday) {
        const dateToAssert = this.#selectDesiredDate('nb-calendar[ng-reflect-bounding-month="true"]', this.#getDateFromCurrent(dayFromToday))
        cy.get('ngx-calendar').contains('.subtitle', 'Selected date: ').should('contain', dateToAssert)
    }

    selectCommonDatepickerSpecificDate(day, month, year) {
        const dateToAssert = this.#selectDesiredDate('nb-calendar[ng-reflect-bounding-month="true"]', new Date(year, month - 1, day))
        cy.get('ngx-calendar').contains('.subtitle', 'Selected date: ').should('contain', dateToAssert)
    }

    selectDatepickerWithRangeFromToday(startDaysFromToday, endDaysFromToday) {
        if (endDaysFromToday < startDaysFromToday) {
            let pivot = endDaysFromToday
            endDaysFromToday = startDaysFromToday
            startDaysFromToday = pivot
        }
        const startDateToAssert = this.#selectDesiredDate('nb-calendar-range', this.#getDateFromCurrent(startDaysFromToday))
        const endDateToAssert = this.#selectDesiredDate('nb-calendar-range', this.#getDateFromCurrent(endDaysFromToday))
        cy.get('ngx-calendar').contains('.subtitle', 'Selected range: ').should('contain', `${startDateToAssert} - ${endDateToAssert}`)
    }

    selectDatepickerSpecificDates(startDay, startMonth, startYear, endDay, endMonth, endYear) {
        let startDate = new Date(startYear, startMonth - 1, startDay)
        let endDate = new Date(endYear, endMonth - 1, endDay)
        if (endDate < startDate) {
            let pivot = endDate
            endDate = startDate
            startDate = pivot
        }
        const startDateToAssert = this.#selectDesiredDate('nb-calendar-range', startDate)
        const endDateToAssert = this.#selectDesiredDate('nb-calendar-range', endDate)
        cy.get('ngx-calendar').contains('.subtitle', 'Selected range: ').should('contain', `${startDateToAssert} - ${endDateToAssert}`)
    }

    selectDatepickerDateFromTodayWithLimits(dayFromToday, ) {
        const dateToAssert = this.#selectDesiredDate('nb-calendar[ng-reflect-day-cell-component="class DayCellComponent extends"]', this.#getDateFromCurrent(dayFromToday))
        cy.get('ngx-calendar span.subtitle').eq(2).should('contain', dateToAssert)
    }

    selectCommonDatepickerSpecificDateWithLimits(day, month, year) {
        const dateToAssert = this.#selectDesiredDate('nb-calendar[ng-reflect-day-cell-component="class DayCellComponent extends"]', new Date(year, month - 1, day))
        cy.get('ngx-calendar span.subtitle').eq(2).should('contain', dateToAssert)
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
        this.#selectMonthFromDatePicker(calendarType, desiredDate.toLocaleDateString('en-US', { month: 'short' }))
        this.#selectDayFromDatePicker(calendarType, desiredDate.getDate())

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
    #selectMonthFromDatePicker(calendarType, desiredMonth) {
        cy.get(calendarType).then(($calendar) => {
            cy.wrap($calendar).find('.month-cell').contains(desiredMonth).click()
        })
    }

    /**
     * Used to Select the desired Day
     * @param {Int} desiredDay 
     */
    #selectDayFromDatePicker(calendarType, desiredDay) {
        cy.get(calendarType).then(($calendar) => {
            cy.wrap($calendar).find('.day-cell').not('.bounding-month').each($date => {
                cy.wrap($date).invoke('text').then($text => {
                    if ($text.trim().startsWith(desiredDay)) {
                        cy.wrap($date).click()
                    }
                })
            })
        })
    }
}

export const onCalendarPage = new CalendarPage();
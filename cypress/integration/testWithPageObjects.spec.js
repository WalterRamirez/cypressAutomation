import { onDatePickerPage } from "../support/page_objects/formsDatePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage, SmartTable } from "../support/page_objects/tables&DataSmartTable"
import { onStepperPage } from "../support/page_objects/layoutStepperPage"
import { onAccordionPage } from "../support/page_objects/layoutAccordionPage"
import { onDialogPage } from "../support/page_objects/modal&OverlaysDialog"
import { onWindowPage } from "../support/page_objects/modal&OverlaysWindow"
import { onPopoverPage } from "../support/page_objects/modal&OverlaysPopover"
import { onTooltipPage } from "../support/page_objects/modal&OverlaysTooltip"
import { onCalendarPage } from "../support/page_objects/extraComponentsCalendar"
import { onToastrPage, ToastrPage } from "../support/page_objects/modal&OverlaysToastr"
import { onTreeGridPage } from "../support/page_objects/tables&DataTreeGrid"
import { onRegisterPage } from "../support/page_objects/authRegisterPage"

describe('Test with Page Objects', () => {
    // Local Test Constants
    const id = 100
    const firstName = 'Walter'
    const lastName = 'Ramirez'
    const fullName = `${firstName} ${lastName}`
    const userName = 'wRamirez'
    const email = 'wRamirez@fakecypressmail.com'
    const altMail = 'walter.ramirez.bol@outlook.com'
    const age = 38
    const password = 'Control123.'
    const favMovie = 'Batman Trilogy'
    const subject = 'Qa Automation Course'
    const message = 'This is a\nmultiline\ntext\nto be used\nas\nan\nEXAMPLE.'
    const projects = Object.freeze({
        NAME: "Projects",
        SIZE: "1.8 MB",
        KIND: "dir",
        ITEMS: 5,
        CONTENT: [
            {NAME: "project-1.doc",  SIZE: "240 KB", KIND: "doc",  ITEMS: "-"},
            {NAME: "project-2.doc",  SIZE: "290 KB", KIND: "doc",  ITEMS: "-"},
            {NAME: "project-3",      SIZE: "466 KB", KIND: "txt",  ITEMS: "-"},
            {NAME: "project-4.docx", SIZE: "900 KB", KIND: "docx", ITEMS: "-"}
        ]
    })
    const reports = Object.freeze({
        NAME: "Reports",
        SIZE: "400 KB",
        KIND: "dir",
        ITEMS: 2,
        CONTENT: [
            {NAME: "Report 1", SIZE: "100 KB", KIND: "doc", ITEMS: "-"},
            {NAME: "Report 2", SIZE: "300 KB", KIND: "doc", ITEMS: "-"}
        ]
    })
    const other = Object.freeze({
        NAME: "Other",
        SIZE: "109 MB",
        KIND: "dir",
        ITEMS: 2,
        CONTENT: [
            {NAME: "backup.bkp",      SIZE: "107 MB", KIND: "bkp", ITEMS: "-"},
            {NAME: "secret-note.txt", SIZE: "2 MB",   KIND: "txt", ITEMS: "-"}
        ]
    })

    beforeEach('Open Application', () => {
        cy.openHomePage()
    })

    it('Verify navigations across the pages', {browser: ['!firefox', '!edge']}, () => {
        navigateTo.layoutStepperPage()
        navigateTo.layoutAccordionPage()
        navigateTo.formLayoutsPage()
        navigateTo.formDatepickerPage()
        navigateTo.modalOverlaysDialogPage()
        navigateTo.modalOverlaysWindowPage()
        navigateTo.modalOverlaysPopoverPage()
        navigateTo.modalOverlaysToastrPage()
        navigateTo.modalOverlaysTooltipPage()
        navigateTo.extraComponentsCalendarPage()
        navigateTo.tablesAndDataSmartTablePage()
        navigateTo.tablesAndDataTreeGridPage()
        navigateTo.authLoginPage()
        cy.go(-1)
        navigateTo.authRegisterPage()
        cy.go(-1)
        navigateTo.authRequestPasswordPage()
        cy.go(-1)
        navigateTo.authResetPasswordPage()
    })

    it('Should submit inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormData(fullName, email, true)
        onFormLayoutsPage.submitBasicForm(email, password, true)
        navigateTo.formDatepickerPage()
        onDatePickerPage.selectDatepickerSpecificDates(16,12,1986,25,11,2154)
        navigateTo.tablesAndDataSmartTablePage()
        onSmartTablePage.addNewRecord(id, firstName, lastName, userName, email, age)
        onSmartTablePage.getRecordByField(SmartTable.ID, 100, id, firstName, lastName, userName, email, age)
        onSmartTablePage.updateRecord(SmartTable.USERNAME, userName, '', '', '', '', '', 50)
        onSmartTablePage.deleteRecord(SmartTable.ID, id)
     })

    it('Validate Layout => Stepper', () => {
        navigateTo.layoutStepperPage()
        // Scenarios
        onStepperPage.walkHorizontalStepper(4)
        onStepperPage.walkHorizontalStepperWithParams(3, [fullName, favMovie, email])
        onStepperPage.walkVerticalStepper(4)
        onStepperPage.navigateHorizontalStepper([1, 2, 1, 3, 1, 2, 4])
        onStepperPage.navigateHorizontalStepperWithParams([{id: 1, value: fullName}, {id: 2, value: favMovie}, {id: 1, value:firstName}, {id: 2, value: favMovie}, {id: 3, value: email}])
        onStepperPage.navigateVerticalStepper([1, 2, 1, 3, 1, 2, 4])
    })

    it('Validate Layout => Accordion', () => {
        navigateTo.layoutAccordionPage()
        // Scenarios
        onAccordionPage.walkToggleWithExternalController()
        onAccordionPage.walkSingleToggle()
        onAccordionPage.navigateToggleWithExternalController([0, 3, 1, 2, 1, 3, 2, 1])
        onAccordionPage.navigateSingleToggle([1, 3, 1, 2, 1, 3, 2, 1])
    })
    
    it('Validate Forms => Form Layouts', () => {
        navigateTo.formLayoutsPage()
        // Scenarios
        onFormLayoutsPage.submitInlineFormData(fullName, email, true)
        onFormLayoutsPage.submitUsingTheGrid(email, password, 'Option 1')
        onFormLayoutsPage.submitUsingTheGrid(email, password, 'Disabled Option')
        onFormLayoutsPage.submitBasicForm(email, password, true)
        onFormLayoutsPage.submitFormWithoutLabels(`${email}; ${altMail}`, 'QA Automation / SDET', 'This \nis a Message\n with some\n new Lines\n Like This and \ This')
        onFormLayoutsPage.submitBlockForm(firstName,lastName,email,'www.LearningCypress.com')
        onFormLayoutsPage.submitHorizontalForm(email, password, true)
    })

    it('Validate Forms => Date Picker', () => {
        navigateTo.formDatepickerPage()
        // Scenarios
        onDatePickerPage.selectCommonDatepickerDateFromToday(10000)
        onDatePickerPage.selectCommonDatepickerSpecificDate(15,1,1900)
        onDatePickerPage.selectDatepickerWithRangeFromToday(-100, 100)
        onDatePickerPage.selectDatepickerSpecificDates(16,12,1986,25,11,2154)
        onDatePickerPage.selectDatepickerDateFromTodayWithLimits(-5)
        onDatePickerPage.selectCommonDatepickerSpecificDateWithLimits(27, 11, 2024)
    })

    it('Validate Modal & Overlays => Dialog', () => {
        navigateTo.modalOverlaysDialogPage()
        // Scenarios
        onDialogPage.validateSingleDialogs()
        onDialogPage.validateBackdropDialogs()
        onDialogPage.validateEscCloseDialogs()
        onDialogPage.validateNoBackdropDialogs()
        onDialogPage.validateDialogWithResult(fullName)
    })

    it('Validate Modal & Overlays => Window', () => {
        navigateTo.modalOverlaysWindowPage()
        // Scenarios
        onWindowPage.validateWindowForm(subject, message)
        onWindowPage.validateWindoFormWithTemplate()
        onWindowPage.validateWindowWithBackdrop()
        onWindowPage.validateWindowWithoutBackdrop()
    })

    it('Validate Modal & Overlays => Popover', () => {
        navigateTo.modalOverlaysPopoverPage()
        // Scenarios
        onPopoverPage.validatePopoverPosition()
        onPopoverPage.validateSimplePopovers()
        onPopoverPage.validateTemplatePopovers(email, subject, message)
        onPopoverPage.validateComponentPopovers(email, subject, message)
        onPopoverPage.validateEventDeboucing()
    })

    it('Validate Modal & Overlays => Toastr', () => {
        navigateTo.modalOverlaysToastrPage()
        // Scenarios
        // Bug on "Prevent arising of duplicate toast"
        onToastrPage.validateToastrConfiguration(ToastrPage.Position.TOP_RIGHT, favMovie, subject, 2000, ToastrPage.Type.PRIMARY, false, false, true)
        onToastrPage.validateToastrConfiguration(ToastrPage.Position.TOP_LEFT, favMovie, subject, 1000, ToastrPage.Type.SUCCESS, false, false, false)
        onToastrPage.validateToastrConfiguration(ToastrPage.Position.TOP_START, favMovie, subject, 0, ToastrPage.Type.INFO, true, false, true)
        onToastrPage.validateToastrConfiguration(ToastrPage.Position.TOP_END, favMovie, subject, 2000, ToastrPage.Type.WARNING, false, false, true)
        onToastrPage.validateToastrConfiguration(ToastrPage.Position.BOTTOM_RIGHT, favMovie, subject, 2000, ToastrPage.Type.DANGER, false, false, true)
        onToastrPage.validateToastrConfiguration(ToastrPage.Position.BOTTOM_LEFT, favMovie, subject, 2000, ToastrPage.Type.PRIMARY, false, false, true)
        onToastrPage.validateToastrConfiguration(ToastrPage.Position.BOTTOM_START, favMovie, subject, 2000, ToastrPage.Type.SUCCESS, false, false, true)
        onToastrPage.validateToastrConfiguration(ToastrPage.Position.BOTTOM_END, favMovie, subject, 2000, ToastrPage.Type.INFO, false, false, true)
    })

    it('Validate Modal & Overlays => Tooltip', () => {
        navigateTo.modalOverlaysTooltipPage()
        // Scenarios
        onTooltipPage.validateTooltipWithIcon()
        onTooltipPage.validateTooltipPlacements()
        onTooltipPage.validateColoredTooltips()
    })

    it('Validate Extra Components => Calendar', () => {
        navigateTo.extraComponentsCalendarPage()
        // Scenarios
        onCalendarPage.selectCommonDatepickerDateFromToday(10000)
        onCalendarPage.selectCommonDatepickerSpecificDate(15,1,1900)
        onCalendarPage.selectDatepickerWithRangeFromToday(-100, 100)
        onCalendarPage.selectDatepickerSpecificDates(16,12,1986,25,11,2154)
        onCalendarPage.selectDatepickerDateFromTodayWithLimits(-100)
        onCalendarPage.selectCommonDatepickerSpecificDateWithLimits(27, 11, 2024)
    })

    it('Validate Tables & Data => Smart Table', () => {
        navigateTo.tablesAndDataSmartTablePage()
        // Scenarios
        onSmartTablePage.addNewRecord(id, firstName, lastName, userName, email, age)
        onSmartTablePage.getRecordByField(SmartTable.ID, 100, id, firstName, lastName, userName, email, age)
        onSmartTablePage.updateRecord(SmartTable.USERNAME, userName, '', '', '', '', altMail, 50)
        onSmartTablePage.deleteRecord(SmartTable.ID, id)
    })

    it('Validate Tables & Data => Tree Grid', () => {
        navigateTo.tablesAndDataTreeGridPage()
        // Scenarios
        onTreeGridPage.expandComponentAndValidate(projects)
        onTreeGridPage.expandComponentAndValidate(reports)
        onTreeGridPage.expandComponentAndValidate(other)
        onTreeGridPage.validateSearch("txt", [projects, reports, other])
        onTreeGridPage.validateSearch("doc", [projects, reports, other])
        onTreeGridPage.validateSearch("report", [projects, reports, other])
        onTreeGridPage.validateSearch("empty", [projects, reports, other])
    })

    it('Validate Auth', () => {
        navigateTo.authRegisterPage()
        // Scenarios 
        onRegisterPage.validateRegisterUser(fullName, email, password)
    })
})
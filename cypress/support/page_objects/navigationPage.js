export class NavigationPage {
    static layoutFeature = 'Layout';
    static formsFeature = 'Forms';
    static modalAndOverlaysFeature = 'Modal & Overlays';
    static extraComponentsFeature = 'Extra Components';
    static tablesAndDataFeature = 'Tables & Data';
    static authFeature = 'Auth';

    layoutStepperPage(){
        this.#selectMenu(NavigationPage.layoutFeature, 'Stepper')
    }

    layoutAccordionPage(){
        this.#selectMenu(NavigationPage.layoutFeature, 'Accordion')
    }

    formLayoutsPage(){
        this.#selectMenu(NavigationPage.formsFeature, 'Form Layouts')
    }

    formDatepickerPage(){
        this.#selectMenu(NavigationPage.formsFeature, 'Datepicker')
    }

    modalOverlaysDialogPage(){
        this.#selectMenu(NavigationPage.modalAndOverlaysFeature, 'Dialog')
    }

    modalOverlaysWindowPage(){
        this.#selectMenu(NavigationPage.modalAndOverlaysFeature, 'Window')
    }

    modalOverlaysPopoverPage(){
        this.#selectMenu(NavigationPage.modalAndOverlaysFeature, 'Popover')
    }

    modalOverlaysToastrPage(){
        this.#selectMenu(NavigationPage.modalAndOverlaysFeature, 'Toastr')
    }

    modalOverlaysTooltipPage(){
        this.#selectMenu(NavigationPage.modalAndOverlaysFeature, 'Tooltip')
    }

    extraComponentsCalendarPage(){
        this.#selectMenu(NavigationPage.extraComponentsFeature, 'Calendar')
    }

    tablesAndDataSmartTablePage(){
        this.#selectMenu(NavigationPage.tablesAndDataFeature, 'Smart Table')
    }

    tablesAndDataTreeGridPage(){
        this.#selectMenu(NavigationPage.tablesAndDataFeature, 'Tree Grid')
    }

    authLoginPage(){
        this.#selectMenu(NavigationPage.authFeature, 'Login')
    }

    authRegisterPage(){
        this.#selectMenu(NavigationPage.authFeature, 'Register')
    }

    authRequestPasswordPage(){
        this.#selectMenu(NavigationPage.authFeature, 'Request Password')
    }

    authResetPasswordPage(){
        this.#selectMenu(NavigationPage.authFeature, 'Reset Password')
    }

    #selectMenu(featureName, menuName){
        cy.contains('a', featureName).then(menu => {
            cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
                if (attr.includes('left'))
                    cy.wrap(menu).click()
            })
        })
        cy.contains(menuName).click()
    }
}

export const navigateTo = new NavigationPage();
export class StepperPage {

    walkHorizontalStepper(stepsNumber) {
        cy.get('nb-stepper[orientation="horizontal"]').then($stepper => {
            cy.wrap($stepper).find('.step').then($steps => {
                for(let step = 0; step < stepsNumber; step++) {
                    this.#validateStepComponents(step, stepsNumber, $stepper, $steps)

                    if (step !== stepsNumber - 1) {
                        cy.wrap($stepper).contains('button', 'next').click()
                    }
                }
            })
        })
    }

    navigateHorizontalStepper(steps) {
        let lastStep
        cy.get('nb-stepper[orientation="horizontal"]').find('.step').its('length').then(l => lastStep = l)
        
        cy.get('nb-stepper[orientation="horizontal"]').then($stepper => {
            steps.forEach($step => {
                cy.wrap($stepper).find('.step').eq($step - 1).click()
                this.#validateNavigationStepComponents($step, lastStep, $stepper)
            })
        })
    }

    walkHorizontalStepperWithParams(stepsNumber, data) {
        cy.get('nb-stepper').not('[orientation]').then($stepper => {
            cy.wrap($stepper).find('.step').then($steps => {
                for(let step = 0; step < stepsNumber; step++) {
                    cy.wrap($steps).eq(step).should('have.class', 'selected')
                    if (step === 0) {
                        cy.wrap($stepper).contains('button', 'prev').should('not.exist')
                        cy.wrap($stepper).contains('button', 'next').should('be.enabled')
                    } else if (step === stepsNumber - 1){
                        cy.wrap($stepper).contains('button', 'prev').should('be.enabled')
                        cy.wrap($stepper).contains('button', 'next').should('not.exist')
                        cy.wrap($stepper).contains('button', 'Confirm').should('be.enabled')
                    } else {
                        cy.wrap($stepper).contains('button', 'prev').should('be.enabled')
                        cy.wrap($stepper).contains('button', 'next').should('be.enabled')
                        cy.wrap($stepper).contains('button', 'Confirm').should('not.exist')
                    }

                    cy.wrap($stepper).find('input').type(data[step])

                    // Validating steps
                    for(let previousStep = 0; previousStep < step; previousStep++) {
                        cy.wrap($steps).eq(previousStep).should('have.class', 'completed')
                    }
                    for(let folowingStep = step + 1; folowingStep < stepsNumber; folowingStep++) {
                        cy.wrap($steps).eq(folowingStep).should('not.satisfy', ($s) => {
                            const classList = Array.from($s[0].classList)
                            return classList.includes('selected') || classList.includes('completed')
                        })
                    }

                    if (step !== stepsNumber - 1) {
                        cy.wrap($stepper).contains('button', 'next').click()
                    } else {
                        cy.wrap($stepper).contains('button', 'Confirm').click()
                        cy.wrap($stepper).contains('h3', 'Wizard completed!').should('be.visible')
                        cy.wrap($stepper).contains('button', 'prev').should('not.exist')
                        cy.wrap($stepper).contains('button', 'next').should('not.exist')
                        cy.wrap($stepper).contains('button', 'Confirm').should('not.exist')
                        cy.wrap($stepper).contains('button', 'Try again').should('be.enabled')
                    }
                }
            })
        })
    }

    navigateHorizontalStepperWithParams(stepsWithParams) {
        let lastStep
        cy.get('nb-stepper').not('[orientation]').find('.step').its('length').then(l => lastStep = l)

        cy.get('nb-stepper').not('[orientation]').then($stepper => {
            stepsWithParams.forEach(($step) => {
                cy.wrap($stepper).find('.step').eq($step.id - 1).click()
                
                cy.wrap($stepper).find('.step').eq($step.id - 1).should('have.class', 'selected')
                if ($step.id === 1) {
                    cy.wrap($stepper).contains('button', 'prev').should('not.exist')
                    cy.wrap($stepper).contains('button', 'next').should('be.enabled')
                } else if ($step.id === lastStep){
                    cy.wrap($stepper).contains('button', 'prev').should('be.enabled')
                    cy.wrap($stepper).contains('button', 'next').should('not.exist')
                    cy.wrap($stepper).contains('button', 'Confirm').should('be.enabled')
                } else {
                    cy.wrap($stepper).contains('button', 'prev').should('be.enabled')
                    cy.wrap($stepper).contains('button', 'next').should('be.enabled')
                    cy.wrap($stepper).contains('button', 'Confirm').should('not.exist')
                }

                cy.wrap($stepper).find('input').clear().type($step.value)
            })

            cy.wrap($stepper).find('.step').eq(lastStep - 1).click()
                
            cy.wrap($stepper).contains('button', 'Confirm').click()
            cy.wrap($stepper).contains('h3', 'Wizard completed!').should('be.visible')
            cy.wrap($stepper).contains('button', 'prev').should('not.exist')
            cy.wrap($stepper).contains('button', 'next').should('not.exist')
            cy.wrap($stepper).contains('button', 'Confirm').should('not.exist')
            cy.wrap($stepper).contains('button', 'Try again').should('be.enabled')
        })
    }

    walkVerticalStepper(stepsNumber) {
        cy.get('nb-stepper[orientation="vertical"]').then($stepper => {
            cy.wrap($stepper).find('.step').then($steps => {
                for(let step = 0; step < stepsNumber; step++) {
                    this.#validateStepComponents(step, stepsNumber, $stepper, $steps)

                    if (step !== stepsNumber - 1) {
                        cy.wrap($stepper).contains('button', 'next').click()
                    }
                }
            })
        })
    }

    navigateVerticalStepper(steps) {
        let lastStep
        cy.get('nb-stepper[orientation="vertical"]').find('.step').its('length').then(l => lastStep = l)
        
        cy.get('nb-stepper[orientation="vertical"]').then($stepper => {
            steps.forEach($step => {
                cy.wrap($stepper).find('.step').eq($step - 1).click()
                this.#validateNavigationStepComponents($step, lastStep, $stepper)
            })
        })
    }

    #validateStepComponents(step, stepsNumber, stepper, steps) {
        cy.wrap(steps).eq(step).should('have.class', 'selected')
        cy.wrap(stepper).contains('h3', `Step content #${step+1}`).should('be.visible')
        if (step === 0) {
            cy.wrap(stepper).contains('button', 'prev').should('not.be.enabled')
            cy.wrap(stepper).contains('button', 'next').should('be.enabled')
        } else if (step === stepsNumber - 1){
            cy.wrap(stepper).contains('button', 'prev').should('be.enabled')
            cy.wrap(stepper).contains('button', 'next').should('not.be.enabled')
        } else {
            cy.wrap(stepper).contains('button', 'prev').should('be.enabled')
            cy.wrap(stepper).contains('button', 'next').should('be.enabled')
        }

        // Validating steps
        for(let previousStep = 0; previousStep < step; previousStep++) {
            cy.wrap(steps).eq(previousStep).should('have.class', 'completed')
        }
        for(let folowingStep = step + 1; folowingStep < stepsNumber; folowingStep++) {
            cy.wrap(steps).eq(folowingStep).should('not.satisfy', ($s) => {
                const classList = Array.from($s[0].classList)
                return classList.includes('selected') || classList.includes('completed')
            })
        }
    }

    #validateNavigationStepComponents(step, lastStep, stepper) {
        cy.wrap(stepper).find('.step').eq(step - 1).should('have.class', 'selected')
        cy.wrap(stepper).contains('h3', `Step content #${step}`).should('be.visible')
        
        if (step === 1) {
            cy.wrap(stepper).contains('button', 'prev').should('not.be.enabled')
            cy.wrap(stepper).contains('button', 'next').should('be.enabled')
        } else if (step === lastStep){
            cy.wrap(stepper).contains('button', 'prev').should('be.enabled')
            cy.wrap(stepper).contains('button', 'next').should('not.be.enabled')
        } else {
            cy.wrap(stepper).contains('button', 'prev').should('be.enabled')
            cy.wrap(stepper).contains('button', 'next').should('be.enabled')
        }
    }
}

export const onStepperPage = new StepperPage()
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {

        // Filling in only mandatory fields
        cy.get('#username').type('sazzad')
        cy.get('#lastName').type('Hossain')
        cy.get('[name="name"]').type('Sazzad')
        cy.get('#email').type('sazzad@email.com')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#cars').select('Volvo')
        cy.get('#animal').select('Cow')
        // Used the different from first password
        cy.get('input[name="password"]').type('1234')
        cy.get('[name="confirm"]').type('4321')
        cy.get('h2').contains('Password').click()
        // The submit button is not enable, no success message, no error message for password
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible')
        cy.get('#confirm').scrollIntoView()
        // Password has been removed and inserted the correct password
        cy.get('#confirm').clear()
        cy.get('#confirm').type('1234')
        cy.get('h2').contains('Password').click()
        // The submit button is enable and the eeror message not visible anymore
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('not.be.disabled')

    })

    it('User can submit form with all fields added', () => {
        // All mandatory fields are filled
        cy.get('#username').type('sazzad')
        cy.get('#lastName').type('Hossain')
        cy.get('[name="name"]').type('Sazzad')
        cy.get('#email').type('sazzad@gmail.com')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#cars').select('Volvo')
        cy.get('#animal').select('Cow')
        cy.get('input[name="password"]').type('1234')
        cy.get('[name="confirm"]').type('1234')
        cy.get("h2").contains("Password").click()
        // operation field filled
        cy.get("#javascriptFavLanguage").click()
        cy.get("#vehicle1").click()
        cy.get("#vehicle2").click()
        cy.get("#vehicle3").click()
        // The submit button is enabled
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        // The success message is shown
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        function inputValidData(username) {
            // All mandatory fields are filled
            cy.log('Username will be filled')
            cy.get('input[data-testid="user"]').type('username')
            cy.get('#email').type('sazzad@gmail.com')
            cy.get('[data-cy="name"]').type('Sazzad')
            cy.get('#lastName').type('Hossain')
            cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
            cy.get('#password').type('1234')
            cy.get('#confirm').type('1234')
            cy.get('h2').contains('Password').click()
            // Submit button is disabled and succes message is visible
            cy.get('.submit_button').should('be.enabled')
            cy.get('.submit_button').click()
            cy.get('#success_message').should('be.visible')
        }
    })
    //  Testing for checking some mandatory field's absence
    it('Test for abscent mandatory field', () => {
        cy.get('#username').type('sazzad')
        cy.get('#lastName').type('Hossain')
        // One mandatory field is abscent
        cy.get('#lastName').clear('Hossain')
        cy.get('[name="name"]').type('Sazzad')
        cy.get('#email').type('sazzad@email.com')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#cars').select('Volvo')
        cy.get('#animal').select('Cow')
        cy.get('input[name="password"]').type('1234')
        cy.get('[name="confirm"]').type('1234')
        cy.get("h2").contains("Password").click()
        cy.get('.submit_button').should('be.disabled')
    })
})

/*
Assignement 5: create more visual tests
*/
// Example!!

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    // Creating similar test for checking the second picture
    it('My test for second picture', () => {

        cy.log('Will check cypress logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    });
    // Example!!

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Creating similar test for checking the second link 
    it('Check navigation part of registration form 3', () => {
        cy.get('nav').children().eq(1).should('be.visible').and('have.attr', 'href', 'registration_form_3.html').click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.url().should('contain', '/registration_form_2.html')
        cy.log('Back again in registration form 2')
    })

    // Example!!
    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Creating test similar to previous one verifying check boxes
    it('Check that checkbox list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)

        // Verify labels of the radio buttons
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

        //Verify default state of radio buttons
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        // Clicking all boxes makes first checked and clicking again makes unchecked
        cy.get('input[type="checkbox"]').eq(0).click().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).click().should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).click().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).click().should('not.be.checked')
    })
    // EXAMPLE!!
    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)

        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Creating test similar to previous one
    it('Animal dropdown is correct', () => {
        // Here are given different solutions how to get the length of array of elements in Animal dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)

        // Check  that first element in the dropdown has text Dog
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('sazzad@gmail.com')
    cy.get('[data-cy="name"]').type('Sazzad')
    cy.get('#lastName').type('Hossain')
    cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
    cy.get('#password').type('1234')
    cy.get('#confirm').type('1234')
    cy.get('h2').contains('Password').click()
}
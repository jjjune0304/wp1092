describe('Hackathon 1 Test', () => {
    // checkpoint 10
    it('[Advanced] Space-only Comment - Button Color (3%)', () => {
        // Test a normal comment first
        cy.visit('index.html')
        cy.get('#comment-input').type('test')
        cy.get('#comment-button').click()
        cy.get('#comment-group').find('.comment:last-child').contains('test')
        // Test a space-only comment
        cy.get('#comment-input').clear()
        cy.get('#comment-input').type('   ')
        cy.get('#comment-button').should('have.css', 'background-color', 'rgb(204, 204, 204)')
        cy.get('#comment-input').type('hello')
        cy.get('#comment-button').should('have.css', 'background-color', 'rgb(6, 95, 212)')
    })

    // checkpoint 10
    it('[Advanced] Space-only Comment - Button Disabled (4%)', () => {
        // Test a normal comment first
        cy.visit('index.html')
        cy.get('#comment-input').type('test')
        cy.get('#comment-button').click()
        cy.get('#comment-group').find('.comment:last-child').contains('test')
        // Test a space-only comment
        cy.get('#comment-input').clear()
        cy.get('#comment-input').type('   ')
        cy.get('#comment-button').should('be.disabled')
        cy.get('#comment-input').type('test')
        cy.get('#comment-button').should('not.be.disabled')
    })

    // checkpoint 10
    it('[Advanced] Comments with leading and trailing spaces (4%)', () => {
        cy.visit('index.html')
        cy.get('#comment-input').type('test')
        cy.get('#comment-button').click()
        cy.get('#comment-group').find('.comment:last-child').contains('test')
        
        cy.get('#comment-input').clear()
        cy.get('#comment-input').type('   hello        ')
        cy.get('#comment-button').click()
        cy.get('#comment-group').find('.comment:last-child').contains('hello')
    })

    // checkpoint 10
    it('[Advanced] Comments with leading, trailing and middle spaces (4%)', () => {
        cy.visit('index.html')
        cy.get('#comment-input').type('test')
        cy.get('#comment-button').click()
        cy.get('#comment-group').find('.comment:last-child').contains('test')
        
        cy.get('#comment-input').clear()
        cy.get('#comment-input').type('   h e  llo        ')
        cy.get('#comment-button').click()
        cy.get('#comment-group').find('.comment:last-child').contains('h e llo')
    })

    // checkpoint 11
    it('[Advanced] Leave a comment (5%)', () => {
        cy.visit('index.html')
        cy.get('#comment-num').should('have.text', '1則留言')
        cy.get('#comment-input').type('test')
        cy.get('#comment-button').click()
        cy.get('#comment-num').should('have.text', '2則留言')
        cy.get('#comment-button').should('be.disabled')
        cy.get('#comment-input').type('test')
        cy.get('#comment-button').click()
        cy.get('#comment-input').type('test')
        cy.get('#comment-button').click()
        cy.get('#comment-num').should('have.text', '4則留言')
    })
})
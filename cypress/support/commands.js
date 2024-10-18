// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('loginAndNavigateToAddProduct', () => {
    // Truy cập trang đăng nhập
    cy.visit('https://hvtester.pos365.vn/Signin');
    
    cy.get('input.login-user').type('0916591010');
    cy.get('input.login-pw').type('vienngocden92');
    cy.get('button.btn-login').click();
    cy.wait(500);
    
    // Kiểm tra đăng nhập thành công và điều hướng đến trang thêm hàng hóa
    cy.url().should('include', '/Dashboard');
    cy.get('a').contains('Hàng hóa').click();
    cy.get('a').contains('Danh sách hàng hóa').click();
    cy.url().should('include', '/Products');
    cy.wait(500);
    cy.get('button').contains('Thêm mới Hàng hóa').click();
    cy.wait(500);
  });
  
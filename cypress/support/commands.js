// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// Garante que, se abrir como file://, vai para http://localhost:3000
(function ensureHttp() {
  if (location.protocol === 'file:') {
    location.href = 'http://localhost:3000';
  }
})();

// Comando personalizado para fazer login
Cypress.Commands.add('login', (username, password) => {
  cy.get('.btn-login').click()
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#loginForm').submit()
  cy.get('#loginModal').should('not.be.visible')
  cy.get('#userInfo').should('be.visible')
})

// Comando personalizado para fazer logout
Cypress.Commands.add('logout', () => {
  cy.get('.btn-logout').click()
  cy.get('#loginSection').should('be.visible')
  cy.get('#userInfo').should('not.be.visible')
})

// Comando personalizado para verificar se está logado
Cypress.Commands.add('isLoggedIn', () => {
  cy.get('#userInfo').should('be.visible')
})

// Comando personalizado para verificar se não está logado
Cypress.Commands.add('isNotLoggedIn', () => {
  cy.get('#loginSection').should('be.visible')
  cy.get('#userInfo').should('not.be.visible')
})

// Comando personalizado para abrir o carrinho de compras
Cypress.Commands.add('openCart', () => {
  cy.get('.cart-icon').click()
  cy.get('.cart-sidebar').should('be.visible')
})

// Comando personalizado para abrir o modal de checkout
Cypress.Commands.add('openCheckout', () => {
  cy.openCart()
  cy.get('#checkoutBtn').click()
  cy.get('#checkoutModal').should('be.visible')
})

// Comando personalizado para preencher dados básicos do cliente
Cypress.Commands.add('fillCustomerData', (name, email, phone) => {
  cy.get('#customerName').type(name)
  cy.get('#customerEmail').type(email)
  cy.get('#customerPhone').type(phone)
})

// Comando personalizado para preencher dados do cartão
Cypress.Commands.add('fillCardData', (cardNumber, expiry, cvv, cardName) => {
  cy.get('#cardNumber').type(cardNumber)
  cy.get('#cardExpiry').type(expiry)
  cy.get('#cardCvv').type(cvv)
  cy.get('#cardName').type(cardName)
})

// Comando personalizado para preencher dados bancários
Cypress.Commands.add('fillBankData', (bankName, agency, account, holder, cpf) => {
  cy.get('#bankName').type(bankName)
  cy.get('#bankAgency').type(agency)
  cy.get('#bankAccount').type(account)
  cy.get('#accountHolder').type(holder)
  cy.get('#cpfCnpj').type(cpf)
})

// Comando personalizado para navegar para uma seção específica
Cypress.Commands.add('navigateToSection', (sectionId) => {
  cy.get(`a[href="#${sectionId}"]`).click()
  cy.get(`#${sectionId}`).should('be.visible')
})

// Comando personalizado para abrir login via URL
Cypress.Commands.add('openLoginViaUrl', () => {
  cy.visit('/?action=login')
  cy.get('#loginModal').should('be.visible')
})
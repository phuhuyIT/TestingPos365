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


// COMMAND FOR TESTING ADD NEW GOODS
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
// Kiểm tra sản phẩm vừa thêm có hiển thị trên đầu danh sách
Cypress.Commands.add('checkNewAddingGood', (productInfo) => {
  cy.visit('https://hvtester.pos365.vn/#!/Products');
    
  // Kiểm tra sản phẩm mới hiển thị ở dòng đầu
  cy.get('div[class="k-grid k-widget k-grid-display-block k-reorderable"]').within(() => {
    cy.contains(productInfo.code).should('be.visible');
    cy.contains(productInfo.cost).should('be.visible'); // Kiểm tra giá sản phẩm
  });
});
// Nhập dữ liệu vào các trường thông tin sản phẩm
Cypress.Commands.add('inputProductInfo', (productInfo) => {
  cy.get('input[ng-model="product.Code"]').type(productInfo.code);
  cy.get('input[ng-model="product.Name"]').type(productInfo.name);
  cy.get('input[ng-model="inventory.PriceByBranch"]').type(productInfo.price);
  cy.get('input[ng-model="inventory.Cost"]').type(productInfo.cost);
  cy.get('input[ng-model="inventory.OnHand"]').type(productInfo.onHand);
  cy.get('input[ng-model="product.Unit"]').type(productInfo.unit);
  // Chọn nhóm hàng
  cy.get('span.k-widget').contains('-- Chọn nhóm--').click();
  cy.get('li[role="treeitem"]').contains('COSMETIC').click();
  cy.get('input[ng-model="product.IsSerialNumberTracking"]').click({force: true});
});
// Kiểm tra thông tin sản phẩm hiển thị chính xác
Cypress.Commands.add('checkProductDetail', (productInfo) => {
  cy.visit('https://hvtester.pos365.vn/#!/Products');
    
  // Click vào dòng dữ liệu đầu tiên
  cy.get('tr.k-master-row').first().click();

  cy.get('tr.k-detail-row').should('be.visible').within(()=>{
      cy.contains(productInfo.code).should('be.visible');
      cy.contains(productInfo.name).should('be.visible');
      cy.contains(productInfo.price).should('be.visible');
      cy.contains(productInfo.cost).should('be.visible');
      cy.contains(productInfo.unit).should('be.visible');
  });
});

Cypress.Commands.add('uploadSampleImage', () => {
  const filePath = 'testingimage/congikhumbiet.jpg'; 
  const filePath02 = 'testingimage/test.jpeg';

  cy.get('input[onchange="angular.element(this).scope().setFile(this)"]').selectFile(filePath, {action: "drag-drop", force: true});
  cy.wait(500);
  cy.get('input[onchange="angular.element(this).scope().setFile(this)"]').selectFile(filePath02, {action: "drag-drop", force: true});
});
// COMMAND FOR TESTING ADD NEW GOODS

// COMMAND FOR TESTING SET PRICE
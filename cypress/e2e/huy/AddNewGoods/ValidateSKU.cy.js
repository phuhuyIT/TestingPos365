describe('Kiểm tra giao diện nhập mã hàng hóa sau khi đăng nhập', () => {

    beforeEach(() => {
      cy.loginAndNavigateToAddProduct();
    });

    it('Trường Mã hàng hóa / SKU / Mã vạch để trống và có placeholder đúng', () => {
        cy.get('input[ng-model="product.Code"]').should('have.value', ''); // Kiểm tra trường để trống
        cy.get('input[ng-model="product.Code"]').should('have.attr', 'placeholder', 'Tự động tạo mã'); // Kiểm tra placeholder
      });
    
    it('Nhập ký tự đặc biệt "@$#%!" và kiểm tra cảnh báo lỗi', () => {
    cy.get('input[ng-model="product.Code"]').type('@$#%!'); // Nhập ký tự đặc biệt
    cy.get('.error-message').should('be.visible'); // Kiểm tra cảnh báo lỗi hiển thị
    cy.get('.error-message').should('contain', 'Yêu cầu nhập liệu hợp lệ'); // Nội dung cảnh báo lỗi
    });

    it('Nhập chữ cái (in hoa và in thường) cho phép nhập', () => {
    cy.get('input[ng-model="product.Code"]').type('ABCabc'); // Nhập chữ cái in hoa và in thường
    cy.get('input[ng-model="product.Code"]').should('have.value', 'ABCabc'); // Kiểm tra giá trị đã nhập đúng
    });
    
    it('Nhập chữ số và cho phép nhập', () => {
    cy.get('input[ng-model="product.Code"]').type('123456'); // Nhập chữ số
    cy.get('input[ng-model="product.Code"]').should('have.value', '123456'); // Kiểm tra giá trị đã nhập đúng
    });
});
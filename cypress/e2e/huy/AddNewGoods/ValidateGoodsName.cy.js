describe('Kiểm tra giao diện nhập mã hàng hóa sau khi đăng nhập', () => {

    beforeEach(() => {
      cy.loginAndNavigateToAddProduct();
    });

    it('Kiểm tra trường "Tên hàng hóa" có placeholder mặc định', () => {
        // Kiểm tra trường Tên hàng hóa có hiển thị và có placeholder mặc định
        cy.get('input[ng-model="product.Name"]') // Selector này cần thay thế bằng tên của trường trong DOM
          .should('be.visible')  // Kiểm tra trường có hiển thị
          .should('have.attr', 'placeholder', 'Tên hàng hóa'); // Kiểm tra placeholder
      });
    
    it('Kiểm tra giá trị mặc định của trường "Tên hàng hóa"', () => {
    // Kiểm tra trường có giá trị mặc định là rỗng
    cy.get('input[ng-model="product.Name"]')
        .should('have.value', ''); // Kiểm tra giá trị mặc định rỗng
    });

    it('Kiểm tra hệ thống cảnh báo khi nhập ký tự đặc biệt', () => {
    // Nhập ký tự đặc biệt vào trường "Tên hàng hóa"
    cy.get('input[ng-model="product.Name"]').type('@$#%!');
    });
    
    it('Cho phép nhập chữ cái vào trường "Tên hàng hóa"', () => {
        // Nhập chữ cái vào trường "Tên hàng hóa"
        cy.get('input[ng-model="product.Name"]').type('ABCabc');
    
        // Kiểm tra giá trị của trường sau khi nhập
        cy.get('input[ng-model="product.Name"]').should('have.value', 'ABCabc');
      });
      it('Cho phép nhập chữ số vào trường "Tên hàng hóa"', () => {
    // Nhập chữ số vào trường "Tên hàng hóa"
    cy.get('input[ng-model="product.Name"]').type('12345');

    // Kiểm tra giá trị của trường sau khi nhập
    cy.get('input[ng-model="product.Name"]').should('have.value', '12345');
    });
});
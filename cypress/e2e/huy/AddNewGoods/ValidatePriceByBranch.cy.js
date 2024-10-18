describe('Kiểm tra giao diện nhập mã hàng hóa sau khi đăng nhập', () => {

    beforeEach(() => {
        cy.loginAndNavigateToAddProduct();
    });

    it('Không hiển thị chữ cái khi nhập vào trường "Giá bán"', () => {
        // Nhập chữ cái vào trường Giá bán
        cy.get('input[ng-model="inventory.PriceByBranch"]').clear().type('abc');
    
        // Kiểm tra không hiển thị chữ cái nào trong trường Giá bán
        cy.get('input[ng-model="inventory.PriceByBranch"]').should('have.value', '');
      });
    
      it('Không hiển thị dấu "-" khi nhập số âm vào trường "Giá bán"', () => {
        // Nhập số âm vào trường Giá bán
        cy.get('input[ng-model="inventory.PriceByBranch"]').clear().type('-123');
    
        // Kiểm tra không hiển thị dấu "-" trong trường Giá bán
        cy.get('input[ng-model="inventory.PriceByBranch"]').should('have.value', '123');
      });
    
      it('Cho phép nhập số nguyên dương vào trường "Giá bán"', () => {
        // Nhập số nguyên dương vào trường Giá bán
        cy.get('input[ng-model="inventory.PriceByBranch"]').clear().type('12345');
    
        // Kiểm tra giá trị hiển thị đúng là số nguyên dương
        cy.get('input[ng-model="inventory.PriceByBranch"]').should('have.value', '12,345');
      });
    
      it('Không hiển thị dấu "." khi nhập số thực vào trường "Giá bán"', () => {
        // Nhập số thực vào trường Giá bán
        cy.get('input[ng-model="inventory.PriceByBranch"]').clear().type('1234.56');
    
        // Kiểm tra rằng dấu "," không hiển thị, chỉ hiển thị phần số
        cy.get('input[ng-model="inventory.PriceByBranch"]').should('have.value', '123,456');
      });
    
});
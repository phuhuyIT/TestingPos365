describe('Kiểm tra chức năng Lưu & Thêm mới khi thêm hàng hóa mới', () => {
    beforeEach(() => {
        cy.loginAndNavigateToAddProduct();
      });
    // Biến lưu thông tin sản phẩm
    const productInfo = {
        code : 'DT03',
        name : 'Dien Thoai Iporn 15 Pro Max',
        price : '31,000,000',
        cost : '34,000,000',
        unit : 'Cai',
        onHand : '100'
      };

    it('Nhập đầy đủ thông tin và nhấn Lưu & Thêm mới', () => {

        cy.inputProductInfo(productInfo);

        // Nhấn nút "Lưu & Thêm mới"
        cy.get('button').contains('Lưu & Thêm mới').click();
        cy.wait(500);
        // Kiểm tra xem sản phẩm đã được thêm thành công
        cy.contains('Cập nhật dữ liệu thành công.').should('be.visible'); // Kiểm tra thông báo thành công

        // Kiểm tra các trường nhập liệu đã được làm mới về giá trị mặc định
        cy.get('input[ng-model="product.Code"]').should('have.value','');
        cy.get('input[ng-model="product.Name"]').should('have.value','');
        cy.get('input[ng-model="inventory.PriceByBranch"]').should('have.value','0');
        cy.get('input[ng-model="inventory.Cost"]').should('have.value','0');
        cy.get('input[ng-model="inventory.OnHand"]').should('have.value','0');
        cy.get('input[ng-model="product.Unit"]').should('have.value','');
    });

    it('Kiểm tra sản phẩm vừa thêm có hiển thị trên đầu danh sách', () => {
        cy.checkNewAddingGood(productInfo);
    });

    it('Kiểm tra thông tin chi tiết sản phẩm vừa thêm', () => {
        cy.checkProductDetail(productInfo);
    });
});

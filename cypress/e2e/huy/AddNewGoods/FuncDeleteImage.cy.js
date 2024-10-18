describe('Kiểm tra xóa hình ảnh nếu còn nhiều ảnh', () => {
    beforeEach(() => {
      cy.loginAndNavigateToAddProduct();
    });
    const productInfo = {
        code: 'TESTCODE',
        name: 'TESTNAME',
        price: '10000',
        cost: '5000',
        onHand: '100',
        unit: 'TESTUNIT'
    }
    it('Xóa ảnh và kiểm tra ảnh bị xóa biến mất nếu còn nhiều ảnh', () => {
        cy.visit('https://hvtester.pos365.vn/#!/Products');
      cy.get('tr[class="k-master-row ng-scope"]').first().click();
      cy.get('button[class="btn btn-primary btn-default ng-binding"]').click();
      // Kiểm tra đang có nhiều hơn 1 ảnh hay không
      cy.get('li[class="col-md-2 col-sm-3 col-xs-6 ng-scope"]') // Chọn tất cả các ảnh trong danh sách
        .should('have.length.greaterThan', 1); // Đảm bảo rằng có nhiều hơn 1 ảnh
  
      // Bước 2: Lưu lại số lượng ảnh ban đầu
      cy.get('li[ng-repeat="imgitem in product.ProductImages"]').then(($images) => {
        const initialImageCount = $images.length;
  
        // Bước 3: Thực hiện hành động xóa ảnh đầu tiên
        cy.get('li[ng-repeat="imgitem in product.ProductImages"]')
        .first()
        .trigger('mouseover') // Hover chuột vào ảnh
        .find('span[ng-click="removeImage($index)"]')
        .click({force: true});
  
        // Bước 4: Kiểm tra xem số lượng ảnh đã giảm đi 1
        cy.get('li[class="col-md-2 col-sm-3 col-xs-6 ng-scope"]').should('have.length', initialImageCount - 1);
      });
      
    cy.get('button').contains('Lưu').click();
    cy.wait(500);

    cy.url().should('include', '/Products'); // Kiểm tra chuyển đến danh sách sản phẩm
    cy.contains('Cập nhật dữ liệu thành công.').should('be.visible'); // Kiểm tra thông báo thành công
    cy.visit('https://hvtester.pos365.vn/#!/Products');
    cy.wait(500);
    cy.get('div.grid-photo[ng-hide="dataItem.Id === -1"]')
    .should('have.css', 'background-image')
    .and('include', 'test-jpeg.jpg');
    });
});
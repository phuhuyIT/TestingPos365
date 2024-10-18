describe('Kiểm tra chọn ảnh đại diện', () => {
    beforeEach(() => {
        cy.loginAndNavigateToAddProduct();
      });
    // Biến lưu thông tin sản phẩm
    const productInfo = {
            code : 'DT03',
            name : 'Dien Thoai Iporn 19 Pro Max',
            price : '90,000,000',
            cost : '104,000,000',
            unit : 'Cai',
            onHand : '10'
    };

    it('Chọn ảnh đại diện và thêm sản phẩm thành công', () => {
        cy.inputProductInfo(productInfo);

        cy.uploadSampleImage();

        cy.get('li[ng-repeat="imgitem in product.ProductImages"]')
          .eq(1) // Chọn ảnh thứ 2
          .trigger('mouseover') // Hover chuột vào ảnh
          .find('span[ng-click="activeImage($index)"]').click({force: true}); // Click vào nút xóa
        // Bước 6: Nhấn nút Lưu
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

describe('Kiểm tra thêm sản phẩm không có ảnh', () => {
    beforeEach(() => {
        cy.loginAndNavigateToAddProduct();
      });
    
    const productInfo = {
        code: 'SP001',
        name: 'Sản phẩm không có ảnh',
        price: '100000',
        cost: '50000',
        onHand: '10',
        unit: 'Cái'
    }
    it('Thêm sản phẩm thành công và hiển thị ảnh mặc định', () => {

        cy.inputProductInfo(productInfo);
        cy.get('button').contains('Lưu').click();
        cy.wait(500);

        cy.url().should('include', '/Products'); // Kiểm tra chuyển đến danh sách sản phẩm
        cy.contains('Cập nhật dữ liệu thành công.').should('be.visible'); // Kiểm tra thông báo thành công

        cy.visit('https://hvtester.pos365.vn/#!/Products');
    
        // Kiểm tra sản phẩm mới hiển thị ở dòng đầu
        cy.get('div[class="k-grid k-widget k-grid-display-block k-reorderable"]').within(() => {
            cy.contains(productInfo.code).should('be.visible');
            cy.contains(productInfo.cost).should('be.visible'); // Kiểm tra giá sản phẩm
        });
        cy.contains('Sản phẩm không có ảnh').parents('tr') // Xác định sản phẩm dựa trên tên
          .find('div[style="background-image: url(/images/google/default-product.png);"]') // Tìm phần tử hình ảnh của sản phẩm
    });
    const productInfo02 = {
        code: 'SP002',
        name: 'Sản phẩm có ảnh',
        price: '100000',
        cost: '50000',
        onHand: '10',
        unit: 'Cái'
    }
    it('Thêm sản phẩm thành công với ảnh và kiểm tra ảnh được chọn làm đại diện', () => {
        cy.inputProductInfo(productInfo02);

        cy.uploadSampleImage();
        cy.wait(1000);
        cy.get('button').contains('Lưu').click();
        cy.wait(500);

        cy.url().should('include', '/Products'); // Kiểm tra chuyển đến danh sách sản phẩm
        cy.contains('Cập nhật dữ liệu thành công.').should('be.visible'); // Kiểm tra thông báo thành công

        cy.visit('https://hvtester.pos365.vn/#!/Products');
    
        // Kiểm tra sản phẩm mới hiển thị ở dòng đầu
        cy.get('div[class="k-grid k-widget k-grid-display-block k-reorderable"]').within(() => {
            cy.contains(productInfo02.code).should('be.visible');
            cy.contains(productInfo02.cost).should('be.visible'); // Kiểm tra giá sản phẩm
        });

        cy.get('div.grid-photo[ng-hide="dataItem.Id === -1"]')
          .should('have.css', 'background-image')
          .and('include', 'congikhumbiet-jpg.jpg');

    });
});

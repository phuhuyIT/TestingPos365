describe('Kiểm tra chức năng Lưu & Copy khi thêm hàng hóa mới', () => {
    beforeEach(() => {
        cy.loginAndNavigateToAddProduct();
      });
    // Biến lưu thông tin sản phẩm
    const productInfo = {
         code : 'DT02',
         name : 'Dien Thoai Iporn 14 Pro Max',
         price : '30,000,000',
         cost : '34,000,000',
         unit : 'Cai',
         onHand : '10'
    };

    it('Nhập đầy đủ thông tin và nhấn Lưu & Copy', () => {

        cy.inputProductInfo(productInfo);
        cy.get('button').contains(' Lưu & Copy').click();
        // Kiểm tra xem sản phẩm đã được thêm thành công
        cy.contains('Cập nhật dữ liệu thành công.').should('be.visible'); // Kiểm tra thông báo thành công
        cy.wait(500);
        // Kiểm tra các trường nhập liệu vẫn được giữ nguyên
        cy.get('input[ng-model="product.Name"]').should('have.value',productInfo.name);
        cy.get('input[ng-model="inventory.PriceByBranch"]').should('have.value',productInfo.price);
        cy.get('input[ng-model="inventory.Cost"]').should('have.value',productInfo.cost);
        cy.get('input[ng-model="product.Unit"]').should('have.value',productInfo.unit);
    });

    it('Kiểm tra sản phẩm vừa thêm có hiển thị trên đầu danh sách', () => {
        cy.checkNewAddingGood(productInfo);
    });

    it('Kiểm tra thông tin chi tiết sản phẩm vừa thêm', () => {
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
});

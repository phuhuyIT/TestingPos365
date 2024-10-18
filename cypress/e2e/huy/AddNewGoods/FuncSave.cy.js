describe('Kiểm tra giao diện nhập mã hàng hóa sau khi đăng nhập', () => {
    beforeEach(() => {
      cy.loginAndNavigateToAddProduct();
    });
    let code = 'DT01';
    let name = 'Dien Thoai Iporn 14';
    let price = '10,000,000';
    let cost = '12,000,000';
    let unit = 'Cai';
    let onHand = '10';
    it('Nhập thông tin đầy đủ và lưu sản phẩm', () => {
        cy.wait(500);
        // Nhập thông tin cần thiết vào các trường
        cy.get('input[ng-model="product.Code"]').type(code);
        cy.get('input[ng-model="product.Name"]').type(name);
        cy.get('input[ng-model="inventory.PriceByBranch"]').type(price);
        cy.get('input[ng-model="inventory.Cost"]').type(cost);
        cy.get('input[ng-model="inventory.OnHand"]').type(onHand);
        cy.get('input[ng-model="product.Unit"]').type(unit);

        // Chọn nhóm hàng
        cy.get('span.k-widget').contains('-- Chọn nhóm--').click();
        cy.get('li[role="treeitem"]').contains('COSMETIC').click();
        
        cy.get('input[ng-model="product.IsSerialNumberTracking"]').click({force: true});
        // Nhấn nút Lưu
        cy.get('button').contains('Lưu').click();
        cy.wait(500);
        // Kiểm tra xem sản phẩm có được thêm vào hệ thống thành công
        cy.url().should('include', '/Products'); // Kiểm tra chuyển đến danh sách sản phẩm
        cy.contains('Cập nhật dữ liệu thành công.').should('be.visible'); // Kiểm tra thông báo thành công
      });

      it('Sản phẩm mới được hiển thị ở dòng đầu tiên', () => {
        cy.visit('https://hvtester.pos365.vn/#!/Products');
    
        // Kiểm tra sản phẩm mới hiển thị ở dòng đầu
        cy.get('div[class="k-grid k-widget k-grid-display-block k-reorderable"]').within(() => {
          cy.contains(code).should('be.visible');
          cy.contains(cost).should('be.visible'); // Kiểm tra giá sản phẩm
        });
      });
    it('Thông tin hiển thị đúng sau khi click vào sản phẩm', () => {
        cy.visit('https://hvtester.pos365.vn/#!/Products');
    
        // Click vào dòng dữ liệu đầu tiên
        cy.get('tr.k-master-row').first().click();

        cy.get('tr.k-detail-row').should('be.visible').within(()=>{
            cy.contains(code).should('be.visible');
            cy.contains(name).should('be.visible');
            cy.contains(price).should('be.visible');
            cy.contains(cost).should('be.visible');
            cy.contains(unit).should('be.visible');
        });
      });

      it('Tạo mã vạch tự động khi bỏ trống', () => {
        cy.wait(500);
        cy.get('input[ng-model="product.Name"]').type(name);
        cy.get('input[ng-model="inventory.PriceByBranch"]').type(price);
        cy.get('input[ng-model="inventory.Cost"]').type(cost);
        cy.get('input[ng-model="inventory.OnHand"]').type(onHand);
        cy.get('input[ng-model="product.Unit"]').type(unit);
    
        cy.get('button').contains('Lưu').click();
        cy.wait(500);
    
        cy.url().should('include', '/Products'); // Kiểm tra chuyển đến danh sách sản phẩm
        cy.contains('Cập nhật dữ liệu thành công.').should('be.visible'); // Kiểm tra thông báo thành công
        cy.visit('https://hvtester.pos365.vn/#!/Products');
        cy.wait(500);

        cy.get('tr.k-master-row').first().within(() => {
            cy.get('td').eq(1).invoke('text').then((skuText) => {
                // Kiểm tra xem SKU có định dạng là "-" và sau đó là số không?
                const skuPattern = /^-\d+$/; // Regex để kiểm tra định dạng "-<số>"
                expect(skuText.trim()).to.match(skuPattern); // Kiểm tra SKU phải theo định dạng đúng
              });;
        });
      });
      
      it('Thông báo lỗi khi trùng mã vạch', () => {
        cy.wait(500);
        cy.get('input[ng-model="product.Code"]').type(code);
        cy.get('input[ng-model="product.Name"]').type(name);
        cy.get('input[ng-model="inventory.PriceByBranch"]').type(price);
        cy.get('input[ng-model="inventory.Cost"]').type(cost);
        cy.get('input[ng-model="inventory.OnHand"]').type(onHand);
        cy.get('input[ng-model="product.Unit"]').type(unit);
    
        cy.get('button').contains('Lưu').click();
        cy.wait(500);
        cy.contains(code + ' đã tồn tại trong hệ thống.').should('be.visible'); // Kiểm tra thông báo thành côn
      });
});
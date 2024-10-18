describe('Kiểm tra giao diện nhập mã hàng hóa sau khi đăng nhập', () => {
    beforeEach(() => {
      cy.loginAndNavigateToAddProduct();
    });
    const productInfo = {
      code : 'DT02',
      name : 'Dien Thoai Iporn 14 Pro Max',
      price : '30,000,000',
      cost : '34,000,000',
      unit : 'Cai',
      onHand : '10'
    };

    it('Nhập thông tin đầy đủ và lưu sản phẩm', () => {
        cy.wait(500);
        // Nhập thông tin cần thiết vào các trường
        cy.inputProductInfo(productInfo);
        cy.get('button').contains('Lưu').click();
        cy.wait(500);
        // Kiểm tra xem sản phẩm có được thêm vào hệ thống thành công
        cy.url().should('include', '/Products'); // Kiểm tra chuyển đến danh sách sản phẩm
        cy.contains('Cập nhật dữ liệu thành công.').should('be.visible'); // Kiểm tra thông báo thành công
      });

      it('Sản phẩm mới được hiển thị ở dòng đầu tiên', () => {
        cy.checkNewAddingGood(productInfo);
      });
    it('Thông tin hiển thị đúng sau khi click vào sản phẩm', () => {
        cy.checkProductDetail(productInfo);
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
        cy.inputProductInfo(productInfo);
        cy.get('button').contains('Lưu').click();
        cy.wait(500);
        cy.contains(code + ' đã tồn tại trong hệ thống.').should('be.visible'); // Kiểm tra thông báo thành côn
      });
});
describe('Kiểm tra giao diện nhập mã hàng hóa sau khi đăng nhập', () => {
    beforeEach(() => {
      cy.loginAndNavigateToAddProduct();
    });
  
    it('Kiểm tra label và textbox nhập mã, nút Nhiều mã vạch', () => {
      // Kiểm tra label "Mã hàng hóa / SKU / Mã vạch"
      cy.get('Label').contains('Mã hàng hóa / SKU / Mã vạch').should('exist');

      // Kiểm tra textbox nhập mã
      cy.get('input[ng-model="product.Code"]').should('exist');

      // Kiểm tra nút "Nhiều mã vạch"
      cy.get('a.accordion-toggle').contains('Nhiều mã vạch')
        .should('exist') // Đảm bảo nút hiển thị
        .should('be.visible') // Đảm bảo nút có thể nhìn thấy
        .should('not.be.disabled')
        .click();// Đảm bảo nút khả dụng (có thể nhấn được)
    });

    it('Kiểm tra hiển thị của trường "Tên hàng hóa"', () => {
        cy.wait(500);
        // Kiểm tra label "Tên hàng hóa"
        cy.get('Label').contains('Tên hàng hóa').should('exist');
    
        // Kiểm tra textbox nhập tên hàng hóa
        cy.get('input[ng-model="product.Name"]').should('exist');
    });

    it('Kiểm tra hiển thị của trường "Loại hàng"', () => {
        cy.wait(500);
        // Kiểm tra label "Loại hàng"
        cy.get('Label').contains('Loại hàng').should('exist');
    
        // Kiểm tra textbox nhập loại hàng
        cy.get('span.k-widget').contains('Hàng hóa').should('exist');
    });

    it('Kiểm tra hiển thị của trường "Giá bán", "Giá vốn", "Tồn kho"', () => {
        cy.wait(500);
        // Kiểm tra label "Giá bán"
        cy.get('Label').contains('Giá bán').should('exist');
    
        // Kiểm tra textbox nhập giá bán
        cy.get('input[ng-model="inventory.PriceByBranch"]').should('exist');

        // Kiểm tra label "Giá vốn"
        cy.get('Label').contains('Giá vốn').should('exist');
    
        // Kiểm tra textbox nhập giá vốn
        cy.get('input[ng-model="inventory.Cost"]').should('exist');

        // Kiểm tra label "Tồn kho"
        cy.get('Label').contains('Tồn kho').should('exist');
    
        // Kiểm tra textbox nhập tồn kho
        cy.get('input[ng-model="inventory.OnHand"]').should('exist');
    });
    it ('Kiểm tra hiển thị của trường "ĐVT"', () => {
        cy.wait(500);
        cy.get('Label').contains('ĐVT').should('exist');

        cy.get('input[ng-model="product.Unit"]').should('exist');
    });
    it ('Kiểm tra hiển thị của trường "Tên nhóm"', () => {
        cy.wait(500);
        // Kiểm tra label "Tên nhóm"
        cy.get('Label').contains('Tên nhóm').should('exist');
        // Kiểm tra vị trí nút thêm mới
        cy.get('a').contains(' Thêm mới').contains('Thêm mới')
        .should('be.visible')
        .prev('label')  // Kiểm tra phần tử đứng trước là label
        .contains('Tên nhóm');
    
        // Kiểm tra textbox nhập tên nhóm
        cy.get('span.k-widget').contains('-- Chọn nhóm--').should('exist');
    });
    it('Nhấn Shift + Tab liên tục và kiểm tra di chuyển con trỏ', () => {
        cy.wait(500);
        // Đầu tiên, focus vào phần tử cuối cùng (ví dụ: một nút submit hoặc link)
        cy.get('button').contains(' Lưu').focus();
        
        // Bắt đầu nhấn Shift + Tab liên tục để di chuyển con trỏ
        for (let i = 0; i < 10; i++) { // Tùy chỉnh số lần nhấn tùy theo số lượng phần tử
            cy.focused().trigger('keydown', { keyCode: 9, shiftKey: true });
          cy.wait(500); // Thêm thời gian chờ để dễ quan sát nếu cần
        }
    });
    it('Nhấn reload 20 lần và kiểm tra trang thông tin hiển thị đầy đủ', () => {
        cy.wait(500);
        for (let i = 0; i < 20; i++) {
          cy.reload(); 
            cy.wait(500);
          // quan sát xem giao diện có hiển thị đầy đủ thông tin không
        }
      });
  });
  
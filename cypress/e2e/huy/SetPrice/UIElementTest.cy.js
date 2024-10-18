describe('Kiểm tra giao diện bảng giá', () => {
  
    // Trước mỗi test, điều hướng đến màn hình bảng giá
    beforeEach(() => {
      cy.visit('/bang-gia'); // Thay thế '/bang-gia' bằng đường dẫn thực tế của trang
    });
  
    it('Kiểm tra sidebar mặc định hiển thị', () => {
      cy.get('.sidebar').should('be.visible'); // Xác nhận sidebar hiển thị
      cy.get('.sidebar .header').should('contain.text', 'DANH SÁCH BẢNG GIÁ'); // Kiểm tra label "DANH SÁCH BẢNG GIÁ"
      cy.get('.sidebar .add-btn').should('be.visible'); // Kiểm tra button "Thêm bảng giá"
      cy.get('.sidebar .price-list').should('be.visible'); // Kiểm tra danh sách bảng giá
    });
  
    it('Kiểm tra thanh tìm kiếm trong sidebar', () => {
      cy.get('.sidebar .search-label').should('contain.text', 'TÌM KIẾM'); // Kiểm tra label "TÌM KIẾM"
      cy.get('.sidebar .search-input').should('be.visible'); // Kiểm tra textbox nhập từ khóa
    });
  
    it('Kiểm tra nút ẩn/hiện sidebar và tên bảng giá', () => {
      cy.get('.toggle-sidebar-btn').should('be.visible'); // Kiểm tra nút ẩn/hiện sidebar
      cy.get('.page-title').should('contain.text', 'Tên Bảng giá'); // Kiểm tra tên bảng giá
      cy.get('.export-btn').should('contain.text', 'XUẤT RA FILE'); // Kiểm tra nút "XUẤT RA FILE"
    });
  
    it('Kiểm tra thanh chức năng tìm kiếm và các nút khác', () => {
      cy.get('.search-product .input').should('be.visible'); // Kiểm tra textbox tìm kiếm mặt hàng
      cy.get('.search-product .search-btn').should('contain.text', 'Tìm kiếm'); // Kiểm tra nút tìm kiếm
      cy.get('.import-btn').should('contain.text', 'Import'); // Kiểm tra nút "Import"
      cy.get('.add-group-btn').should('contain.text', 'Thêm theo nhóm'); // Kiểm tra nút "Thêm theo nhóm"
      cy.get('.calculate-btn').should('contain.text', 'Tính giá'); // Kiểm tra nút "Tính giá"
    });
  
    it('Kiểm tra bảng danh sách giá và các chức năng của bảng', () => {
      cy.get('.price-table thead th').eq(0).should('contain.text', 'Mã hàng hóa'); // Kiểm tra cột "Mã hàng hóa"
      cy.get('.price-table thead th').eq(1).should('contain.text', 'Tên hàng hóa'); // Kiểm tra cột "Tên hàng hóa"
      cy.get('.price-table thead th').eq(2).should('contain.text', 'Giá vốn'); // Kiểm tra cột "Giá vốn"
      cy.get('.price-table thead th').eq(3).should('contain.text', 'Giá niêm yết'); // Kiểm tra cột "Giá niêm yết"
      cy.get('.price-table thead th').eq(4).should('contain.text', 'Giá bán'); // Kiểm tra cột "Giá bán"
      cy.get('.price-table thead th').eq(5).should('contain.text', 'Giá bán ĐVT Lớn'); // Kiểm tra cột "Giá bán ĐVT Lớn"
  
      cy.get('.price-table tbody tr').should('have.length.greaterThan', 0); // Kiểm tra có dữ liệu trong bảng
  
      cy.get('.price-table tbody tr .edit-btn').should('be.visible'); // Kiểm tra nút chỉnh sửa cạnh "Giá bán" và "Giá bán ĐVT Lớn"
      cy.get('.price-table tbody tr .delete-btn').should('be.visible'); // Kiểm tra nút xóa ở cuối mỗi dòng
    });
  
    it('Kiểm tra chuyển trang và số lượng dữ liệu hiển thị trên mỗi trang', () => {
      cy.get('.pagination .next-page').should('be.visible'); // Kiểm tra nút chuyển trang
      cy.get('.page-size-selector').should('be.visible'); // Kiểm tra choicebox chọn số lượng dòng
      cy.get('.data-count').should('be.visible'); // Kiểm tra hiển thị số dòng dữ liệu hiện tại
    });
  
  });
  
describe('Kiểm tra giá trị mặc định', () => {

  
	it('Kiểm tra giá trị mặc định của mã giảm giá', () => {
		// mở web
		cy.visit('https://hvtester.pos365.vn/');

		// login
		cy.get('#Username').should('exist').type('0916591010');
		cy.get('#Password').should('exist').type('vienngocden92');

		cy.get('button[value="Dashboard"]')
			.should('be.visible') // Kiểm tra button đang hiển thị
			.click(); // Click vào button

		// click menu
		cy.get('#navbar').find('a[tooltip="Chương trình khuyến mãi"]').click();

		// vào trang quản lý voucher
		cy.get('#navbar').find('a[ng-href="/#!/Voucher"]').click();

		// bấm nút thêm mới voucher
		cy.get('button[ng-click="$root.goTo($root.menuUrl.voucher,0)"]').click();

		// kiểm tra giá trị mặc định của mã giảm giá
		cy.get('input[ng-model="voucher.Code"]')
			.invoke('val') // Lấy giá trị của input
			.should('not.be.empty'); // Kiểm tra giá trị không rỗng

		// cy.get('input[ng-model="voucher.Code"]').should('have.value', '0123456789'); // Kiểm tra giá trị mặc định cụ thể
	});

});

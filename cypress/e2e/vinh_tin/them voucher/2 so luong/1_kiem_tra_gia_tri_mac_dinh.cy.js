describe('Kiểm tra Gá trị mặc định', () => {
	it('Giá trị mặc định phải là 1', () => {
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

		cy.get('input[ng-model="voucher.Quantity"]').should('have.value', '1')
	});
});

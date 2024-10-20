describe('Kiểm tra giá trị nhỏ nhất phải là 0', () => {
	beforeEach(() => {
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
	});

	it('Nhập giá trị -1', () => {
		cy.get('input[ng-model="voucher.Quantity"]').clear();
		cy.get('input[ng-model="voucher.Quantity"]').type('-1');
	});

	it('Nhập giá trị 0', () => {
		cy.get('input[ng-model="voucher.Quantity"]').clear();
		cy.get('input[ng-model="voucher.Quantity"]').type(0);
	});

	it('Nhập giá trị 1', () => {
		cy.get('input[ng-model="voucher.Quantity"]').clear();
		cy.get('input[ng-model="voucher.Quantity"]').type(1);
	});
});

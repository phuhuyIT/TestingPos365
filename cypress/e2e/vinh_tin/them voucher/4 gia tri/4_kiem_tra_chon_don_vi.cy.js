describe('Kiêm tra chọn đơn vị', () => {
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

	it('Chọn đơn vị là giá trị', () => {
		cy.get('input[ng-model="voucher.Value"]').type(12);
		// cy.get('.input-group-addon').click();

		// cy.get('option[value="vnd"]').click();

		cy.get('select[kendo-drop-down-list]').invoke('show').select('vnd');

		// Chặn request POST đến API thêm khách hàng
		let apiCalled = false;
		cy.intercept('POST', '/api/voucher', req => {
			apiCalled = true; // Đánh dấu API được gọi
		}).as('postVoucher');

		cy.get('button[ng-click="save()"]').click();

		// Đợi request nếu nó được gọi, hoặc tiếp tục nếu không
		cy.then(() => {
			if (apiCalled) {
				cy.wait('@postVoucher').then(interception => {
					const response = interception.response;

					// Log response để debug (tùy chọn)
					cy.log('Response:', response);

					// Kiểm tra mã status
					if (response.statusCode === 200) {
						cy.log(`Đúng test case: Thêm thành công`);
					} else {
						throw new Error(`Lỗi: Không thêm được khi chọn đơn vị là giá trị`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});

	it('Chọn đơn vị là %', () => {
		cy.get('input[ng-model="voucher.Value"]').type(12);
		// cy.get('.input-group-addon').click();
		// cy.get('option[value="percent"]').click();

		cy.get('select[kendo-drop-down-list]').invoke('show').select('percent');


		// Chặn request POST đến API thêm khách hàng
		let apiCalled = false;
		cy.intercept('POST', '/api/voucher', req => {
			apiCalled = true; // Đánh dấu API được gọi
		}).as('postVoucher');

		cy.get('button[ng-click="save()"]').click();

		// Đợi request nếu nó được gọi, hoặc tiếp tục nếu không
		cy.then(() => {
			if (apiCalled) {
				cy.wait('@postVoucher').then(interception => {
					const response = interception.response;

					// Log response để debug (tùy chọn)
					cy.log('Response:', response);

					// Kiểm tra mã status
					if (response.statusCode === 200) {
						cy.log(`Đúng test case: Thêm thành công`);
					} else {
						throw new Error(`Lỗi: Không thêm được khi chọn đơn vị là %`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});
});

describe('Chỉ chọn ngày', () => {
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

	it('Ngày hết hạn nhỏ hơn ngày hiện tại', () => {
		cy.get('input[kendo-date-time-picker]').clear();
		cy.get('span[aria-label="Open the date view"]').click();
		// cy.get('a[aria-label="Previous"]').click();

		// data-value="2024/9/18"
		const now = new Date();
		const str = `data-value="${now.getFullYear()}/${now.getMonth()}/${now.getDate() - 1}"`;
		cy.get(`a[${str}]`).click();

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
						throw new Error(`Lỗi: Ngày hết hạng để trống thì không được thêm`);
					} else {
						cy.log(`Đúng test case: Ngày hết hạn để trống thì không được thêm`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});

	it('Ngày hết hạn là ngày hiện tại', () => {
		cy.get('input[kendo-date-time-picker]').clear();

		cy.get('span[aria-label="Open the date view"]').click();
		// cy.get('a[aria-label="Previous"]').click();

		// k-today k-weekend k-state-focused
		cy.get('.k-today.k-weekend.k-state-focused').click();

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
						cy.log(`Đúng test case: Ngày hết hạn là ngày hôm nay vì có thể thêm được`);
					} else {
                        throw new Error(`Lỗi: Ngày hết hạn là ngày hôm nay mà không thêm được`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});

	it('Ngày hết hạn là ngày mai', () => {
		cy.get('input[kendo-date-time-picker]').clear();

		cy.get('span[aria-label="Open the date view"]').click();
		// cy.get('a[aria-label="Previous"]').click();

		const now = new Date();
		const str = `data-value="${now.getFullYear()}/${now.getMonth()}/${now.getDate() + 1}"`;
		cy.get(`a[${str}]`).click();

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
						cy.log(`Đúng test case: Ngày hết hạn là ngày mai thì thêm được`);
					} else {
                        throw new Error(`Lỗi: Ngày hết hạn là ngày mai nhưng không thêm được`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});
});

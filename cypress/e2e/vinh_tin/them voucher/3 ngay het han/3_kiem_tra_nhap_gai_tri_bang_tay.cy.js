describe('Kiêm tra nhập giá trị ngày hết hạng thủ công', () => {
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

	it('Nhập thủ công một chuỗi bất kỳ, không phải ngày', () => {
		cy.get('input[kendo-date-time-picker]').clear();

		cy.get('input[kendo-date-time-picker]').type('fhvefhvsehfvse');

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

	it('Nhập thủ công định dạng dd/MM/yyyy hh:ss => 25/10/2024', () => {
		cy.get('input[kendo-date-time-picker]').clear();

		cy.get('input[kendo-date-time-picker]').type('25/10/2024');

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

	it('Nhập thủ công chỉ giờ hh:ss => 18:30', () => {
		cy.get('input[kendo-date-time-picker]').clear();

		cy.get('input[kendo-date-time-picker]').type('18:30');

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

	it('Nhập thủ công định dạng MM/dd/yyyy hh:ss => 10/20/2024 18:30', () => {
		cy.get('input[kendo-date-time-picker]').clear();

		cy.get('input[kendo-date-time-picker]').type('10/20/2024 18:30');

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
});

describe('Kiểm tra nhập dữ liệu chứa ký tự số và chữ cái', () => {
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

	it('Nhập toàn khoản trắng', () => {
		cy.get('input[ng-model="voucher.Code"]').type('       ');

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
						throw new Error(`Lỗi: Khoảng trắng mà lại thêm thành công`);
					} else {
						cy.log(`Đúng test case: Toàn khoảng trắng thì không được thêm`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});

	it('Nhập khoản trắng đầu chuỗi', () => {
		cy.get('input[ng-model="voucher.Code"]').type('    BFHSKS');

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

					// // Kiểm tra mã status
					// expect(response.statusCode).to.equal(400); // Đoán rằng lỗi trả về 400 Bad Request

					// Kiểm tra mã status
					if (
						response.statusCode === 200 &&
						response.body.Code.startsWith(' ') === true
					) {
						throw new Error(`Lỗi: Code chứa khoản trắng ở đầu chuỗi mà vẫn thêm được`);
					} else if (response.statusCode === 200) {
						cy.log(`Đúng test case: Khoản trắng ở đầu đã được loại bỏ trước khi thêm`);
					} else {
						throw new Error(`Lỗi: Không thêm được vào database`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});

	it('Nhập khoản trắng cuối chuỗi', () => {
		cy.get('input[ng-model="voucher.Code"]').type('SSGGGGBBV    ');

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
					if (response.statusCode === 200 &&
						response.body.Code.startsWith(' ') === true) {
						throw new Error(`Lỗi: Khoảng trắng mà lại thêm thành công`);
					} else {
						cy.log(`Đúng test case: Toàn khoảng trắng thì không được thêm`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});

	it('Nhập khoản trắng xen kẽ', () => {
		cy.get('input[ng-model="voucher.Code"]').type('B FH S K S');

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

					// // Kiểm tra mã status
					// expect(response.statusCode).to.equal(400); // Đoán rằng lỗi trả về 400 Bad Request

					// Kiểm tra mã status
					if (response.statusCode === 200 && response.body.Code.includes(' ') === true) {
						throw new Error(`Lỗi: chứa khoản trắng mà vẫn thêm được`);
					} else if (response.statusCode === 200) {
						cy.log(`Đúng test case: Khoản trắng đã được loại bỏ trước khi thêm`);
					} else {
						throw new Error(`Lỗi: Không thêm được vào database`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});
});

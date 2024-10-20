describe('Kiểm tra nhập dữ liệu với độ dài tối thiểu là 1', () => {
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

	it('Số lượng ký tự = 0', () => {
		cy.get('input[ng-model="voucher.Code"]').clear();

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
					if (response.statusCode == 200) {
						//
						throw new Error(`Lỗi: Giá trị trống mà thêm voucher được`);
					} else {
						cy.log(`Đúng test case: không được thêm voucher`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});

	it('Số lượng ký tự = 1', () => {
		cy.get('input[ng-model="voucher.Code"]').type('A');

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
					if (response.statusCode == 200) {
						//

						cy.log(`Đúng test case: thêm được voucher`);
					} else {
						throw new Error(`Lỗi: Nhập 1 ký tự nhưng không thêm voucher được`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});

	it('Số lượng ký tự = 2', () => {
		cy.get('input[ng-model="voucher.Code"]').type('AB');

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
					if (response.statusCode == 200) {
						cy.log(`Đúng test case: thêm được voucher`);
					} else {
						throw new Error(`Lỗi: Nhập 2 ký tự nhưng không thêm voucher được`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});
});

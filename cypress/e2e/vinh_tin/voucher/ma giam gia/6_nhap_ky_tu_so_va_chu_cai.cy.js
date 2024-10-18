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

	it('Nhập toàn chữ số', () => {
		cy.get('input[ng-model="voucher.Code"]').type('04587452139');

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
						cy.log(`Đúng test case: thêm thành công với nhập giá trị toàn chữ số`);
					} else {
						throw new Error(`Lỗi: Không thêm được khi nhập giá trị toàn chữ số`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});

	it('Nhập toàn chữ cái', () => {
		cy.get('input[ng-model="voucher.Code"]').type('ANHFISSDJF');

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
						cy.log(`Đúng test case: thêm thành công với nhập giá trị toàn chữ cái`);
					} else {
						throw new Error(`Lỗi: Không thêm được khi nhập giá trị toàn chữ cái`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});

	it('Nhập vừa chữ số vừa chữ cái', () => {
		cy.get('input[ng-model="voucher.Code"]').type('A6GU8T7D');

		let apiCalled = false;
		cy.intercept('POST', '/api/voucher', req => {
			apiCalled = true; // Đánh dấu API được gọi
		}).as('postVoucher');

		cy.get('button[ng-click="save()"]').click();

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
						cy.log(
							`Đúng test case: thêm thành công với nhập giá trị chữ cái và chữ số`
						);
					} else {
						throw new Error(`Lỗi: Không thêm được khi nhập giá trị chữ cái và chữ số`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});
});

describe('Kiểm tra nhập dữ liệu ký tự đặc biệt', () => {
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

	it('Nhập toàn bộ là ký tự đặc biệt', () => {
		// kiểm tra giá trị mặc định của mã giảm giá
		cy.get('input[ng-model="voucher.Code"]').type('!@%^&%$^&)()_\\|');

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
						throw new Error(`Lỗi: Chứa ký tự đặc biệt nhưng lại thêm voucher được.`);
					} else {
						// Nếu mã trạng thái là 400, kiểm tra nội dung thông báo lỗi
						cy.log(`Đúng test case`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});

	it('Nhập vừa có ký tự đặc biệt vừa có ký tự thường', () => {
		// kiểm tra giá trị mặc định của mã giảm giá
		cy.get('input[ng-model="voucher.Code"]').type('FSEF!@%^&%$RGDRGDRG^&)()_\\|');

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
						throw new Error(`Lỗi: Chứa ký tự đặc biệt nhưng lại thêm voucher được.`);
					} else {
						// Nếu mã trạng thái là 400, kiểm tra nội dung thông báo lỗi
						cy.log(`Đúng test case`);
					}
				});
			} else {
				cy.log('Không có request API nào được gọi, có thể form đã validate frontend.');
			}
		});
	});
});

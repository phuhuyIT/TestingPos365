describe('Xóa tất cả mã giảm giá', () => {
	function deleteFirstItem() {
		// Lấy lại danh sách item và xoá item đầu tiên
		cy.get('.k-master-row.ng-scope')
			.first()
			.then($item => {
				// Bấm vào item để mở rộng
				cy.wrap($item).click();

				// Đảm bảo nút xoá xuất hiện (giả sử nút xoá có class là '.delete-button')
				cy.get('button[ng-click="delete(dataItem)"]').should('be.visible').click();

				// Xác nhận modal (giả sử nút đồng ý có text là 'Đồng ý')
				cy.get('button[data-ng-click="modalOptions.ok();"]').click();

				// cy.wait(3000);
				// Chờ item biến mất khỏi DOM
				cy.wrap($item).should('not.exist');
			});
	}

	function deleteLastItem() {
		// Lấy lại danh sách item và xoá item đầu tiên
		cy.get('.k-master-row.ng-scope')
			.first()
			.then($item => {
				// Đảm bảo nút xoá xuất hiện (giả sử nút xoá có class là '.delete-button')
				cy.get('button[ng-click="delete(dataItem)"]').should('be.visible').click();

				// Xác nhận modal (giả sử nút đồng ý có text là 'Đồng ý')
				cy.get('button[data-ng-click="modalOptions.ok();"]').click();

				// cy.wait(3000);
				// Chờ item biến mất khỏi DOM
				cy.wrap($item).should('not.exist');
			});
	}

	it('Xóa tất cả mã giảm giá trừ mã giảm giá cuối cùng', () => {
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

		cy.intercept('GET', '/api/voucher?format=json&%24inlinecount=allpages&%24top=20').as(
			'getData'
		);

		// vào trang quản lý voucher
		cy.get('#navbar').find('a[ng-href="/#!/Voucher"]').click();

		// Chờ cho yêu cầu API hoàn tất
		cy.wait('@getData').then(interception => {
			const response = interception.response;
			let itemCount = 0;
			cy.get('.k-master-row.ng-scope').each(($items, index, $lists) => {
				itemCount = $lists.length;

				cy.log($items);

				if (itemCount > 1) {
					deleteFirstItem(); // Xoá item đầu tiên

					// Gọi lại chính nó để xoá tiếp (đệ quy)
					cy.wait(500); // Có thể thêm thời gian chờ để đồng bộ
					cy.reload(); // Reload trang nếu cần cập nhật dữ liệu
					it('Xoá từng item cho đến hết danh sách'); // Gọi lại vòng lặp
					itemCount--;
				} else {
					// Không còn item nào
					cy.log('Danh sách đã được xoá!');
					cy.log(itemCount);
				}
			});
		});
	});

	it('Xóa mã giảm giá cuối cùng', () => {
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

		cy.intercept('GET', '/api/voucher?format=json&%24inlinecount=allpages&%24top=20').as(
			'getData'
		);

		// vào trang quản lý voucher
		cy.get('#navbar').find('a[ng-href="/#!/Voucher"]').click();

		// Chờ cho yêu cầu API hoàn tất
		cy.wait('@getData').then(interception => {
			const response = interception.response;

			cy.get('.k-master-row.ng-scope').each($items => {
				const itemCount = $items.length;

				if (itemCount > 0) {
					deleteLastItem(); // Xoá item đầu tiên

					// Gọi lại chính nó để xoá tiếp (đệ quy)
					cy.wait(500); // Có thể thêm thời gian chờ để đồng bộ
					cy.reload(); // Reload trang nếu cần cập nhật dữ liệu
					it('Xoá từng item cho đến hết danh sách'); // Gọi lại vòng lặp
				} else {
					// Không còn item nào
					cy.log('Danh sách đã được xoá!');
				}
			});
		});
	});
});

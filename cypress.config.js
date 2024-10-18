const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		defaultCommandTimeout: 10000, // Tăng timeout mặc định lên 10 giây
	},
});

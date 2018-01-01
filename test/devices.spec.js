describe('Devices page', () => {
	beforeAll(() => {
		browser.get('https://demo.ubnt.com/manage/site/default/devices/1/50');
		browser.driver.manage().window().maximize();
	});

	describe('Table filtering', () => {
		it('Gateway and Switches filter displays name with counter', () => {

		// Get filter name and counter
		let filter_name = element(by.id('filterButton-deviceType-gatewaySwitches')).all(by.css('.ng-binding')).get(0).getText();
		let filter_counter = element(by.id('filterButton-deviceType-gatewaySwitches')).all(by.css('.ng-binding')).get(1).getText();
	
		// Select filter
		element(by.id('filterButton-deviceType-gatewaySwitches')).click();
	
		// Get actual number of devices
		let switches = element.all(by.css('.deviceName.ng-binding'));
	
		// Verify filter name
		let expected_name = browser.params.expected_filter_name
		expect(filter_name).toEqual(expected_name);
	
		// Verify filter counter
		switches.count().then(function(text) {
			let expected_counter = "(" + text + ")";
			expect(filter_counter).toEqual(expected_counter);
			console.log("Filter name is correct and equal to: " + expected_name + " " +  expected_counter);
			});
		});

		it('Gateway and Switches filter returns only matching devices', () => {
	
			// Get list of all filtered device models
			element.all(by.css('.deviceModel')).getText().then(function(device_list) {
				//remove title element
				device_list.splice(0, 1)
				for (i in device_list) {
					console.log("Verify if '%s' contains 'Switch' or 'Gateway'", device_list[i]);
					expect(device_list[i]).toMatch(/Gateway|Switch/);
				};
			});	
		});
	});

	describe('Table searching', () => {
		it('Search by "B-B" returns only matching devices', () => {

		// Select 'ALL' filter again
		element(by.id('filterButton-deviceType-all')).click();
	
		// Search by B-B
		let search_box = element(by.css('input[name=search]'));

		search_box.sendKeys('B-B');

		// Get device list out of search result
		element.all(by.css('.deviceName.ng-binding')).getText().then(function(device_list) {
			//remove title element
			device_list.splice(0, 1)
			for (i in device_list) {
				console.log("Verify if '%s' contains 'B-B'", device_list[i]);
				expect(device_list[i]).toContain('B-B');
			};
		});
		
		search_box.clear();
		});
	});

	describe('Device actions', () => {
		it('Clicking on Upgrade button open confirm modal', () => {
	
		// Click Upgrade button for first device
		element(by.cssContainingText('.button__label', 'Upgrade')).click();
	
		console.log("Verify if Confirmation Modal shows up after clicking 'Upgrade' button")
		expect(element(by.id('confirmModal')).isPresent()).toBe(true);
	
		browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
		});
	});

	describe('Property panel', () => {
		it('Gateway details contains IP address of device', () => {
	
		let gateway_row = element(by.xpath("//tr[td[text()='Gateway']]"));
	
		// Get expected IP address of 'Gateway' device
		let expected_ip = gateway_row.element(by.css('.deviceIp')).getText();

		// Click Gateway from the list to display 'Property' panel
		gateway_row.click()
	
		// Get actual value of the IP Address in 'Property' panel
		let ip_field_name = element(by.css('.ipAddress')).all(by.css('.ng-binding')).get(0).getText();
		let ip_field_value = element(by.css('.ipAddress')).all(by.css('.ng-binding')).get(1).getText();
	
		console.log("Verify if correct IP address of 'Gateway' device is displayed in 'Property' panel");
		let expected_ip_field_name = browser.params.expected_ip_field_name
		expect(ip_field_name).toEqual(expected_ip_field_name);
		expect(ip_field_value).toEqual(expected_ip);
		});
	});
});

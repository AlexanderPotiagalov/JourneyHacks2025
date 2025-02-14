const { Builder, By, until } = require('selenium-webdriver');

(async function scrape(url) {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get(toString(url));

        await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Log in')]")), 10000);
        let loginButton = await driver.findElement(By.xpath("//button[contains(text(), 'Log in')]"));
        await loginButton.click();

        // login flow depends on method
        // Add handling for login 

        await driver.wait(until.elementLocated(By.css('.profileCard__card')), 15000);

        // extract data
        let name = await driver.findElement(By.css('.profileCard__name')).getText();
        let age = await driver.findElement(By.css('.profileCard__age')).getText();
        let bio = await driver.findElement(By.css('.profileCard__bio')).getText();

        let profileData = {
            name: name.trim(),
            age: parseInt(age, 10),
            bio: bio.trim(),
            scraped_at: new Date().toISOString()
        };

        fs.writeFileSync('scraped.json', JSON.stringify(profileData, null, 2));
        console.log('Profile data saved to scraped.json');

    } catch (error) {
        console.error('An error occured:', error);
    } finally {
        await driver.quit();
    }
})();
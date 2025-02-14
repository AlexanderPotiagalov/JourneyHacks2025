import { Builder, By, until } from "selenium-webdriver";

async function scrapeProfile(url) {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get(toString(url));

    await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(),'Log in')]")),
      10000
    );
    let loginButton = await driver.findElement(
      By.xpath("//button[contains(text(), 'Log in')]")
    );
    await loginButton.click();

    await driver.wait(
      until.elementLocated(By.css(".profileCard__card")),
      15000
    );

    let name = await driver.findElement(By.css(".profileCard__name")).getText();
    let age = await driver.findElement(By.css(".profileCard__age")).getText();
    let bio = await driver.findElement(By.css(".profileCard__bio")).getText();

    return {
      name: name.trim(),
      age: parseInt(age, 10),
      bio: bio.trim(),
      scraped_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error("An error occurred:", error);
    return { error: "Failed to scrape profile" };
  } finally {
    await driver.quit();
  }
}

export default scrapeProfile;

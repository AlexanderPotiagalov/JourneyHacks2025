import { Builder, By, until } from "selenium-webdriver";

async function scrapeProfile(profileURL) {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    console.log(`Opening Tinder profile: ${profileURL}`);
    await driver.get(profileURL); // ✅ Visit the provided URL

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

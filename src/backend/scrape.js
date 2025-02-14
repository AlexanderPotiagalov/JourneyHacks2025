import { Builder, By, until } from "selenium-webdriver";

async function scrapeProfile(profileURL) {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    console.log(`Opening Tinder profile: ${profileURL}`);
    await driver.get(profileURL);

    // Wait for the main profile card to load
    await driver.wait(
      until.elementLocated(By.css(".profileCard__card")),
      600000
    );

    // --- Attempt to handle the popup ---
    // Replace '.tinder-popup' with the actual selector of the popup element
    try {
      // Wait up to 5 seconds for the popup to appear
      let popup = await driver.wait(
        until.elementLocated(By.css(".tinder-popup")),
        5000
      );
      if (popup) {
        console.log("Popup detected. Simulating interaction to keep it open.");
        // Option 1: Hover over the popup to simulate a user interaction.
        await driver.actions().move({ origin: popup }).perform();
        // Option 2 (uncomment if you prefer to close the popup instead):
        // const closeButton = await popup.findElement(By.css(".popup-close-button"));
        // await closeButton.click();
        
        // Optionally wait a moment to ensure the popup stays active
        await driver.sleep(3000);
      }
    } catch (popupError) {
      // No popup appeared; continue as normal
      console.log("No popup detected.");
    }
    // --- End popup handling ---

    // Proceed to scrape the profile data
    let name = await driver.findElement(By.css(".profileCard__name")).getText();
    let age = await driver.findElement(By.css(".profileCard__age")).getText();
    let bio = await driver.findElement(By.css(".profileCard__bio")).getText();

    let profileData = {
      name: name.trim(),
      age: parseInt(age, 10),
      bio: bio.trim(),
      scraped_at: new Date().toISOString(),
    };
    
    FileSystem.writeFileSync("profileData.json", JSON.stringify(profileData, null, 2));
  } catch (error) {
    console.error("An error occurred:", error);
    return { error: "Failed to scrape profile" };
  } finally {
    // Uncomment to close the browser when done
    // await driver.quit();
  }
}

export default scrapeProfile;
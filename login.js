const { Builder, By, until } = require('selenium-webdriver');

// Define login credentials
const number = "0551442563";
const password = "Esther";

// Reusable login function
async function loginWithBrowser(browserName) {
    let driver;

    try {
        // Create browser driver
        driver = await new Builder().forBrowser(browserName).build();
        await driver.manage().window().maximize();

        // Go to login page
        
        await driver.get("http://159.8.238.90:8006/auth/login");
        await driver.sleep(7000);
        let phone_number = driver.findElement(By.xpath("/html/body/app-root/app-auth-layout/main/section[2]/div[2]/app-login/main/div[2]/form/div[1]/app-country-picker/main/div/div[2]/input"))
        await phone_number.sendKeys(number)
        await driver.sleep(5000)
        let phone_password = driver.findElement(By.xpath("/html/body/app-root/app-auth-layout/main/section[2]/div[2]/app-login/main/div[2]/form/div[2]/app-password-input/main/div/div[1]/input"))
        await phone_password.sendKeys(password)
        await driver.sleep(5000)

        //click on a button
        await driver.findElement(By.className("button_primary")).click()
        await driver.sleep(5000)
         // First try: check for alert
  // Wait up to 5s for error message to appear
    try {
      const errorMsg = await driver.wait(
        until.elementLocated(By.xpath("/html/body/app-error/div/div[1]/p")),
        5000
      );
      const text = await errorMsg.getText();
      console.log("❌ Login failed. Error message:", text);
    } catch (e) {
      // If no error, check if login was successful (e.g., dashboard visible)
      try {
        const dashboard = await driver.wait(
          until.elementLocated(By.xpath("//h2[contains(text(),'Welcome')]")), // Replace with your actual dashboard element
          5000
        );
        console.log("✅ Login successful!");
      } catch (e) {
        console.log("⚠️ Neither error nor dashboard found. Something's wrong.");
      }
    }
        //click on profile
        await driver.findElement(By.xpath("/html/body/app-root/app-main-layout/main/app-navbar/main/div[3]/img[3]")).click()
        await driver.sleep(5000)

        //sign out  and tries with invalid credentials
        //sign out button
        await driver.findElement(By.xpath("/html/body/app-root/app-main-layout/main/app-navbar/div/app-side-menu/main/div[1]/div[2]/app-custom-button[2]/button")).click
        driver.sleep(3000)

        
        

        

    } catch (err) {
        console.error(`❌ Login test failed on ${browserName}:`, err.message);
    } finally {
        await driver.sleep(8000);
        await driver.quit();
    }
}

// Test in multiple browsers
(async function runTests() {
    await loginWithBrowser('chrome')
    // await loginWithBrowser('firefox')
    // await loginWithBrowser('MicrosoftEdge'); // Use 'MicrosoftEdge' on Windows
})();

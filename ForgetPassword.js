const { Builder, By, until } = require('selenium-webdriver');

const number = "0551";
const password = "1234"

// Forget Password
async function ForgetPassword(browserName) {
    let driver;

    try {
        // Create browser driver
        driver = await new Builder().forBrowser(browserName).build();
        await driver.manage().window().maximize();

        // Go to login page
        
        await driver.get("http://159.8.238.90:8006/auth/login");

        //click on forget Password
        await driver.findElement(By.xpath("/html/body/app-root/app-auth-layout/main/section[2]/div[2]/app-login/main/div[2]/form/p")).click()

        let phone_number = await driver.findElement(By.xpath("/html/body/app-root/app-auth-layout/main/section[2]/div[2]/app-forgot-password/main/div[2]/form/div[1]/app-country-picker/main/div/div[2]/input"))
        phone_number.sendKeys(number)
        driver.sleep(3000)
        // Check if the red alert message is shown
        let invalid_number = "/html/body/app-root/app-auth-layout/main/section[2]/div[2]/app-forgot-password/main/div[2]/form/div[1]/div";

        try {
            let alertElement = await driver.wait(until.elementLocated(By.xpath(invalid_number)), 3000);
            let alertText = await alertElement.getText();
            console.log("❌ Validation Alert: " + alertText);
        } catch {
            console.log("✅ No alert. Phone number may be valid.");
        }
        

        
        
        

        

    } catch (err) {
        console.error(`❌ Login test failed on ${browserName}:`, err.message);
    } finally {
        await driver.sleep(8000);
        await driver.quit();
    }
}

// Test in multiple browsers
(async function runTests() {
    await ForgetPassword('chrome')
    await ForgetPassword('firefox')
    await ForgetPassword('MicrosoftEdge'); // Use 'MicrosoftEdge' on Windows
})();

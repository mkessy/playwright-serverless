// Create clients and set shared const values outside of the handler.
import chromeAwsLambda from "chrome-aws-lambda";
import playwright from "playwright-core";

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
exports.renderScreenshot = async (event: unknown) => {
  const browser = await playwright.chromium.launch({
    args: chromeAwsLambda.args,
    executablePath: await chromeAwsLambda.executablePath,
    headless: chromeAwsLambda.headless,
  });

  const page = await browser.newPage();
  await page.goto("https://www.google.com");
  const title = await page.evaluate(() => document.title);

  const response = {
    statusCode: 200,
    body: title,
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};

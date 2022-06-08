// Create clients and set shared const values outside of the handler.
import chromeAwsLambda from "chrome-aws-lambda";
import playwright from "playwright-core";
import {
  Context,
  APIGatewayProxyResult,
  APIGatewayEvent,
  APIGatewayProxyHandler,
} from "aws-lambda";

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
const renderScreenshot: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  const browser = await playwright.chromium.launch({
    args: chromeAwsLambda.args,
    executablePath: await chromeAwsLambda.executablePath,
    headless: chromeAwsLambda.headless,
  });

  if (!event.body) {
    return {
      body: "Error: No Url Provided",
      statusCode: 403,
    };
  }
  const { url } = JSON.parse(event.body);

  const page = await browser.newPage();
  await page.goto(url);
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

exports.renderScreenshot = renderScreenshot;

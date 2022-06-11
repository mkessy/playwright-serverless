// Create clients and set shared const values outside of the handler.
import chromeAwsLambda from "chrome-aws-lambda";
import playwright from "playwright-core";
import {
  Context,
  APIGatewayProxyResult,
  APIGatewayEvent,
  APIGatewayProxyHandler,
  SQSEvent,
} from "aws-lambda";

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
const renderHTML = async (event: SQSEvent, context: Context) => {
  /* const browser = await playwright.chromium.launch({
    args: chromeAwsLambda.args,
    executablePath: await chromeAwsLambda.executablePath,
    headless: chromeAwsLambda.headless,
  }) */

  const receivedEvents = event.Records.map(
    ({ messageId, messageAttributes, body }) => ({
      messageId,
      messageAttributes,
      body,
    })
  ).reduce((prev, curr) => `${prev}######${curr}`, "");

  const response = {
    statusCode: 200,
    body: JSON.stringify(receivedEvents),
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};

exports.renderHTML = renderHTML;

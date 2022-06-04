// Create clients and set shared const values outside of the handler.

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
exports.renderScreenshot = async (event: unknown) => {
  const response = {
    statusCode: 200,
    body: "hello",
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Create clients and set shared const values outside of the handler.
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
const playwright_core_1 = __importDefault(require("playwright-core"));
/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
exports.renderScreenshot = async (event) => {
    const browser = await playwright_core_1.default.chromium.launch({
        args: chrome_aws_lambda_1.default.args,
        executablePath: await chrome_aws_lambda_1.default.executablePath,
        headless: chrome_aws_lambda_1.default.headless,
    });
    const { url } = event.data;
    const page = await browser.newPage();
    await page.goto("https://www.google.com");
    const title = await page.evaluate(() => document.title);
    const response = {
        statusCode: 200,
        body: title,
    };
    // All log statements are written to CloudWatch
    console.info(`response from: ${event} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};

import {DynamoDBClient, PutItemCommand, PutItemCommandOutput} from "@aws-sdk/client-dynamodb";

const client: DynamoDBClient = new DynamoDBClient({region: process.env.REGION!!});
export const saveEmailOTP = async (email: string, otpCode: string) => {
  const command: PutItemCommand = new PutItemCommand({
    TableName: "OTPCodes",
    Item: {
      email: {S: email},
      OTPCode: {S: otpCode},
    }
  });

  try {
    console.log(`Saving OTP for email ${email}`)
    const result: PutItemCommandOutput = await client.send(command);
    console.log("Successfully saved the OTP for:", email);
    return result;
  } catch (error) {
    console.error(`Error saving OTP for email ${email}:`, error);
  }
}

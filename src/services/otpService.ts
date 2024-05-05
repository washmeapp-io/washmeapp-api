import {DynamoDBClient, PutItemCommand, PutItemCommandOutput} from "@aws-sdk/client-dynamodb";
import {getSecrets} from "../secrets";

export const saveEmailOTP = async (email: string, otpCode: string) => {
  try {
    const client: DynamoDBClient = new DynamoDBClient({region: process.env.REGION!});
    console.log(`saveEmailOTP - received request to save otp ${otpCode} for email ${email}`);
    const {DYNAMODB_SECRET_NAME, REGION} = process.env;
    const dynamodbSecrets = await getSecrets({secretName: DYNAMODB_SECRET_NAME!, region: REGION!});
    console.log(`saveEmailOTP - obtained dynamodb secrets ${JSON.stringify(dynamodbSecrets)}`);

    const command: PutItemCommand = new PutItemCommand({
      TableName: dynamodbSecrets["otpCodesTableName"],
      Item: {
        email: {S: email},
        OTPCode: {S: otpCode},
      }
    });

    console.log(`saveEmailOTP - PutItemCommand for OTP ${otpCode} into dynamoDB for email ${email}`)
    const result: PutItemCommandOutput = await client.send(command);
    console.log(`saveEmailOTP - Successfully saved the OTP ${otpCode} for email ${email}`);
    return result;
  } catch (error) {
    console.error(`saveEmailOTP - Error saving OTP for email ${email}:`, error);
  }
}

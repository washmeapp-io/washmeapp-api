import {CreateTableCommand, DynamoDBClient} from "@aws-sdk/client-dynamodb";

const client: DynamoDBClient = new DynamoDBClient({region: process.env.REGION ?? 'us-east-1'});
export const createTable = async (name: string) => {
  const command: CreateTableCommand = new CreateTableCommand({
    TableName: "OTPCodes",
    // For more information about data types,
    // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes and
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
    AttributeDefinitions: [
      {
        AttributeName: "OTPCode",
        AttributeType: "S",
      },
      {
        AttributeName: "SentDate",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "OTPCode",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });
  await client.send(command);
}

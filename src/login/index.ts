import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

export default async function (username: string, password: string) {
  const signInParams = {
    AuthFlow: AuthFlowType.CUSTOM_AUTH,
    ClientId: process.env.USER_POOL_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
    },
  };

  try {
    const response = await client.send(new InitiateAuthCommand(signInParams));
    return {
      statusCode: 200,
      body: JSON.stringify(response.AuthenticationResult),
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
}

import {
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import { getSecrets } from "../secrets";

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

export default async function (username: string) {
  const secrets = await getSecrets({ secretName: "cognitoScrets" });
  console.log("secrets here");
  console.log(secrets);
  const signInParams: InitiateAuthCommandInput = {
    AuthFlow: AuthFlowType.CUSTOM_AUTH,
    ClientId: secrets["userPoolClientId"],
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
    if (error.message === "User does not exist.") {
      console.log(`User does not exist, creating new user ${username}`);
      try {
        const createUserParams: AdminCreateUserCommandInput = {
          UserPoolId: secrets["userPoolId"],
          Username: username,
          UserAttributes: [
            {
              Name: "email",
              Value: username,
            },
          ],
          MessageAction: "SUPPRESS", // Use this to prevent sending a confirmation email immediately
        };
        await client.send(new AdminCreateUserCommand(createUserParams));
        const signInParams: InitiateAuthCommandInput = {
          AuthFlow: AuthFlowType.CUSTOM_AUTH,
          ClientId: secrets["userPoolClientId"],
          AuthParameters: {
            USERNAME: username,
          },
        };
        const response = await client.send(
          new InitiateAuthCommand(signInParams)
        );
        return {
          statusCode: 200,
          body: JSON.stringify(response.AuthenticationResult),
        };
      } catch (createError: any) {
        console.log(
          `Someting went wrong trying to create user and sign in ${username}`
        );
        console.error(createError);
        return {
          statusCode: 400,
          body: JSON.stringify({ message: createError.message }),
        };
      }
    } else {
      console.log(`Someting went wrong trying to sign in ${username}`);
      console.error(error);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.message }),
      };
    }
  }
}

import {defineAuthChallenge, createAuthChallenge} from "./cognito";
import login from "./login";
import { getNotFoundResponse } from "./utils";

export const handleCognitoTriggerEvents = async (event: any) => {
  console.log(`Received cognito trigger ${event.triggerSource}`);
  switch (event.triggerSource) {
    case "DefineAuthChallenge_Authentication":
      return defineAuthChallenge(event);
    case "CreateAuthChallenge_Authentication":
      return await createAuthChallenge(event)
    case "VerifyAuthChallengeResponse_Authentication":
      console.log("VerifyAuthChallengeResponse_Authentication here");
      // Handle verify auth challenge response logic here
      break;
    // Add other cases as needed
    default:
      // Handle unexpected trigger sources or provide a default response
      break;
  }
  // Return the event object back to Cognito
  return event;
};

export const handleHttpRequests = (event: any) => {
  const httpMethod = event.httpMethod;
  const path = event.path;
  console.log(`Received method ${httpMethod} in the path ${path}`);
  // Attempt to parse the request body if present
  let requestBody;
  if (event.body) {
    try {
      requestBody = JSON.parse(event.body);
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid JSON format in request body.",
        }),
      };
    }
  }

  const resource = `${httpMethod}-${path}`;
  switch (resource) {
    case "POST-/users/login":
      if (requestBody && requestBody.username) {
        return login(requestBody.username);
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "Please verify the inputs",
          }),
        };
      }
      break;

    default:
      getNotFoundResponse(path, httpMethod);
  }

  return getNotFoundResponse(path, httpMethod);
};

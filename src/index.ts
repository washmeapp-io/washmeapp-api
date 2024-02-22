import { handleCognitoTrigger } from "./cognito";
import login from "./login";

export const handler = async (event: any): Promise<any> => {
  if (event.triggerSource) {
    console.log(`received trigger ${event.triggerSource}`);
    handleCognitoTrigger(event);
  } else {
    // Extract the HTTP method and path from the event object
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
  }
};

function getNotFoundResponse(path: string, httpMethod: string) {
  return {
    statusCode: 400,
    body: JSON.stringify({ message: "NOT FOUND", path, httpMethod }),
  };
}

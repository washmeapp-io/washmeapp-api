export const handler = async (event: any): Promise<any> => {
  // Extract the HTTP method and path from the event object
  const httpMethod = event.httpMethod;
  const path = event.path;

  console.log(`HTTP Method: ${httpMethod}`);
  console.log(`Path: ${path}`);

  const message = `Hello World from washme app! Invoked by ${path} with ${httpMethod} method.`;

  console.log(`Returning message: ${message}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ message, path, httpMethod }),
  };
};

export const createAuthChallenge = (event: any) => {
  console.log("CreateAuthChallenge_Authentication here");

  // Generate a unique one-time code (OTC) for authentication
  const oneTimeCode = Math.random().toString(10).substr(2, 6); // Example: generate a 6-digit code
  console.log("ONE TIME CODE IS", oneTimeCode, "EMAIL", event.request.userAttributes.email)

  // Ideally, save this code along with the user identifier in a secure, temporary store (DynamoDB, etc.)
  // You'll need to verify this code in the VerifyAuthChallengeResponse trigger

  // Send the code to the user's email. Implement this part according to your email sending mechanism.
  // sendEmail(event.request.userAttributes.email, oneTimeCode);

  // Set the challenge metadata so you can verify it later

  event.response.publicChallengeParameters = {
    // This information will be public to the client (e.g., the app calling Cognito)
    email: event.request.userAttributes.email
  };

  // Add the secret login code to the private challenge parameters
  // so it can be verified by the VerifyAuthChallengeResponse trigger
  event.response.privateChallengeParameters = {
    answer: oneTimeCode,
  };

  // Specify the challenge you expect the user to complete upon next request
  event.response.challengeMetadata = 'PASSWORDLESS_LOGIN_CHALLENGE';

  return event;
};

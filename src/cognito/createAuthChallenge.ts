import {saveEmailOTP} from "../services/otpService";
import {sendEmailMessage} from "../services/emailService";

export default async function createAuthChallenge(event: any) {
  console.log("CreateAuthChallenge_Authentication here");

  // Generate a unique one-time code (OTC) for authentication
  const oneTimeCode = Math.random().toString(10).substr(2, 6);
  await saveEmailOTP(event.request.userAttributes.email, oneTimeCode)
  await sendEmailMessage(event.request.userAttributes.email, oneTimeCode)

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

import {saveEmailOTP} from "../services/otpService";
import {sendEmailMessage} from "../services/emailService";

export default async function createAuthChallenge(event: any, _context: any) {
  console.log('createAuthChallenge - Handling Cognito trigger CreateAuthChallenge_Authentication');

  if (!event.request.session || event.request.session.length === 0 || !event.request.session.find((challenge: any) => challenge.challengeResult)) {
    // Generate a unique one-time code (OTC) for authentication
    const oneTimeCode = Math.random().toString(10).substr(2, 6);
    console.log(`createAuthChallenge - Generated new OTP Code ${oneTimeCode} for email ${event.request.userAttributes.email}`);

    await sendEmailMessage(event.request.userAttributes.email, oneTimeCode)
    // We already have the OTP, we don't need to wait for save in dynamo
    saveEmailOTP(event.request.userAttributes.email, oneTimeCode)

    // Set the challenge metadata so you can verify it later

    event.response.publicChallengeParameters = {
      // This information will be public to the client (e.g., the app calling Cognito)
      email: event.request.userAttributes.email
    };

    // Add the secret login code to the private challenge parameters
    // so it can be verified by the VerifyAuthChallengeResponse trigger
    console.log('createAuthChallenge - Storing privateChallengeParameters.answer');
    event.response.privateChallengeParameters = {
      answer: oneTimeCode,
    };
  }


  console.log('createAuthChallenge - Handled Cognito trigger CreateAuthChallenge_Authentication');
  return event;
};

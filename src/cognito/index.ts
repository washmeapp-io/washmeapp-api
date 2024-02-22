export const handleCognitoTrigger = async (event: any): Promise<any> => {
  // Here, you'll handle the Cognito event.
  // For example, customize the message for OTP
  if (
    event.triggerSource === "CustomMessage_SignUp" ||
    event.triggerSource === "CustomMessage_Authentication"
  ) {
    console.log("CustomMessage_SignUp or CustomMessage_Authentication here");
    // Customize your message here
    event.response.emailSubject = "Your Custom OTP Message";
    event.response.emailMessage = `Your verification code: ${event.request.codeParameter}`;
  }
  switch (event.triggerSource) {
    case "DefineAuthChallenge_Authentication":
      console.log("DefineAuthChallenge_Authentication here");
      // Handle define auth challenge logic here
      break;
    case "CreateAuthChallenge_Authentication":
      console.log("CreateAuthChallenge_Authentication here");
      // Handle create auth challenge logic here
      break;
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

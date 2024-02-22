export const handleCognitoTrigger = async (event: any): Promise<any> => {
  // Here, you'll handle the Cognito event.
  // For example, customize the message for OTP
  if (
    event.triggerSource === "CustomMessage_SignUp" ||
    event.triggerSource === "CustomMessage_Authentication"
  ) {
    // Customize your message here
    event.response.emailSubject = "Your Custom OTP Message";
    event.response.emailMessage = `Your verification code: ${event.request.codeParameter}`;
  }
  return event;
};

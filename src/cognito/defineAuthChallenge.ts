export default function (event: any) {
  console.log("Handling Cognito trigger DefineAuthChallenge_Authentication");
  // Handle define auth challenge logic here
  if (event.request.session && event.request.session.length === 0) {
    // Instruct Cognito to initiate the custom auth flow and present a challenge to the user
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = "OTP_CHALLENGE";
  } else {
    // Evaluate the session to determine if the user has successfully completed all challenges
    // Assume the user has provided the correct answer for simplicity
    const lastChallenge = event.request.session.slice(-1)[0];
    if (lastChallenge.challengeResult === true) {
      // Issue tokens if all challenges are met
      event.response.issueTokens = true;
      event.response.failAuthentication = false;
    } else {
      // Fail authentication if the user has not met all challenges
      event.response.issueTokens = false;
      event.response.failAuthentication = true;
    }
  }
  return event
}

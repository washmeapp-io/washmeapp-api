export default async function verifyAuthChallenge(event: any, context: any) {
  console.log(`Handling Cognito trigger VerifyAuthChallengeResponse_Authentication - Request Id ${context.awsRequestId}`, JSON.stringify(event));

  // Retrieve the user's answer and the correct answer from the private challenge parameters
  const userAnswer = event.request.challengeAnswer;
  const correctAnswer = event.request.privateChallengeParameters.answer;
  console.log("User answer: " + userAnswer);
  console.log("Correct answer: " + correctAnswer);

  // Verify the user's answer
  event.response.answerCorrect = userAnswer === correctAnswer;

  console.log("Returning event: event.response.answerCorrect", event.response.answerCorrect);
  console.log(`Handled Cognito trigger VerifyAuthChallengeResponse_Authentication - Request Id ${context.awsRequestId}`, JSON.stringify(event));
  return event;
};

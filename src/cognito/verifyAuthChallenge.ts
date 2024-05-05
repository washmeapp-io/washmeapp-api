export default async function verifyAuthChallenge(event: any, context: any) {
  console.log(`verifyAuthChallenge - Handling Cognito trigger VerifyAuthChallengeResponse_Authentication ${JSON.stringify(event)}`);

  // Retrieve the user's answer and the correct answer from the private challenge parameters
  const userAnswer = event.request.challengeAnswer;
  console.log("verifyAuthChallenge - User answer: " + userAnswer);
  const correctAnswer = event.request.privateChallengeParameters ? event.request.privateChallengeParameters.answer : 'no-response';
  console.log("verifyAuthChallenge - Correct answer: " + correctAnswer);

  // Verify the user's answer
  event.response.answerCorrect = userAnswer === correctAnswer;

  console.log("verifyAuthChallenge - event.response.answerCorrect", event.response.answerCorrect);
  console.log(`verifyAuthChallenge - Handled Cognito trigger VerifyAuthChallengeResponse_Authentication, ${JSON.stringify(event)}`);
  return event;
};

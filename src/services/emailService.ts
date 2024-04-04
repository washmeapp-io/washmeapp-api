import {SESClient, SendEmailCommand, SendEmailCommandInput, SendEmailCommandOutput} from "@aws-sdk/client-ses";

// Create an SES client
const sesClient = new SESClient({region: process.env.REGION!});

export const sendEmailMessage = async (recipientEmail: string, otpCode: string,) => {
  const params: SendEmailCommandInput = {
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Text: {
          Data: `Your code is ${otpCode}`
        }
      },
      Subject: {
        Data: "Verify your email address",
      },
    },
    Source: "aprendewebnodejs@gmail.com", // once we have the domain we can use any@<domain.com>
  };

  try {
    const command: SendEmailCommand = new SendEmailCommand(params);
    const response: SendEmailCommandOutput = await sesClient.send(command);
    console.log(response)
    console.log(`Email verification sent to: ${recipientEmail}`);
  } catch (error) {
    console.error("An error occurred", error);
  }
}

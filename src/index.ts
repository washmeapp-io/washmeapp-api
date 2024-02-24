import { handleCognitoTriggerEvents, handleHttpRequests } from "./handlers";

export const handler = async (event: any): Promise<any> => {
  if (event.triggerSource) {
    return handleCognitoTriggerEvents(event);
  } else {
    return handleHttpRequests(event);
  }
};

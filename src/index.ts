import { handleCognitoTriggerEvents, handleHttpRequests } from "./handlers";

export const handler = async (event: any): Promise<any> => {
  if (event.triggerSource) {
    handleCognitoTriggerEvents(event);
  } else {
    handleHttpRequests(event);
  }
};

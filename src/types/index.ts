type WebHook = {
  eventName: string;
  webhookUrl: string[];
};

type Task = {
  eventName: string;
  webhookUrl: string[];
  payload: Object;
  consume: Function;
};

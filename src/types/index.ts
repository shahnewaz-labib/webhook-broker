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

type MainQueueJob = {
  eventName: string;
  webhookUrl: string;
  payload: Object;
};

type DeadLetterJob = {
  originalJobId: string;
  eventName: string;
  webhookUrl: string;
  payload: Object;
};

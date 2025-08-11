import { OrderEvent, TOPIC_TYPE } from "../../types";

export interface PublishType {
    headers:Record<string,any>;
    topic:TOPIC_TYPE;
    event:OrderEvent;
    message:Record<string,any>;
}


export type MessageBrokerType = {
    // producer
    connectProducer:<T>() => Promise<T>;
    disconnectProducer:() => Promise<void>;
    publish: (data:PublishType) => Promise<boolean>;

    // consumer
    connectConsumer:<T>() => Promise<T>;
    disconnectConsumer:() => Promise<void>;
    subscribe:(messageHandler:Function,topic:string) => Promise<void>;
}
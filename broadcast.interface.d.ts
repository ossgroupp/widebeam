import SNS from 'aws-sdk/clients/sns';
export interface BroadcastFactoryArguments extends SNS.Types.ClientConfiguration {
    arns: Record<string, string>;
    log?: (...args: any[]) => any;
}
export declare type SnsFactory = (...args: any) => SNS;
export declare type BroadcastFunction<Concern extends string, Event extends string, Meta> = (concern: Concern, event: Event, meta?: Meta) => Promise<string>;
export declare type BroadcastFactory = <Concern extends string = string, Event extends string = string, Meta = Record<string, any>>(args: BroadcastFactoryArguments, snsFactory?: SnsFactory) => BroadcastFunction<Concern, Event, Meta>;

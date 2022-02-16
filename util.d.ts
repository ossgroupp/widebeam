export declare const fakeSnsFactory: (url: any, request: any, log?: any) => () => {
    publish({ Message, TopicArn }: {
        Message: any;
        TopicArn: any;
    }): {
        promise: () => any;
    };
};

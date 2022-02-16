"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeSnsFactory = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
exports.fakeSnsFactory = (url, request, log = debug_1.default('widebeam')) => () => {
    log('Creating fake SNS instance.');
    return {
        publish({ Message, TopicArn }) {
            const promise = url
                ? () => request({
                    url,
                    method: 'POST',
                    json: true,
                    body: JSON.parse(Message),
                    qs: {
                        arn: TopicArn,
                    },
                }).catch(e => {
                    log('Failed to send fake sns message to URL %s.', url);
                    log({ Message, TopicArn });
                    return {};
                })
                : () => {
                    log({ Message, TopicArn });
                    return {};
                };
            return {
                promise,
            };
        },
    };
};
//# sourceMappingURL=util.js.map
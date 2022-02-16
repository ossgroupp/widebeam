"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastFactory = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const sns_1 = tslib_1.__importDefault(require("aws-sdk/clients/sns"));
exports.broadcastFactory = ({ arns, log = debug_1.default('widebeam'), ...awsConfig }, snsFactory = (...args) => new sns_1.default(...args)) => {
    log('Initializing widebeam broadcaster');
    if (!arns || typeof arns !== 'object') {
        throw new Error('No or invalid list of ARNs provided to widebeam.broadcaster().');
    }
    const sns = snsFactory(awsConfig);
    return async (concern, event, meta) => {
        log('Attempting to broadcast event "%s" for concern "%s".', event, concern);
        const arn = arns[concern];
        if (!arn) {
            throw new Error(`Invalid concern specified: "${concern}". Available concerns: ${Object.keys(arns).join(', ')}.`);
        }
        const { MessageId: messageId } = await sns
            .publish({
            Message: JSON.stringify({ concern, event, meta }),
            TopicArn: arn,
        })
            .promise();
        log('✓ Broadcast complete.');
        return messageId;
    };
};
//# sourceMappingURL=broadcast.js.map
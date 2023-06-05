const Sentry = require("@sentry/node")
const { IncomingWebhook } = require('@slack/webhook');
const config = {
    SlackWebhook: "https://hooks.slack.com/services/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"
};

const webhook = new IncomingWebhook(config.SlackWebhook);
webhook
    .send({
        attachments: [
            {
                color: 'danger',
                text: '백엔드 에러 발생',
                fields: [
                    {
                        title: '에러가 발생했습니다',
                        value: 'sentry에서 확인하세요',
                        short: false,
                    },
                ],
                ts: Math.floor(new Date().getTime() / 1000).toString(),
            },
        ],
    })
    .catch((err) => {
        if (err) Sentry.captureException(err);
    });
Sentry.captureException(err);
module.exports = sentryInterceptor;

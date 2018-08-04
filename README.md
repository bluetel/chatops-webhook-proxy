# ChatOps Webhook Proxy

A simple proxy, written as a Lambda picoservice, for forwarding various common webhook formats (e.g. from JIRA Service Desk)
to any given Slack-compatible incoming webhook endpoint (e.g. Slack, Discord).

We use this as a production service for consuming various services in Slack, for processes ranging from release automation, to company announcements, to hiring automation.  All contributions welcome!

This project supercedes `jira-slack-webhook`: https://github.com/Bluetel-Solutions/jira-slack-webhook. [You can find instructions on how to migrate here](./doc/MIGRATING-FROM-JIRA-SLACK-WEBHOOK.md).

#### Requirements

- Yarn
- Serverless


#### Installation

1. git clone https://github.com/bluetel-solutions/chatops-webhook-proxy.git && cd chatops-webhook-proxy
2. cp .config.yml.dist .config.yml
3. yarn install
4. `serverless deploy --aws-profile <aws-profile-here> --stage prod`


#### Configuration

All configuration is managed via AWS Parameter Store. The simplest way of managing ParameterStore variables is via the AWS CLI.

You may override the default Parameter Store prefix, to allow for parallel instances of this service within the same AWS account.  This is done using the `SSM_PREFIX` environment variable which must be specified when deploying via Serverless.

*Important Note*
A quirk of the aws-cli means that it will attempt to expand URLs by default. This needs to be disabled when setting the `webhook-endpoints` setting.  We recommend disabling this feature: `aws configure set cli_follow_urlparam false`

```
aws ssm put-parameter --name /service/chatops-webhook-proxy/default/webhook-endpoints --type StringList --value https://slack-compatible.webhook/endpoint/here,https://other-webhook.endpoints/here
aws ssm put-parameter --name /service/chatops-webhook-proxy/default/custom-prefix/webhook-endpoints --type StringList --value https://slack-compatible.webhook/endpoint/here
```

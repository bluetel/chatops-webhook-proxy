# Migrating from jira-slack-webhook

This service can near completely be used as a drop-in for `jira-slack-webhook`.  There are a couple of differences to bear in mind:

1. URLs are now routed by the service they come from.  In JIRA you will need to replace your webhook endpoint from `/webhook` to `/webhook/jira-servicedesk`.
2. Configuration now lives inside of AWS Parameter Store.  This means to configure multiple Slack instances, or to change the name of the integration, you will need to install the `aws-cli` package.
# Facebook Workplace

_Seems like there aren't many Workplace-Slack integrations out there: Let's fix that shall we?_ 🤗

## Supported Event Formats

- Group
  - Post

## Configuration

![configuration](https://github.com/bluetel-solutions/chatops-webhook-proxy/raw/master/services/facebook-workplace/img/config.png)

This should work out of the box, although needs to be configured as an Webhook within Facebook Workplace itself.  You will need administrator access for this.
You may optionally set a Facebook Workplace Token in the ParameterStore to enrich all data sent from Facebook with metadata from the Graph API.
This uses the key `facebook-workplace-token`

e.g.
```
aws ssm put-parameter --name "/service/chatops-webhook-proxy/default/facebook-workplace-token" --type String --value "<token>" --overwrite
```

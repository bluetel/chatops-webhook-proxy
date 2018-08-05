# Workable

#### Configuration

This is a little tricky. Webhooks need to be added via the Workable API.  You will need to provision an access key, [more info available here](https://workable.readme.io/docs/webhook-subscriptions).

e.g.

```
curl \ 
    -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization:Bearer <workable-api-token>" \
    -H 'Accept: application/json' \
    --data '{
      "target": "<apigw-endpoint-here>",
      "event": "candidate_created",
      "args":{
        "account_id": "<workable-account>"
      }
    }' https://<workable-account>.workable.com/spi/v3/subscriptions
```

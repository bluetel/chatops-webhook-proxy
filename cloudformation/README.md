# CloudFormation

`serverless-cf-policies.yml` is a CloudFormation template adding a user, DeployBot, with just enough permissions to deploy new versions of your function.
Big changes such as modifying an IAM policy, however, will require a manual deploy.

It is used via CircleCI to continuously deliver this repository.

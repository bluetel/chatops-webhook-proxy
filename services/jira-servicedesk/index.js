const Issue = require('./entity/issue').Issue
const User = require('./entity/user').User
const slackifyMarkdown = require('slackify-markdown');

module.exports.process = (body) => {
  if (body.issue === undefined) {
    throw new Error("invalid request body")
  }

  const issue = new Issue(body.issue)
  const user = new User(body.user)    

  return {
    parse: "full",
    attachments: [{
      color: "#00CF00",
      author_name: user.displayName,
      author_icon: user.miniThumbnail,
      fields: [{
        title: "ID",
        value: issue.key
      }, {
        title: "Title",
        value: issue.title
      }, {
        title: "Description",
        value: slackifyMarkdown(issue.description)
      }]
    }],
    username: "JIRA",
    iconEmoji: ':robot_face:'
  }
}

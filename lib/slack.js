const IncomingWebhook = require('@slack/client').IncomingWebhook
const denodeify = require('denodeify')

/**
 * A simple promise shim around IncomingWebhook
 *
 * @param {string} webhook 
 * @param {object} message 
 */
function sendToSlack(webhook, message) {
  const incomingSlackWebhook = new IncomingWebhook(webhook)
  const sendMessage = denodeify(incomingSlackWebhook.send.bind(incomingSlackWebhook), (header, statusCode, body) => {
    return [header, statusCode, body]
  })

  return sendMessage(message)
}

/**
 * Calls sendToSlack with every configured webhook endpoint.
 *
 * @param {string[]} webhooks
 * @param {object} message 
 */
function sendToSlacks(webhooks, message) {
  return Promise.all(webhooks.map(webhook => sendToSlack(webhook, message))) 
}

module.exports = {
  sendToSlack,
  sendToSlacks
}

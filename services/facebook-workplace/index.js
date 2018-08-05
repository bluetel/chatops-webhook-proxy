const fetch = require('node-fetch')

const firstChangeFromBody = body => {
  const entry = body.entry[0];
  const change = entry.changes[0];
  return change;  
}

module.exports.process = body => {
  const change = firstChangeFromBody(body)

  const getName = body => body.profile ? body.profile.name : null;
  const getPicture = body => {
    if (body.profile && body.profile.picture && body.profile.picture.data) {
      return body.profile.picture.data.url;
    }
    return null;
  }

  const name = getName(change)
  const picture = getPicture(change)

  return {
    parse: "full",
    attachments: [{
      color: "#394959",
      fallback: change.value.message,
      author_name: getName(change),
      author_icon: getPicture(change),
      title: `${name ? `${name} posted a new message`:'New post'}`,
      title_link: change.value['permalink_url'],
      fields: [{
        value: change.value.message,
        short: false
     }]
    }],
    username: "Facebook Workplace",
    iconEmoji: ':mega:'
  }
}

module.exports.preProcess = async (body, parameters) => {
  // Enrich the request with metadata about who sent it.
  if (parameters['facebook-workplace-token']) {
    const change = firstChangeFromBody(body);

    const queryString = []
    queryString.push('fields=name,picture')
    queryString.push(`access_token=${parameters['facebook-workplace-token']}`)

    return fetch(`https://graph.facebook.com/${change.value.from.id}?${queryString.join('&')}`)
      .then(res => res.json())
      .then(res => Object.assign(change, {profile: res}))
  }
}

module.exports.verify = async (event, context, callback) => {
  const queryStringParameters = event.queryStringParameters || {};

  if (queryStringParameters['hub.mode'] && queryStringParameters['hub.challenge']) {
    callback(null, { statusCode: 200, body: queryStringParameters['hub.challenge'] });
  }
}

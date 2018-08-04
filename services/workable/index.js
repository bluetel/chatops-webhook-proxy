module.exports.process = body => {
  if (body.data === undefined || body.resource_type === undefined) {
    throw new Error("invalid request body")
  }

  switch (body.resource_type) {
    case "candidate":
      let message = ""
      switch (body.event_type) {
        case "candidate_created":
          message = "A new candidate is available"
          break

        case "candiate_moved": 
          message = `Candidate has changed stage to ${body.data.stage}`
          break
      }
      return {
        text: message,
        parse: "full",
        attachments: [{
          color: "#00CF00",
          title: body.data.name,
          title_link: body.data.profile_url,
          fields: [{
            title: "Name",
            value: body.data.name
          }, {
            title: "Stage",
            value: body.data.stage
          }, {
            title: "Summary",
            value: body.data.summary
          }]
        }],
        username: "Workable",
        iconEmoji: ':construction_worker:'
      }
      break

    default:
      throw new Error("unknown resource_type")
  }

}

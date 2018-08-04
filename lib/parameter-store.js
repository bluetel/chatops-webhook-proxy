const SSM = require('aws-sdk').SSM
const path = require('path')

function reduceResponse(data) {
  return Array.prototype.slice.call(data.Parameters || data).reduce((parameters, parameter) => {
    // StringLists are returned as CSV
    const Value = parameter.Type === "StringList" ? parameter.Value.split(',') : parameter.Value
    const Name = (this && this.path) ? parameter.Name.replace(this.path, "") : path.basename(parameter.Name)

    parameters[Name] = Value
    return parameters
  }, {})
}

function getParameters(path, parameterNames) {
  return (new SSM({apiVersion: '2014-11-06'}))
  .getParameter({
    Names: [parameterNames]
  }).promise()
  .then(reduceResponse.bind({path}))
  .catch(err => {
    throw new Error(error)
  })
}

function getParametersByPath(path) {
  return (new SSM({apiVersion: '2014-11-06'}))
  .getParametersByPath({
    Path: path,
    Recursive: true
  }).promise()
  .then(reduceResponse.bind({path}))
  .catch(err => {
    throw new Error(err)
  })
}

module.exports = {
  getParameters,
  getParametersByPath
}

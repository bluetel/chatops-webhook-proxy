class Issue {
    constructor(issue = {}) {
        Object.keys(issue).forEach(key => this[key] = issue[key])
    }

    get title() {
        return (this.fields && this.fields.summary) ? this.fields.summary : null
    }

    get description() {
        return (this.fields && this.fields.description) ? this.fields.description : null
    }
}

module.exports.Issue = Issue
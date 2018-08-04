class User {
    constructor(issue = {}) {
        Object.keys(issue).forEach(key => this[key] = issue[key])
    }

    get miniThumbnail() {
        return (this.avatarUrls && this.avatarUrls['16x16']) ? this.avatarUrls['16x16'] : null
    }
}

module.exports.User = User
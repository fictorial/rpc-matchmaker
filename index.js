module.exports = function (redis) {
  const matchmaker = require('matchmaker-redis')(redis)

  return {
    createEvent: function ({capacity, params, perUserTimeoutSec, whitelist, blacklist}) {
      if (!this.clientId || !this.alias)
        return Promise.reject('authentication required')

      return matchmaker.createEvent({
        userId: this.clientId,
        userAlias: this.alias,
        capacity,
        params,
        perUserTimeoutSec,
        whitelist,
        blacklist
      })
    },

    autojoinEvent: function ({capacity, params}) {
      if (!this.clientId || !this.alias)
        return Promise.reject('authentication required')

      return matchmaker.autojoinEvent({
        userId: this.clientId,
        userAlias: this.alias,
        capacity,
        params,
      })
    },

    cancelEvent: function ({eventId}) {
      if (!this.clientId || !this.alias)
        return Promise.reject('authentication required')

      return matchmaker.cancelEvent({
        userId: this.clientId,
        userAlias: this.alias,
        eventId
      })
    },

    getEventsFor: function () {
      if (!this.clientId || !this.alias)
        return Promise.reject('authentication required')

      return matchmaker.getEventsFor({
        userId: this.clientId,
        userAlias: this.alias,
      })
    },

    joinEvent: function ({eventId}) {
      if (!this.clientId || !this.alias)
        return Promise.reject('authentication required')

      return matchmaker.joinEvent({
        userId: this.clientId,
        userAlias: this.alias,
        eventId
      })
    }
  }
}

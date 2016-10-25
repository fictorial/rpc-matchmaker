const EventEmitter = require('events')

module.exports = function (redis) {
  const matchmaker = require('matchmaker-redis')(redis)

  const emitter = new EventEmitter()

  return {
    createEvent: function ({capacity, params, perUserTimeoutSec, whitelist, blacklist}) {
      if (!this.clientId || !this.alias)
        return Promise.reject('authentication required')

      const event = {
        userId: this.clientId,
        userAlias: this.alias,
        capacity,
        params,
        perUserTimeoutSec,
        whitelist,
        blacklist
      }

      return matchmaker.createEvent(event)
      .then(event => {
        emitter.emit('event-created', this, event)
        return event
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
      .then(event => {
        if (event)
          emitter.emit('event-joined', this, event)
        return event
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
      .then(() => emitter.emit('event-canceled', this, eventId))
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
      .then(event => {
        emitter.emit('event-joined', this, event)
        return event
      })
    },

    emitter
  }
}

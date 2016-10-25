An adapter that makes matchmaker-redis work with rpc-over-ws.

## Installation

    npm i --save rpc-matchmaker

## Usage

    const Redis = require('ioredis')
    const redis = new Redis(process.env.REDIS_URL)

    const matchmaker = require('rpc-matchmaker')(redis)

    const server = require('rpc-over-ws')({
      createEvent: matchmaker.createEvent,
      autojoinEvent: matchmaker.autojoinEvent,
      getEventsFor: matchmaker.getEventsFor,
      joinEvent: matchmaker.joinEvent,
      cancelEvent: matchmaker.cancelEvent,
    })

## Events

    matchmaker.emitter.on('event-created', (client, event) => {
      console.log('event created', client.clientId, event)
    })

    matchmaker.emitter.on('event-joined', (client, event) => {
      console.log('event joined', client.clientId, event)
    })

    matchmaker.emitter.on('event-canceled', (client, eventId) => {
      console.log('event canceled', client.clientId, eventId)
    })

## Notes

Client authentication is required for all of the above to function.

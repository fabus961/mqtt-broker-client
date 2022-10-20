require('dotenv').config()

// HTTP WEBSOCKET CONFIG
// const aedes = require('aedes')()
// const server = require('net').createServer(aedes.handle)
// const httpServer = require('http').createServer()
// const ws = require('websocket-stream')

// MQTT_Port = process.env.BROKER_PORT || 1883
// const wsPort = process.env.WS_BROKER_PORT || 8080

// server.listen(MQTT_Port, function () {
//   console.log('Aedes MQTT server started and listening on port', MQTT_Port)
// }),
//
// ws.createServer({ server: httpServer }, aedes.handle)
// httpServer.listen(wsPort, function () {
//   console.log('websocket server listening on port ', wsPort)
// })

// HTTP SERVER CONFIG
const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = process.env.BROKER_PORT || 1883

// AUTHENTICATION
// aedes.authenticate = (client, username, password, callback) => {
//     password = Buffer.from(password, 'base64').toString();
//     if (username === 'xyz' && password === 'xyz123') {
//     return callback(null, true);
//     }
//     const error = new Error('Authentication Failed!! Please enter valid credentials.');
//     console.log('Authentication failed.')
//     return callback(error, false)
//     }
//     // authorising client topic to publish a message
//     aedes.authorizePublish = (client, packet, callback) => {
//     if (packet.topic === 'abc') {
//     return callback(new Error('wrong topic'));
//     }
//     if (packet.topic === 'charcha') {
//     packet.payload = Buffer.from('overwrite packet payload')
//     }
//     callback(null)
//     }

// LIFT the BROKER
server.listen(port, function () {
    console.log('######### MQTT broker / client minimal setup ###########')
    console.log('#')
    console.log('#')
    console.log('# 🚀 Server started...')
    console.log('# 🌐 Broker URL', process.env.BROKER_URL)
    console.log('#')
    console.log('#')

    aedes.publish({ topic: 'aedes/hello', payload: "Howdy! I'm BROKER 🐱‍👓 " + aedes.id })
})

// FIRED when a client SUBSCRIBEs
aedes.on('subscribe', function (subscriptions, client) {
    console.log("################### SUBSCRIBE ##########################")
    console.log("#")
    console.log("#")
    console.log("# CLIENT:     \x1b[33m" + (client ? client.id : client) + "\x1b[0m")
    console.log("# TOPIC:      \x1b[32m" + subscriptions.join('\n') + "\x1b[0m")
    console.log("# BROKER:     \x1b[35m" + aedes.id + "\x1b[0m")
    console.log("# CREATED:    \x1b[36m" + new Date() + "\x1b[0m")
    console.log("#")
    console.log("#")
})

// FIRED when a client UNSUBSCRIBEs
aedes.on('unsubscribe', function (subscriptions, client) {
    console.log("################### UNSUBSCRIBE ########################")
    console.log("#")
    console.log("#")
    console.log("# CLIENT:     \x1b[33m" + (client ? client.id : client) + "\x1b[0m")
    console.log("# TOPIC:      \x1b[32m" + subscriptions.join('\n') + "\x1b[0m")
    console.log("# BROKER:     \x1b[35m" + aedes.id + "\x1b[0m")
    console.log("# CREATED:    \x1b[36m" + new Date() + "\x1b[0m")
    console.log("#")
    console.log("#")
})

// FIRED when a client CONNECTs
aedes.on('client', function (client) {
    aedes.publish({
        // QUALITY OF SERVICE LEVELS 
        // https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels/
        // 
        // Packet arrival:
        // - At most once  (0)
        // - At least once (1)
        // - Exactly once  (2).
        qos: 1,
        // RETAINED MESSAGES
        // Client receives the retained message immediately after they subscribe. 
        retain: true,
        topic: 'presence',
        payload: 'CLIENT 🐱‍🏍 ' + (client ? client.id : client) + ' joined the 🤽 POOL'
    })
    console.log("################### CONNECTION #########################")
    console.log("#")
    console.log("#")
    console.log("# CLIENT:     \x1b[34m" + (client ? client.id : client) + "\x1b[0m")
    console.log("# BROKER:     \x1b[35m" + aedes.id + "\x1b[0m")
    console.log("# CREATED:    \x1b[36m" + new Date() + "\x1b[0m")
    console.log("#")
    console.log("#")
})

// FIRED when a client DISCONNECTs
aedes.on('clientDisconnect', function (client) {
    console.log("################### DISCONNECT ##########################")
    console.log("#")
    console.log("#")
    console.log("# CLIENT:     \x1b[34m" + (client ? client.id : client) + "\x1b[0m")
    console.log("# BROKER:     \x1b[35m" + aedes.id + "\x1b[0m")
    console.log("# CREATED:    \x1b[36m" + new Date() + "\x1b[0m")
    console.log("#")
    console.log("#")
})

// TOPIC RESOLVER
const resolve = {
    presence: function(){
        console.log('################### RESOLVER ###########################')
        console.log('#')
        console.log('#')
        console.log('# 👀 I see you there \x1b[33mPRESENCE!\x1b[0m')
        console.log('#')
        console.log('#')
    }
    // your ACTIONS go here
    // myAction: function(){
    // ...code
    // }
}

// FIRED when a message is PUBLISHED
aedes.on('publish', async function (packet, client) {
    // if an ACTION contains corresponding TOPIC handler -> execute it
    let tpc = resolve[packet.topic]
    tpc && tpc()

    console.log("################### PUBLISHED ###########################")
    console.log("#")
    console.log("#")
    console.log("# CLIENT:     \x1b[34m" + (client ? client.id : client) + "\x1b[0m")
    console.log("# TOPIC:      \x1b[33m" + packet.topic + "\x1b[0m")
    console.log("# PAYLOAD:    \x1b[32m" + packet.payload.toString() + "\x1b[0m")
    console.log("# BROKER:     \x1b[35m" + aedes.id + "\x1b[0m")
    console.log("# CREATED:    \x1b[36m" + new Date() + "\x1b[0m")
    console.log("#")
    console.log("#")
})

// test-ping from BROKER to CLIENTs every 15 seconds
const pingInterval = setInterval(() => aedes.publish({ topic: 'presence', payload: 'PING 🎁 from BROKER 🐱‍👓' + aedes.id }), process.env.BROKER_PING_INTERVAL)

module.exports = aedes;
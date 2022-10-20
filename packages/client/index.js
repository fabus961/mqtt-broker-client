require('dotenv').config()
const mqtt = require('mqtt')
const client = mqtt.connect(process.env.BROKER_URL || 'mqtt://localhost:1883')
// BASIC AUTH
// const connect_mqtt = async () => {
//     const host = 'SOME_HOST';
//     const options = {
//       username: 'SOME_USER',
//       password: 'SOME_PASSWORD',
//       clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
//       keepalive: 1000
//     };

// TOPICS
const topics = {
    presence: 'presence',
    // list your TOPICS here
}


client.on('connect', function () {

    // HELLO SERVER TOPIC
    client.subscribe('aedes/hello', function (err) {
        !err && client.publish(topics.presence, 'Hi I am CLIENT 🐱‍🏍 ' + client.options.clientId)
    })

    // DEDICATED TOPIC
    client.subscribe(client.options.clientId, function (err) {
        !err && client.publish(client.options.clientId, 'CLIENT 🐱‍🏍 ' + client.options.clientId + ' 📝 SUBSCRIBED to ✨' + client.options.clientId)
    })

    // ROOT TOPIC
    client.subscribe(topics.presence, function (err) {
        !err && client.publish(topics.presence, 'CLIENT 🐱‍🏍 ' + client.options.clientId + ' 📝 SUBSCRIBED to ✨ presence')
    })

})

// FIRES on publish
client.on('message', function (topic, message) {
    console.log(`####################### MESSAGE #########################`)
    console.log("#")
    console.log("#")
    console.log("# CLIENT:     \x1b[34m" + client.options.clientId + "\x1b[0m")
    console.log("# TOPIC:      \x1b[33m" + topic.toString() + "\x1b[0m")
    console.log("# MESSAGE:    \x1b[32m" + message.toString() + "\x1b[0m")
    console.log("# CREATED:    \x1b[36m" + new Date() + "\x1b[0m")
    console.log("#")
    console.log("#")
})

// FIRES when client disconnects
client.on('disconnect', function (error) {
    console.error('#')
    console.error('#')
    console.error('# CLIENT 🐱‍🏍 disconnected', error);
    console.error('#')
    console.error('#')
    client.end()
});

// FIRES when broker closes connection
client.once('close', () => {
    console.error('#')
    console.error('#')
    console.error('# BROKER 🐱‍👓 connection closed, trying to 🪂 reconnect...')
    console.error('#')
    console.error('#')
})
// TRY to RECONNECT once connection is lost
client.on('close', function (error) {
    if (!client.connected) {
        mqtt.connect(process.env.BROKER_URL || 'mqtt://localhost:1883')
    }
})

// test-ping from client to server every 15 seconds
const pingInterval = setInterval(() => client.publish(topics.presence, 'PING 🎁 from CLIENT 🐱‍🏍' + client.options.clientId), process.env.CLIENT_PING_INTERVAL)

module.exports = client;
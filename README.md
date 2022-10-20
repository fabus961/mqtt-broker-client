MQTT Broker / Client
=====================

This repo contains quick start code to jump into mqtt broker-client based communication, using [aedes](https://github.com/moscajs/aedes) as broker and [mqtt.js](https://github.com/mqttjs/MQTT.js) on the client side.

Prerequisites
----------

We're using yarn workspaces in this repository. So in order to have a smooth ride make sure to have the latest [yarn](https://yarnpkg.com/getting-started/install) version set up and running on your machine.

Installation
----------

Make sure you are in the root folder of your project
```
yarn install
```

Create a new .env file

```
# BROKER CONFIG
BROKER_PORT=1883
WS_BROKER_PORT=8080
BROKER_URL=mqtt://localhost:1883
BROKER_PING_INTERVAL=3000
# CLIENT CONFIG
CLIENT_PING_INTERVAL=3000
```

Start the broker

```
yarn broker
```

To spawn a client instance, open a new shell with the root folder of your project and type

```
yarn client
```


Capabilities
------------

This version contains some boilerplate for websocket broker configuration and basic authentications to get a basic understanding. Of course this should NOT be used in production environments.

Structure
------------
```
.
├── packages                    # Packages Container
|    └── broker                 # BROKER files
|         └── index.js          # BROKER implementation
|         └── package.json      # Tools and utilities for the BROKER
|    └── client                 # CLIENT files
|         └── index.js          # CLIENT implementation
|         └── package.json      # Tools and utilities for CLIENTs
├── .env                        # Environment variables (as described above)
├── package.json                # Tools and utilities
└── README.md                   # This documentation
```

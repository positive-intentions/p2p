# p2p


## setup
```js
const state = {
    number: 0
}

const appiSchema = {
    addNumber: (state, actions) => [
        (request, response, next) => {
            const { number } = request;
            const newNumber = actions.addNumber(number);
            response({ number: newNumber });
        }
    ],
    getNumber: (state, actions) => [
        (request, response, next) => {
            response({ number: state.number });
        }
    ]
}

const actions = {
    addNumber: (number) => {
        state.number += number;
        return state.number
    }
}

const contacts = [
    {
        peerId: '456789',
        keys: [
            {
                created: '...',
                public: '...',
                private: '...',
                symmetric: '...'
            },
            {
                created: '...',
                public: '...',
                private: '...',
                symmetric: '...'
            }
        ]
    },
    {
        peerId: '789123',
        keys: [
            {
                created: '...',
                public: '...',
                private: '...',
                symmetric: '...'
            }
        ]
    }
];

<PeerProvider
    peerId="123456"
    config={{}}
    contacts={contacts}
    appiSchema={appiSchema}
    state={state}
    actions={actions}
    onConnection={onConnection}
>
    {children}
</PeerProvider>
```

## usage

```js

const {
    peer,
    emit,
    call
    streams
    connections
} = usePeer()

```

to do:
- handle condition for tab already in use.
- reset event listeners when state changes
- use peerjs to create vanilla webrtc data connections.
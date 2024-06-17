# p2p

```js

const state = {
    number: 0
}

const appiSchema = {
    addNumber: (state, actions) => [
        (request, response, next) => {
            const { number } = request;
            const newNumber = actions.addNumber(number);
            console.log({ newNumber });
            response({ number: newNumber });
        }
    ],
    getNumber: (state, actions) => [
        async (request, response, next) => {
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


<PeerProvider
    appiSchema={appiSchema}
    state={state}
    actions={actions}
    onConnection={onConnection}
>
    {children}
</PeerProvider>
```

to do:
- handle condition for tab already in use.
- reset event listeners when state changes
- use peerjs to create vanilla webrtc data connections.
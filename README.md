

<p align="center">
  <img src="public/logo192.png" alt="App Logo" />
</p>

<div align="center">
  
[Live App](https://p2p.positive-intentions.com) | [Reddit](https://www.reddit.com/r/positive_intentions) | [Medium](https://medium.com/@positive.intentions.com) | [Discord](https://discord.gg/unnQnR67nR)
</div>

<div align="center">
  
![GitHub stars](https://img.shields.io/github/stars/positive-intentions/p2p?style=social) 
![GitHub forks](https://img.shields.io/github/forks/positive-intentions/p2p?style=social) 
![GitHub issues](https://img.shields.io/github/issues/positive-intentions/p2p) 
![GitHub license](https://img.shields.io/github/license/positive-intentions/p2p) 
![Staging](https://github.com/positive-intentions/p2p/actions/workflows/main_workflow.yaml/badge.svg) 
[![gh-pages-build-deployment](https://github.com/positive-intentions/p2p/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/positive-intentions/p2p/actions/workflows/pages/pages-build-deployment)
[![CodeQL](https://github.com/positive-intentions/p2p/actions/workflows/codeql.yml/badge.svg)](https://github.com/positive-intentions/p2p/actions/workflows/codeql.yml)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
</div>

# P2P

> ⚠️ **WARNING:** This project is not production-ready. It is an unstable experimental proof-of-concept and may contain bugs and/or incomplete features. Use it at your own risk.


## Example
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

## Usage

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
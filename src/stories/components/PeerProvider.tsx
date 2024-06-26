import React, { useState, useEffect, createContext, useCallback } from "react";
import Peer from "peerjs";

import {
    useState as useState2,
    useEffect as useEffect2,
    useMemo,
    define,
    html
} from "dim/Dim";

const Button = function ({ children, initialstate = 0 }) {
    const [count, setCount] = useState2(parseInt(initialstate));

    useEffect2(() => {
        console.log("Button mounted");
        return () => {
            console.log("Button unmounted");
        };
    }, []);

    useEffect2(() => {
        console.log("count effect triggered");
    }, [count()]);

    const someCalculation = useMemo(() => {
        const result = count() * 2;
        console.log("memo calculation triggered:", result);
        return result;
    }, [count()]);

    return html`
        <button @click="${() => setCount(count() + 1)}">
            ${children}
            ${count()}
            ${someCalculation}
        </button>
    `;
}

define({
    tag: 'my-button',
    component: Button,
});

export const PeerContext = createContext();

export default function PeerProvider({
    peerId,
    config,
    contacts,
    contactId,
    appiSchema,
    state: initialState,
    contentHash,
    actions,
    onConnection,
    children,
}) {
    const [peer, setPeer] = useState(null);
    const [connections, setConnections] = useState({});
    const [streams, setStreams] = useState({});
    const [state, setState] = useState(initialState);
    // const [allContacts, setAllContacts] = useState([...contacts, contactId ? contactId : null].filter(c => !!c));

    const allContacts = useMemo(() => {
        return [...contacts, contactId ? contactId : null].filter(c => !!c);
    }, [JSON.stringify(contacts), contactId]);

    // Initialize or destroy the peer instance
    useEffect(() => {
        if ((peerId && !peer) || (peer?.id && (peer.id !== peerId))) {
            const newPeer = new Peer(peerId);
            handlePeerInitialisation(newPeer);
        } else if (!peerId) {
            peer.destroy();
            setPeer(null);
        }
    }, [peerId, peer]);

    // Manage connections and data from peers
    const handlePeerInitialisation = (newPeer) => {
        newPeer.on("open", () => {
            console.log("Peer connected with ID:", newPeer.id);
            setPeer(newPeer);
            connectToContacts(newPeer);
        });

        newPeer.on("disconnected", () => {
            console.log("Peer disconnected");
            newPeer.reconnect();
        });

        newPeer.on("connection", (conn) => {
            console.log("Received connection from", conn.peer);
            setupConnectionHandler(conn);
        });

        newPeer.on("close", () => {
            console.log("Peer connection closed");
            setPeer(null);
        });

        newPeer.on("error", (err) => {
            console.error("Peer error:", err);
            console.log({ err })
            // update connection state
            const newConnections = { ...connections };
            Object.keys(newConnections).forEach((key) => {
                if (newConnections[key].open === false) {
                    delete newConnections[key];
                }
            });
            setConnections(newConnections);
        });
    };

    // Setup handlers for each connection
    const setupConnectionHandler = useCallback((conn) => {
        try {
            conn.off("data");
        } catch (err) {
            console.log("error removing data listener", err);
        }

        conn.on("data", (data) => handleData(conn, data));
        conn.on("open", () => {
            if (onConnection) onConnection(conn);
        });
        conn.on("close", () => {
            console.log(`Connection ${conn.peer} closed`);
            setConnections((prev) => {
                const updated = { ...prev };
                delete updated[conn.peer];
                return updated;
            });
        });
        setConnections((prev) => ({
            ...prev,
            [conn.peer]: conn,
        }));
    }, [onConnection, state, contentHash]);

    // Handle incoming data according to appiSchema
    const handleData = useCallback((conn, data) => {
        if (data.type && appiSchema[data.type]) {
            const handlers = appiSchema[data.type](state, {
                ...actions,
                // Update to always use the latest state inside actions
                setState: (updater) => setState(prevState => typeof updater === 'function' ? updater(prevState) : { ...prevState, ...updater })
            });
            handlers.forEach((handler) => {
                handler(
                    { ...data },
                    { send: (response) => conn.send(response) },
                    () => { }
                );
            });
        }
    }, [appiSchema, state, actions]); // Ensure this useCallback has all dependencies correctly listed

    // Establish connections to all contacts
    const connectToContacts = useCallback((peer) => {
        allContacts
            .filter(contact => !!contact)
            .forEach((contact) => {
                if (!connections[contact]) {
                    console.log('connecting to', contact, '...');
                    const conn = peer.connect(contact);
                    setupConnectionHandler(conn);
                }
            });
    }, [allContacts, connections, setupConnectionHandler]);

    useEffect(() => {
        if (allContacts.length > 0 && peer) {
            connectToContacts(peer)
        }
    }, [JSON.stringify(allContacts), peer]);

    // Provider to expose the peer and methods to interact with it
    return (
        <PeerContext.Provider value={{ peer, emit: handleData, call: setupConnectionHandler, streams, connections }}>
            my peer id: {peerId}
            <br />
            <br />
            peerjs: {peer ? "connected" : "disconnected"}
            <br />
            <br />
            counter: {JSON.stringify(state.number)}
            <br />
            <br />
            connections:
            <ol>
                {Object.keys(connections).map((key) => (
                    <li key={key}>
                        {key}
                        <input
                            type="button"
                            value="ping"
                            onClick={() => connections[key].send({ type: "ping" })}
                        />
                        <br />
                        <input
                            type="button"
                            value="increase remote counter"
                            onClick={() => connections[key].send({ type: "addNumber", number: 1 })}
                        />
                        <br />
                        <input
                            type="button"
                            value="decrease remote counter"
                            onClick={() => connections[key].send({ type: "addNumber", number: -1 })}
                        />
                        <br />
                        <input
                            type="button"
                            value="add todo with state sync"
                            onClick={() => {
                                const newTodo = { text: "new todo", id: Date.now() };
                                connections[key].send({ type: "addTodo", ...newTodo })
                            }}
                        />
                    </li>
                ))}
            </ol>
            {/* <my-button id="aaa" initialstate="3">Click me</my-button> */}

            <br />
            <br />
            {children}
        </PeerContext.Provider>
    );
}

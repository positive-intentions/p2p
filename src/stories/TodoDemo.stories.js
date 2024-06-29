import PeerProvider from "./components/PeerProvider.tsx";
import React, {useState} from 'react';

const PeerProviderWrapper = ({ children, contactId }) => {
    const [state, setState] = useState({
        number: 0,
        todoList: [],
    });
    const [contentHash, setContentHash] = useState(JSON.stringify(state));
    
    const appiSchema = {
        ping: (state, actions) => [
            // array of middleware functions.
            // ... authenticationMiddleware(state, actions),
            (request, response, next) => {
                console.log("ping received");
                response.send({ message: "pong" });
            },
        ],
        addNumber: (state, actions) => [
            (request, response, next) => {
                const { number } = request;
                // Call the action, now passing setState too
                actions.addNumber(number)(state, actions.setState);
                console.log("Number updated to", state.number);
                response.send({ number: state.number });
    
            },
        ],
        getNumber: (state, actions) => [
            (request, response, next) => {
                response.send({ number: state.number });
            },
        ],
        // ========================================
        addTodo: (state, actions) => [
            (request, response, next) => {
                const { text, id } = request;
                const isAlreadyAdded = state.todoList.some(todo => todo.id === id);
                if (!isAlreadyAdded) {
                    console.log("Adding todo", text, id)
                    actions.addTodo({ text, id })(state, actions.setState);
    
                    response.send({ type: 'addTodoCallback', text, id });
                }
            },
        ],
        addTodoCallback: (state, actions) => [
            (request, response, next) => {
                const { text, id } = request;
                const isAlreadyAdded = state.todoList.some(todo => todo.id === id);
                if (!isAlreadyAdded) {
                    console.log("Adding todo", text, id)
                    actions.addTodo({ text, id })(state, actions.setState);
                }
            },
        ],

    };
    
    const actions = {
        addNumber: (number) => (_, setState) => {
            // Use a functional update to ensure the latest state is always used
            setState(prevState => ({
                ...prevState,
                number: prevState.number + number
            }));
        },
        addTodo: ({text, id}) => (_, ) => {
            setState(prevState => {
                const newState = {
                    ...prevState,
                    todoList: [
                        ...prevState.todoList,
                        {
                            id,
                            text,
                            done: false,
                        }
                    ]
                };
                return newState
            });
            setContentHash(JSON.stringify({
                ...state,
                todoList: [
                    ...state.todoList,
                    {
                        id,
                        text,
                        done: false,
                    }
                ]
            }));
        },
    };
    
    const contacts = [
        "",
        // {
        //     peerId: "456789",
        //     keys: [
        //         {
        //             created: "...",
        //             public: "...",
        //             private: "...",
        //             symmetric: "...",
        //         },
        //         {
        //             created: "...",
        //             public: "...",
        //             private: "...",
        //             symmetric: "...",
        //         },
        //     ],
        // },
        // {
        //     peerId: "789123",
        //     keys: [
        //         {
        //             created: "...",
        //             public: "...",
        //             private: "...",
        //             symmetric: "...",
        //         },
        //     ],
        // },
    ];

    return (
        <PeerProvider
            contactId={contactId}
            peerId={randomHex}
            config={{}}
            contacts={[]}
            appiSchema={appiSchema}
            state={state}
            contentHash={contentHash}
            actions={actions}
            onConnection={(conn) => {
                console.log("connectied to peer")
            }}
        >
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Todo</th>
                        <th>Done</th>
                    </tr>
                </thead>
                <tbody>
                    {state.todoList.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.text}</td>
                            <td>{todo.done ? "✅" : "❌"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </PeerProvider>
    );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
    title: "Demo/Todo list",
    component: PeerProviderWrapper,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
};

const randomStringLength = 16; // You can change this value to generate a longer or shorter string

// Generate a random array of uint8 values
const randomValues = crypto.getRandomValues(
    new Uint8Array(randomStringLength),
);

// Convert random values to hexadecimal string
const randomHex = Array.from(randomValues)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");



// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic = {
    args: {
        contactId: "",
    },
};
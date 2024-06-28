import PeerProvider from "./components/PeerProvider.tsx";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
    title: "Components/PeerProvider",
    component: PeerProvider,
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

const state = {
    number: 0,
};

const appiSchema = {
    ping: (state, actions) => [
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
};

const actions = {
    addNumber: (number) => (_, setState) => {
        // Use a functional update to ensure the latest state is always used
        setState(prevState => ({
            ...prevState,
            number: prevState.number + number
        }));
    }
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

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic = {
    args: {
        contactId: "",
        children: "positive-intentions",
        peerId: randomHex,
        config: {},
        contacts,
        appiSchema,
        state: { ... state },
        actions,
        onConnection: (conn) => {
            console.log("connectied to peer")
        },
    },
};
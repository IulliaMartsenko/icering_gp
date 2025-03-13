export default {
    preset: "ts-jest",
    watch: false,
    transform: {
        "^.+\\.(ts|tsx)?$": ["ts-jest", { diagnostics: false }],
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    testEnvironment: "node",
};

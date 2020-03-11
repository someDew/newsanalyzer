const presets = [
    [
        "@babel/env",
        {
            targets: { // версии браузеров которые нужно поддерживать
                safari: "12", // macos
                ios: "12",
                chrome: "64",
                android: "33", // web view
                firefox: "60",
                opera: "40",
                samsung: "5",
                ie: "9",
                edge: "13",

                "esmodules": true,
            },
            useBuiltIns: "usage", // эта настройка babel-polyfill, если стоит значение usage,
            // то будут подставлятся полифилы для версий браузеров которые указали выше.
            corejs: "3.4.1", // явно проставить версию corejs
        },
    ],
];

module.exports = { presets };
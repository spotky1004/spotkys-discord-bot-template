const trivias = [
    // Records
    ({ app }) => `Command has been executed ${app.logger.loggingIdx} times so far.`,
    // Current status
    ({ app }) => `${Object.keys(app.userCaches.cache).length} users online!`,
    ({ app }) => `Working on ${Object.keys(app.guildCaches.cache).length} servers!`,
    ({ client }) => { var _a; return `Uptime: ${(((_a = client.uptime) !== null && _a !== void 0 ? _a : 0) / 3600000).toFixed(2)}h`; },
    // Random
    ({}) => `This text is being refreshed on every save. (10s)`,
];
export default function getRandomTrivia(options) {
    const triviaToDisplay = trivias[Math.floor(trivias.length * Math.random())];
    return triviaToDisplay(options);
}

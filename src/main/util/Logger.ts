import { createLogger, format, transports, addColors } from 'winston'
const { combine, timestamp, label, prettyPrint } = format;

// Console Log Transport
const alignedWithColorsAndTime = new transports.Console({
    level: 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.printf((info) => {
            const { timestamp, level, message, ...args } = info;
            const ts = timestamp.slice(0, 19).replace('T', ' ');
            return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        }),
    )
})

// Logger
export const Logger = createLogger({
    transports: [alignedWithColorsAndTime]
});
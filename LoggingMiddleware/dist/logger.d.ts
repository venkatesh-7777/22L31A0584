import { LogLevel, LogStack, LogPackage } from './types';
interface LogResponse {
    logID: string;
    message: string;
}
export declare const Log: (stack: LogStack, level: LogLevel, packageName: LogPackage, message: string) => Promise<LogResponse | null>;
export default Log;

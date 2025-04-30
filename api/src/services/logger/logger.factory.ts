import { ILogger } from "../../interfaces";
import { ConsoleLogger } from "./console.logger"
import { FileLogger } from "./file.logger";

export class LoggerFactory {
  static createLogger(loggerType: string): ILogger {
    switch(loggerType.toLowerCase()) {
      case 'console':
        return new ConsoleLogger();
      case 'file':
        return new FileLogger();
      default: 
        throw new Error(`Unsupported logger type: ${loggerType}`);
    }
  }
}
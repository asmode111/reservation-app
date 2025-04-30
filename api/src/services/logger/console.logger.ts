import { ILogger } from "../../interfaces";

export class ConsoleLogger implements ILogger {
  log(text: string): void {
    console.log(text);
  }
}
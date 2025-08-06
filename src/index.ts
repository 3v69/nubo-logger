interface LoggerOptions {
  enableInProduction?: boolean;
}

class NuboLogger {
  private readonly enableInProduction: boolean;
  private includeTime: boolean = false;
  private bold: boolean = false;
  private storedArgs: unknown[] = [];
  private storedColor: string = "";
  private logged: boolean = false;

  constructor(options: LoggerOptions = {}) {
    this.enableInProduction = options.enableInProduction || false;
  }

  get t(): this {
    this.includeTime = true;
    return this;
  }

  get b(): this {
    this.bold = true;
    return this;
  }

  private shouldLog(): boolean {
    return this.enableInProduction || process.env.NODE_ENV !== "production";
  }

  private logStored() {
    if (this.logged) return;
    if (!this.shouldLog()) {
      this.resetStored();
      return;
    }

    const isBrowser = typeof window !== "undefined";

    const message = this.formatArgs(this.storedArgs);
    const output = this.includeTime ? `[${new Date().toISOString()}] ${message}` : message;

    if (output.trim().length === 0) {
      this.resetStored();
      return;
    }

    if (isBrowser) {
      let style = `color: ${this.storedColor};`;
      if (this.bold) style += "font-weight: bold;";
      console.log(`%c${output}`, style);
    } else {
      const ansiColor = this.rgbToAnsi(this.storedColor, this.bold);
      console.log(`${ansiColor}${output}\x1b[0m`);
    }

    this.logged = true;
    this.resetStored();
  }

  private resetStored() {
    this.includeTime = false;
    this.bold = false;
    this.storedArgs = [];
    this.storedColor = "";
    this.logged = false;
  }

  private formatArgs(args: unknown[]): string {
    return args
      .map((arg) => {
        if (typeof arg === "object") {
          try {
            return JSON.stringify(arg);
          } catch {
            return String(arg);
          }
        }
        return String(arg);
      })
      .join(" ");
  }

  private rgbToAnsi(rgb: string, bold: boolean = false): string {
    const map: Record<string, string> = {
      "rgb(255, 66, 69)": "31", // systemRed
      "rgb(255, 146, 48)": "33", // systemOrange
      "rgb(255, 214, 0)": "33", // systemYellow
      "rgb(48, 209, 88)": "32", // systemGreen
      "rgb(0, 218, 195)": "36", // systemMint
      "rgb(0, 210, 224)": "36", // systemTeal
      "rgb(60, 211, 254)": "36", // systemCyan
      "rgb(0, 145, 255)": "34", // systemBlue
      "rgb(107, 93, 255)": "35", // systemIndigo
      "rgb(219, 52, 242)": "35", // systemPurple
      "rgb(255, 55, 95)": "35", // systemPink
      "rgb(183, 138, 102)": "33", // systemBrown
      "rgb(142, 142, 147)": "90", // systemGray
      "rgb(99, 99, 102)": "90", // systemGray2
      "rgb(72, 72, 74)": "90", // systemGray3
      "rgb(58, 58, 60)": "90", // systemGray4
      "rgb(44, 44, 46)": "90", // systemGray5
      "rgb(28, 28, 30)": "90", // systemGray6
      "rgb(255, 255, 255)": "37", // systemLabel
    };
    const code = map[rgb] || "37";
    if (bold) {
      return `\x1b[1;${code}m`;
    }
    return `\x1b[${code}m`;
  }

  private storeLog(args: unknown[], color: string): this {
    this.storedArgs = args;
    this.storedColor = color;
    this.logStored();
    return this;
  }

  red(...args: unknown[]): this {
    return this.storeLog(args, "rgb(255, 66, 69)");
  }

  green(...args: unknown[]): this {
    return this.storeLog(args, "rgb(48, 209, 88)");
  }

  mint(...args: unknown[]): this {
    return this.storeLog(args, "rgb(0, 218, 195)");
  }

  teal(...args: unknown[]): this {
    return this.storeLog(args, "rgb(0, 210, 224)");
  }

  cyan(...args: unknown[]): this {
    return this.storeLog(args, "rgb(60, 211, 254)");
  }

  indigo(...args: unknown[]): this {
    return this.storeLog(args, "rgb(107, 93, 255)");
  }

  purple(...args: unknown[]): this {
    return this.storeLog(args, "rgb(219, 52, 242)");
  }

  pink(...args: unknown[]): this {
    return this.storeLog(args, "rgb(255, 55, 95)");
  }

  brown(...args: unknown[]): this {
    return this.storeLog(args, "rgb(183, 138, 102)");
  }

  orange(...args: unknown[]): this {
    return this.storeLog(args, "rgb(255, 146, 48)");
  }

  yellow(...args: unknown[]): this {
    return this.storeLog(args, "rgb(255, 214, 0)");
  }

  blue(...args: unknown[]): this {
    return this.storeLog(args, "rgb(0, 145, 255)");
  }

  gray(...args: unknown[]): this {
    return this.storeLog(args, "rgb(142, 142, 147)");
  }

  gray2(...args: unknown[]): this {
    return this.storeLog(args, "rgb(99, 99, 102)");
  }

  gray3(...args: unknown[]): this {
    return this.storeLog(args, "rgb(72, 72, 74)");
  }

  gray4(...args: unknown[]): this {
    return this.storeLog(args, "rgb(58, 58, 60)");
  }

  gray5(...args: unknown[]): this {
    return this.storeLog(args, "rgb(44, 44, 46)");
  }

  gray6(...args: unknown[]): this {
    return this.storeLog(args, "rgb(28, 28, 30)");
  }

  label(...args: unknown[]): this {
    return this.storeLog(args, "rgb(255, 255, 255)");
  }

  success(...args: unknown[]): this {
    return this.storeLog(args, "rgb(48, 209, 88)");
  }

  warning(...args: unknown[]): this {
    return this.storeLog(args, "rgb(255, 214, 0)");
  }

  error(err?: Error | unknown) {
    if (!err || !this.shouldLog()) return;

    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      console.error("%c" + err, "color: rgb(255, 66, 69);");
    } else {
      console.error("\x1b[31m" + err + "\x1b[0m");
    }
  }

  debug(msg?: Error | unknown) {
    if (!msg || !this.shouldLog()) return;

    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      console.debug("%c" + msg, "color: rgb(60, 211, 254);");
    } else {
      console.debug("\x1b[36m" + msg + "\x1b[0m");
    }
  }

  info(msg?: Error | unknown) {
    if (!msg || !this.shouldLog()) return;

    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      console.info("%c" + msg, "color: rgb(0, 145, 255)");
    } else {
      console.info("\x1b[34m" + msg + "\x1b[0m");
    }
  }

  warn(msg?: Error | unknown) {
    if (!msg || !this.shouldLog()) return;

    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      console.warn("%c" + msg, "color: rgb(0, 145, 255)");
    } else {
      console.warn("\x1b[33m" + msg + "\x1b[0m");
    }
  }

  count() {
    if (this.shouldLog()) {
      console.count("color: rgb(0, 145, 255)");
    }
  }
}

export const log = new NuboLogger();
export { NuboLogger };
export default log;

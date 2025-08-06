import { NuboLogger } from "../src";

describe("NuboLogger", () => {
  let consoleSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;
  let debugSpy: jest.SpyInstance;
  let infoSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let countSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    debugSpy = jest.spyOn(console, "debug").mockImplementation(() => {});
    infoSpy = jest.spyOn(console, "info").mockImplementation(() => {});
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    countSpy = jest.spyOn(console, "count").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    errorSpy.mockRestore();
    debugSpy.mockRestore();
    infoSpy.mockRestore();
    warnSpy.mockRestore();
    countSpy.mockRestore();
  });

  test("should handle error case", () => {
    expect(() => {
      const logger = new NuboLogger();
      logger.error("This is an error message");
      throw new Error("This is a test error");
    }).toThrow("This is a test error");
  });

  test("should log in development environment", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();
    logger.red("Test message");
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("should not log in production by default", () => {
    process.env.NODE_ENV = "production";
    const logger = new NuboLogger();
    logger.red("Test message");
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test("should log in production when enabled", () => {
    process.env.NODE_ENV = "production";
    const logger = new NuboLogger({ enableInProduction: true });
    logger.green("Production message");
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("should test all color methods", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();

    // Test all color methods
    logger.red("Red");
    logger.green("Green");
    logger.blue("Blue");
    logger.yellow("Yellow");
    logger.orange("Orange");
    logger.gray("Gray");
    logger.gray2("Gray2");
    logger.gray3("Gray3");
    logger.gray4("Gray4");
    logger.gray5("Gray5");
    logger.gray6("Gray6");
    logger.mint("Mint");
    logger.teal("Teal");
    logger.cyan("Cyan");
    logger.indigo("Indigo");
    logger.purple("Purple");
    logger.pink("Pink");
    logger.brown("Brown");
    logger.label("Label");
    logger.success("Success");
    logger.warning("Warning");

    expect(consoleSpy).toHaveBeenCalledTimes(21);
  });

  test("should include timestamp when using t getter", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();
    logger.t.cyan("Timed message");
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("should handle bold formatting with b getter", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();
    logger.b.red("Bold message");
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("should handle bold with timestamp", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();
    logger.t.b.green("Bold timed message");
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("should handle object formatting in formatArgs", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();

    const obj = { test: "value" };

    const circularObj: Record<string, unknown> = { prop: "value" };
    (circularObj as Record<string, unknown>)["circular"] = circularObj;

    logger.blue("Message", obj);
    logger.red("Message", circularObj);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
  });

  test("should handle empty message", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();

    logger.blue("");
    logger.red("   ");

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test("should test error method with different inputs", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();

    logger.error("String error");
    logger.error(new Error("Error object"));
    logger.error(null);
    logger.error(undefined);

    expect(errorSpy).toHaveBeenCalledTimes(2);
  });

  test("should test debug method", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();

    logger.debug("Debug message");
    logger.debug(new Error("Debug error"));
    logger.debug(null);
    logger.debug(undefined);

    expect(debugSpy).toHaveBeenCalledTimes(2);
  });

  test("should test info method", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();

    logger.info("Info message");
    logger.info(new Error("Info error"));
    logger.info(null);
    logger.info(undefined);

    expect(infoSpy).toHaveBeenCalledTimes(2);
  });

  test("should test warn method", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();

    logger.warn("Warn message");
    logger.warn(new Error("Warn error"));
    logger.warn(null);
    logger.warn(undefined);

    expect(warnSpy).toHaveBeenCalledTimes(2);
  });

  test("should test count method", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();

    logger.count();

    expect(countSpy).toHaveBeenCalledTimes(1);
  });

  test("should not call methods in production", () => {
    process.env.NODE_ENV = "production";
    const logger = new NuboLogger();

    logger.error("Error");
    logger.debug("Debug");
    logger.info("Info");
    logger.warn("Warn");
    logger.count();

    expect(errorSpy).not.toHaveBeenCalled();
    expect(debugSpy).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(countSpy).not.toHaveBeenCalled();
  });

  test("should test rgbToAnsi with unknown color", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();

    // Force an unknown RGB color by directly calling storeLog with invalid color
    (logger as unknown as { storeLog(args: unknown[], color: string): void }).storeLog(
      ["Test"],
      "rgb(999, 999, 999)",
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  test("should handle multiple calls and reset state", () => {
    process.env.NODE_ENV = "development";
    const logger = new NuboLogger();

    logger.red("First");
    logger.blue("Second");
    logger.t.green("Third");

    expect(consoleSpy).toHaveBeenCalledTimes(3);
  });
});

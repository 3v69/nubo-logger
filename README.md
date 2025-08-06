# 🌈 Nubo Logger

A beautiful, colorful console logger utility for TypeScript/JavaScript development that makes debugging enjoyable!

[![npm version](https://badge.fury.io/js/nubo-logger.svg)](https://badge.fury.io/js/nubo-logger) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🎨 Provides multiple color options for better log visualization.  
- 🧠 Includes full TypeScript support with type definitions.  
- ⚡ Has zero dependencies, making it lightweight and fast.  
- 🌍 Automatically disables logging in production environments.  
- 🔧 Offers a simple and easy-to-use API.  
- 🔁 Supports both ESM and CommonJS module systems.  

## 📦 Installation

```bash
npm install nubo-logger
# or
yarn add nubo-logger
# or
pnpm add nubo-logger
# or
bun add nubo-logger
```

## 🚀 Usage

### Basic Usage

```ts
import log from "nubo-logger";

// log.t adds a timestamp to the output
// log.b makes the output bold
// log.t.b applies both timestamp and bold formatting

log.t.mint("[scope]", "This is a mint message with additional description");
log.mint("[scope]");
log.t.mint("[scope] with time");
log.b.mint("[scope]", "All string in bold");
log.t.b.mint("[scope]", "All string in bold", "ISOString + bold");
```

### Advanced Usage

```ts
import { NuboLogger } from "nubo-logger";

const logger = new NuboLogger({ enableInProduction: true });

logger.b.mint("[scope-2]", "This is a mint message with additional description");
logger.t.indigo("[scope-2]", "This is an indigo debug message with ISOString");
logger.cyan("[scope-2]", "@cyan", "Scope");
```

## 🎨 Available Colors

| Method      | Color    | Use Case                      |
|-------------|----------|-------------------------------|
| `blue()`    | 🔵 Blue  | Information, links            |
| `brown()`   | 🟤 Brown | Logs related to storage/files |
| `cyan()`    | 🔷 Cyan  | Highlights, emphasis          |
| `gray()`    | ⚫ Gray   | Less important info           |
| `gray2()`   | ⚫ Gray2  | Slightly darker info          |
| `gray3()`   | ⚫ Gray3  | Darker muted info             |
| `gray4()`   | ⚫ Gray4  | Even darker info              |
| `gray5()`   | ⚫ Gray5  | Near-black info               |
| `gray6()`   | ⚫ Gray6  | Background black              |
| `green()`   | 🟢 Green | Success, completion           |
| `indigo()`  | 🟣 Indigo| Accents, strong debug         |
| `label()`   | ⚪ Label | Bright white foreground       |
| `mint()`    | 🟢 Mint  | Fresh, success with emphasis  |
| `orange()`  | 🟠 Orange| Warnings, important notes     |
| `pink()`    | 🌸 Pink  | Friendly or soft emphasis     |
| `purple()`  | 🟣 Purple| Debug, special notes          |
| `red()`     | 🔴 Red   | Errors, critical issues       |
| `teal()`    | 🟦 Teal  | Calm or balanced output       |
| `yellow()`  | 🟡 Yellow| Warnings, attention           |

## 📊 Log Levels

| Method    | Level   | Description                   | Example Usage                              |
|-----------|---------|-------------------------------|--------------------------------------------|
| `error()` | Error   | Critical errors and exceptions| `log.error("Critical failure:", error);`  |
| `warn()`  | Warning | Warning messages              | `log.warn("Deprecated API usage.");`       |
| `info()`  | Info    | General information           | `log.info("User logged in successfully.");`|
| `debug()` | Debug   | Debug information             | `log.debug("Fetching user data:", userId);`|

## ⚙ Configuration

```ts
interface NuboLoggerOptions {
  enableInProduction?: boolean; // Optional, default: false
}

// Default configuration disables logging in production
const defaultLogger = new NuboLogger();

// Custom configuration to enable logging in production
const logger = new NuboLogger({
  enableInProduction: true,
});
```

## 🌍 Environment Behavior

- In non-production environments (`NODE_ENV !== 'production'`): All logs are displayed.  
- In production environments (`NODE_ENV === 'production'`): Logs are suppressed by default.  
- Override production suppression by passing `enableInProduction: true` to show logs.

## 🧪 Examples

### Error Handling

```ts
try {
  logger.green('Operation completed successfully.');
} catch (error) {
  logger.red('Operation failed:', error.message);
}
```

### API Responses

```ts
const response = await fetch('/api/data');

if (response.ok) {
  logger.t.green(`API call successful: ${response.status}`);
} else {
  logger.red(`API call failed: ${response.status}`);
}
```

### Debug Information

```ts
logger.cyan('Debugging user flow:');
logger.blue(`Timestamp: ${new Date().toISOString()}`);
```

## 🧪 Testing

```bash
npm test
npm run test:watch
npm run test:coverage
```

> Note: `npm run test:coverage` will fail if coverage thresholds are not met. Adjust thresholds in `jest.config.js` as needed.

## 🛠 Development

```bash
$ npm install

$ npm run dev

$ npm run build

$ npm run lint

$ npm run format
```

## 📄 License

MIT © [3v69](https://github.com/3v69)

## 🙌 Contributing

Contributions, issues, and feature requests are welcome! Please see [CONTRIBUTING.md](.github/CONTRIBUTING.md) for guidelines.

1. Fork the project  
2. Create your feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add some amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/3v69/nubo-logger?style=social) ![GitHub forks](https://img.shields.io/github/forks/3v69/nubo-logger?style=social) ![GitHub issues](https://img.shields.io/github/issues/3v69/nubo-logger)

---

❤️ Made with love by [3v69](https://github.com/3v69)

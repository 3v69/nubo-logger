import log from "./index.js";

void log.t.mint("[prew.ts]", "This is a mint message", "with additional description");

void log.mint("[prew-2.ts]");
void log.t.mint("[prew-2.ts]" + " with time");
void log.b.mint("[prew-2.ts]", "all string in bold");
void log.t.b.mint("[prew-2.ts]", "all string in bold", "ISOString + bold");

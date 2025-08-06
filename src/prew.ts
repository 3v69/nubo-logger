import { NuboLogger } from "./index.js";

const log = new NuboLogger();

void log.t.mint("[prew-2]", "This is a mint message", "with additional description");
void log.b.indigo("[prew-2]", "This is an indigo debug message", "with additional ISOString");
void log.cyan("[prew-2]", "@cyan", "Scope");

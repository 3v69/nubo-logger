import { NuboLogger } from "nubo-logger";

const log = new NuboLogger();
log.andTime();
log.mint("This is a mint message", "with additional description");

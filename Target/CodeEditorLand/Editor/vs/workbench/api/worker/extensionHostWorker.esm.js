import { create } from "./extensionHostWorker.js";
const data = create();
self.onmessage = (e) => data.onmessage(e.data);
//# sourceMappingURL=extensionHostWorker.esm.js.map

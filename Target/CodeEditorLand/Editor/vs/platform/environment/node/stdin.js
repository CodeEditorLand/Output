var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import * as fs from "fs";
import { tmpdir } from "os";
import { Queue } from "../../../base/common/async.js";
import { randomPath } from "../../../base/common/extpath.js";
import { resolveTerminalEncoding } from "../../../base/node/terminalEncoding.js";
function hasStdinWithoutTty() {
  try {
    return !process.stdin.isTTY;
  } catch (error) {
  }
  return false;
}
__name(hasStdinWithoutTty, "hasStdinWithoutTty");
function stdinDataListener(durationinMs) {
  return new Promise((resolve) => {
    const dataListener = /* @__PURE__ */ __name(() => resolve(true), "dataListener");
    setTimeout(() => {
      process.stdin.removeListener("data", dataListener);
      resolve(false);
    }, durationinMs);
    process.stdin.once("data", dataListener);
  });
}
__name(stdinDataListener, "stdinDataListener");
function getStdinFilePath() {
  return randomPath(tmpdir(), "code-stdin", 3);
}
__name(getStdinFilePath, "getStdinFilePath");
async function readFromStdin(targetPath, verbose, onEnd) {
  let [encoding, iconv] = await Promise.all([
    resolveTerminalEncoding(verbose),
    // respect terminal encoding when piping into file
    import("@vscode/iconv-lite-umd"),
    // lazy load encoding module for usage
    fs.promises.appendFile(targetPath, "")
    // make sure file exists right away (https://github.com/microsoft/vscode/issues/155341)
  ]);
  if (!iconv.default.encodingExists(encoding)) {
    console.log(`Unsupported terminal encoding: ${encoding}, falling back to UTF-8.`);
    encoding = "utf8";
  }
  const appendFileQueue = new Queue();
  const decoder = iconv.default.getDecoder(encoding);
  process.stdin.on("data", (chunk) => {
    const chunkStr = decoder.write(chunk);
    appendFileQueue.queue(() => fs.promises.appendFile(targetPath, chunkStr));
  });
  process.stdin.on("end", () => {
    const end = decoder.end();
    appendFileQueue.queue(async () => {
      try {
        if (typeof end === "string") {
          await fs.promises.appendFile(targetPath, end);
        }
      } finally {
        onEnd?.();
      }
    });
  });
}
__name(readFromStdin, "readFromStdin");
export {
  getStdinFilePath,
  hasStdinWithoutTty,
  readFromStdin,
  stdinDataListener
};
//# sourceMappingURL=stdin.js.map

var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

import { copyFile, cp, mkdir, stat, writeFile } from "node:fs/promises";

import { dirname } from "node:path";

const DataPrefix = "data:text/javascript,";

const Exists = /* @__PURE__ */ __name(async (Path) => {
  try {
    await stat(Path);

    return true;
  } catch {
    return false;
  }
}, "Exists");

const CopyFirstAvailable = /* @__PURE__ */ __name(async (Candidates) => {
  for (const Candidate of Candidates) {
    if (Candidate.From.startsWith(DataPrefix)) {
      try {
        await mkdir(dirname(Candidate.To), { recursive: true });

        await writeFile(
          Candidate.To,

          Candidate.From.slice(DataPrefix.length),

          "utf-8"
        );

        return { Resolved: Candidate };
      } catch (Error2) {
        return {
          Resolved: null,
          Error: Error2 instanceof globalThis.Error ? Error2.message : String(Error2)
        };
      }
    }

    if (!await Exists(Candidate.From)) continue;

    try {
      await mkdir(dirname(Candidate.To), { recursive: true });

      if (Candidate.Recursive) {
        await cp(Candidate.From, Candidate.To, {
          recursive: true,
          force: Candidate.Force ?? true
        });
      } else {
        await copyFile(Candidate.From, Candidate.To);
      }

      return { Resolved: Candidate };
    } catch (Error2) {
      return {
        Resolved: null,
        Error: Error2 instanceof globalThis.Error ? Error2.message : String(Error2)
      };
    }
  }

  return { Resolved: null };
}, "CopyFirstAvailable");

var Copy_default = CopyFirstAvailable;

export {
  CopyFirstAvailable,
  Copy_default as default
};

//# sourceMappingURL=Copy.js.map

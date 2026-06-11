var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

import { readdir, readFile, stat, writeFile } from "node:fs/promises";

import { join } from "node:path";

import CopyFirstAvailable from "./Copy.js";

const IsTransformable = /* @__PURE__ */ __name((Name) => /\.(m?js|cjs|ts|tsx|html)$/.test(Name), "IsTransformable");

const WalkFiles = /* @__PURE__ */ __name(async function* (Dir) {
  let Entries = [];

  try {
    Entries = await readdir(Dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const Entry of Entries) {
    const Full = join(Dir, Entry.name);

    if (Entry.isDirectory()) {
      yield* WalkFiles(Full);
    } else if (Entry.isFile() && IsTransformable(Entry.name)) {
      yield Full;
    }
  }
}, "WalkFiles");

const RunCopy = /* @__PURE__ */ __name(async (Plugin, Log) => {
  if (Plugin.Enabled && !Plugin.Enabled()) {
    return { Name: Plugin.Name, Copied: 0, Skipped: 1 };
  }

  let Copied = 0;

  let Skipped = 0;

  const Resolved = [];

  for (const Entry of Plugin.Entries) {
    const Candidates = Entry.From.map((From) => ({
      From,
      To: Entry.To,
      ...Entry.Recursive !== void 0 ? { Recursive: Entry.Recursive } : {},
      ...Entry.Force !== void 0 ? { Force: Entry.Force } : {}
    }));

    const Outcome = await CopyFirstAvailable(Candidates);

    if (Outcome.Resolved) {
      Copied++;

      Resolved.push({
        From: Outcome.Resolved.From,
        To: Outcome.Resolved.To
      });
    } else {
      Skipped++;

      if (Plugin.Required) {
        throw new Error(
          `Plugin ${Plugin.Name}: no candidate resolved for ${Entry.To}${Outcome.Error ? ` (${Outcome.Error})` : ""}`
        );
      }

      Log?.(
        `[${Plugin.Name}] no candidate resolved for ${Entry.To}; skipping`
      );
    }
  }

  if (Plugin.AfterCopy && Resolved.length > 0) {
    await Plugin.AfterCopy(Resolved);
  }

  return { Name: Plugin.Name, Copied, Skipped };
}, "RunCopy");

const RunTransforms = /* @__PURE__ */ __name(async (Roots, Transforms) => {
  const Counters = /* @__PURE__ */ new Map();

  for (const T of Transforms) {
    Counters.set(T.Name, { Rewritten: 0, Stubbed: 0 });
  }

  const Active = Transforms.filter((T) => !(T.Enabled && !T.Enabled()));

  if (Active.length === 0) {
    return [...Counters.entries()].map(([Name, Count]) => ({
      Name,
      ...Count
    }));
  }

  for (const Root of Roots) {
    try {
      await stat(Root.Path);
    } catch {
      continue;
    }

    for await (const File of WalkFiles(Root.Path)) {
      let Source;

      try {
        Source = await readFile(File, "utf-8");
      } catch {
        continue;
      }

      let Current = Source;

      for (const Plugin of Active) {
        if (!Plugin.Match({ Path: File, Role: Root.Role })) continue;

        const Result = await Plugin.Transform({
          Path: File,
          Source: Current,
          Role: Root.Role
        });

        if (Result.Kind === "Unchanged") continue;

        Current = Result.Source;

        const Counter = Counters.get(Plugin.Name);

        if (Result.Kind === "Rewrite") {
          Counters.set(Plugin.Name, {
            Rewritten: Counter.Rewritten + 1,
            Stubbed: Counter.Stubbed
          });
        } else {
          Counters.set(Plugin.Name, {
            Rewritten: Counter.Rewritten,
            Stubbed: Counter.Stubbed + 1
          });
        }
      }

      if (Current !== Source) {
        try {
          await writeFile(File, Current, "utf-8");
        } catch {
        }
      }
    }
  }

  return [...Counters.entries()].map(([Name, Count]) => ({
    Name,
    ...Count
  }));
}, "RunTransforms");

const ApplyPlugins = /* @__PURE__ */ __name(async ({
  Plugins,
  Roots,
  Log
}) => {
  const CopyResults = [];

  const Transforms = [];

  for (const Plugin of Plugins) {
    if (Plugin.Kind === "Copy") {
      Log?.(`[${Plugin.Name}] starting`);

      const Result = await RunCopy(Plugin, Log);

      Log?.(
        `[${Plugin.Name}] copied=${Result.Copied} skipped=${Result.Skipped}`
      );

      CopyResults.push(Result);
    } else {
      Transforms.push(Plugin);
    }
  }

  const TransformResults = await RunTransforms(Roots, Transforms);

  for (const Result of TransformResults) {
    Log?.(
      `[${Result.Name}] rewritten=${Result.Rewritten} stubbed=${Result.Stubbed}`
    );
  }

  return { Copy: CopyResults, Transform: TransformResults };
}, "ApplyPlugins");

var Apply_default = ApplyPlugins;

export {
  Apply_default as default
};

//# sourceMappingURL=Apply.js.map

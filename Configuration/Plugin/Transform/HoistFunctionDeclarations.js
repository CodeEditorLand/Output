var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "/* __LAND_FN_DECLS_HOISTED_V2__ */";
const LegacyMarker = "/* __LAND_FN_DECLS_HOISTED__ */";
const HelperNames = ["__defProp", "__name", "__decorate", "__param"];
const RegexAllowingKeywords = /* @__PURE__ */ new Set([
  "return",
  "typeof",
  "instanceof",
  "in",
  "of",
  "delete",
  "void",
  "throw",
  "new",
  "do",
  "else",
  "case",
  "yield",
  "await"
]);
const InitialState = {
  InBlockComment: false,
  StringChar: null,
  BraceStack: []
};
function FindTopLevelFunctionBlocks(Lines) {
  const Blocks = [];
  let Depth = 0;
  let State = InitialState;
  const FunctionStart = /^function ([A-Za-z_$][\w$]*)\s*\(/;
  let i = 0;
  while (i < Lines.length) {
    const Line = Lines[i];
    const Stripped = StripCommentsAndStrings(Line, State);
    if (Depth === 0 && !State.InBlockComment && State.StringChar === null && State.BraceStack.length === 0) {
      const Match = FunctionStart.exec(Line);
      if (Match) {
        const StartLine = i;
        const Name = Match[1];
        let LocalDepth = Stripped.Open - Stripped.Close;
        let Inner = {
          InBlockComment: Stripped.InBlockComment,
          StringChar: Stripped.StringChar,
          BraceStack: Stripped.BraceStack
        };
        let j = i + 1;
        while (j < Lines.length && LocalDepth > 0) {
          const Next = StripCommentsAndStrings(Lines[j], Inner);
          Inner = {
            InBlockComment: Next.InBlockComment,
            StringChar: Next.StringChar,
            BraceStack: Next.BraceStack
          };
          LocalDepth += Next.Open - Next.Close;
          j++;
        }
        const EndLine = j - 1;
        const Source = Lines.slice(StartLine, EndLine + 1).join("\n");
        Blocks.push({ StartLine, EndLine, Source, Name });
        State = Inner;
        i = EndLine + 1;
        continue;
      }
    }
    Depth += Stripped.Open - Stripped.Close;
    State = {
      InBlockComment: Stripped.InBlockComment,
      StringChar: Stripped.StringChar,
      BraceStack: Stripped.BraceStack
    };
    i++;
  }
  return Blocks;
}
__name(FindTopLevelFunctionBlocks, "FindTopLevelFunctionBlocks");
function FindTopLevelHelperVars(Lines) {
  const Blocks = [];
  let Depth = 0;
  let State = InitialState;
  const HelperStart = new RegExp(`^var (${HelperNames.join("|")})\\s*=`);
  let i = 0;
  while (i < Lines.length) {
    const Line = Lines[i];
    const Stripped = StripCommentsAndStrings(Line, State);
    if (Depth === 0 && !State.InBlockComment && State.StringChar === null && State.BraceStack.length === 0) {
      const Match = HelperStart.exec(Line);
      if (Match) {
        const StartLine = i;
        const Name = Match[1];
        let LocalDepth = Stripped.Open - Stripped.Close;
        let Inner = {
          InBlockComment: Stripped.InBlockComment,
          StringChar: Stripped.StringChar,
          BraceStack: Stripped.BraceStack
        };
        let j = i + 1;
        while (j < Lines.length && LocalDepth > 0) {
          const Next = StripCommentsAndStrings(Lines[j], Inner);
          Inner = {
            InBlockComment: Next.InBlockComment,
            StringChar: Next.StringChar,
            BraceStack: Next.BraceStack
          };
          LocalDepth += Next.Open - Next.Close;
          j++;
        }
        const EndLine = j - 1;
        const Source = Lines.slice(StartLine, EndLine + 1).join("\n");
        Blocks.push({ StartLine, EndLine, Source, Name });
        State = Inner;
        i = EndLine + 1;
        continue;
      }
    }
    Depth += Stripped.Open - Stripped.Close;
    State = {
      InBlockComment: Stripped.InBlockComment,
      StringChar: Stripped.StringChar,
      BraceStack: Stripped.BraceStack
    };
    i++;
  }
  return Blocks;
}
__name(FindTopLevelHelperVars, "FindTopLevelHelperVars");
function StripCommentsAndStrings(Line, State) {
  let Open = 0;
  let Close = 0;
  let InBlockComment = State.InBlockComment;
  let StringChar = State.StringChar;
  const BraceStack = [...State.BraceStack];
  let i = 0;
  while (i < Line.length) {
    const c = Line[i];
    const next = Line[i + 1];
    if (InBlockComment) {
      if (c === "*" && next === "/") {
        InBlockComment = false;
        i += 2;
        continue;
      }
      i++;
      continue;
    }
    if (StringChar) {
      if (StringChar === "`" && c === "$" && next === "{") {
        BraceStack.push("${");
        StringChar = null;
        i += 2;
        continue;
      }
      if (c === "\\") {
        i += 2;
        continue;
      }
      if (c === StringChar) {
        StringChar = null;
      }
      i++;
      continue;
    }
    if (c === "/" && next === "/") break;
    if (c === "/" && next === "*") {
      InBlockComment = true;
      i += 2;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      StringChar = c;
      i++;
      continue;
    }
    if (c === "\\") {
      i += 2;
      continue;
    }
    if (c === "/") {
      let k = i - 1;
      while (k >= 0 && (Line[k] === " " || Line[k] === "	")) k--;
      const Prev = k >= 0 ? Line[k] : "";
      let IsRegex = !/[A-Za-z_$0-9)\]]/.test(Prev) || Prev === "";
      if (!IsRegex && /[A-Za-z_$]/.test(Prev)) {
        let WordStart = k;
        while (WordStart > 0 && /[A-Za-z_$0-9]/.test(Line[WordStart - 1])) {
          WordStart--;
        }
        const Word = Line.slice(WordStart, k + 1);
        if (RegexAllowingKeywords.has(Word)) IsRegex = true;
      }
      if (IsRegex) {
        let m = i + 1;
        let InCharClass = false;
        while (m < Line.length) {
          const Ch = Line[m];
          if (Ch === "\\") {
            m += 2;
            continue;
          }
          if (Ch === "[" && !InCharClass) {
            InCharClass = true;
            m++;
            continue;
          }
          if (Ch === "]" && InCharClass) {
            InCharClass = false;
            m++;
            continue;
          }
          if (Ch === "/" && !InCharClass) {
            m++;
            while (m < Line.length && /[gimsuyd]/.test(Line[m])) {
              m++;
            }
            break;
          }
          m++;
        }
        i = m;
        continue;
      }
    }
    if (c === "{") {
      BraceStack.push("{");
      Open++;
      i++;
      continue;
    }
    if (c === "}") {
      const Top = BraceStack.pop();
      if (Top === "${") {
        StringChar = "`";
      } else {
        Close++;
      }
      i++;
      continue;
    }
    i++;
  }
  return { Open, Close, InBlockComment, StringChar, BraceStack };
}
__name(StripCommentsAndStrings, "StripCommentsAndStrings");
const Plugin = {
  Kind: "Transform",
  Name: "HoistFunctionDeclarations",
  Match: /* @__PURE__ */ __name(({ Path }) => (
    // Limit to VS Code source. Skip already-hoisted files.
    /\/vs\/.*\.js$/.test(Path) && !/\.d\.ts\.map$/.test(Path)
  ), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    const Lines = Source.split("\n");
    const Blocks = FindTopLevelFunctionBlocks(Lines);
    const HelperBlocks = FindTopLevelHelperVars(Lines);
    const HasLegacyMarker = Source.includes(LegacyMarker);
    if (Blocks.length === 0 && HelperBlocks.length === 0) {
      return { Kind: "Unchanged" };
    }
    const FirstBlockStart = Blocks[0]?.StartLine ?? Lines.length;
    const PreambleLines = Lines.slice(0, FirstBlockStart);
    const PreambleHasCallsToHoistedFns = Blocks.some(
      (Block) => PreambleLines.some(
        (PrevLine) => new RegExp(`\\b${Block.Name}\\s*\\(`).test(PrevLine)
      )
    );
    const HelpersNeedHoisting = HelperBlocks.some(
      (Block) => Block.StartLine > 0
    );
    if (!PreambleHasCallsToHoistedFns && !HelpersNeedHoisting && !HasLegacyMarker) {
      return { Kind: "Unchanged" };
    }
    const SkipRanges = /* @__PURE__ */ new Set();
    for (const Block of Blocks) {
      for (let n = Block.StartLine; n <= Block.EndLine; n++) {
        SkipRanges.add(n);
      }
    }
    for (const Block of HelperBlocks) {
      for (let n = Block.StartLine; n <= Block.EndLine; n++) {
        SkipRanges.add(n);
      }
    }
    let HoistInsertAt = 0;
    for (let n = 0; n < Lines.length; n++) {
      const Trimmed = Lines[n].trim();
      if (Trimmed === "" || Trimmed.startsWith("//") || Trimmed.startsWith("/*") || Trimmed.startsWith("*") || Trimmed.startsWith("import ") || Trimmed.startsWith("import{") || Trimmed.startsWith("import*") || Trimmed.startsWith("import(")) {
        HoistInsertAt = n + 1;
      } else {
        break;
      }
    }
    const HelpersSource = HelperBlocks.map((B) => B.Source).join("\n");
    const FunctionsSource = Blocks.map((B) => B.Source).join("\n");
    const HoistedSource = [HelpersSource, FunctionsSource].filter((Part) => Part.length > 0).join("\n");
    const Output = [];
    for (let n = 0; n < HoistInsertAt; n++) {
      if (!SkipRanges.has(n)) Output.push(Lines[n]);
    }
    Output.push(Marker);
    if (HoistedSource.length > 0) Output.push(HoistedSource);
    for (let n = HoistInsertAt; n < Lines.length; n++) {
      if (!SkipRanges.has(n)) Output.push(Lines[n]);
    }
    return { Kind: "Rewrite", Source: Output.join("\n") };
  }
};
var HoistFunctionDeclarations_default = Plugin;
export {
  HoistFunctionDeclarations_default as default
};
//# sourceMappingURL=HoistFunctionDeclarations.js.map

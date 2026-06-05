var Telemetry_default = (() => {
  let Handler = null;

  const Telemetry = {
    On(Category, Error, Detail) {
      if (Handler === null) return;

      try {
        Handler(Category, Error, Detail);
      } catch {
      }
    },
    Set(NewHandler) {
      Handler = NewHandler;
    }
  };

  if (typeof globalThis !== "undefined") {
    globalThis.__LAND_POLYFILL_TELEMETRY__ = Telemetry;
  }

  return Telemetry;
})();

export {
  Telemetry_default as default
};

//# sourceMappingURL=Telemetry.js.map

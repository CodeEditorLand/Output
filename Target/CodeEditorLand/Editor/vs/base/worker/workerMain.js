var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
(function() {
  function loadCode(moduleId) {
    const moduleUrl = new URL(`${moduleId}.js`, globalThis._VSCODE_FILE_ROOT);
    return import(moduleUrl.href);
  }
  __name(loadCode, "loadCode");
  function setupWorkerServer(ws) {
    setTimeout(function() {
      const messageHandler = ws.create((msg, transfer) => {
        globalThis.postMessage(msg, transfer);
      });
      self.onmessage = (e) => messageHandler.onmessage(e.data, e.ports);
      while (beforeReadyMessages.length > 0) {
        self.onmessage(beforeReadyMessages.shift());
      }
    }, 0);
  }
  __name(setupWorkerServer, "setupWorkerServer");
  let isFirstMessage = true;
  const beforeReadyMessages = [];
  globalThis.onmessage = (message) => {
    if (!isFirstMessage) {
      beforeReadyMessages.push(message);
      return;
    }
    isFirstMessage = false;
    loadCode(message.data).then((ws) => {
      setupWorkerServer(ws);
    }, (err) => {
      console.error(err);
    });
  };
})();
//# sourceMappingURL=workerMain.js.map

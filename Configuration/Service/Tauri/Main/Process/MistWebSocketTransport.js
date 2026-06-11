var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

let _ws = null;

let _config = null;

const _pending = /* @__PURE__ */ new Map();

let _nextId = 1;

let _dead = false;

let _reconnectAttempts = 0;

let _reconnectStart = 0;

let _reconnectTimer;

const _DeadAfterMs = 3e4;

const _BackoffSteps = [100, 200, 400, 1e3, 2e3, 5e3];

const _Trace = /* @__PURE__ */ __name((Tag, Message) => {
  try {
    performance.mark(`land:${Tag}:${Message}`);
  } catch {
  }
}, "_Trace");

function _BackoffMs() {

  const Idx = Math.min(_reconnectAttempts, _BackoffSteps.length - 1);

  return _BackoffSteps[Idx] ?? 5e3;
}

__name(_BackoffMs, "_BackoffMs");

function _DrainPending(Reason) {

  for (const Fn of _pending.values()) Fn(void 0, Reason);

  _pending.clear();
}

__name(_DrainPending, "_DrainPending");

function _Connect() {

  if (!_config || _dead) return;

  const { port, secret } = _config;

  const Url = `ws://127.0.0.1:${port}/?secret=${encodeURIComponent(secret)}`;

  try {
    const Ws = new WebSocket(Url, [secret]);

    Ws.onopen = () => {
      _ws = Ws;

      _reconnectAttempts = 0;

      _Trace("mist-ws", "connected");
    };

    Ws.onmessage = (Ev) => {
      try {
        const Envelope = JSON.parse(Ev.data);

        const Id = Envelope.id;

        if (Id === void 0 || Id === null) return;

        const Fn = _pending.get(Id);

        if (!Fn) return;

        _pending.delete(Id);

        if (Envelope.error !== void 0)

          Fn(void 0, String(Envelope.error));

        else Fn(Envelope.result ?? null);
      } catch {
      }
    };

    Ws.onclose = () => {
      _ws = null;

      _DrainPending("WebSocket connection closed");

      _ScheduleReconnect();
    };

    Ws.onerror = () => {
    };
  } catch {
    _ScheduleReconnect();
  }
}

__name(_Connect, "_Connect");

function _ScheduleReconnect() {

  if (_dead || !_config) return;

  if (_reconnectAttempts === 0) _reconnectStart = Date.now();

  _reconnectAttempts++;

  if (Date.now() - _reconnectStart >= _DeadAfterMs) {
    _dead = true;

    _DrainPending("MistWS dead after 30s of failed reconnect");

    return;
  }

  clearTimeout(_reconnectTimer);

  _reconnectTimer = setTimeout(_Connect, _BackoffMs());
}

__name(_ScheduleReconnect, "_ScheduleReconnect");

function Initialize(port, secret) {

  if (_config) return;

  _config = { port, secret };

  _dead = false;

  _reconnectAttempts = 0;

  _Connect();
}

__name(Initialize, "Initialize");

function IsAvailable() {

  return !_dead && _ws !== null && _ws.readyState === WebSocket.OPEN;
}

__name(IsAvailable, "IsAvailable");

function invoke(method, params) {

  return new Promise((Resolve, Reject) => {
    if (!IsAvailable() || !_ws) {
      Reject(new Error("MistWS: not connected"));

      return;
    }

    const Id = _nextId++;

    _pending.set(Id, (Result, Err) => {
      if (Err !== void 0) Reject(new Error(Err));

      else Resolve(Result);
    });

    try {
      _ws.send(JSON.stringify({ id: Id, method, params }));
    } catch (E) {
      _pending.delete(Id);

      Reject(E instanceof Error ? E : new Error(String(E)));
    }
  });
}

__name(invoke, "invoke");

function notify(method, params) {

  if (!IsAvailable() || !_ws) return;

  try {
    _ws.send(JSON.stringify({ id: null, method, params }));
  } catch {
  }
}

__name(notify, "notify");

export {
  Initialize,
  IsAvailable,
  invoke,
  notify
};

//# sourceMappingURL=MistWebSocketTransport.js.map

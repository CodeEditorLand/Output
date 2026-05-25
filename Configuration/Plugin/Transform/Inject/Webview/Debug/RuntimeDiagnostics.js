var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "<!-- __LAND_WEBVIEW_RUNTIME_DIAG__ -->";
const PathRegex = /\/vs\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;
const DiagnosticCode = `
(function() {
  // Helper
  var WV_ID = (function() { try { var p = new URL(location.toString()).searchParams.get('id'); return p || ''; } catch(e) { return ''; } })();
  var WV_T = function() { return '['+WV_ID+']['+(Date.now()-performance.timeOrigin).toFixed(0)+'ms]'; };
  var DEBUG_WV = function() {
    console.log('[WebviewDebug]', WV_T(), Array.prototype.slice.call(arguments).map(function(a) {
      return typeof a === 'object' ? JSON.stringify(a) : String(a);
    }));
  };

  DEBUG_WV('RUNTIME_DIAG_BOOT');

  // Cross-frame message listener - logs postMessage events between
  // inner iframe and extension host (limited to avoid spam)
  var _msgCount = 0;
  window.addEventListener('message', function(e) {
    // Handle inner-frame diagnostics relayed via postMessage
    var d = e.data;
    if (d && d._landDiag) {
      if (_msgCount < 200) {
        _msgCount++;
        DEBUG_WV('INNER_DIAG', { msg: d.msg, data: d.data });
      }
      return;
    }
    // Regular cross-frame messages (capped at 50)
    if (_msgCount >= 50) return;
    _msgCount++;
    var d = e.data;
    if (d && typeof d === 'object') {
      var keys = Object.keys(d).slice(0, 8);
      DEBUG_WV('MSG_EVENT', {
        count: _msgCount,
        origin: e.origin ? e.origin.slice(0, 80) : 'null',
        keys: keys,
        channel: d.channel || d.type || '?',
        target: d.target || '?',
        hasData: d.data !== undefined || d.message !== undefined,
        source: e.source === window ? 'self' : e.source ? 'other' : 'null',
      });
    }
  });

  // Track createWebviewPanel / set-html if SkyBridge globals exist
  setTimeout(function() {
    var lastInfo = window.__CEL_LATEST_SET_HTML_INFO__;
    if (lastInfo) {
      DEBUG_WV('SKY_SET_HTML', lastInfo);
    }
    var lastFirst = window.__CEL_LAST_SET_HTML_INFO__;
    if (lastFirst) {
      DEBUG_WV('SKY_FIRST_SET_HTML', lastFirst);
    }
  }, 3000);

  // Global errors
  window.addEventListener('error', function(e) {
    var err = e.error;
    DEBUG_WV('GLOBAL_ERROR', { message: (err && err.message) || e.message, filename: e.filename, lineno: e.lineno, colno: e.colno, stack: (err && err.stack) });
  });
  window.addEventListener('unhandledrejection', function(e) {
    var r = e.reason;
    DEBUG_WV('UNHANDLED_REJECTION', { message: (r && r.message) || String(r), stack: r && r.stack });
  });

  // Console interception
  ['error','warn','info','debug'].forEach(function(method) {
    var orig = console[method];
    if (orig) {
      console[method] = function() {
        DEBUG_WV('CONSOLE_' + method.toUpperCase(), Array.prototype.slice.call(arguments));
        orig.apply(console, arguments);
      };
    }
  });

  // ReactDOM hooks
  if (typeof ReactDOM !== 'undefined') {
    (function() {
      var OrigCreateRoot = ReactDOM.createRoot;
      ReactDOM.createRoot = function(container, options) {
        DEBUG_WV('REACT_CREATE_ROOT', { container: (container && container.id) || String(container), options: options });
        var root = OrigCreateRoot.call(this, container, options);
        var OrigRender = root.render.bind(root);
        root.render = function(element) {
          DEBUG_WV('REACT_RENDER_START', { elementType: (element && element.type && element.type.name) || String(element) });
          try {
            var result = OrigRender(element);
            DEBUG_WV('REACT_RENDER_COMPLETE');
            return result;
          } catch (err) {
            DEBUG_WV('REACT_RENDER_ERROR', { message: err.message, stack: err.stack });
            throw err;
          }
        };
        return root;
      };
    })();
  }

  // DOM mutation observer for #root
  if (typeof MutationObserver !== 'undefined') {
    (function() {
      var ro = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var m = mutations[i];
          DEBUG_WV('DOM_MUTATION', { type: m.type, target: (m.target && m.target.id) || (m.target && m.target.tagName), added: m.addedNodes.length, removed: m.removedNodes.length });
        }
      });
      var CheckRoot = setInterval(function() {
        var rootEl = document.getElementById('root');
        if (rootEl) {
          clearInterval(CheckRoot);
          ro.observe(rootEl, { childList: true, subtree: true, attributes: true });
          DEBUG_WV('ROOT_ELEMENT_FOUND', { exists: true, children: rootEl.childElementCount });
        }
      }, 100);
    })();
  }

  // Extension module load detection
  setTimeout(function() {
    var extScript = document.querySelector('script[type="module"][src*="index.js"]');
    if (extScript) {
      extScript.addEventListener('load', function() { DEBUG_WV('EXTENSION_MODULE_LOADED'); });
      extScript.addEventListener('error', function(e) { DEBUG_WV('EXTENSION_MODULE_ERROR', e.message); });
    } else {
      DEBUG_WV('EXTENSION_MODULE_SCRIPT_NOT_FOUND');
      // Dump DOM state to diagnose
      var allScripts = document.querySelectorAll('script');
      var scriptInfo = Array.from(allScripts).map(function(s) {
        return { src: s.src, type: s.type, id: s.id, async: s.async, defer: s.defer };
      });
      DEBUG_WV('DOM_SCRIPTS_DUMP', { count: allScripts.length, scripts: scriptInfo });
      var bodySnippet = document.body ? document.body.innerHTML.slice(0, 500) : 'NO_BODY';
      DEBUG_WV('BODY_SNIPPET', { snippet: bodySnippet });
      var htmlSnippet = document.documentElement ? document.documentElement.outerHTML.slice(0, 1000) : 'NO_DOCUMENT';
      DEBUG_WV('HTML_SNIPPET', { snippet: htmlSnippet });
    }
  }, 0);
})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectWebviewRuntimeDiagnostics",
  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    const closing = "</body>";
    const idx = Source.lastIndexOf(closing);
    if (idx < 0) return { Kind: "Unchanged" };
    const injection = Marker + "<script>" + DiagnosticCode + "</script>";
    const Next = Source.slice(0, idx) + injection + Source.slice(idx);
    return { Kind: "Rewrite", Source: Next };
  }
};
var RuntimeDiagnostics_default = Plugin;
export {
  RuntimeDiagnostics_default as default
};
//# sourceMappingURL=RuntimeDiagnostics.js.map

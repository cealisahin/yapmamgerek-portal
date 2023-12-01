import { g as useRoute, f as fetchDefaults, d as asyncDataDefaults, e as useNuxtApp, c as createError } from '../server.mjs';
import { defineComponent, ref, unref, useSSRContext, computed, toValue, reactive, shallowRef, toRef, getCurrentInstance, onServerPrefetch } from 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/vue/index.mjs';
import { u as useHead } from './index-6a088328.mjs';
import { hash } from 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/ohash/dist/index.mjs';
import { ssrRenderAttrs, ssrInterpolate } from 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/hookable/dist/index.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/unctx/dist/index.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/unhead/dist/index.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/h3/dist/index.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/ufo/dist/index.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/defu/dist/defu.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/destr/dist/index.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/scule/dist/index.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/klona/dist/index.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/unstorage/drivers/memory.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/alisahin/Documents/Development/yapmamgerek-portal/node_modules/pathe/dist/index.mjs';

function useAsyncData(...args) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  var _a;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxt = useNuxtApp();
  const getDefault = () => null;
  const getDefaultCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  options.getCachedData = (_c = options.getCachedData) != null ? _c : getDefaultCachedData;
  options.lazy = (_d = options.lazy) != null ? _d : false;
  options.immediate = (_e = options.immediate) != null ? _e : true;
  options.deep = (_f = options.deep) != null ? _f : asyncDataDefaults.deep;
  const hasCachedData = () => ![null, void 0].includes(options.getCachedData(key));
  if (!nuxt._asyncData[key] || !options.immediate) {
    (_g = (_a = nuxt.payload._errors)[key]) != null ? _g : _a[key] = null;
    const _ref = options.deep ? ref : shallowRef;
    nuxt._asyncData[key] = {
      data: _ref((_h = options.getCachedData(key)) != null ? _h : options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key),
      status: ref("idle")
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxt.isHydrating && opts._initial !== false) && hasCachedData()) {
      return Promise.resolve(options.getCachedData(key));
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxt.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = null;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestFetch() {
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return toValue(r);
  });
  const _key = opts.key || hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && _request.value.startsWith("//")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    getCachedData,
    deep,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    if (timeoutLength) {
      setTimeout(() => controller.abort(), timeoutLength);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value.startsWith("/") && (!toValue(opts.baseURL) || toValue(opts.baseURL).startsWith("/"));
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    const iterator = Array.isArray(obj) ? obj : Object.entries(obj);
    for (const [key, value] of iterator) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  return segments;
}
const useFetchWebtoons = (path, options = {}) => {
  options.baseURL = "http://130.61.158.244:8091";
  options.headers = {};
  options.onResponseError = ({ request, response, options: options2 }) => {
    if (response.status === 401)
      ;
  };
  return useFetch(path, options, "$ry6PBWMcaN");
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const title = ref();
    const content = ref();
    useHead({
      title: `...`
    });
    useFetchWebtoons("/attractions/" + route.params.slug, {
      onResponse({ request, response, options }) {
        content.value = response._data.description;
        title.value = response._data.title;
        useHead({
          title
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h2>${ssrInterpolate(unref(title))}</h2><span>${ssrInterpolate(unref(content))}</span><span> detay </span></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-62fac92a.mjs.map

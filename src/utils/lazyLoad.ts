export function withLazyLoad<T>(importFn: () => Promise<T>) {
  return importFn().then((mod) => ({
    default: typeof mod === 'function' ? mod : (mod as { default: T }).default,
  }));
}

export function buildQueryString(params: Record<string, string | string[] | undefined>) {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      const encodedValue = Array.isArray(value)
        ? value.map(encodeURIComponent).join(';')
        : encodeURIComponent(value as string);
      return `${encodeURIComponent(key)}=${encodedValue}`;
    })
    .join('&');
}

import dict from 'common/locale/he';

const REGEX = /\{(\w+)\}/g;

export function t(key, params) {
  const raw = dict[key];
  if (raw === undefined) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`[i18n] missing key: ${key}`);
    }
    return key;
  }
  if (!params) return raw;
  return raw.replace(REGEX, (_, p) => (params[p] !== undefined ? params[p] : `{${p}}`));
}

export const dir = 'rtl';
export default t;

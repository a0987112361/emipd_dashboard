import i18n from 'i18n-js';
import Locales from '../Locales';
import { memoize } from 'lodash';

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = (customLocale) => {
  // fallback if no available language fits
  let i18nTag = JSON.parse(window.localStorage.getItem('PM_I18N'));
  if (i18nTag === undefined || i18nTag === null) {
    window.localStorage.setItem('PM_I18N', JSON.stringify({ languageTag: 'en', isRTL: false }))
    i18nTag = { languageTag: 'en', isRTL: false };
  }

  const languageTag = navigator.language || navigator.userLanguage || i18nTag.languageTag;
  ;

  // const isRTL = require('rtl-detect').isRtlLang(languageTag) || fallback.isRTL;

  // clear translation cache
  translate.cache.clear();

  // check custom language available
  const isCustomLocalValid =
    !!customLocale && Object.keys(Locales).includes(customLocale);

  // check browser language available
  const isBrowserLanguageValid =
    !!languageTag && Object.keys(Locales).includes(languageTag);

  // decide target language
  const targetLocale = isCustomLocalValid
    ? customLocale
    : isBrowserLanguageValid
      ? languageTag
      : i18nTag.languageTag;

  i18n.translations = { [targetLocale]: Locales[targetLocale]() };
  i18n.locale = targetLocale;
};

export default {
  setI18nConfig,
  translate,
};

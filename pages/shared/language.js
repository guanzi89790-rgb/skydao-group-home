export function getInitialLocale(fallback = 'en') {
  const savedLocale = localStorage.getItem('skydao-language')
  return savedLocale === 'en' || savedLocale === 'zh' ? savedLocale : fallback
}

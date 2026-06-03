export const mapProviderConfig = {
  naverMapsEnabled: import.meta.env.VITE_NAVER_MAPS_ENABLED === 'true',
  naverMapsClientId: import.meta.env.VITE_NAVER_MAPS_CLIENT_ID || '',
};

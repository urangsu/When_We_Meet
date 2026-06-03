export type PlaceProvider = 'manual' | 'naver';

export interface PlacePoint {
  lat: number;
  lng: number;
}

export interface PlaceResult {
  provider: PlaceProvider;
  providerPlaceId?: string;
  name: string;
  address?: string;
  roadAddress?: string;
  category?: string;
  phone?: string;
  mapUrl?: string;
  point?: PlacePoint;
  raw?: unknown;
}

export interface SelectedPlace extends PlaceResult {
  selectedAt: string;
}

export type DiscoveryKind =
  | 'local_now'
  | 'national_event'
  | 'article'
  | 'photo';

export type DiscoverySourceType =
  | 'seed'
  | 'curated'
  | 'api'
  | 'ai';

export interface DiscoveryItem {
  id: string;
  kind: DiscoveryKind;
  title: string;
  subtitle: string;
  body?: string;
  imageUrl?: string;
  imageAsset?: string;
  tags: string[];

  locationScope: 'nearby' | 'national' | 'none';
  locationLabel?: string;

  startsAt?: string;
  endsAt?: string;

  recommendedTimeLabel?: string;
  weatherFit?: Array<'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'hot' | 'cold'>;

  suggestedCategory?: string;
  suggestedPlace?: string;
  suggestedActivity?: string;
  suggestedMessage?: string;

  sourceType: DiscoverySourceType;
  sourceLabel?: string;
}

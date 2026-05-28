export interface DiscoveryItem {
  id: string;
  type: 'place' | 'idea' | 'article';
  imageUrl: string;
  title: string;
  subtitle: string;
  tags: string[];
}

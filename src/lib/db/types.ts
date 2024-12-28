export type QueryType = 'post_links' | 'profile_keywords' | 'date_range';
export type QueryStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface QueryParams {
  postLinks?: string[];
  profileUrl?: string;
  keywords?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface TweetMetrics {
  views: number;
  likes: number;
  replies: number;
  retweets: number;
  bookmarks: number;
  lastUpdated: string;
}

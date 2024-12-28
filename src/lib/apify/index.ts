const APIFY_URL = 'https://api.apify.com/v2/acts/kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest/run-sync-get-dataset-items';

export interface TweetData {
  id: string;
  text: string;
  authorUsername: string;
  createdAt: string;
  metrics: {
    views: number;
    likes: number;
    replies: number;
    retweets: number;
    bookmarks: number;
  };
}

export async function fetchTweetMetrics(tweetIds: string[]): Promise<TweetData[]> {
  try {
    const response = await fetch(`${APIFY_URL}?token=${process.env.APIFY_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tweetIDs: tweetIds,
        maxItems: tweetIds.length,
        queryType: 'Latest'
      })
    });

    if (!response.ok) {
      throw new Error(`Apify API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.filter((tweet: any) => 
      tweet && 
      tweet.type !== 'mock_tweet' && 
      tweet.id !== -1 && 
      tweet.text && 
      tweet.text.length > 0 &&
      !tweet.text.includes('From KaitoEasyAPI, a reminder:')
    ).map((tweet: any) => ({
      id: tweet.id,
      text: tweet.text,
      authorUsername: tweet.author?.userName || '',
      createdAt: tweet.createdAt,
      metrics: {
        views: tweet.viewCount || 0,
        likes: tweet.likeCount || 0,
        replies: tweet.replyCount || 0,
        retweets: tweet.retweetCount || 0,
        bookmarks: tweet.bookmarkCount || 0
      }
    }));
  } catch (error) {
    console.error('Error fetching tweet metrics:', error);
    throw error;
  }
}

export async function searchTweetsByProfile(profileUrl: string, keywords?: string[]): Promise<TweetData[]> {
  try {
    const response = await fetch(`${APIFY_URL}?token=${process.env.APIFY_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchTerms: keywords,
        from: profileUrl.split('/').pop(),
        maxItems: 100,
        queryType: 'Latest'
      })
    });

    if (!response.ok) {
      throw new Error(`Apify API error: ${response.status}`);
    }

    const data = await response.json();
    return data.map((tweet: any) => ({
      id: tweet.id,
      text: tweet.text,
      authorUsername: tweet.author?.userName || '',
      createdAt: tweet.createdAt,
      metrics: {
        views: tweet.viewCount || 0,
        likes: tweet.likeCount || 0,
        replies: tweet.replyCount || 0,
        retweets: tweet.retweetCount || 0,
        bookmarks: tweet.bookmarkCount || 0
      }
    }));
  } catch (error) {
    console.error('Error searching tweets:', error);
    throw error;
  }
}

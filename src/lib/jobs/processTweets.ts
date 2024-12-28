import { db } from '@/db';
import { searchQueries, tweets } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { fetchTweetMetrics, searchTweetsByProfile, type TweetData } from '../apify';

async function processTweetData(queryId: number, tweetData: TweetData[]) {
  // Add or update tweets in the database
  for (const tweet of tweetData) {
    const existing = await db.query.tweets.findFirst({
      where: eq(tweets.tweetId, tweet.id)
    });

    if (existing) {
      // Update existing tweet
      await db
        .update(tweets)
        .set({
          metrics: tweet.metrics,
          lastUpdated: new Date().toISOString()
        })
        .where(eq(tweets.tweetId, tweet.id));
    } else {
      // Insert new tweet
      await db.insert(tweets).values({
        tweetId: tweet.id,
        queryId,
        authorUsername: tweet.authorUsername,
        content: tweet.text,
        createdAt: new Date(tweet.createdAt),
        metrics: tweet.metrics,
        lastUpdated: new Date().toISOString()
      });
    }
  }
}

export async function processSearchQuery(queryId: number) {
  try {
    // Update query status to processing
    await db
      .update(searchQueries)
      .set({ status: 'processing' })
      .where(eq(searchQueries.id, queryId));

    // Get query details
    const query = await db.query.searchQueries.findFirst({
      where: eq(searchQueries.id, queryId)
    });

    if (!query) {
      throw new Error('Query not found');
    }

    let tweetData: TweetData[] = [];

    switch (query.queryType) {
      case 'post_links':
        const tweetIds = query.params.postLinks as string[];
        if (!tweetIds?.length) {
          throw new Error('No tweet IDs provided');
        }
        tweetData = await fetchTweetMetrics(tweetIds);
        break;

      case 'profile_keywords':
        const { profileUrl, keywords } = query.params;
        if (!profileUrl) {
          throw new Error('No profile URL provided');
        }
        tweetData = await searchTweetsByProfile(profileUrl, keywords as string[]);
        break;

      case 'date_range':
        // TODO: Implement date range search
        break;

      default:
        throw new Error(`Invalid query type: ${query.queryType}`);
    }

    await processTweetData(queryId, tweetData);

    // Update query status to completed
    await db
      .update(searchQueries)
      .set({ status: 'completed' })
      .where(eq(searchQueries.id, queryId));

  } catch (error) {
    console.error(`Error processing query ${queryId}:`, error);

    // Update query status to failed
    await db
      .update(searchQueries)
      .set({ status: 'failed' })
      .where(eq(searchQueries.id, queryId));

    throw error;
  }
}

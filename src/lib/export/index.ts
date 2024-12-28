import { Tweet } from '@/db/schema';

interface ExportOptions {
  format: 'csv' | 'excel';
  includeContent?: boolean;
}

function escapeCSV(str: string): string {
  if (typeof str !== 'string') return str;
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatDate(date: Date): string {
  return date.toISOString();
}

export function generateCSV(tweets: Tweet[], options?: ExportOptions): string {
  const headers = [
    'Tweet ID',
    'Author',
    'Created At',
    'Views',
    'Likes',
    'Replies',
    'Retweets',
    'Bookmarks',
    'Last Updated'
  ];

  if (options?.includeContent) {
    headers.push('Content');
  }

  const rows = tweets.map(tweet => [
    tweet.tweetId,
    tweet.authorUsername,
    formatDate(tweet.createdAt),
    (tweet.metrics as any).views || 0,
    (tweet.metrics as any).likes || 0,
    (tweet.metrics as any).replies || 0,
    (tweet.metrics as any).retweets || 0,
    (tweet.metrics as any).bookmarks || 0,
    formatDate(tweet.lastUpdated),
    ...(options?.includeContent ? [tweet.content] : [])
  ].map(escapeCSV));

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}

export async function generateExcel(tweets: Tweet[], options?: ExportOptions): Promise<Buffer> {
  // TODO: Implement Excel export using xlsx library
  throw new Error('Excel export not implemented yet');
}

export async function exportTweets(tweets: Tweet[], options: ExportOptions): Promise<Buffer | string> {
  switch (options.format) {
    case 'csv':
      return generateCSV(tweets, options);
    case 'excel':
      return generateExcel(tweets, options);
    default:
      throw new Error(`Unsupported format: ${options.format}`);
  }
}

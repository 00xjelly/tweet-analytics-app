import { pgTable, serial, text, timestamp, json, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  subscriptionTier: text('subscription_tier').default('free')
});

export const searchQueries = pgTable('search_queries', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  queryType: text('query_type').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  params: json('params').notNull()
});

export const tweets = pgTable('tweets', {
  id: serial('id').primaryKey(),
  tweetId: text('tweet_id').notNull().unique(),
  authorUsername: text('author_username'),
  content: text('content'),
  createdAt: timestamp('created_at').notNull(),
  metrics: json('metrics'),
  lastUpdated: timestamp('last_updated').defaultNow().notNull(),
  queryId: integer('query_id').references(() => searchQueries.id)
});

# Tweet Analytics App

A SaaS application for analyzing tweet metrics and generating reports based on custom search criteria.

## Features

- Search tweets by:
  - Post links
  - Profile links with keyword filtering
  - Date ranges
- Track engagement metrics
- Export data to CSV/Excel
- Custom dashboard

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Run database migrations:
   ```bash
   npm run db:migrate
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=

# Apify
APIFY_TOKEN=
```

## Database Schema

### Users
- Basic user information
- Subscription management

### Search Queries
- Stores search parameters
- Tracks query status

### Tweets
- Stores tweet data and metrics
- Updated via Apify integration

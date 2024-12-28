import { NextResponse } from 'next/server';
import { db } from '@/db';
import { searchQueries, tweets } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const queryId = parseInt(params.id);

    // Get the search query
    const query = await db.query.searchQueries.findFirst({
      where: eq(searchQueries.id, queryId),
    });

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query not found' },
        { status: 404 }
      );
    }

    // Get associated tweets
    const relatedTweets = await db.query.tweets.findMany({
      where: eq(tweets.queryId, queryId),
    });

    return NextResponse.json({
      success: true,
      data: {
        query,
        tweets: relatedTweets,
      },
    });
  } catch (error) {
    console.error('Error fetching search query:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch search query' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const queryId = parseInt(params.id);

    // Delete associated tweets first
    await db.delete(tweets).where(eq(tweets.queryId, queryId));

    // Then delete the search query
    const [deletedQuery] = await db
      .delete(searchQueries)
      .where(eq(searchQueries.id, queryId))
      .returning();

    if (!deletedQuery) {
      return NextResponse.json(
        { success: false, error: 'Search query not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: deletedQuery,
    });
  } catch (error) {
    console.error('Error deleting search query:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete search query' },
      { status: 500 }
    );
  }
}

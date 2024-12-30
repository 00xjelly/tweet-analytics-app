"use client";

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PostLinksTab } from './tabs/post-links-tab';
import { ProfileKeywordsTab } from './tabs/profile-keywords-tab';
import { DateRangeTab } from './tabs/date-range-tab';

type SearchTab = 'post-links' | 'profile-keywords' | 'date-range';

export function SearchForm() {
  const [activeTab, setActiveTab] = useState<SearchTab>('post-links');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (formData: any) => {
    try {
      setIsLoading(true);
      // TODO: Implement search API call
      console.log('Search data:', { type: activeTab, ...formData });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Search Tweets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-1 rounded-lg bg-muted p-1">
            <Button
              variant={activeTab === 'post-links' ? 'default' : 'ghost'}
              className="w-full"
              onClick={() => setActiveTab('post-links')}
            >
              Post Links
            </Button>
            <Button
              variant={activeTab === 'profile-keywords' ? 'default' : 'ghost'}
              className="w-full"
              onClick={() => setActiveTab('profile-keywords')}
            >
              Profile & Keywords
            </Button>
            <Button
              variant={activeTab === 'date-range' ? 'default' : 'ghost'}
              className="w-full"
              onClick={() => setActiveTab('date-range')}
            >
              Date Range
            </Button>
          </div>

          <div className="mt-4">
            {activeTab === 'post-links' && (
              <PostLinksTab onSearch={handleSearch} isLoading={isLoading} />
            )}
            {activeTab === 'profile-keywords' && (
              <ProfileKeywordsTab onSearch={handleSearch} isLoading={isLoading} />
            )}
            {activeTab === 'date-range' && (
              <DateRangeTab onSearch={handleSearch} isLoading={isLoading} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
"use client";

import { useState } from 'react';
import { Button } from '../../ui/button';

interface ProfileKeywordsTabProps {
  onSearch: (data: { profileUrl: string; keywords: string[] }) => void;
  isLoading: boolean;
}

export function ProfileKeywordsTab({ onSearch, isLoading }: ProfileKeywordsTabProps) {
  const [profileUrl, setProfileUrl] = useState('');
  const [keywords, setKeywords] = useState<string[]>(['']);

  const addKeyword = () => {
    setKeywords([...keywords, '']);
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validKeywords = keywords.filter(keyword => keyword.trim() !== '');
    onSearch({ profileUrl, keywords: validKeywords });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Profile URL</label>
        <input
          type="url"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          placeholder="Enter Twitter profile URL"
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Keywords (optional)</label>
        {keywords.map((keyword, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => updateKeyword(index, e.target.value)}
              placeholder="Enter keyword"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2"
            />
            {keywords.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeKeyword(index)}
                className="px-3"
              >
                ×
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={addKeyword}
        >
          Add Keyword
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </form>
  );
}
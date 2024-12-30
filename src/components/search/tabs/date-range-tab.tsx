"use client";

import { useState } from 'react';
import { Button } from '../../ui/button';

interface DateRangeTabProps {
  onSearch: (data: { dateFrom: string; dateTo: string; profileUrl?: string }) => void;
  isLoading: boolean;
}

export function DateRangeTab({ onSearch, isLoading }: DateRangeTabProps) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ dateFrom, dateTo, profileUrl: profileUrl || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">From Date</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">To Date</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Profile URL (optional)</label>
        <input
          type="url"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          placeholder="Enter Twitter profile URL"
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </form>
  );
}
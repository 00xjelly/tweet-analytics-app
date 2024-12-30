"use client";

import { useState } from 'react';
import { Button } from '../../ui/button';

interface PostLinksTabProps {
  onSearch: (data: { links: string[] }) => void;
  isLoading: boolean;
}

export function PostLinksTab({ onSearch, isLoading }: PostLinksTabProps) {
  const [links, setLinks] = useState<string[]>(['']);

  const addLink = () => {
    setLinks([...links, '']);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validLinks = links.filter(link => link.trim() !== '');
    onSearch({ links: validLinks });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {links.map((link, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="url"
            value={link}
            onChange={(e) => updateLink(index, e.target.value)}
            placeholder="Enter tweet URL"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2"
            required
          />
          {links.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => removeLink(index)}
              className="px-3"
            >
              ×
            </Button>
          )}
        </div>
      ))}
      
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={addLink}
        >
          Add Another URL
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </form>
  );
}
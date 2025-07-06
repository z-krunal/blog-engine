/**
 * Normalize a category name for use in URLs
 * Converts to lowercase, replaces spaces with hyphens, and trims whitespace
 */
export function normalizeCategory(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Get the display name for a category from its slug
 * This is a reverse lookup - in practice, you'd want to maintain a mapping
 * For now, we'll just convert hyphens back to spaces and capitalize
 */
export function getCategoryDisplayName(categorySlug: string): string {
  return categorySlug
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
} 
/**
 * Utility functions for managing property comparisons
 */

const COMPARISON_KEY = 'bobrentalz_comparison';

export function getComparisonList(): string[] {
  try {
    const stored = localStorage.getItem(COMPARISON_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addToComparison(propertyId: string): boolean {
  const current = getComparisonList();
  
  // Check if already in comparison
  if (current.includes(propertyId)) {
    return true;
  }
  
  // Check if limit reached
  if (current.length >= 3) {
    return false;
  }
  
  const updated = [...current, propertyId];
  localStorage.setItem(COMPARISON_KEY, JSON.stringify(updated));
  return true;
}

export function removeFromComparison(propertyId: string): void {
  const current = getComparisonList();
  const updated = current.filter(id => id !== propertyId);
  localStorage.setItem(COMPARISON_KEY, JSON.stringify(updated));
}

export function isInComparison(propertyId: string): boolean {
  return getComparisonList().includes(propertyId);
}

export function toggleComparison(propertyId: string): boolean {
  if (isInComparison(propertyId)) {
    removeFromComparison(propertyId);
    return false;
  } else {
    return addToComparison(propertyId);
  }
}

export function clearComparison(): void {
  localStorage.removeItem(COMPARISON_KEY);
}

export function getComparisonCount(): number {
  return getComparisonList().length;
}

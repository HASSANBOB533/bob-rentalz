export const getFavorites = (): string[] => {
  if (typeof window === 'undefined') return [];
  const favorites = localStorage.getItem('bob-favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (propertyId: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(propertyId)) {
    favorites.push(propertyId);
    localStorage.setItem('bob-favorites', JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (propertyId: string): void => {
  const favorites = getFavorites();
  const updated = favorites.filter((id) => id !== propertyId);
  localStorage.setItem('bob-favorites', JSON.stringify(updated));
};

export const isFavorite = (propertyId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(propertyId);
};

export const toggleFavorite = (propertyId: string): boolean => {
  if (isFavorite(propertyId)) {
    removeFromFavorites(propertyId);
    return false;
  } else {
    addToFavorites(propertyId);
    return true;
  }
};

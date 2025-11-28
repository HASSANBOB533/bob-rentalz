const parseDate = (dateString: string | Date | null | undefined): Date | null => {
  if (!dateString) return null;
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return isNaN(date.getTime()) ? null : date;
}

export const formatDate = (dateString: string | Date, locale = 'en-US'): string =>   {
  const date = parseDate(dateString);
  if (!date) return '—';

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

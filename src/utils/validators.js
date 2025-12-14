export function validateFullName(name) {
  if (!name) return 'Full name required';
  if (name.length < 5) return 'Full name must be at least 5 characters';
  if (name.length > 50) return 'Full name must be maximum 50 characters';
  return null;
}

export function validateTitle(title) {
  if (!title) return 'Title required';
  if (title.length < 10) return 'Title must be at least 10 characters';
  if (title.length > 30) return 'Title must be maximum 30 characters';
  return null;
}

export function validateQuestionText(q) {
  if (!q) return 'Question required';
  if (q.length < 10) return 'Question must be at least 10 characters';
  if (q.length > 200) return 'Question must be maximum 200 characters';
  return null;
}

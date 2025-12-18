const WELCOME_KEY = 'buildvision_has_seen_welcome';

export function hasSeenWelcome(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(WELCOME_KEY) === 'true';
}

export function markWelcomeSeen(): void {
  localStorage.setItem(WELCOME_KEY, 'true');
}

export function resetWelcome(): void {
  localStorage.removeItem(WELCOME_KEY);
}

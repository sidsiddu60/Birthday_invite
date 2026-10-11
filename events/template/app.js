/**
 * Template Event App Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  // Update with target event date
  const targetDate = '2026-12-25T18:00:00+05:30';
  new EventCountdown(targetDate, {
    days: '#cd-days',
    hours: '#cd-hours',
    mins: '#cd-mins',
    secs: '#cd-secs'
  });
});

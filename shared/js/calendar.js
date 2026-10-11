/**
 * CalendarHelper - 1-tap Google Calendar link & Apple/Outlook (.ics) generator
 */
const CalendarHelper = {
  formatDateToUtc(date) {
    const pad = (n) => (n < 10 ? '0' + n : n);
    return (
      date.getUTCFullYear().toString() +
      pad(date.getUTCMonth() + 1) +
      pad(date.getUTCDate()) +
      'T' +
      pad(date.getUTCHours()) +
      pad(date.getUTCMinutes()) +
      pad(date.getUTCSeconds()) +
      'Z'
    );
  },

  getGoogleCalendarUrl(event) {
    const startIso = this.formatDateToUtc(new Date(event.startDate));
    const endIso = this.formatDateToUtc(new Date(event.endDate || new Date(event.startDate).getTime() + 4 * 3600 * 1000));
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${startIso}/${endIso}`,
      details: event.details || '',
      location: event.location || ''
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  },

  downloadIcs(event) {
    const startIso = this.formatDateToUtc(new Date(event.startDate));
    const endIso = this.formatDateToUtc(new Date(event.endDate || new Date(event.startDate).getTime() + 4 * 3600 * 1000));

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Family Celebrations//WhatsApp Event Invite//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@familycelebrations.local`,
      `DTSTAMP:${this.formatDateToUtc(new Date())}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      `SUMMARY:${event.title.replace(/,/g, '\\,')}`,
      `DESCRIPTION:${(event.details || '').replace(/\n/g, '\\n')}`,
      `LOCATION:${(event.location || '').replace(/,/g, '\\,')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${(event.slug || 'celebration-invitation')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

window.CalendarHelper = CalendarHelper;

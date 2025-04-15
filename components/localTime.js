import React from 'react'

export default function LocalTime() {

  function TimeFormatted() {
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Europe/London',
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formatted = formatter.format(now);

    return formatted.replace(':', '.').toLowerCase();
  }

  return (
    <>
      <span style={{ fontSize: 13, color: "var(--gray11)", marginTop: "8px", display: "block" }}>
        My local time: {TimeFormatted()}
      </span>
    </>
  )
}

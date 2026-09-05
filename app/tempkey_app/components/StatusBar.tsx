export const StatusBar = () => (
  <div className="tempkey-sbar">
    <span className="tempkey-sbar__time">9:41</span>
    <div className="tempkey-sbar__icons" aria-hidden="true">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
        <rect x="0" y="6" width="3" height="6" rx="0.5" fill="currentColor" />
        <rect x="4.5" y="4" width="3" height="8" rx="0.5" fill="currentColor" />
        <rect x="9" y="2" width="3" height="10" rx="0.5" fill="currentColor" />
        <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill="currentColor" />
      </svg>
      <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
        <path
          d="M7.5 2.5C9.8 2.5 11.9 3.4 13.4 5L14.8 3.6C12.9 1.4 10.3 0 7.5 0C4.7 0 2.1 1.4 0.2 3.6L1.6 5C3.1 3.4 5.2 2.5 7.5 2.5Z"
          fill="currentColor"
        />
        <path
          d="M7.5 6.5C8.9 6.5 10.2 7 11.2 8L12.6 6.6C11.2 5.2 9.4 4.5 7.5 4.5C5.6 4.5 3.8 5.2 2.4 6.6L3.8 8C4.8 7 6.1 6.5 7.5 6.5Z"
          fill="currentColor"
        />
        <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
      </svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
        <rect
          x="0.5"
          y="0.5"
          width="21"
          height="11"
          rx="2.5"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
        <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
        <path
          d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
      </svg>
    </div>
  </div>
);

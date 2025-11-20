export function ChairIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M19 9V6C19 4.89543 18.1046 4 17 4H7C5.89543 4 5 4.89543 5 6V9" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M3 9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V11C21 12.1046 20.1046 13 19 13H5C3.89543 13 3 12.1046 3 11V9Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M5 13V19C5 19.5523 5.44772 20 6 20C6.55228 20 7 19.5523 7 19V13" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M17 13V19C17 19.5523 17.4477 20 18 20C18.5523 20 19 19.5523 19 19V13" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

const BusinessIcon = ({ color = '#333333' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 21V7L13 3V21" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M19 21V11L13 7" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M9 9V9.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 12V12.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 15V15.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 18V18.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};

export default BusinessIcon; 
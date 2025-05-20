const PersonIcon = ({ color = '#333333' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2"/>
      <path d="M5 19.5C5 15.9101 8.13401 13 12 13C15.866 13 19 15.9101 19 19.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};

export default PersonIcon; 
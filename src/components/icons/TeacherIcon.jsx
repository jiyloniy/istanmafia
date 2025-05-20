const TeacherIcon = ({ color = '#333333' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L22 8L12 13L2 8L12 3Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M19 10V16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 10V15C5 17.2091 8.13401 19 12 19C15.866 19 19 17.2091 19 15V10" stroke={color} strokeWidth="2"/>
    </svg>
  );
};

export default TeacherIcon; 
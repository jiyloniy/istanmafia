import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Lucide ikonlari
const Icons = {
  back: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>,
  plus: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>,
  shield: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>,
  private: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>,
  public: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>,
  wallet: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12h-2v2h2v-2z"/>
  </svg>,
  briefcase: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
  </svg>,
  notepad: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M13 2v7h7"/>
  </svg>,
  heart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>
  </svg>,
  lightbulb: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 006 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
  </svg>,
  home: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>,
  book: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
  </svg>,
  image: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>,
  link: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>,
  info: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
};

// Mock ma'lumotlarni generatsiya qilish
const generateMockSafes = () => {
  const safeTypes = [
    { 
      name: "Kripto Hamyon", 
      icon: "wallet",
      categoryIcon: "shield",
      isPrivate: true,
      desc: "Hamyon ma'lumotlari va kalitlar",
      sampleFiles: [
        { type: "note", name: "Bitcoin Seed Phrase.txt", content: "12 ta maxfiy soz - hamyonga kirish uchun", date: "14:30" },
        { type: "document", name: "MetaMask_Recovery.pdf", size: 2.5, date: "15:45" },
        { type: "image", name: "Wallet_QR.png", url: "https://images.unsplash.com/photo-1621504450181-5d356f61d307", size: 1.2, date: "16:20" },
        { type: "note", name: "Trading Strategiya.txt", content: "Kripto savdosi boyicha rejalar va tahlillar", date: "17:10" },
        { type: "image", name: "Crypto_Portfolio.jpg", url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040", size: 2.8, date: "18:15" }
      ]
    },
    { 
      name: "Ish Hujjatlari", 
      icon: "briefcase",
      categoryIcon: "briefcase",
      isPrivate: true,
      desc: "Muhim ish fayllari va taqdimotlar",
      sampleFiles: [
        { type: "document", name: "Yillik_Hisobot_2025.pdf", size: 5.8, date: "10:15" },
        { type: "image", name: "Statistics_2025.jpg", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", size: 2.1, date: "13:45" },
        { type: "note", name: "Loyiha Rejasi.txt", content: "Yangi mahsulot ishlab chiqarish rejasi", date: "11:30" },
        { type: "image", name: "Team_Meeting.jpg", url: "https://images.unsplash.com/photo-1552664730-d307ca884978", size: 3.4, date: "14:20" }
      ]
    },
    { 
      name: "Shaxsiy Yozuvlar", 
      icon: "notepad",
      categoryIcon: "heart",
      isPrivate: true,
      desc: "Kundalik fikrlar va g'oyalar",
      sampleFiles: [
        { type: "note", name: "Kundalik_Rejalar.txt", content: "Bugungi vazifalar va rejalar", date: "08:15" },
        { type: "image", name: "Family_Photo.jpg", url: "https://images.unsplash.com/photo-1511895426328-dc8714191300", size: 3.2, date: "12:40" },
        { type: "note", name: "Sayohat_Rejalari.txt", content: "2025-yil sayohat marshrutlari", date: "16:50" },
        { type: "image", name: "Travel_Plans.jpg", url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828", size: 2.9, date: "19:10" }
      ]
    },
    { 
      name: "Tibbiy Yozuvlar", 
      icon: "heart",
      categoryIcon: "shield",
      isPrivate: true,
      desc: "Sog'liq hujjatlari va natijalar",
      sampleFiles: [
        { type: "document", name: "Analiz_Natijalari.pdf", size: 2.3, date: "09:45" },
        { type: "image", name: "Xray_Scan.jpg", url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef", size: 4.1, date: "11:20" },
        { type: "note", name: "Dori_Qabul.txt", content: "Kunlik dori qabul qilish jadvali", date: "14:15" },
        { type: "image", name: "Health_Chart.jpg", url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7", size: 1.8, date: "16:30" }
      ]
    },
    { 
      name: "Biznes Goyalar", 
      icon: "lightbulb",
      categoryIcon: "public",
      isPrivate: false,
      desc: "Kelajak rejalari va loyihalar",
      sampleFiles: [
        { type: "note", name: "Startup_Idea.txt", content: "Yangi IT loyihasi konsepti", date: "10:30" },
        { type: "image", name: "Business_Model.png", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40", size: 2.8, date: "13:15" },
        { type: "document", name: "Investor_Taqdimot.pptx", size: 6.4, date: "16:45" },
        { type: "image", name: "Meeting_Notes.jpg", url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd", size: 2.4, date: "11:50" }
      ]
    },
    { 
      name: "Uy Tamirlash", 
      icon: "home",
      categoryIcon: "public",
      isPrivate: false,
      desc: "Uy rejalari va shartnomalar",
      sampleFiles: [
        { type: "image", name: "Dizayn_Loyiha.jpg", url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6", size: 5.6, date: "09:30" },
        { type: "document", name: "Smeta_2025.xlsx", size: 2.1, date: "12:15" },
        { type: "note", name: "Materiallar.txt", content: "Kerakli materiallar royxati", date: "14:40" },
        { type: "image", name: "Oshxona_3D.png", url: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77", size: 3.8, date: "17:20" }
      ]
    },
    {
      name: "Talim Materiallari",
      icon: "book",
      categoryIcon: "public",
      isPrivate: false,
      desc: "Oquv materiallari va kurslar",
      sampleFiles: [
        { type: "document", name: "Matematika_Darsligi.pdf", size: 3.2, date: "09:00" },
        { type: "image", name: "Physics_Experiment.jpg", url: "https://media.gettyimages.com/id/2156947176/photo/children-conducting-fun-science-experiment-with-electroscope.jpg?s=612x612&w=gi&k=20&c=lpdo4VbMUt80K0LYIOkt2SKrLUnnTHpWjUWvXtRWmDQ=", size: 2.5, date: "10:30" },
        { type: "note", name: "Kimyo Reaksiya.txt", content: "Kimyo darslari uchun eslatmalar", date: "11:15" },
        { type: "image", name: "Biology_Chart.png", url: "https://png.pngtree.com/template/20220425/ourmid/pngtree-human-body-nervous-system-sympathetic-parasympathetic-charts-with-realistic-organs-depiction-image_1439527.jpg", size: 1.8, date: "12:45" }
      ]
    }
  ];

  return safeTypes.map((safe, index) => ({
    id: index + 1,
    name: safe.name,
    icon: safe.icon,
    categoryIcon: safe.categoryIcon,
    isPrivate: safe.isPrivate,
    description: safe.desc,
    fileCount: safe.sampleFiles?.length || 0,
    totalSize: safe.sampleFiles?.reduce((acc, file) => acc + (file.size || 0), 0) || 0,
    lastUpdated: "Yangilangan " + Math.floor(Math.random() * 24) + " soat oldin",
    files: safe.sampleFiles?.map((file, i) => ({
      id: `${index}-${i}`,
      ...file,
      preview: file.type === "note" ? file.content : undefined
    })) || [],
    notes: safe.description
  }));
};

const ArchivePage = () => {
  const navigate = useNavigate();
  const [safes, setSafes] = useState(generateMockSafes());
  const [selectedSafe, setSelectedSafe] = useState(null);
  const [showNewSafeModal, setShowNewSafeModal] = useState(false);
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [newSafeName, setNewSafeName] = useState("");
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  const CONTENT_TYPES = {
    NOTE: 'note',
    IMAGE: 'image',
    DOCUMENT: 'document'
  };

  const styles = {
    container: {
      maxWidth: "480px",
      margin: "0 auto",
      backgroundColor: "#f8fafc",
      minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    header: {
      backgroundColor: "#ffffff",
      padding: "20px",
      position: "sticky",
      top: 0,
      zIndex: 10,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.05)"
    },
    safeCard: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "20px",
      marginBottom: "12px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "1px solid rgba(0, 0, 0, 0.05)",
      '&:hover': {
        transform: "translateY(-2px)",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }
    },
    contentCard: {
      borderRadius: "16px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      backgroundColor: "#ffffff",
      padding: "16px",
      marginBottom: "12px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      border: "1px solid rgba(0, 0, 0, 0.05)"
    },
    noteCard: {
      backgroundColor: "#ffffff",
      borderLeft: "4px solid #3b82f6"
    },
    mediaCard: {
      backgroundColor: "#f8fafc",
      borderLeft: "4px solid #10b981"
    },
    documentCard: {
      backgroundColor: "#f0f9ff",
      borderLeft: "4px solid #6366f1"
    },
    cardContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "6px"
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: 600,
      color: "#1e293b"
    },
    cardPreview: {
      fontSize: "14px",
      color: "#64748b",
      display: "-webkit-box",
      "-webkit-line-clamp": "2",
      "-webkit-box-orient": "vertical",
      overflow: "hidden"
    },
    cardDate: {
      fontSize: "12px",
      color: "#94a3b8",
      marginTop: "4px"
    },
    badge: {
      fontSize: "12px",
      padding: "4px 10px",
      borderRadius: "20px",
      backgroundColor: "#e0f2fe",
      color: "#0284c7",
      fontWeight: "500",
      display: "inline-flex",
      alignItems: "center",
      gap: "4px"
    },
    actionButton: {
      padding: "10px",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      backgroundColor: "#ffffff",
      color: "#0284c7",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease",
      '&:hover': {
        backgroundColor: "#f8fafc",
        borderColor: "#0284c7"
      }
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "flex-end",
      zIndex: 2000
    },
    modalContent: {
      backgroundColor: "#ffffff",
      borderRadius: "24px 24px 0 0",
      padding: "24px",
      width: "100%",
      maxHeight: "80vh",
      overflowY: "auto",
      boxShadow: "0 -4px 20px rgba(0,0,0,0.1)"
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: "14px",
      border: "1px solid #e2e8f0",
      marginBottom: "12px",
      fontSize: "15px",
      fontFamily: "inherit"
    },
    textarea: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: "14px",
      border: "1px solid #e2e8f0",
      marginBottom: "12px",
      fontSize: "15px",
      fontFamily: "inherit",
      minHeight: "120px",
      resize: "none"
    },
    fileInput: {
      display: "none"
    },
    fileDropZone: {
      padding: "24px",
      border: "2px dashed #e2e8f0",
      borderRadius: "14px",
      backgroundColor: "#f8fafc",
      textAlign: "center",
      cursor: "pointer",
      marginBottom: "12px"
    },
    fab: {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      width: "60px",
      height: "60px",
      borderRadius: "30px",
      backgroundColor: "#0284c7",
      color: "#ffffff",
      fontSize: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 10px 15px -3px rgba(2, 132, 199, 0.3), 0 4px 6px -2px rgba(2, 132, 199, 0.2)",
      cursor: "pointer",
      border: "none",
      transition: "transform 0.2s ease",
      '&:hover': {
        transform: "scale(1.05)",
        backgroundColor: "#0369a1"
      }
    }
  };

  const SafeListView = () => (
    <div style={{ padding: "20px" }}>
      {safes.map(safe => (
        <div
          key={safe.id}
          onClick={() => setSelectedSafe(safe)}
          style={styles.safeCard}
        >
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "16px"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "16px",
                backgroundColor: safe.isPrivate ? "#fee2e2" : "#f0fdf4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: safe.isPrivate ? "#ef4444" : "#22c55e",
                transition: "all 0.2s ease"
              }}>
                {Icons[safe.icon]}
              </div>
              <div style={{
                width: "24px",
                height: "24px",
                borderRadius: "8px",
                backgroundColor: safe.isPrivate ? "#fef2f2" : "#f0fdf4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: safe.isPrivate ? "#dc2626" : "#16a34a",
                fontSize: "12px"
              }}>
                {Icons[safe.isPrivate ? "private" : "public"]}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px"
              }}>
                <div style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#1e293b"
                }}>
                  {safe.name}
                </div>
                <div style={{
                  padding: "2px 8px",
                  borderRadius: "12px",
                  backgroundColor: safe.isPrivate ? "#fef2f2" : "#f0fdf4",
                  color: safe.isPrivate ? "#dc2626" : "#16a34a",
                  fontSize: "12px",
                  fontWeight: 500
                }}>
                  {safe.isPrivate ? "Maxfiy" : "Ommaviy"}
                </div>
              </div>
              <div style={{
                fontSize: "14px",
                color: "#64748b",
                marginBottom: "8px"
              }}>
                {safe.description}
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <div style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  <span>{safe.fileCount} ta fayl</span>
                </div>
                <div style={{
                  fontSize: "13px",
                  color: "#94a3b8"
                }}>
                  •
                </div>
                <div style={{
                  fontSize: "13px",
                  color: "#94a3b8"
                }}>
                  {safe.lastUpdated}
                </div>
              </div>
            </div>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: safe.isPrivate ? "#fef2f2" : "#f0fdf4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: safe.isPrivate ? "#dc2626" : "#16a34a"
            }}>
              {Icons[safe.categoryIcon]}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => setShowNewSafeModal(true)}
        style={styles.fab}
        aria-label="Yangi xavfsiz papka yaratish"
      >
        {Icons.plus}
      </button>
    </div>
  );

  const SafeDetailView = ({ safe }) => {
    const renderContentCard = (item) => {
      const baseCardStyle = {
        ...styles.contentCard,
        ...(item.type === CONTENT_TYPES.NOTE ? styles.noteCard :
            item.type === CONTENT_TYPES.IMAGE ? styles.mediaCard :
            styles.documentCard)
      };

      const isRecent = new Date(item.date) > new Date(Date.now() - 24 * 60 * 60 * 1000);

      return (
        <div key={item.id} style={baseCardStyle}>
          <div style={styles.cardContent}>
            {isRecent && (
              <div style={styles.badge}>
                <span style={{ fontSize: "16px" }}>•</span>
                <span>Yangi qo'shilgan</span>
              </div>
            )}
            <div style={styles.cardTitle}>{item.name}</div>
            
            {item.type === CONTENT_TYPES.NOTE && (
              <div style={styles.cardPreview}>
                {item.content || "Oldindan ko'rish mavjud emas"}
              </div>
            )}
            
            {item.type === CONTENT_TYPES.IMAGE && (
              <div style={{
                position: "relative",
                width: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                marginTop: "8px"
              }}>
                <img
                  src={item.url || "/placeholder.svg"}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    backgroundColor: "#f8fafc"
                  }}
                />
              </div>
            )}
            
            <div style={{
              ...styles.cardDate,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "12px"
            }}>
              <span>{item.date}</span>
              {item.size && (
                <>
                  <span>•</span>
                  <span>{item.size} MB</span>
                </>
              )}
            </div>
          </div>

          {item.type === CONTENT_TYPES.DOCUMENT && (
            <button style={{
              ...styles.actionButton,
              backgroundColor: "#f0f9ff",
              borderColor: "#bae6fd"
            }} aria-label="Hujjatni yuklab olish">
              {Icons.file}
            </button>
          )}
        </div>
      );
    };

    return (
      <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
        <header style={{
          ...styles.header,
          display: "flex",
          alignItems: "center",
          gap: "16px"
        }}>
          <button
            onClick={() => setSelectedSafe(null)}
            style={{
              border: "none",
              background: "none",
              padding: "10px",
              cursor: "pointer",
              color: "#0284c7",
              borderRadius: "12px",
              '&:hover': {
                backgroundColor: "#f0f9ff"
              }
            }}
          >
            {Icons.back}
          </button>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#1e293b"
            }}>
              {safe.name}
            </div>
            <div style={{
              fontSize: "14px",
              color: "#64748b"
            }}>
              {safe.fileCount} ta element
            </div>
          </div>
          <button
            style={{
              border: "none",
              background: "none",
              padding: "10px",
              cursor: "pointer",
              color: "#64748b",
              borderRadius: "12px",
              '&:hover': {
                backgroundColor: "#f0f9ff",
                color: "#0284c7"
              }
            }}
          >
            {Icons.info}
          </button>
        </header>

        <div style={{
          padding: "20px",
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"
        }}>
          {safe.files.map(renderContentCard)}
        </div>

        <button
          onClick={() => setShowAddContentModal(true)}
          style={styles.fab}
          aria-label="Yangi element qo'shish"
        >
          {Icons.plus}
        </button>

        {showAddContentModal && (
          <AddContentModal
            onClose={() => setShowAddContentModal(false)}
            onSave={(content) => {
              setShowAddContentModal(false);
            }}
          />
        )}
      </div>
    );
  };

  const NewSafeModal = () => (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "flex-end",
      zIndex: 2000,
      animation: "fadeIn 0.3s ease"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "24px 24px 0 0",
        padding: "24px",
        width: "100%",
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0 -10px 25px -5px rgba(0, 0, 0, 0.1)",
        animation: "slideUp 0.3s ease"
      }}>
        <h3 style={{
          margin: 0,
          marginBottom: "24px",
          fontSize: "20px",
          fontWeight: "600",
          color: "#1e293b"
        }}>
          Yangi Xavfsiz Papka Yaratish
        </h3>
        <input
          type="text"
          value={newSafeName}
          onChange={(e) => setNewSafeName(e.target.value)}
          placeholder="Papka nomini kiriting"
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            marginBottom: "24px",
            fontSize: "16px",
            fontFamily: "inherit",
            outline: "none",
            transition: "all 0.2s ease",
            '&:focus': {
              borderColor: "#0284c7",
              boxShadow: "0 0 0 3px rgba(2, 132, 199, 0.1)"
            }
          }}
        />
        <div style={{
          display: "flex",
          gap: "12px"
        }}>
          <button
            onClick={() => setShowNewSafeModal(false)}
            style={{
              flex: 1,
              padding: "16px",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              color: "#64748b",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
              '&:hover': {
                backgroundColor: "#f8fafc",
                borderColor: "#94a3b8"
              }
            }}
          >
            Bekor qilish
          </button>
          <button
            onClick={() => {
              if (newSafeName.trim()) {
                setSafes([...safes, {
                  id: safes.length + 1,
                  name: newSafeName.trim(),
                  fileCount: 0,
                  totalSize: 0,
                  files: [],
                  notes: ""
                }]);
                setNewSafeName("");
                setShowNewSafeModal(false);
              }
            }}
            style={{
              flex: 1,
              padding: "16px",
              backgroundColor: "#0284c7",
              color: "#ffffff",
              border: "none",
              borderRadius: "16px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
              '&:hover': {
                backgroundColor: "#0369a1"
              }
            }}
          >
            Yaratish
          </button>
        </div>
      </div>
    </div>
  );

  const AddContentModal = ({ onClose, onSave }) => {
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
      }
    };

    return (
      <div style={{
        ...styles.modal,
        animation: "fadeIn 0.3s ease"
      }}>
        <div style={{
          ...styles.modalContent,
          animation: "slideUp 0.3s ease"
        }}>
          <h3 style={{
            margin: 0,
            marginBottom: "24px",
            fontSize: "20px",
            fontWeight: "600",
            color: "#1e293b"
          }}>
            Yangi Kontent Qo'shish
          </h3>

          {/* Eslatma kiritish qismi */}
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{
              margin: "0 0 12px 0",
              fontSize: "16px",
              color: "#1e293b"
            }}>
              Eslatma Qo'shish
            </h4>
            <input
              type="text"
              placeholder="Eslatma sarlavhasi"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              style={{
                ...styles.input,
                '&:focus': {
                  borderColor: "#0284c7",
                  boxShadow: "0 0 0 3px rgba(2, 132, 199, 0.1)"
                }
              }}
            />
            <textarea
              placeholder="Eslatma mazmuni"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              style={{
                ...styles.textarea,
                '&:focus': {
                  borderColor: "#0284c7",
                  boxShadow: "0 0 0 3px rgba(2, 132, 199, 0.1)"
                }
              }}
            />
          </div>

          {/* Fayl yuklash qismi */}
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{
              margin: "0 0 12px 0",
              fontSize: "16px",
              color: "#1e293b"
            }}>
              Fayl Yuklash
            </h4>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".doc,.docx,.pdf,.jpg,.jpeg,.png,.mp4"
              style={styles.fileInput}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                ...styles.fileDropZone,
                border: "2px dashed #e2e8f0",
                transition: "all 0.2s ease",
                '&:hover': {
                  borderColor: "#0284c7",
                  backgroundColor: "#f0f9ff"
                }
              }}
            >
              {selectedFile ? (
                <div style={{ color: "#0284c7" }}>{selectedFile.name}</div>
              ) : (
                <div>
                  <div style={{
                    marginBottom: "8px",
                    color: "#0284c7",
                    display: "flex",
                    justifyContent: "center"
                  }}>
                    {Icons.file}
                  </div>
                  <div style={{ color: "#1e293b" }}>
                    Yuklash uchun bosing yoki faylni shu yerga tashlang
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginTop: "4px"
                  }}>
                    DOC, PDF, rasm va video fayllar qo'llab-quvvatlanadi
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Harakat tugmalari */}
          <div style={{
            display: "flex",
            gap: "12px"
          }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "16px",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                color: "#64748b",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                '&:hover': {
                  backgroundColor: "#f8fafc",
                  borderColor: "#94a3b8"
                }
              }}
            >
              Bekor qilish
            </button>
            <button
              onClick={() => {
                if (newNote.title || selectedFile) {
                  onSave({
                    note: newNote.title ? newNote : null,
                    file: selectedFile
                  });
                  setNewNote({ title: "", content: "" });
                  setSelectedFile(null);
                }
              }}
              style={{
                flex: 1,
                padding: "16px",
                backgroundColor: "#0284c7",
                color: "#ffffff",
                border: "none",
                borderRadius: "16px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                '&:hover': {
                  backgroundColor: "#0369a1"
                }
              }}
            >
              <span>Saqlash</span>
              {Icons.plus}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {selectedSafe ? (
        <SafeDetailView safe={selectedSafe} />
      ) : (
        <>
          <header style={{
            ...styles.header,
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
            <button
              onClick={() => navigate('/home')}
              style={{
                border: "none",
                background: "none",
                padding: "10px",
                cursor: "pointer",
                color: "#0284c7",
                borderRadius: "12px",
                transition: "all 0.2s ease",
                '&:hover': {
                  backgroundColor: "#f0f9ff"
                }
              }}
            >
              {Icons.back}
            </button>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "#f0f9ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0284c7"
              }}>
                {Icons.shield}
              </div>
              <h1 style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: 600,
                color: "#1e293b"
              }}>
                Xavfsiz Arxiv
              </h1>
            </div>
          </header>
          <SafeListView />
        </>
      )}
      {showNewSafeModal && <NewSafeModal />}
    </div>
  );
};

export default ArchivePage;
import { useState, useRef } from 'react';


// Lucide-style SVG icons
const Icons = {
  back: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>,
  plus: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>,
  folder: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
  </svg>,
  file: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
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

// Generate mock safes with varied content
const generateMockSafes = () => {
  const safeTypes = [
    { name: "Work Documents", icon: "folder", desc: "Important work files and presentations" },
    { name: "Personal Notes", icon: "file", desc: "Daily thoughts and ideas" },
    { name: "Travel Docs", icon: "folder", desc: "Passports and tickets" },
    { name: "Project Alpha", icon: "folder", desc: "Confidential project files" },
    { name: "Reading List", icon: "file", desc: "Articles and papers to read" },
    { name: "Receipts 2025", icon: "file", desc: "Financial records" },
    { name: "Crypto Wallet", icon: "folder", desc: "Wallet information and keys" },
    { name: "Medical Records", icon: "folder", desc: "Health documents" },
    { name: "Business Ideas", icon: "file", desc: "Future ventures and plans" },
    { name: "Home Renovation", icon: "folder", desc: "House plans and contracts" },
    { name: "Study Materials", icon: "folder", desc: "Course notes and resources" },
    { name: "Legal Documents", icon: "file", desc: "Contracts and agreements" },
    { name: "Design Assets", icon: "image", desc: "UI/UX resources" },
    { name: "Meeting Notes", icon: "file", desc: "Important discussions" },
    { name: "Personal Photos", icon: "image", desc: "Important memories" },
    { name: "Code Snippets", icon: "file", desc: "Useful code pieces" },
    { name: "Inspiration", icon: "image", desc: "Ideas and references" },
    { name: "Car Documents", icon: "folder", desc: "Vehicle papers" },
    { name: "Research Papers", icon: "file", desc: "Academic articles" },
    { name: "Property Docs", icon: "folder", desc: "Real estate papers" }
  ];

  return safeTypes.map((safe, index) => ({
    id: index + 1,
    name: safe.name,
    icon: safe.icon,
    description: safe.desc,
    fileCount: Math.floor(Math.random() * 20) + 5,
    totalSize: Math.floor(Math.random() * 500),
    lastUpdated: "Updated " + Math.floor(Math.random() * 24) + "h ago",
    files: Array(Math.floor(Math.random() * 5) + 5).fill(null).map((_, i) => ({
      id: `${index}-${i}`,
      type: ['document', 'image', 'note', 'link'][Math.floor(Math.random() * 4)],
      name: `Sample_file_${i + 1}.${['pdf', 'jpg', 'txt', 'doc'][Math.floor(Math.random() * 4)]}`,
      size: Math.floor(Math.random() * 10) + 1,
      date: new Date(Date.now() - Math.random() * 86400000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })),
    notes: "Important notes and details about this safe."
  }));
};

const ArchivePage = () => {
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
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    header: {
      backgroundColor: "#fff",
      padding: "16px",
      position: "sticky",
      top: 0,
      zIndex: 10,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    },
    safeCard: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      cursor: "pointer",
      transition: "transform 0.2s ease",
      ':active': {
        transform: "scale(0.98)"
      }
    },
    contentCard: {
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      backgroundColor: "#ffffff",
      padding: "14px",
      marginBottom: "10px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px"
    },
    noteCard: {
      backgroundColor: "#ffffff"
    },
    mediaCard: {
      backgroundColor: "#f8f9fa"
    },
    documentCard: {
      backgroundColor: "#f0f9ff"
    },
    cardContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "4px"
    },
    cardTitle: {
      fontSize: "15px",
      fontWeight: 600,
      color: "#1a1a1a"
    },
    cardPreview: {
      fontSize: "13px",
      color: "#666666",
      display: "-webkit-box",
      "-webkit-line-clamp": "2",
      "-webkit-box-orient": "vertical",
      overflow: "hidden"
    },
    cardDate: {
      fontSize: "12px",
      color: "#888888"
    },
    thumbnail: {
      width: "48px",
      height: "48px",
      borderRadius: "8px",
      objectFit: "cover"
    },
    badge: {
      fontSize: "11px",
      padding: "2px 8px",
      borderRadius: "12px",
      backgroundColor: "#e6f4f4",
      color: "#008c8c"
    },
    actionButton: {
      padding: "8px",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      backgroundColor: "transparent",
      color: "#008c8c",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
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
      bottom: "20px",
      right: "20px",
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      backgroundColor: "#008c8c",
      color: "#fff",
      fontSize: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      cursor: "pointer",
      border: "none",
      transition: "transform 0.2s ease",
      ':active': {
        transform: "scale(0.95)"
      }
    }
  };

  const SafeListView = () => (
    <div style={{ padding: "16px" }}>
      {safes.map(safe => (
        <div
          key={safe.id}
          onClick={() => setSelectedSafe(safe)}
          style={styles.safeCard}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
            <div style={styles.iconWrapper}>
              {Icons[safe.icon]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: "16px",
                fontWeight: 600,
                marginBottom: "4px",
                color: "#1a1a1a"
              }}>
                {safe.name}
              </div>
              <div style={{
                fontSize: "14px",
                color: "#666"
              }}>
                {safe.description}
              </div>
              <div style={{
                fontSize: "13px",
                color: "#888",
                marginTop: "4px"
              }}>
                {safe.lastUpdated}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => setShowNewSafeModal(true)}
        style={styles.fab}
        aria-label="Create new safe"
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
              <div style={styles.badge}>Recently Added</div>
            )}
            <div style={styles.cardTitle}>{item.name}</div>
            
            {item.type === CONTENT_TYPES.NOTE && (
              <div style={styles.cardPreview}>
                {item.content || "No preview available"}
              </div>
            )}
            
            {item.type === CONTENT_TYPES.IMAGE && (
              <img
                src={item.url || "/placeholder.svg"}
                alt={item.name}
                style={styles.thumbnail}
              />
            )}
            
            <div style={styles.cardDate}>{item.date}</div>
          </div>

          {item.type === CONTENT_TYPES.DOCUMENT && (
            <button style={styles.actionButton} aria-label="Download document">
              {Icons.file}
            </button>
          )}
        </div>
      );
    };

    return (
      <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
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
              padding: "8px",
              cursor: "pointer",
              color: "#008c8c"
            }}
          >
            {Icons.back}
          </button>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#1a1a1a"
            }}>
              {safe.name}
            </div>
            <div style={{
              fontSize: "14px",
              color: "#666"
            }}>
              {safe.fileCount} items
            </div>
          </div>
          <button
            style={{
              border: "none",
              background: "none",
              padding: "8px",
              cursor: "pointer",
              color: "#666"
            }}
          >
            {Icons.info}
          </button>
        </header>

        <div style={{ padding: "16px" }}>
          {safe.files.map(renderContentCard)}
        </div>

        <button
          onClick={() => setShowAddContentModal(true)}
          style={styles.fab}
          aria-label="Add new item"
        >
          {Icons.plus}
        </button>

        {showAddContentModal && (
          <AddContentModal
            onClose={() => setShowAddContentModal(false)}
            onSave={(content) => {
              // Handle save logic here
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
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "flex-end",
      zIndex: 2000
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "24px 24px 0 0",
        padding: "24px",
        width: "100%",
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{
          margin: 0,
          marginBottom: "20px",
          fontSize: "18px",
          fontWeight: "600"
        }}>
          Create New Safe
        </h3>
        <input
          type="text"
          value={newSafeName}
          onChange={(e) => setNewSafeName(e.target.value)}
          placeholder="Enter safe name"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            marginBottom: "20px",
            fontSize: "16px",
            fontFamily: "inherit"
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
              padding: "14px",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              backgroundColor: "#ffffff",
              color: "#64748b",
              fontSize: "15px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            Cancel
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
              padding: "14px",
              backgroundColor: "#008c8c",
              color: "#ffffff",
              border: "none",
              borderRadius: "14px",
              fontSize: "15px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            Create Safe
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
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <h3 style={{
            margin: 0,
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "600"
          }}>
            Add New Content
          </h3>

          {/* Note Input Section */}
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "16px" }}>Add Note</h4>
            <input
              type="text"
              placeholder="Note Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              style={styles.input}
            />
            <textarea
              placeholder="Note Content"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              style={styles.textarea}
            />
          </div>

          {/* File Upload Section */}
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "16px" }}>Upload File</h4>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".doc,.docx,.pdf,.jpg,.jpeg,.png,.mp4"
              style={styles.fileInput}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              style={styles.fileDropZone}
            >
              {selectedFile ? (
                <div>{selectedFile.name}</div>
              ) : (
                <div>
                  <div style={{ marginBottom: "8px", color: "#008c8c" }}>
                    {Icons.file}
                  </div>
                  <div style={{ color: "#64748b" }}>
                    Click to upload or drag and drop
                  </div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>
                    Supports DOC, PDF, images, and videos
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: "flex",
            gap: "12px"
          }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "14px",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                backgroundColor: "#ffffff",
                color: "#64748b",
                fontSize: "15px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              Cancel
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
                padding: "14px",
                backgroundColor: "#008c8c",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                fontSize: "15px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              <span>Save</span>
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
          <header style={styles.header}>
            <h1 style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 600,
              color: "#1a1a1a"
            }}>
              Secure Archive
            </h1>
          </header>
          <SafeListView />
        </>
      )}
      {showNewSafeModal && <NewSafeModal />}
    </div>
  );
};

export default ArchivePage;
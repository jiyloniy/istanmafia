"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./postcreate.css"
import PostEdit from "./PostEdit"
import { API, getTokens,ENDPOINTS,API_URL,API_URL2 } from "../config/api"
import Default from "../assets/default.png"

const CreatePost = ({ onClose }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("post")
  const [mediaFiles, setMediaFiles] = useState([])
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [liveTitle, setLiveTitle] = useState("")
  const [storyText, setStoryText] = useState("")
  const [showStoryTextInput, setShowStoryTextInput] = useState(false)
  const [showEditPage, setShowEditPage] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [tabsLocked, setTabsLocked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Article states
  const [articleTitle, setArticleTitle] = useState("")
  const [articleContent, setArticleContent] = useState("")
  const [articleTags, setArticleTags] = useState([])
  const [currentTag, setCurrentTag] = useState("")
  const [articleLocation, setArticleLocation] = useState("")
  const [showArticlePreview, setShowArticlePreview] = useState(false)

  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [userInfo, setUserInfo] = useState(null)

  // New state for caption and location
  const [caption, setCaption] = useState("")
  const [location, setLocation] = useState("")
  const [tags, setTags] = useState([])

  useEffect(() => {
    console.log("CreatePost component rendered")
    console.log("fileInputRef initialized:", fileInputRef.current)
  }, [])
  
  // Handle file selection for Post and Story
  const handleFileSelect = (event) => {
    console.log("File selection triggered")
    const files = Array.from(event.target.files)
    if (files.length === 0) return

    const validFiles = files.filter((file) => {
      return file.type.startsWith("image/") || file.type.startsWith("video/")
    })

    if (validFiles.length === 0) {
      alert("Iltimos, faqat rasm yoki video fayllarini tanlang")
      return
    }

    const processFiles = () => {
      setIsUploading(true)
      let progress = 0
      const interval = setInterval(() => {
        progress += 5
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadProgress(0)

          const newMediaFiles = validFiles.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            type: file.type.startsWith("image/") ? "image" : "video",
            id: Date.now() + Math.random().toString(36).substr(2, 9),
          }))

          setMediaFiles((prev) => [...prev, ...newMediaFiles])
          setSelectedMediaIndex(mediaFiles.length)

          if (newMediaFiles.length > 0) {
            setTabsLocked(true)
          }
        }
      }, 100)
    }

    if (activeTab === "story") {
      const videoFiles = validFiles.filter((file) => file.type.startsWith("video/"))
      if (videoFiles.length > 0) {
        let validDuration = true
        let checkedCount = 0

        videoFiles.forEach((file) => {
          const video = document.createElement("video")
          video.preload = "metadata"

          video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src)
            checkedCount++

            if (video.duration > 60) {
              validDuration = false
            }

            if (checkedCount === videoFiles.length) {
              if (!validDuration) {
                alert("Story uchun video davomiyligi maksimum 1 minut bo'lishi kerak")
                return
              } else {
                processFiles()
              }
            }
          }

          video.src = URL.createObjectURL(file)
        })
      } else {
        processFiles()
      }
    } else {
      processFiles()
    }
  }

  const removeMedia = (index) => {
    const newMediaFiles = [...mediaFiles]
    URL.revokeObjectURL(newMediaFiles[index].url)
    newMediaFiles.splice(index, 1)
    setMediaFiles(newMediaFiles)

    if (selectedMediaIndex >= newMediaFiles.length) {
      setSelectedMediaIndex(Math.max(0, newMediaFiles.length - 1))
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const handleTabChange = (tab) => {
    if (tabsLocked && mediaFiles.length > 0 && tab !== "article") {
      alert(
        "Kontentni tanlagandan keyin boshqa tabga o'tish mumkin emas. Yangi post yaratish uchun avval joriy postni yakunlang.",
      )
      return
    }

    if (tab === "live") {
      startCamera()
    } else if (activeTab === "live") {
      stopCamera()
    }
    setActiveTab(tab)
  }
  const getSafeImageUrl = (imageUrl, apiPrefix = "") => {
    if (!imageUrl) return Default
    if (typeof imageUrl !== "string") return Default
    if (imageUrl.startsWith("http")) return imageUrl
    return apiPrefix + imageUrl
  }
    const handleImageError = (e) => {
    if (!e || !e.target) return
    e.target.onerror = null

    if (Default && typeof Default === "string") {
      e.target.src = Default
    } else {
      e.target.style.display = "none"
    }
  }

  useEffect(() => {
    return () => {
      mediaFiles.forEach((media) => URL.revokeObjectURL(media.url))
      stopCamera()
    }
  }, [mediaFiles])

  const clearAllMedia = () => {
    mediaFiles.forEach((media) => URL.revokeObjectURL(media.url))
    setMediaFiles([])
    setSelectedMediaIndex(0)
    setTabsLocked(false)
  }

  const resetContent = () => {
    clearAllMedia()
    setStoryText("")
    setShowStoryTextInput(false)
    setArticleTitle("")
    setArticleContent("")
    setArticleTags([])
    setCurrentTag("")
    setArticleLocation("")
    setShowArticlePreview(false)
  }

  // Article functions
  const addArticleTag = () => {
    if (currentTag.trim() && !articleTags.includes(currentTag.trim()) && articleTags.length < 10) {
      setArticleTags([...articleTags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeArticleTag = (tagToRemove) => {
    setArticleTags(articleTags.filter((tag) => tag !== tagToRemove))
  }
  useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`${API_URL}${ENDPOINTS.ME}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          const result = await response.json()
          if (result.status === "success") {
            setUserInfo(result.data)
            console.log(result.data.profile_picture)
          }
        } catch (error) {
          console.error("Error fetching user info:", error)
        }
      }
      fetchUserInfo()
    }, [])

  const handleArticleSubmit = async () => {
    if (!articleTitle.trim() || !articleContent.trim()) {
      alert("Iltimos, maqola sarlavhasi va matnini kiriting")
      return
    }

    setIsSubmitting(true)
    setIsUploading(true)
    setUploadProgress(0)

    try {      const formData = new FormData()
      formData.append("title", articleTitle.trim())
      formData.append("content", articleContent.trim())
      formData.append("article_type", "text")

      // Add images to form data if they exist
      if (mediaFiles.length > 0) {
        mediaFiles.forEach(media => {
          if (media.type === "image" && media.file) {
            formData.append("images", media.file)
          }
        })
      }

      if (articleTags.length > 0) {
        formData.append("tags", articleTags.join(","))
      }

      if (articleLocation.trim()) {
        formData.append("location_name", articleLocation.trim())
      }

      formData.append("is_public", "true")
      formData.append("allow_comments", "true")
      formData.append("allow_likes", "true")

      const progressInterval = startProgressSimulation()

      try {
        await sendDataToAPI(API.ARTICLE, formData, "Maqola muvaffaqiyatli joylandi!")

        clearInterval(progressInterval)
        setUploadProgress(100)

        setTimeout(() => {
          const successOverlay = document.createElement("div")
          successOverlay.className = "success-overlay"

          const successMessage = document.createElement("div")
          successMessage.className = "success-message"
          successMessage.innerHTML = '<div class="success-icon">✓</div><p>Maqola muvaffaqiyatli joylandi!</p>'

          successOverlay.appendChild(successMessage)
          document.body.appendChild(successOverlay)

          setTimeout(() => {
            successOverlay.classList.add("show")

            setTimeout(() => {
              setIsUploading(false)
              resetContent()
              onClose()
              window.location.href = "/"
            }, 2000)
          }, 200)
        }, 500)
      } catch (apiError) {
        clearInterval(progressInterval)
        setUploadProgress(0)
        throw apiError
      }
    } catch (error) {
      console.error("Article submission error:", error)
      setIsUploading(false)
      alert("Xatolik yuz berdi: " + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }
 
  // Render Article Tab
  const renderArticleTab = () => (
    <div className="article-tab">
      {showArticlePreview ? (
        <div className="article-preview-container">
          <div className="article-preview-header">
            <button className="article-back-button" onClick={() => setShowArticlePreview(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Tahrirlash
            </button>
            <div className="preview-indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Ko'rish
            </div>
          </div>

          <div className="article-preview-content">
            <div className="article-preview-card">
              <div className="article-author-info">
                <div className="author-avatar">
                 👤
                </div>
                <div className="author-details">
                  <div className="author-name">{
                             
                              
                                    userInfo?.name || "Foydalanuvchi nomi"  
                              
                    }</div>
                  <div className="article-meta">
                    <span>Hozir</span>
                    {articleLocation && (
                      <>
                        <span className="meta-separator">•</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{articleLocation}</span>
                      </>
                    )}
                  </div>
                </div>
                <button className="article-menu-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>

              <div className="article-content-preview">
                <h1 className="article-title-preview">{articleTitle || "Maqola sarlavhasi"}</h1>

                {articleTags.length > 0 && (
                  <div className="article-tags-preview">
                    {articleTags.map((tag, index) => (
                      <span key={index} className="article-tag-preview">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="article-text-preview">
                  {articleContent.split("\n").map((paragraph, index) => (
                    <p key={index} className="article-paragraph">
                      {paragraph || "\u00A0"}
                    </p>
                  ))}
                </div>
              </div>

              <div className="article-engagement">
                <div className="engagement-buttons">
                  <button className="engagement-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span>Yoqish</span>
                  </button>
                  <button className="engagement-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Izoh</span>
                  </button>
                  <button className="engagement-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16,6 12,2 8,6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                    <span>Ulashish</span>
                  </button>
                </div>
                <button className="bookmark-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="article-editor">
          <div className="article-form">
            <div className="article-input-group">
              <input
                type="text"
                className="article-title-input"
                placeholder="Maqola sarlavhasini kiriting..."
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                maxLength={200}
              />
              <div className="input-counter">{articleTitle.length}/200</div>
            </div>

            <div className="article-input-group">
              <textarea
                className="article-content-input"
                placeholder="Maqolangizni yozing... O'z fikrlaringiz, tajribalaringiz va bilimlaringizni boshqalar bilan bo'lishing. Bu yerda siz o'z g'oyalaringizni batafsil bayon qilishingiz mumkin."
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
                maxLength={5000}
              />
              <div className="input-counter">{articleContent.length}/5000</div>
            </div>
            {/* Multi-image select and preview for article */}
                  <div className="article-input-group">
                    <label className="article-media-label" style={{ fontWeight: 500, marginBottom: 6 }}>
                    Rasmlar (bir nechta tanlash mumkin)
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap",paddingBottom: 10,paddingTop: 10 }}>
                    {mediaFiles.length > 0 &&
                      mediaFiles.map((media, idx) => (
                      <div
                        key={media.id || idx}
                        style={{
                        width: 64,
                        height: 64,
                        borderRadius: 8,
                        overflow: "hidden",
                        border: "1px solid #e6f4fa",
                        position: "relative",
                        background: "#f6fafd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        }}
                      >
                        {media.type === "image" ? (
                        <img
                          src={media.url}
                          alt={`img-${idx}`}
                          style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 8,
                          }}
                        />
                        ) : (
                        <video
                          src={media.url}
                          style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 8,
                          }}
                        />
                        )}
                        <button
                        type="button"
                        onClick={() => removeMedia(idx)}
                        style={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "rgba(0,0,0,0.6)",
                          color: "#fff",
                          border: "none",
                          fontSize: 12,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 0,
                        }}
                        title="O'chirish"
                        >
                        ×
                        </button>
                      </div>
                      ))}
                    <label
                      htmlFor="article-media-input"
                      style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                      border: "1px dashed #1da1f2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: 28,
                      color: "#1da1f2",
                      background: "#f6fafd",
                      }}
                      title="Rasm yoki video tanlash"
                    >
                      +
                      <input
                      id="article-media-input"
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      onChange={e => {
                        // faqat article tab uchun images arrayga joylash
                        const files = Array.from(e.target.files);
                        if (files.length === 0) return;
                        const validFiles = files.filter(file => file.type.startsWith("image/"));
                        if (validFiles.length === 0) {
                        alert("Faqat rasm fayllarini tanlang");
                        return;
                        }
                        // preview uchun mediaFiles ni update qilamiz
                        const newMediaFiles = validFiles.map(file => ({
                        file,
                        url: URL.createObjectURL(file),
                        type: "image",
                        id: Date.now() + Math.random().toString(36).substr(2, 9),
                        }));
                        setMediaFiles(prev => [...prev, ...newMediaFiles]);
                      }}
                      />
                    </label>
                    </div>
                    {mediaFiles.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAllMedia}
                      style={{
                      marginTop: 8,
                      background: "#f44336",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "4px 14px",
                      fontWeight: 500,
                      cursor: "pointer",
                      fontSize: "0.98rem",
                      }}
                    >
                      Barchasini o'chirish
                    </button>
                    )}
                  </div>

                  <div className="article-input-group">
                    <div className="tags-input-container">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
                    </svg>
                    <input
                      type="text"
                      className="tags-input"
                      placeholder="Teglar qo'shing (maksimum 10 ta)..."
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addArticleTag()
                    }
                  }}
                  disabled={articleTags.length >= 10}
                />
                <button
                  className="add-tag-button"
                  onClick={addArticleTag}
                  disabled={!currentTag.trim() || articleTags.length >= 10}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>

              {articleTags.length > 0 && (
                <div className="article-tags-container">
                  {articleTags.map((tag, index) => (
                    <div key={index} className="article-tag">
                      <span>#{tag}</span>
                      <button className="remove-tag-button" onClick={() => removeArticleTag(tag)}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="article-input-group">
              <div className="location-input-container">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <input
                  type="text"
                  className="location-input"
                  placeholder="Joylashuv qo'shing..."
                  value={articleLocation}
                  onChange={(e) => setArticleLocation(e.target.value)}
                  maxLength={100}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="article-bottom-actions">
        

        <button
          className="article-submit-button"
          onClick={handleArticleSubmit}
          disabled={isSubmitting || !articleTitle.trim() || !articleContent.trim()}
        >
          {isSubmitting ? (
            <>
              <div className="submit-spinner"></div>
              Joylanmoqda...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22,2 15,22 11,13 2,9 22,2" />
              </svg>
              Maqolani joylash
            </>
          )}
        </button>
      </div>
    </div>
  )

  // Existing render functions remain the same
  const renderPostTab = () => (
    <div className="post-tab">
      <div className="media-preview">
        {isUploading ? (
          <div className="upload-progress-container">
            <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
            <div className="upload-progress-text">{uploadProgress}% Uploading...</div>
          </div>
        ) : mediaFiles.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <div
              className="media-thumbnails-row-vertical"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                maxHeight: '350px',
                minWidth: '64px',
                marginRight: '16px',
                background: '#fff',
                padding: '2px 0',
                boxShadow: '0 2px 8px rgba(29,161,242,0.04)',
                borderRadius: '12px',
              }}
            >
              {mediaFiles.map((media, index) => (
                <div
                  key={index}
                  className={`media-thumbnail ${selectedMediaIndex === index ? "active" : ""}`}
                  onClick={() => setSelectedMediaIndex(index)}
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: selectedMediaIndex === index ? '2px solid #1da1f2' : '1px solid #e6f4fa',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    background: '#f6fafd',
                    boxShadow: selectedMediaIndex === index ? '0 2px 8px rgba(29,161,242,0.10)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    transition: 'border 0.18s',
                  }}
                >
                  {media.type === "image" ? (
                    <img src={media.url || "/placeholder.svg"} alt={`Thumbnail ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <video src={media.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  <div
                    className="remove-thumbnail"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeMedia(index)
                    }}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </div>
                </div>
              ))}
              <div
                className="media-thumbnail add-more"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '10px',
                  border: '1px dashed #1da1f2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: '#1da1f2',
                  background: '#f6fafd',
                  marginBottom: '10px',
                }}
              >
                +
              </div>
            </div>
            <div className="media-preview-box">
              {mediaFiles[selectedMediaIndex].type === "image" ? (
                <img
                  src={mediaFiles[selectedMediaIndex].url || "/placeholder.svg"}
                  alt="Preview"
                  className="media-preview-image"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '340px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 24px rgba(29,161,242,0.10)',
                    objectFit: 'contain',
                    margin: '0 auto',
                    display: 'block',
                    background: '#f6fafd',
                  }}
                />
              ) : (
                <video
                  src={mediaFiles[selectedMediaIndex].url}
                  controls
                  className="media-preview-image"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '340px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 24px rgba(29,161,242,0.10)',
                    objectFit: 'contain',
                    margin: '0 auto',
                    display: 'block',
                    background: '#f6fafd',
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="media-preview-placeholder">
            <div className="placeholder-icon">📷</div>
            <div className="placeholder-text">Yuklash uchun rasmlar yoki videolarni tanlang</div>
            <button className="upload-button" onClick={() => fileInputRef.current?.click()}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Contentlarni tanlash
            </button>
          </div>
        )}
      </div>

      {mediaFiles.length > 0 && (
        <>
          <div className="post-fields">
            <textarea
              className="post-caption-input"
              placeholder="Post matni (caption)..."q
              maxLength={2000}
              rows={3}
              style={{ resize: 'vertical', borderRadius: '10px', border: '1px solid #e6f4fa', padding: '5px', fontSize: '1rem', marginBottom: '12px', width: '100%' }}
              value={caption || ''}
              onChange={e => setCaption(e.target.value)}
            />
            <input
              className="post-location-input"
              placeholder="Joylashuv (location)..."
              maxLength={100}
              style={{ borderRadius: '10px', border: '1px solid #e6f4fa', padding: '10px', fontSize: '1rem', marginBottom: '12px', width: '100%' }}
              value={location || ''}
              onChange={e => setLocation(e.target.value)}
            />
            <div className="post-tags-input-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <input
                className="post-tags-input"
                placeholder="Teg qo'shish..."
                maxLength={30}
                style={{ borderRadius: '10px', border: '1px solid #e6f4fa', padding: '10px', fontSize: '1rem', flex: 1 }}
                value={currentTag || ''}
                onChange={e => setCurrentTag(e.target.value)}
                onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
              />
              <button
                className="add-tag-btn"
                style={{ borderRadius: '8px', background: '#00a884', color: '#fff', border: 'none', padding: '8px 14px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                onClick={addTag}
                disabled={!currentTag || tags.length >= 10}
              >Qo'shish</button>
            </div>
            {tags.length > 0 && (
              <div className="post-tags-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                {tags.map((tag, i) => (
                  <span key={i} className="post-tag-item" style={{ background: '#e6f4fa', color: '#1da1f2', borderRadius: '8px', padding: '4px 10px', fontWeight: 500, fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    #{tag}
                    <button style={{ background: 'none', border: 'none', color: '#1da1f2', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }} onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            )}
            <button
              className="post-submit-btn"
              style={{ width: '100%', background: '#00a884', color: '#fff', border: 'none', borderRadius: '10px', padding: '14\px', fontWeight: 700, fontSize: '1.1rem', marginTop: 'px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(29,161,242,0.10)', transition: 'background 0.18s' }}
              onClick={handlePostSubmit}
              disabled={isUploading || isSubmitting || !mediaFiles.length}
            >
              {isUploading || isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
            </button>
          </div>
        </>
      )}
    </div>
  )

  const renderStoryTab = () => {
    const handleStorySubmit = () => {
      handleSubmitStory()
    }

    return (
      <div
        className="story-tab"
        style={{ backgroundColor: "white", display: "flex", flexDirection: "column", height: "100%" }}
      >
        <div className="story-preview" style={{ backgroundColor: "#f0f0f0", flex: 1, position: "relative" }}>
          {isUploading ? (
            <div className="upload-progress-container">
              <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
              <div className="upload-progress-text">{uploadProgress}% Uploading...</div>
            </div>
          ) : mediaFiles.length > 0 && selectedMediaIndex < mediaFiles.length ? (
            <div
              className="story-media-container"
              style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column" }}
            >
              {mediaFiles[selectedMediaIndex].type === "image" ? (
                <img
                  src={mediaFiles[selectedMediaIndex].url || "/placeholder.svg"}
                  alt="Story Preview"
                  className="story-preview-image"
                  style={{ objectFit: "contain", maxHeight: "100%", width: "100%" }}
                />
              ) : (
                <video
                  src={mediaFiles[selectedMediaIndex].url}
                  controls
                  className="story-preview-image"
                  style={{ objectFit: "contain", maxHeight: "100%", width: "100%" }}
                />
              )}

              {showStoryTextInput && (
                <div
                  className="story-text-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 10,
                  }}
                >
                  <textarea
                    className="story-text-input"
                    placeholder="Storyga matn qo'shing..."
                    value={storyText}
                    onChange={(e) => setStoryText(e.target.value)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "white",
                      fontSize: "24px",
                      textAlign: "center",
                      width: "80%",
                      height: "50%",
                      resize: "none",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                    }}
                    autoFocus
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              className="media-preview-placeholder"
              style={{
                color: "#333",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div className="placeholder-icon" style={{ fontSize: "48px", marginBottom: "16px" }}>
                📸
              </div>
              <div className="placeholder-text" style={{ marginBottom: "20px", fontSize: "16px", textAlign: "center" }}>
                Yuklash uchun rasmlar yoki videolarni tanlang
              </div>
              <label
                className="upload-button"
                htmlFor="file-input-story"
                style={{
                  backgroundColor: "#00a884",
                  width: "100%",
                  maxWidth: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  borderRadius: "4px",
                  padding: "12px",
                  color: "white",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Contentlarni tanlash
              </label>
              <input
                id="file-input-story"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                style={{ display: "none" }}
                multiple
              />
            </div>
          )}
        </div>

        {mediaFiles.length > 1 && (
          <div
            className="media-thumbnails"
            style={{
              display: "flex",
              padding: "10px",
              overflowX: "auto",
              backgroundColor: "white",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            {mediaFiles.map((media, index) => (
              <div
                key={media.id || index}
                className={`media-thumbnail ${selectedMediaIndex === index ? "active" : ""}`}
                onClick={() => setSelectedMediaIndex(index)}
                style={{
                  width: "60px",
                  height: "60px",
                  margin: "0 5px",
                  border: selectedMediaIndex === index ? "2px solid #00a884" : "1px solid #e0e0e0",
                  borderRadius: "4px",
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {media.type === "image" ? (
                  <img
                    src={media.url || "/placeholder.svg"}
                    alt={`Thumbnail ${index}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <video src={media.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeMedia(index)
                  }}
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <div
              className="media-thumbnail add-more"
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: "60px",
                height: "60px",
                margin: "0 5px",
                border: "1px dashed #aaa",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "24px",
                color: "#aaa",
              }}
            >
              +
            </div>
          </div>
        )}

        {mediaFiles.length > 0 ? (
          <div
            className="story-bottom-controls"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "15px",
              borderTop: "1px solid #e0e0e0",
              backgroundColor: "white",
            }}
          >
            <button
              className="story-submit-button"
              onClick={handleStorySubmit}
              disabled={isSubmitting}
              style={{
                backgroundColor: "#00a884",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "12px 24px",
                fontWeight: "600",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
                fontSize: "16px",
                width: "100%",
                maxWidth: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              {isSubmitting ? "Joylanmoqda..." : "Storiyga joylash"}
            </button>
          </div>
        ) : null}
      </div>
    )
  }

  const renderLiveTab = () => (
    <div className="live-tab">
      <div className="live-preview">
        <video ref={videoRef} autoPlay playsInline muted className="live-camera-view" />
      </div>

      <div className="live-title-container">
        <input
          type="text"
          className="live-title-input"
          placeholder="Live uchun sarlavha..."
          value={liveTitle}
          onChange={(e) => setLiveTitle(e.target.value)}
        />
      </div>

      <div className="live-settings">
        <button className="live-setting-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
        <button className="live-setting-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
        <button className="live-setting-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
            <path d="M19 10v2a7 7 0 01-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
      </div>

      <div className="live-controls">
        <button className="live-control-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7c0-1.1.9-2 2-2z" />
          </svg>
        </button>
        <button className={`live-control-button go-live ${isRecording ? "recording" : ""}`} onClick={toggleRecording}>
          {isRecording ? "LIVE" : "GO LIVE"}
        </button>
        <button className="live-control-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </button>
      </div>
    </div>
  )

  const handleActionClick = () => {
    if (activeTab === "article") {
      if (!articleTitle.trim() || !articleContent.trim()) {
        alert("Iltimos, maqola sarlavhasi va matnini kiriting")
        return
      }
      handleArticleSubmit()
      return
    }

    if (mediaFiles.length === 0) {
      fileInputRef.current?.click()
      return
    }

    if (activeTab === "post") {
      setShowEditPage(true)
    } else if (activeTab === "story") {
      handleSubmitStory()
    } else if (activeTab === "live") {
      startLiveStream()
    }
  }

  const startLiveStream = async () => {
    if (!streamRef.current) {
      alert("Kamera yoqilmagan. Iltimos, kamerani yoqing.")
      return
    }

    setIsRecording(true)

    try {
      const formData = new FormData()

      formData.append("type", "live")
      formData.append("timestamp", new Date().toISOString())
      formData.append("title", liveTitle || "Live Stream")

      const result = await sendDataToAPI("live/start", formData, "Live efir boshlandi!")

      const liveStreamId = result.liveStreamId
      console.log("Live stream started with ID:", liveStreamId)

      const stopLiveStream = async () => {
        if (!isRecording) return

        try {
          const stopFormData = new FormData()
          stopFormData.append("liveStreamId", liveStreamId)

          await sendDataToAPI("live/stop", stopFormData, "Live efir to'xtatildi!")
          setIsRecording(false)
          resetContent()
          onClose()
        } catch (error) {
          console.error("Error stopping live stream:", error)
        }
      }
    } catch (error) {
      console.error("Error starting live stream:", error)
      setIsRecording(false)
      alert("Live efirni boshlashda xatolik yuz berdi. Qaytadan urinib ko'ring.")
    }
  }

  const handleSavePost = async (postData) => {
    try {
      if (mediaFiles.length === 0) {
        alert("Iltimos, post uchun rasm yoki video tanlang")
        return
      }

      setIsSubmitting(true)
      setIsUploading(true)
      setUploadProgress(0)

      const formData = new FormData()

      if (postData.caption) formData.append("caption", postData.caption)

      if (postData.location) formData.append("location_name", postData.location)

      if (postData.tags && postData.tags.length > 0) {
        formData.append("tags", postData.tags.join(","))
      }

      const progressInterval = startProgressSimulation()

      if (mediaFiles.length > 0) {
        formData.append("media", mediaFiles[0].file)
        formData.append("media_type", mediaFiles[0].type === "image" ? "image" : "video")
      }

      if (mediaFiles.length > 1) {
        for (let i = 1; i < mediaFiles.length; i++) {
          formData.append("additional_media", mediaFiles[i].file)
          formData.append("additional_media_types", mediaFiles[i].type === "image" ? "image" : "video")
        }
      }

      formData.append("is_public", postData.privacy === "private" ? "true" : "true")
      formData.append("allow_comments", postData.allowComments !== false ? "true" : "false")
      formData.append("allow_likes", postData.allowLikes !== false ? "true" : "false")

      try {
        await sendDataToAPI(API.POST, formData, "Post muvaffaqiyatli joylandi!")

        clearInterval(progressInterval)
        setUploadProgress(100)

        setTimeout(() => {
          const successOverlay = document.createElement("div")
          successOverlay.className = "success-overlay"

          const successMessage = document.createElement("div")
          successMessage.className = "success-message"
          successMessage.innerHTML = '<div class="success-icon">✓</div><p>Post muvaffaqiyatli joylandi!</p>'

          successOverlay.appendChild(successMessage)
          document.body.appendChild(successOverlay)

          setTimeout(() => {
            successOverlay.classList.add("show")

            setTimeout(() => {
              setIsUploading(false)
              onClose()
              window.location.href = "/"
            }, 1500)
          }, 100)
        }, 500)
      } catch (apiError) {
        clearInterval(progressInterval)
        setUploadProgress(0)
        throw apiError
      }
    } catch (error) {
      console.error("Post submission error:", error)
      setIsUploading(false)
      alert("Xatolik yuz berdi: " + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const startProgressSimulation = () => {
    let progress = 0
    return setInterval(() => {
      progress += 5 + Math.random() * 7

      if (progress > 95) progress = 95

      setUploadProgress(Math.min(Math.round(progress), 95))
    }, 200)
  }

  const sendDataToAPI = async (apiUrl, formData, successMessage) => {
    try {
      const tokens = getTokens()
      const token = tokens.access

      console.log("Sending to API:", apiUrl)
      console.log("FormData contents:", Array.from(formData.entries()))
      console.log("Token:", token ? "Mavjud" : "Mavjud emas")

      const requestOptions = {
        method: "POST",
        body: formData,
      }

      if (token) {
        requestOptions.headers = {
          Authorization: `Bearer ${token}`,
        }
      }

      const response = await fetch(apiUrl, requestOptions)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API error response:", errorText)
        let errorMessage
        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.message || errorData.detail || `HTTP error! Status: ${response.status}`
        } catch (e) {
          errorMessage = `HTTP error! Status: ${response.status}`
        }
        throw new Error(errorMessage)
      }

      const resultText = await response.text()
      let result
      try {
        result = JSON.parse(resultText)
      } catch (e) {
        console.log("Response is not JSON:", resultText)
        result = { success: true, message: successMessage }
      }

      console.log("API response:", result)

      return result
    } catch (error) {
      console.error("API error:", error)
      alert("Xatolik yuz berdi. Qaytadan urinib ko'ring: " + error.message)
      throw error
    }
  }

  const handleSubmitStory = async () => {
    if (mediaFiles.length === 0) {
      alert("Iltimos, story uchun rasm yoki video tanlang")
      return
    }

    setIsSubmitting(true)
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()

      formData.append("content", storyText || "")

      const progressInterval = startProgressSimulation()

      try {
        if (mediaFiles.length > 0) {
          formData.append("media", mediaFiles[0].file)
          formData.append("media_type", mediaFiles[0].type === "image" ? "image" : "video")
        }

        formData.append("duration", "24")
        formData.append("is_public", "true")

        await sendDataToAPI(API.STORY, formData, "Story muvaffaqiyatli joylandi!")

        clearInterval(progressInterval)
        setUploadProgress(100)

        setTimeout(() => {
          const successOverlay = document.createElement("div")
          successOverlay.className = "success-overlay"

          const successMessage = document.createElement("div")
          successMessage.className = "success-message"
          successMessage.innerHTML = '<div class="success-icon">✓</div><p>Story muvaffaqiyatli joylandi!</p>'

          successOverlay.appendChild(successMessage)
          document.body.appendChild(successOverlay)

          setTimeout(() => {
            successOverlay.classList.add("show")

            setTimeout(() => {
              setIsUploading(false)
              resetContent()
              onClose()

              window.location.href = "/"
            }, 2000)
          }, 200)
        }, 500)
      } catch (apiError) {
        clearInterval(progressInterval)
        setUploadProgress(0)
        throw apiError
      }
    } catch (error) {
      console.error("Story submission error:", error)
      setIsUploading(false)
      alert("Xatolik yuz berdi: " + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // AddTag: add a tag to the tags array if not empty and not already present
  const addTag = () => {
    if (currentTag && !tags.includes(currentTag) && tags.length < 10) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }
  // RemoveTag: remove a tag from the tags array
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }
  // HandlePostSubmit: submit the post with all fields
  const handlePostSubmit = async () => {
    if (!mediaFiles.length) {
      alert("Iltimos, post uchun rasm yoki video tanlang")
      return
    }
    setIsSubmitting(true)
    setIsUploading(true)
    setUploadProgress(0)
    try {
      const formData = new FormData()
      if (caption) formData.append("caption", caption)
      if (location) formData.append("location_name", location)
      if (tags.length > 0) formData.append("tags", tags.join(","))
      const progressInterval = startProgressSimulation()
      if (mediaFiles.length > 0) {
        formData.append("media", mediaFiles[0].file)
        formData.append("media_type", mediaFiles[0].type === "image" ? "image" : "video")
      }
      if (mediaFiles.length > 1) {
        for (let i = 1; i < mediaFiles.length; i++) {
          formData.append("additional_media", mediaFiles[i].file)
          formData.append("additional_media_types", mediaFiles[i].type === "image" ? "image" : "video")
        }
      }
      formData.append("is_public", "true")
      formData.append("allow_comments", "true")
      formData.append("allow_likes", "true")
      try {
        await sendDataToAPI(API.POST, formData, "Post muvaffaqiyatli joylandi!")
        clearInterval(progressInterval)
        setUploadProgress(100)
        setTimeout(() => {
          setIsUploading(false)
          setIsSubmitting(false)
          if (onClose) onClose()
          window.location.href = "/"
        }, 1200)
      } catch (apiError) {
        clearInterval(progressInterval)
        setUploadProgress(0)
        throw apiError
      }
    } catch (error) {
      setIsUploading(false)
      setIsSubmitting(false)
      alert("Xatolik yuz berdi: " + error.message)
    }
  }

  if (showEditPage) {
    return (
      <div className="post-edit-modal-overlay">
        <PostEdit
          mediaFiles={mediaFiles}
          onClose={() => setShowEditPage(false)}
          onSave={handleSavePost}
          selectedMediaIndex={selectedMediaIndex}
        />
      </div>
    )
  }

  if (isSubmitting) {
    return (
      <div className="post-create-container">
        <div className="upload-overlay">
          <div className="spinner"></div>
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="post-create-container">
      {/* Header */}
      <div className="post-create-header">
        <div className="header-left">
          <button
            onClick={() => {
              if (onClose) onClose()
              navigate('/')
            }}
            className="back-button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="header-title">
            {activeTab === "post"
              ? ""
              : activeTab === "story"
                ? "Yangi story"
                : activeTab === "article"
                  ? "Yangi maqola"
                  : "Live efir"}
          </h1>
        </div>
        {/*  */}
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "post" ? "active" : ""} ${tabsLocked && mediaFiles.length > 0 && activeTab !== "post" ? "disabled" : ""}`}
          onClick={() => handleTabChange("post")}
          disabled={tabsLocked && mediaFiles.length > 0 && activeTab !== "post"}
        >
          Post
        </button>
        <button
          className={`tab-button ${activeTab === "story" ? "active" : ""} ${tabsLocked && mediaFiles.length > 0 && activeTab !== "story" ? "disabled" : ""}`}
          onClick={() => handleTabChange("story")}
          disabled={tabsLocked && mediaFiles.length > 0 && activeTab !== "story"}
          style={activeTab === "story" ? { color: "#00a884", borderBottom: "2px solid #00a884" } : {}}
        >
          Story
        </button>
        <button
          className={`tab-button ${activeTab === "article" ? "active" : ""} ${(isUploading || isSubmitting) ? "disabled" : ""}`}
          onClick={() => handleTabChange("article")}
          disabled={isUploading || isSubmitting}
          style={activeTab === "article" ? { color: "#00a884", borderBottom: "2px solid #00a884" } : {}}
        >
          Maqola
        </button>
        <button
          className={`tab-button ${activeTab === "live" ? "active" : ""}`}
          onClick={() => handleTabChange("live")}
          disabled={true}
          style={{ opacity: 0.5, cursor: "not-allowed" }}
        >
          Live
        </button>
      </div>

      {/* Content Area */}
      <div className="post-create-content">
        {activeTab === "post" && renderPostTab()}
        {activeTab === "story" && renderStoryTab()}
        {activeTab === "article" && renderArticleTab()}
        {activeTab === "live" && renderLiveTab()}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="file-input"
        accept="image/*,video/*"
        onChange={(e) => {
          console.log("File input change event triggered")
          handleFileSelect(e)
        }}
        style={{ display: "none" }}
        multiple
      />
    </div>
  )
}

export default CreatePost

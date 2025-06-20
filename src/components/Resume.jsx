"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Globe,
  Heart,
  Share2,
  Eye,
  Bookmark,
  ThumbsUp,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Settings,
} from "lucide-react"
import { likePost, savePost, ENDPOINTS, API_URL } from "../config/api"
import lightBulb from "../assets/image 18 (3).png"
import englifyIcon from "../assets/image (4).png"
import sejongIcon from "../assets/image (6).png"
import languageIcon from "../assets/image 18 (3).png"
import schoolGraduation from "../assets/123.jpg"
import medal from "../assets/1234.jpg"
import university from "../assets/Main.jpg"

export default function MobileResume() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("resume")
  const [userInfo, setUserInfo] = useState(null)

  // Social interaction states
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [viewCount, setViewCount] = useState(0)
  const [commentCount, setCommentCount] = useState(0)
  const [shareCount, setShareCount] = useState(0)

  // Management states
  const [isEditMode, setIsEditMode] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarType, setSnackbarType] = useState("success") // 'success', 'error', 'info'

  const itSkills = [
    { name: "Testlab: IT tushunchasi", score: 8, maxScore: 10, date: "2024-04-14" },
    { name: "IT Park: Python", score: 7, maxScore: 10, date: "2024-04-14" },
    { name: "Testlab: Algoritm", score: 8, maxScore: 10, date: "2024-04-14" },
  ]

  const languages = [
    { name: "Englify: Ingliz tili", score: 8, maxScore: 10, date: "2024-04-14" },
    { name: "King Sejong: Koreys tili", score: 7, maxScore: 10, date: "2024-04-14" },
    { name: "Testlab: Rus tili", score: 8, maxScore: 10, date: "2024-04-14" },
  ]

  // Kasblar ro'yxati
  const professions = ["developer", "shifokor", "marketolog", "arxitektor", "o'qituvchi", "shafyor"]

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

  // Initialize social metrics
  useEffect(() => {
    // Simulate initial metrics
    setViewCount(Math.floor(Math.random() * 1000) + 500)
    setLikes(Math.floor(Math.random() * 100) + 50)
    setCommentCount(Math.floor(Math.random() * 50) + 10)
    setShareCount(Math.floor(Math.random() * 30) + 5)
  }, [])

  const personalInfo = {
    name: userInfo?.name || "Aziz Rahimov",
    title: userInfo?.profession || "Malakali shifokor / Qualified Doctor",
    email: userInfo?.username || "istan@istan.uz",
    phone: "+998 90 123 45 67",
    location: "Toshkent, O'zbekiston",
    telegram: "@aziz_doctor",
    instagram: "@doctor_aziz",
  }

  const summary = {
    uz: "10 yillik tajribaga ega malakali shifokor. Zamonaviy tibbiy uskunalar va yangi davolash usullarini qo'llash bo'yicha ekspert. Yuqori malakali jarrohlik amaliyotlari va bemorlar bilan samarali muloqot o'rnatish ko'nikmasiga ega.",
    en: "Qualified doctor with 10 years of experience. Expert in modern medical equipment and new treatment methods. Skilled in high-level surgical procedures and effective patient communication.",
  }

  // Kasbiy tajriba
  const experience = [
    {
      title: "Bosh shifokor / Chief Doctor",
      company: "Central Medical Center",
      period: "2020 - Hozir",
      description: {
        uz: "500+ murakkab jarrohlik amaliyotlarini muvaffaqiyatli o'tkazdim. Yangi davolash usullarini joriy etib, bemor tuzalish ko'rsatkichini 40% oshirdim.",
        en: "Successfully performed 500+ complex surgical operations. Implemented new treatment methods, increasing patient recovery rate by 40%.",
      },
      skills: ["Jarrohlik", "Diagnostika", "Reabilitatsiya"],
    },
    {
      title: "Yetakchi shifokor / Leading Doctor",
      company: "Tashkent Medical Center",
      period: "2017 - 2020",
      description: {
        uz: "5000+ bemorlarni muvaffaqiyatli davoladim. Yangi tibbiy uskunalar bilan ishlash protokollarini ishlab chiqdim.",
        en: "Successfully treated 5000+ patients. Developed protocols for working with new medical equipment.",
      },
      skills: ["Terapiya", "Tibbiy maslahat", "Profilaktika"],
    },
    {
      title: "Shifokor / Doctor",
      company: "Regional Hospital",
      period: "2015 - 2017",
      description: {
        uz: "Kunlik 30+ bemorlarni qabul qildim. Favqulodda tibbiy yordam ko'rsatish bo'yicha mutaxassislikka erishdim.",
        en: "Managed 30+ daily patient consultations. Specialized in emergency medical care.",
      },
      skills: ["Tibbiy yordam", "Bemorlar bilan muloqot", "Tibbiy hujjatlar"],
    },
  ]

  const education = [
    {
      degree: "Tibbiyot fanlari doktori / Doctor of Medical Sciences",
      school: "Toshkent Tibbiyot Akademiyasi",
      period: "2012 - 2015",
      achievements: "Oliy darajali diplom",
    },
    {
      degree: "Magistr / Master's in Medicine",
      school: "Toshkent Tibbiyot Akademiyasi",
      period: "2010 - 2012",
      achievements: "Prezident stipendiyasi sovrindori",
    },
    {
      degree: "Bakalavr / Bachelor of Medicine",
      school: "Toshkent Tibbiyot Akademiyasi",
      period: "2006 - 2010",
      achievements: "Imtiyozli diplom",
    },
  ]

  const skills = [
    { name: "Jarrohlik operatsiyalari / Surgery", level: 95 },
    { name: "Diagnostika / Diagnostics", level: 90 },
    { name: "Bemorlar bilan muloqot / Patient Care", level: 95 },
    { name: "Tibbiy hujjatlar / Medical Documentation", level: 85 },
    { name: "Zamonaviy tibbiy uskunalar / Modern Medical Equipment", level: 90 },
    { name: "Tibbiy tadqiqotlar / Medical Research", level: 80 },
  ]

  const certificates = [
    "Oliy toifali jarroh / High Category Surgeon",
    "Xalqaro tibbiyot dasturi qatnashchisi / International Medical Program",
    "IELTS 7.0 - Tibbiyot yo'nalishi / Medical English",
    "Zamonaviy jarrohlik usullari / Modern Surgery Methods",
    "Reanimatsiya va intensiv terapiya / ICU Specialist",
  ]

  const specialAchievements = [
    {
      title: "Yilning eng yaxshi shifokori / Best Doctor of the Year",
      year: "2023",
      description: {
        uz: "500+ muvaffaqiyatli operatsiyalar va yuqori bemor tuzalish ko'rsatkichi uchun",
        en: "For 500+ successful operations and high patient recovery rate",
      },
    },
    {
      title: "Xalqaro tibbiyot konferensiyasi / International Medical Conference",
      year: "2022",
      description: {
        uz: "Yangi jarrohlik usuli bo'yicha ma'ruza bilan ishtirok etish",
        en: "Presentation on new surgical method",
      },
    },
  ]

  const projects = [
    {
      title: "Yurak jarrohligi / Cardiac Surgery",
      description: {
        uz: "Murakkab yurak operatsiyasini yangi minimal invaziv usulda muvaffaqiyatli o'tkazish. Bemorning tez tuzalishi va asoratlarsiz tiklanishiga erishish.",
        en: "Successfully performed complex cardiac surgery using new minimally invasive technique. Achieved rapid patient recovery with no complications.",
      },
      image: "https://img.freepik.com/free-photo/surgeon-team-performing-operation-modern-hospital_1301-7642.jpg",
      type: "Jarrohlik / Surgery",
      stats: {
        uz: [
          "95% muvaffaqiyat ko'rsatkichi",
          "3-5 kun reabilitatsiya",
          "100+ shu turdagi operatsiyalar",
          "0% asoratlar",
        ],
        en: ["95% success rate", "3-5 days rehabilitation", "100+ similar operations", "0% complications"],
      },
      date: "2023",
      additionalInfo: {
        uz: ["Minimal invaziv texnika", "Zamonaviy monitorning tizimi", "3D modellash yordamida rejalashtirish"],
        en: ["Minimally invasive technique", "Advanced monitoring system", "3D modeling for planning"],
      },
    },
    {
      title: "Neyroxirurgiya innovatsiyasi / Neurosurgery Innovation",
      description: {
        uz: "Bosh miya o'smasini zamonaviy navigatsiya tizimi yordamida olib tashlash. Yangi turdagi mikroskopik uskunalardan foydalanish.",
        en: "Brain tumor removal using advanced navigation system. Implementation of new microscopic equipment.",
      },
      image: "https://api.avitsennaclinic.uz/uploads/services/14fb9ea51b929bbfd1f21a43195a6838.jpg",
      type: "Innovatsion jarrohlik / Innovative Surgery",
      stats: {
        uz: ["98% aniqlik darajasi", "40% tezroq tiklanish", "50+ muvaffaqiyatli operatsiya"],
        en: ["98% accuracy rate", "40% faster recovery", "50+ successful operations"],
      },
      date: "2023",
      additionalInfo: {
        uz: ["3D navigatsiya tizimi", "Real vaqt monitoring", "Neyromonitoring"],
        en: ["3D navigation system", "Real-time monitoring", "Neuromonitoring"],
      },
    },
    {
      title: "Tibbiy markaz modernizatsiyasi / Medical Center Modernization",
      description: {
        uz: "Zamonaviy diagnostika markazini yaratish va jihozlash. Xodimlarni yangi texnologiyalar bilan ishlashga o'qitish.",
        en: "Creation and equipment of modern diagnostic center. Staff training on new technologies.",
      },
      image: "https://mtm.uz/frontend/img/about/mtm_video3.png",
      type: "Loyiha / Project",
      stats: {
        uz: ["30% ko'proq diagnostika", "15 yangi qurilma", "100+ o'qitilgan xodim"],
        en: ["30% more diagnostics", "15 new devices", "100+ trained staff"],
      },
      date: "2022",
      additionalInfo: {
        uz: ["MRI 3 Tesla", "Zamonaviy laboratoriya", "Telemedicine markazi"],
        en: ["3 Tesla MRI", "Modern laboratory", "Telemedicine center"],
      },
    },
    {
      title: "Xalqaro hamkorlik / International Collaboration",
      description: {
        uz: "Germaniya va Janubiy Koreya klinikalari bilan hamkorlikda murakkab operatsiyalarni o'tkazish va tajriba almashish.",
        en: "Complex surgeries and experience exchange in collaboration with German and South Korean clinics.",
      },
      image: "https://yuz.uz/imageproxy/1200x/https://yuz.uz/file/news/b835e3f5732864ec87f6e171a6ae53bd.jpg",
      type: "Hamkorlik / Collaboration",
      stats: {
        uz: ["50+ xalqaro operatsiya", "5 davlat", "20+ hamkor klinika", "100+ treninglar"],
        en: ["50+ international surgeries", "5 countries", "20+ partner clinics", "100+ trainings"],
      },
      date: "2023",
      additionalInfo: {
        uz: ["Xalqaro sertifikatlar", "Ko'p tilli shifokorlar jamoasi", "Global tibbiy protokollar"],
        en: ["International certificates", "Multilingual medical team", "Global medical protocols"],
      },
    },
    {
      title: "Teletibbiyot platformasi / Telemedicine Platform",
      description: {
        uz: "Masofaviy konsultatsiya va monitoring tizimini yaratish. COVID-19 davrida 10000+ bemorga masofaviy yordam.",
        en: "Development of remote consultation and monitoring system. Remote assistance to 10000+ patients during COVID-19.",
      },
      image:
        "https://www.unicef.org/uzbekistan/sites/unicef.org.uzbekistan/files/styles/media_large_image/public/1_8_0.webp?itok=7l0uq2B3",
      type: "Raqamli tibbiyot / Digital Healthcare",
      stats: {
        uz: ["10000+ masofaviy konsultatsiya", "90% bemor mamnuniyati", "24/7 xizmat"],
        en: ["10000+ remote consultations", "90% patient satisfaction", "24/7 service"],
      },
      date: "2023",
      additionalInfo: {
        uz: ["Mobil ilova", "Video konsultatsiya", "Onlayn retseptlar"],
        en: ["Mobile app", "Video consultations", "Online prescriptions"],
      },
    },
  ]

  const achievements = [
    {
      title: "Asaka tuman 24-DIMI ni tamomlagan",
      meta: "Maktab · 2022",
      image: schoolGraduation,
    },
    {
      title: "Prezident tomonidan 16 yoshda shuhrat medali",
      meta: "Mukofot · 2021",
      image: medal,
    },
    {
      title: "KIUF universitetiga GRAND yutuq'i",
      meta: "Yutuq · 2022",
      image: university,
    },
  ]

  const additionalSkills = [
    "Tibbiy yordam",
    "Diagnostika",
    "Jarrohlik",
    "Bemorlar bilan muloqot",
    "Reabilitatsiya",
    "Tibbiy hujjatlar",
  ]

  // Handler functions
  const handleLike = async () => {
    try {
      const response = await likePost(userInfo?.id)
      setIsLiked(!isLiked)
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
    } catch (error) {
      console.error("Like error:", error)
    }
  }

  const handleSave = async () => {
    try {
      await savePost(userInfo?.id)
      setIsSaved(!isSaved)
    } catch (error) {
      console.error("Save error:", error)
    }
  }

  const handleShare = async () => {
    try {
      setShareCount((prev) => prev + 1)

      const shareData = {
        title: `${personalInfo.name}'s Professional Resume`,
        text: `Check out ${personalInfo.name}'s professional profile - ${personalInfo.title}`,
        url: window.location.href,
      }

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback for browsers that don't support Web Share API
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href)
          // You could add a toast notification here
          alert("Profile link copied to clipboard!")
        } else {
          // Final fallback
          const textArea = document.createElement("textarea")
          textArea.value = window.location.href
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand("copy")
          document.body.removeChild(textArea)
          alert("Profile link copied to clipboard!")
        }
      }
    } catch (error) {
      console.error("Share error:", error)
    }
  }

  // Management handler functions
  const showNotification = (message, type = "success") => {
    setSnackbarMessage(message)
    setSnackbarType(type)
    setShowSnackbar(true)
    setTimeout(() => setShowSnackbar(false), 3000)
  }

  const handleAddResume = () => {
    showNotification("Yangi rezyume qo'shish oynasi ochildi", "info")
    // Add resume logic here
  }

  const handleEditProfile = () => {
    setIsEditMode(!isEditMode)
    showNotification(isEditMode ? "Tahrirlash rejimi yopildi" : "Tahrirlash rejimi yoqildi", "info")
  }

  const handleDeleteItem = (itemType) => {
    if (window.confirm(`${itemType}ni o'chirishni xohlaysizmi?`)) {
      showNotification(`${itemType} muvaffaqiyatli o'chirildi`, "success")
      // Delete logic here
    }
  }

  const handleAddPortfolio = () => {
    showNotification("Yangi portfolio elementi qo'shish oynasi ochildi", "info")
    // Add portfolio logic here
  }

  const handleSaveChanges = () => {
    setIsEditMode(false)
    showNotification("O'zgarishlar saqlandi", "success")
    // Save logic here
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F1F1F1",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0, 168, 132, 0.1)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            padding: "8px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
          onTouchStart={(e) =>
            (e.currentTarget.style.background =
              'rgba(0, 168, 132, 0.1)"))}\
          onTouchEnd={(e) => (e.currentTarget.style.background = "none')
          }
        >
          <ArrowLeft size={24} color="#00a884" />
        </button>

        <h1
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#1f2937",
            margin: 0,
          }}
        >
          Resume
        </h1>

        <div style={{ width: "40px" }}></div>
      </header>

      {/* Navigation Tabs */}
      <nav
        style={{
          padding: "8px 20px 0",
          display: "flex",
          gap: "4px",
        }}
      >
        {["resume", "portfolio"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "capitalize",
              cursor: "pointer",
              transition: "all 0.3s ease",
              background: activeTab === tab ? "#00a884" : "transparent",
              color: activeTab === tab ? "white" : "#6b7280",
              transform: activeTab === tab ? "scale(1.02)" : "scale(1)",
            }}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <main style={{ padding: "20px" }}>
        {activeTab === "resume" ? (
          <div style={{ animation: "fadeIn 0.5s ease-in-out" }}>
            {/* Personal Info Card */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                marginBottom: "20px",
                boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                border: "1px solid rgba(0, 168, 132, 0.1)",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00a884, #059669)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "white",
                  margin: "0 auto 16px",
                }}
              >
                {personalInfo.name
                  ? personalInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "..."}
              </div>

              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#1f2937",
                  textAlign: "center",
                  margin: "0 0 8px",
                }}
              >
                {personalInfo.name || "Loading..."}
              </h2>

              <p
                style={{
                  fontSize: "16px",
                  color: "#00a884",
                  textAlign: "center",
                  fontWeight: "500",
                  margin: "0 0 20px",
                }}
              >
                {personalInfo.title}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { icon: Mail, text: personalInfo.email },
                  { icon: Phone, text: personalInfo.phone },
                  { icon: MapPin, text: personalInfo.location },
                ].map(({ icon: Icon, text }, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "8px 0",
                    }}
                  >
                    <Icon size={18} color="#00a884" />
                    <span style={{ fontSize: "14px", color: "#4b5563" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Interaction Bar */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "16px 24px",
                marginBottom: "20px",
                boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                border: "1px solid rgba(0, 168, 132, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              {/* Left side - Engagement metrics */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flex: 1,
                }}
              >
                {/* View count */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 12px",
                    background: "rgba(0, 168, 132, 0.05)",
                    borderRadius: "12px",
                  }}
                >
                  <Eye size={16} color="#00a884" />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#00a884",
                    }}
                  >
                    {viewCount.toLocaleString()}
                  </span>
                </div>

                {/* Like count */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 12px",
                    background: isLiked ? "rgba(239, 68, 68, 0.1)" : "rgba(0, 168, 132, 0.05)",
                    borderRadius: "12px",
                  }}
                >
                  <Heart size={16} color={isLiked ? "#ef4444" : "#00a884"} fill={isLiked ? "#ef4444" : "none"} />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: isLiked ? "#ef4444" : "#00a884",
                    }}
                  >
                    {likes}
                  </span>
                </div>
              </div>

              {/* Right side - Action buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {/* Like button */}
                <button
                  onClick={handleLike}
                  style={{
                    background: isLiked ? "rgba(239, 68, 68, 0.1)" : "rgba(0, 168, 132, 0.1)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.transform = "scale(0.95)"
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  <ThumbsUp size={18} color={isLiked ? "#ef4444" : "#00a884"} fill={isLiked ? "#ef4444" : "none"} />
                </button>

                {/* Save/Bookmark button */}
                <button
                  onClick={handleSave}
                  style={{
                    background: isSaved ? "rgba(251, 191, 36, 0.1)" : "rgba(0, 168, 132, 0.1)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.transform = "scale(0.95)"
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  <Bookmark size={18} color={isSaved ? "#f59e0b" : "#00a884"} fill={isSaved ? "#f59e0b" : "none"} />
                </button>

                {/* Share button */}
                <button
                  onClick={handleShare}
                  style={{
                    background: "rgba(0, 168, 132, 0.1)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.transform = "scale(0.95)"
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  <Share2 size={18} color="#00a884" />
                </button>
              </div>
            </div>
            {/* Management Action Bar */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "16px 24px",
                marginBottom: "20px",
                boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                border: "1px solid rgba(0, 168, 132, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                {/* Left side - Main actions */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flex: 1,
                  }}
                >
                  {activeTab === "resume" ? (
                    <>
                      {/* Add Resume Button */}
                      <button
                        onClick={handleAddResume}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "10px 16px",
                          background: "linear-gradient(135deg, #00a884, #059669)",
                          color: "white",
                          border: "none",
                          borderRadius: "12px",
                          fontSize: "14px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          boxShadow: "0 2px 8px rgba(0, 168, 132, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)"
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 168, 132, 0.4)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)"
                          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 168, 132, 0.3)"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Plus size={16} />
                        Rezyume qo'shish
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Add Portfolio Button */}
                      <button
                        onClick={handleAddPortfolio}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "10px 16px",
                          background: "linear-gradient(135deg, #00a884, #059669)",
                          color: "white",
                          border: "none",
                          borderRadius: "12px",
                          fontSize: "14px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          boxShadow: "0 2px 8px rgba(0, 168, 132, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)"
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 168, 132, 0.4)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)"
                          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 168, 132, 0.3)"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Plus size={16} />
                        Portfolio qo'shish
                      </button>
                    </>
                  )}
                </div>

                {/* Right side - Edit actions */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {isEditMode ? (
                    <>
                      {/* Save Button */}
                      <button
                        onClick={handleSaveChanges}
                        style={{
                          background: "rgba(34, 197, 94, 0.1)",
                          border: "1px solid rgba(34, 197, 94, 0.2)",
                          borderRadius: "10px",
                          padding: "10px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(34, 197, 94, 0.2)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(34, 197, 94, 0.1)"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Save size={16} color="#22c55e" />
                      </button>

                      {/* Cancel Button */}
                      <button
                        onClick={() => {
                          setIsEditMode(false)
                          showNotification("Tahrirlash bekor qilindi", "info")
                        }}
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                          borderRadius: "10px",
                          padding: "10px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <X size={16} color="#ef4444" />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Edit Button */}
                      <button
                        onClick={handleEditProfile}
                        style={{
                          background: "rgba(0, 168, 132, 0.1)",
                          border: "1px solid rgba(0, 168, 132, 0.2)",
                          borderRadius: "10px",
                          padding: "10px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(0, 168, 132, 0.2)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(0, 168, 132, 0.1)"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Edit3 size={16} color="#00a884" />
                      </button>

                      {/* Settings Button */}
                      <button
                        onClick={() => showNotification("Sozlamalar oynasi ochildi", "info")}
                        style={{
                          background: "rgba(107, 114, 128, 0.1)",
                          border: "1px solid rgba(107, 114, 128, 0.2)",
                          borderRadius: "10px",
                          padding: "10px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(107, 114, 128, 0.2)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(107, 114, 128, 0.1)"
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Settings size={16} color="#6b7280" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Edit Mode Indicator */}
              {isEditMode && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "8px 12px",
                    background: "rgba(0, 168, 132, 0.1)",
                    borderRadius: "8px",
                    border: "1px solid rgba(0, 168, 132, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Edit3 size={14} color="#00a884" />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#00a884",
                      fontWeight: "500",
                    }}
                  >
                    Tahrirlash rejimi yoqilgan - o'zgarishlarni amalga oshiring
                  </span>
                </div>
              )}
            </div>

            {/* Summary */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                marginBottom: "20px",
                boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                border: "1px solid rgba(0, 168, 132, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: "0 0 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "20px",
                    background: "#00a884",
                    borderRadius: "2px",
                  }}
                ></div>
                Professional Summary
                {isEditMode && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginLeft: "auto",
                    }}
                  >
                    <button
                      onClick={() => showNotification("Tahrirlash oynasi ochildi", "info")}
                      style={{
                        background: "rgba(0, 168, 132, 0.1)",
                        border: "1px solid rgba(0, 168, 132, 0.2)",
                        borderRadius: "8px",
                        padding: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.95)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Edit3 size={14} color="#00a884" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem("Bo'lim")}
                      style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "8px",
                        padding: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.95)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                  </div>
                )}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#4b5563",
                  margin: 0,
                }}
              >
                {summary.uz} / {summary.en}
              </p>
            </div>

            {/* Experience */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                marginBottom: "20px",
                boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                border: "1px solid rgba(0, 168, 132, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: "0 0 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "20px",
                    background: "#00a884",
                    borderRadius: "2px",
                  }}
                ></div>
                Work Experience
                {isEditMode && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginLeft: "auto",
                    }}
                  >
                    <button
                      onClick={() => showNotification("Tahrirlash oynasi ochildi", "info")}
                      style={{
                        background: "rgba(0, 168, 132, 0.1)",
                        border: "1px solid rgba(0, 168, 132, 0.2)",
                        borderRadius: "8px",
                        padding: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.95)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Edit3 size={14} color="#00a884" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem("Bo'lim")}
                      style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "8px",
                        padding: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.95)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                  </div>
                )}
              </h3>

              {experience.map((exp, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    paddingLeft: "24px",
                    paddingBottom: index === experience.length - 1 ? "0" : "24px",
                    borderLeft: index === experience.length - 1 ? "none" : "2px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-6px",
                      top: "4px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "#00a884",
                    }}
                  ></div>

                  <div
                    style={{
                      background: "#f9fafb",
                      borderRadius: "12px",
                      padding: "16px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: "0 0 4px",
                      }}
                    >
                      {exp.title}
                    </h4>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#00a884",
                          fontWeight: "500",
                        }}
                      >
                        {exp.company}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: "1.5",
                        color: "#4b5563",
                        margin: "0 0 12px",
                      }}
                    >
                      {exp.description.uz} / {exp.description.en}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                      }}
                    >
                      {exp.skills.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          style={{
                            fontSize: "11px",
                            padding: "4px 8px",
                            background: "rgba(0, 168, 132, 0.1)",
                            color: "#00a884",
                            borderRadius: "6px",
                            fontWeight: "500",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* IT Skills & Languages */}
            <div
              className="skills-sections"
              style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "20px" }}
            >
              {/* IT Skills Section */}
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "24px",
                  boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                  border: "1px solid rgba(0, 168, 132, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "4px",
                      height: "20px",
                      background: "#00a884",
                      borderRadius: "2px",
                    }}
                  ></div>
                  IT bilimlar
                  {isEditMode && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginLeft: "auto",
                      }}
                    >
                      <button
                        onClick={() => showNotification("Tahrirlash oynasi ochildi", "info")}
                        style={{
                          background: "rgba(0, 168, 132, 0.1)",
                          border: "1px solid rgba(0, 168, 132, 0.2)",
                          borderRadius: "8px",
                          padding: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Edit3 size={14} color="#00a884" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem("Bo'lim")}
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                          borderRadius: "8px",
                          padding: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Trash2 size={14} color="#ef4444" />
                      </button>
                    </div>
                  )}
                </h3>

                {itSkills.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "12px",
                      marginBottom: "12px",
                      background: "#f9fafb",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        marginRight: "12px",
                      }}
                    >
                      <img
                        src={lightBulb || "/placeholder.svg"}
                        alt="IT skill"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#1f2937",
                          }}
                        >
                          {skill.name}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#00a884",
                            fontWeight: "500",
                          }}
                        >
                          {skill.score}/{skill.maxScore}
                        </span>
                      </div>
                      <div
                        style={{
                          height: "6px",
                          background: "#e5e7eb",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${(skill.score / skill.maxScore) * 100}%`,
                            background: "linear-gradient(90deg, #00a884, #059669)",
                            borderRadius: "3px",
                            transition: "width 0.6s ease-in-out",
                          }}
                        ></div>
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          marginTop: "6px",
                        }}
                      >
                        {skill.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages Section */}
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "24px",
                  boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                  border: "1px solid rgba(0, 168, 132, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "4px",
                      height: "20px",
                      background: "#00a884",
                      borderRadius: "2px",
                    }}
                  ></div>
                  Chet tillari
                  {isEditMode && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginLeft: "auto",
                      }}
                    >
                      <button
                        onClick={() => showNotification("Tahrirlash oynasi ochildi", "info")}
                        style={{
                          background: "rgba(0, 168, 132, 0.1)",
                          border: "1px solid rgba(0, 168, 132, 0.2)",
                          borderRadius: "8px",
                          padding: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Edit3 size={14} color="#00a884" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem("Bo'lim")}
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                          borderRadius: "8px",
                          padding: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Trash2 size={14} color="#ef4444" />
                      </button>
                    </div>
                  )}
                </h3>

                {languages.map((lang, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "12px",
                      marginBottom: "12px",
                      background: "#f9fafb",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        marginRight: "12px",
                      }}
                    >
                      <img
                        src={index === 0 ? englifyIcon : index === 1 ? sejongIcon : languageIcon}
                        alt={lang.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#1f2937",
                          }}
                        >
                          {lang.name}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#00a884",
                            fontWeight: "500",
                          }}
                        >
                          {lang.score}/{lang.maxScore}
                        </span>
                      </div>
                      <div
                        style={{
                          height: "6px",
                          background: "#e5e7eb",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${(lang.score / lang.maxScore) * 100}%`,
                            background: "linear-gradient(90deg, #00a884, #059669)",
                            borderRadius: "3px",
                            transition: "width 0.6s ease-in-out",
                          }}
                        ></div>
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          marginTop: "6px",
                        }}
                      >
                        {lang.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Languages */}
            <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr" }}>
              {/* Education */}
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "24px",
                  boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                  border: "1px solid rgba(0, 168, 132, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1f2937",
                    margin: "0 0 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "4px",
                      height: "20px",
                      background: "#00a884",
                      borderRadius: "2px",
                    }}
                  ></div>
                  Education
                  {isEditMode && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginLeft: "auto",
                      }}
                    >
                      <button
                        onClick={() => showNotification("Tahrirlash oynasi ochildi", "info")}
                        style={{
                          background: "rgba(0, 168, 132, 0.1)",
                          border: "1px solid rgba(0, 168, 132, 0.2)",
                          borderRadius: "8px",
                          padding: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Edit3 size={14} color="#00a884" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem("Bo'lim")}
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                          borderRadius: "8px",
                          padding: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Trash2 size={14} color="#ef4444" />
                      </button>
                    </div>
                  )}
                </h3>

                {education.map((edu, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "16px",
                      background: "#f9fafb",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: "0 0 4px",
                      }}
                    >
                      {edu.degree}
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#00a884",
                        fontWeight: "500",
                        margin: "0 0 4px",
                      }}
                    >
                      {edu.school}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                        }}
                      >
                        {edu.period}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#059669",
                          fontWeight: "500",
                        }}
                      >
                        {edu.achievements}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "24px",
                  boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                  border: "1px solid rgba(0, 168, 132, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1f2937",
                    margin: "0 0 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "4px",
                      height: "20px",
                      background: "#00a884",
                      borderRadius: "2px",
                    }}
                  ></div>
                  Languages
                  {isEditMode && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginLeft: "auto",
                      }}
                    >
                      <button
                        onClick={() => showNotification("Tahrirlash oynasi ochildi", "info")}
                        style={{
                          background: "rgba(0, 168, 132, 0.1)",
                          border: "1px solid rgba(0, 168, 132, 0.2)",
                          borderRadius: "8px",
                          padding: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Edit3 size={14} color="#00a884" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem("Bo'lim")}
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                          borderRadius: "8px",
                          padding: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)"
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      >
                        <Trash2 size={14} color="#ef4444" />
                      </button>
                    </div>
                  )}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {languages.map((lang, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 16px",
                        background: "#f9fafb",
                        borderRadius: "10px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Globe size={16} color="#00a884" />
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#1f2937",
                          }}
                        >
                          {lang.name}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          padding: "4px 8px",
                          background: "rgba(0, 168, 132, 0.1)",
                          color: "#00a884",
                          borderRadius: "6px",
                          fontWeight: "500",
                        }}
                      >
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                marginTop: "20px",
                boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                border: "1px solid rgba(0, 168, 132, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: "0 0 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "20px",
                    background: "#00a884",
                    borderRadius: "2px",
                  }}
                ></div>
                Certifications
                {isEditMode && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginLeft: "auto",
                    }}
                  >
                    <button
                      onClick={() => showNotification("Tahrirlash oynasi ochildi", "info")}
                      style={{
                        background: "rgba(0, 168, 132, 0.1)",
                        border: "1px solid rgba(0, 168, 132, 0.2)",
                        borderRadius: "8px",
                        padding: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.95)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Edit3 size={14} color="#00a884" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem("Bo'lim")}
                      style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "8px",
                        padding: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.95)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                  </div>
                )}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {certificates.map((cert, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      background: "#f9fafb",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <Award size={16} color="#00a884" />
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#1f2937",
                      }}
                    >
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              animation: "fadeIn 0.5s ease-in-out",
              padding: "20px",
            }}
          >
            {/* Achievements Section */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                marginBottom: "20px",
                boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                border: "1px solid rgba(0, 168, 132, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "24px",
                    background: "#00a884",
                    borderRadius: "2px",
                  }}
                ></div>
                Yutuqlar
                {isEditMode && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginLeft: "auto",
                    }}
                  >
                    <button
                      onClick={() => showNotification("Tahrirlash oynasi ochildi", "info")}
                      style={{
                        background: "rgba(0, 168, 132, 0.1)",
                        border: "1px solid rgba(0, 168, 132, 0.2)",
                        borderRadius: "8px",
                        padding: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.95)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Edit3 size={14} color="#00a884" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem("Bo'lim")}
                      style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "8px",
                        padding: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.95)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                  </div>
                )}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "16px",
                      background: "#f9fafb",
                      borderRadius: "16px",
                      border: "1px solid #e5e7eb",
                      gap: "16px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={achievement.image || "/placeholder.svg"}
                        alt={achievement.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#1f2937",
                          marginBottom: "8px",
                        }}
                      >
                        {achievement.title}
                      </h3>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#6b7280",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Award size={16} />
                        {achievement.meta}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                marginBottom: "20px",
                boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                border: "1px solid rgba(0, 168, 132, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "24px",
                    background: "#00a884",
                    borderRadius: "2px",
                  }}
                ></div>
                Mutaxassislik ko'nikmalari
                {isEditMode && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginLeft: "auto",
                    }}
                  >
                    <button
                      onClick={() => showNotification("Tahrirlash oynasi ochildi", "info")}
                      style={{
                        background: "rgba(0, 168, 132, 0.1)",
                        border: "1px solid rgba(0, 168, 132, 0.2)",
                        borderRadius: "8px",
                        padding: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.95)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Edit3 size={14} color="#00a884" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem("Bo'lim")}
                      style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "8px",
                        padding: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.95)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                  </div>
                )}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {additionalSkills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "8px 16px",
                      background: "rgba(0, 168, 132, 0.1)",
                      color: "#00a884",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      cursor: "default",
                      border: "1px solid rgba(0, 168, 132, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                marginBottom: "20px",
                boxShadow: "0 4px 20px rgba(0, 168, 132, 0.1)",
                border: "1px solid rgba(0, 168, 132, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "24px",
                    background: "#00a884",
                    borderRadius: "2px",
                  }}
                ></div>
                Loyihalar
                {isEditMode && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginLeft: "auto",
                    }}
                  >
                    <button
                      onClick={() => showNotification("Tahrirlash oynasi ochildi", "info")}
                      style={{
                        background: "rgba(0, 168, 132, 0.1)",
                        border: "1px solid rgba(0, 168, 132, 0.2)",
                        borderRadius: "8px",
                        padding: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.95)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Edit3 size={14} color="#00a884" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem("Bo'lim")}
                      style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "8px",
                        padding: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.95)"
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                      }}
                    >
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                  </div>
                )}
              </h2>
              <div
                style={{
                  display: "grid",
                  gap: "20px",
                  gridTemplateColumns: "1fr",
                }}
              >
                {projects.map((project, index) => (
                  <div
                    key={index}
                    style={{
                      background: "#f9fafb",
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid #e5e7eb",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* Project Image */}
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "240px",
                        objectFit: "cover",
                        borderRadius: "20px 20px 0 0",
                      }}
                    />

                    {/* Project Details */}
                    <div style={{ padding: "24px", position: "relative" }}>
                      {/* Add this at the top of each project card, right after the project type & date div */}
                      {isEditMode && (
                        <div
                          style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            display: "flex",
                            gap: "6px",
                            background: "rgba(255, 255, 255, 0.9)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "8px",
                            padding: "6px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <button
                            onClick={() => showNotification("Loyiha tahrirlanmoqda", "info")}
                            style={{
                              background: "rgba(0, 168, 132, 0.1)",
                              border: "1px solid rgba(0, 168, 132, 0.2)",
                              borderRadius: "6px",
                              padding: "6px",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Edit3 size={12} color="#00a884" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem("Loyiha")}
                            style={{
                              background: "rgba(239, 68, 68, 0.1)",
                              border: "1px solid rgba(239, 68, 68, 0.2)",
                              borderRadius: "6px",
                              padding: "6px",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Trash2 size={12} color="#ef4444" />
                          </button>
                        </div>
                      )}
                      {/* Project Type & Date */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "12px",
                        }}
                      >
                        <span
                          style={{
                            padding: "4px 12px",
                            background: "rgba(0, 168, 132, 0.1)",
                            color: "#00a884",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "500",
                          }}
                        >
                          {project.type}
                        </span>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "#6b7280",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Calendar size={14} />
                          {project.date}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#1f2937",
                          marginBottom: "12px",
                        }}
                      >
                        {project.title}
                      </h3>

                      {/* Project Description */}
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: "1.6",
                          color: "#4b5563",
                          marginBottom: "16px",
                        }}
                      >
                        {project.description.uz}
                      </p>

                      {/* Project Stats */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        {project.stats.uz.map((stat, statIndex) => (
                          <span
                            key={statIndex}
                            style={{
                              fontSize: "12px",
                              padding: "6px 12px",
                              background: "rgba(0, 168, 132, 0.1)",
                              color: "#00a884",
                              borderRadius: "16px",
                              fontWeight: "500",
                            }}
                          >
                            {stat}
                          </span>
                        ))}
                      </div>

                      {/* Additional Info */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                        }}
                      >
                        {project.additionalInfo.uz.map((info, infoIndex) => (
                          <span
                            key={infoIndex}
                            style={{
                              fontSize: "12px",
                              padding: "6px 12px",
                              background: "rgba(5, 150, 105, 0.05)",
                              color: "#059669",
                              borderRadius: "16px",
                              fontWeight: "500",
                            }}
                          >
                            {info}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Snackbar Notification */}
      {showSnackbar && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            background: snackbarType === "success" ? "#22c55e" : snackbarType === "error" ? "#ef4444" : "#3b82f6",
            color: "white",
            padding: "12px 20px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            fontSize: "14px",
            fontWeight: "500",
            animation: "slideUp 0.3s ease-out",
            maxWidth: "90%",
            textAlign: "center",
          }}
        >
          {snackbarMessage}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        button:active {
          transform: scale(0.98);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
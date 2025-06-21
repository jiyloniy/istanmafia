"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  Lightbulb,
  BadgeCheck,
  Video,
  Bell,
  Users,
  MessageCircle,
  Mic,
  PlayCircle,
  Folder,
  MessageSquare,
  Star,
  Send,
  Search,
  MoreVertical,
  Clock,
  Globe,
  Shield,
  Trophy,
  ChevronRight,
  User,
  Crown,
  Activity,
  FileText,
  Paperclip,
  ImageIcon,
  Award,
  Target,
} from "lucide-react"
import { useNavigate } from "react-router-dom"


// Mock data - to'liq versiya
const mockClub = {
  id: 1,
  name: "IELTS Accelerator Club",
  banner: "https://optim.tildacdn.pro/tild3230-6530-4263-b865-616432653462/-/resize/400x/-/format/webp/logo1.png.webp",
  logo: "https://optim.tildacdn.pro/tild3230-6530-4263-b865-616432653462/-/resize/400x/-/format/webp/logo1.png.webp",
  category: "Til",
  status: "Premium",
  description:
    "Foydalanuvchilarni 6 oy ichida IELTS 6.5–7.0 darajaga olib chiqish. Mentorlar: 7.5+ ball olgan ustozlar. Haftalik jonli darslar, test arxivlari, model javoblar, writing correction, speaking pair tizimi.",
  features: [
    "Haftalik jonli darslar (speaking, writing)",
    "Test arxivlari, model javoblar",
    "Writing correction replay'lari",
    "Speaking Pair tizimi",
    "Mentorlar: IELTS bo'yicha 7.5+ ball olgan ustozlar",
    "Statusga qarab kirish: 'Bek' dan yuqori",
    "Portfolio tayyorlash bo'yicha challenge",
    "Interactive forum: 'Kodim ishlamayapti'",
    "Mini hackathonlar va real loyihalar",
    "GitHub'da yakuniy portfel yaratish",
  ],
  monetization: [
    "Premium speaking guruhi (har oy $10)",
    "Essay tahlili xizmatlari",
    "Individual mentorship sessiyalari",
    "Certificate kurs ($5–10)",
    "Demo day grant imkoniyati",
    "Best Essay badge va audio/video review",
  ],
  members: 1247,
  instructor: "Dilshod Karimov",
  nextSession: "Payshanba 20:00",
  badge: "IELTS Hero",
  leaderboard: true,
  progress: 78,
  verified: true,
  onlineMembers: 89,
  totalMessages: 15420,
  weeklyActivity: 94,
  rating: 4.8,
  joinedDate: "2024-01-15",
}

const clubSections = [
  {
    id: "chat",
    name: "Suhbat",
    icon: MessageCircle,
    color: "#008c8c",
    bgColor: "#e6f7f7",
    description: "Telegram uslubidagi doimiy yozishmalar",
    badge: "Yangi",
    isActive: true,
    unreadCount: 12,
  },
  {
    id: "live",
    name: "Jonli sessiya",
    icon: Mic,
    color: "#00a86b",
    bgColor: "#e6f7f1",
    description: "Zoom/Discord uslubida onlayn darslar, vebinarlar",
    badge: "LIVE",
    isActive: false,
  },
  {
    id: "replay",
    name: "Replay arxiv",
    icon: PlayCircle,
    color: "#ff8c00",
    bgColor: "#fff4e6",
    description: "Sessiyalarning yozuvlari – kech qolganlar uchun",
    badge: "Ko'rish",
    isActive: false,
  },
  {
    id: "resources",
    name: "Resurslar",
    icon: Folder,
    color: "#8b5cf6",
    bgColor: "#f3f0ff",
    description: "Fayllar, havolalar, PDF'lar, testlar",
    badge: "Yangi",
    isActive: false,
    unreadCount: 3,
  },
  {
    id: "forum",
    name: "Forum / Q&A",
    icon: MessageSquare,
    color: "#008c8c",
    bgColor: "#e6f7f7",
    description: "Savol-javoblar, muhokamalar (Reddit-style)",
    badge: "Yangi javob",
    isActive: false,
    unreadCount: 7,
  },
  {
    id: "calendar",
    name: "Taqvim",
    icon: Calendar,
    color: "#f59e0b",
    bgColor: "#fef3c7",
    description: "Yaqinlashayotgan tadbirlar va sessiyalar jadvali",
    badge: "Bugun",
    isActive: false,
  },
]

const mockMembers = [
  {
    id: 1,
    name: "Dilshod Karimov",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    status: "online",
    role: "admin",
    joinedDate: "2023-01-01",
    points: 2450,
    expertise: "IELTS 8.5, 5+ yil tajriba",
  },
  {
    id: 2,
    name: "Bunyodbek Abdurazzaqov",
    avatar:
      "https://optim.tildacdn.one/tild3336-6162-4332-b037-326631393933/-/resize/670x/-/format/webp/Saytga_1.jpg",
    status: "online",
    role: "moderator",
    joinedDate: "2025-06-21",
    points: 1890,
    expertise: "Supermiya AI",
  },
  {
    id: 3,
    name: "Yusufjonov Qodirxon",
    avatar:
      "https://static9.tgstat.ru/channels/_0/49/498fae7f8e3d9b4dd7815e1fb1131d89.jpg",
    status: "away",
    role: "member",
    joinedDate: "2023-06-20",
    points: 1245,
    expertise: "Ustoz va shogirdlar",
  },
  {
    id: 4,
    name: "Kamola Tursunova",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    status: "online",
    role: "member",
    joinedDate: "2023-08-10",
    points: 987,
    expertise: "Speaking Practice Partner",
  },
  {
    id: 5,
    name: "Bekzod Alimov",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    status: "offline",
    role: "member",
    joinedDate: "2023-11-05",
    points: 654,
    expertise: "Startup Enthusiast",
  },
  {
    id: 6,
    name: "Malika Yusupova",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    status: "online",
    role: "member",
    joinedDate: "2024-01-12",
    points: 432,
    expertise: "UI/UX Designer",
  },
]

const mockMessages = [
  {
    id: 1,
    user: mockMembers[0],
    content:
      "Bugun kechqurun IELTS Writing Task 2 bo'yicha jonli dars bo'ladi. Barcha a'zolar taklif qilinadi! 📚 Mavzu: Opinion Essays va Band 7+ strategiyalari",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: "text",
    reactions: [
      { emoji: "👍", count: 12, users: ["Nodira", "Aziz", "Kamola"] },
      { emoji: "🔥", count: 8, users: ["Bekzod", "Nodira"] },
    ],
  },
  {
    id: 2,
    user: mockMembers[1],
    content: "Ajoyib! Men albatta qatnashaman. Qaysi mavzularni ko'rib chiqamiz? Task 2 da hali ham qiynalaman 😅",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    type: "text",
    reactions: [{ emoji: "💪", count: 5, users: ["Dilshod", "Aziz"] }],
  },
  {
    id: 3,
    user: mockMembers[2],
    content:
      "Men ham bor bo'laman! Essay strukturasi haqida gaplashsak zo'r bo'lardi 💪 Oxirgi mock testda 6.5 oldim, 7.0 ga yetishim kerak",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "text",
    reactions: [{ emoji: "💯", count: 5, users: ["Dilshod", "Kamola"] }],
  },
  {
    id: 4,
    user: mockMembers[3],
    content: "Speaking partner kerak bo'lsa, men tayyorman! Part 2 da practice qilishimiz mumkin 🗣️",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    type: "text",
    reactions: [{ emoji: "🤝", count: 7, users: ["Bekzod", "Malika", "Aziz"] }],
  },
]

const mockEvents = [
  {
    id: 1,
    title: "IELTS Writing Masterclass",
    description: "Task 1 va Task 2 bo'yicha chuqur tahlil. Band 7+ strategiyalari, common mistakes va examiner tips",
    date: new Date(Date.now() + 1000 * 60 * 60 * 2),
    duration: 90,
    type: "webinar",
    attendees: 67,
    maxAttendees: 100,
    status: "upcoming",
    instructor: "Dilshod Karimov",
    level: "Intermediate-Advanced",
  },
  {
    id: 2,
    title: "Speaking Practice Session",
    description: "Part 2 va Part 3 amaliy mashg'ulot. Real exam simulation va detailed feedback",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24),
    duration: 60,
    type: "workshop",
    attendees: 23,
    maxAttendees: 30,
    status: "upcoming",
    instructor: "Nodira Abdullayeva",
    level: "All levels",
  },
  {
    id: 3,
    title: "Mock Test Challenge",
    description: "To'liq IELTS test simulyatsiyasi. Reading, Listening, Writing va Speaking barcha bo'limlar",
    date: new Date(Date.now() + 1000 * 60 * 60 * 48),
    duration: 180,
    type: "assignment",
    attendees: 89,
    maxAttendees: 150,
    status: "upcoming",
    instructor: "Dilshod Karimov",
    level: "All levels",
  },
  {
    id: 4,
    title: "Vocabulary Building Workshop",
    description: "Academic vocabulary, collocations va paraphrasing techniques. Band 7+ uchun zarur so'zlar",
    date: new Date(Date.now() + 1000 * 60 * 60 * 72),
    duration: 75,
    type: "workshop",
    attendees: 45,
    maxAttendees: 80,
    status: "upcoming",
    instructor: "Kamola Tursunova",
    level: "Intermediate",
  },
]

// Real-life example stepper
const realLifeSteps = [
  { text: "Design Starter Clubga qo'shilish", icon: Users },
  { text: "Figma Workshopda qatnashish", icon: Video },
  { text: "Replay bo'limidan video ko'rish", icon: PlayCircle },
  { text: "Q&A forumda savol berish", icon: MessageSquare },
  { text: "Portfolio challengega qatnashish", icon: Target },
  { text: "Club Star badge olish", icon: Award },
]

export default function ClubView({ clubId = 1, onBack }) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview")
  const [isJoined, setIsJoined] = useState(true)
  const [showNotifications, setShowNotifications] = useState(true)
  const [newMessage, setNewMessage] = useState("")
  const [isLiveSessionActive, setIsLiveSessionActive] = useState(false)
  const [expandedFeatures, setExpandedFeatures] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const club = mockClub

  const handleJoinClub = () => {
    setIsJoined(!isJoined)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("")
    }
  }

  const formatTimeAgo = (date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (minutes < 60) return `${minutes} daqiqa oldin`
    if (hours < 24) return `${hours} soat oldin`
    return `${Math.floor(hours / 24)} kun oldin`
  }

  const renderOverview = () => (
    <div
      style={{
        padding: "0 0 40px 0",
        animation: "fadeIn 0.5s ease-out",
      }}
    >
      {/* Club Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #008c8c 0%, #00a86b 100%)",
            border: "none",
            color: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 8px 32px rgba(0,140,140,0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <Users size={24} />
            <span style={{ fontSize: "14px", opacity: 0.9 }}>Jami a'zolar</span>
          </div>
          <div style={{ fontSize: "32px", fontWeight: "bold" }}>{club.members.toLocaleString()}</div>
          <div style={{ fontSize: "12px", opacity: 0.8, marginTop: "4px" }}>{club.onlineMembers} online</div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #00a86b 0%, #10b981 100%)",
            border: "none",
            color: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 8px 32px rgba(0,168,107,0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <Activity size={24} />
            <span style={{ fontSize: "14px", opacity: 0.9 }}>Haftalik faollik</span>
          </div>
          <div style={{ fontSize: "32px", fontWeight: "bold" }}>{club.weeklyActivity}%</div>
          <div style={{ fontSize: "12px", opacity: 0.8, marginTop: "4px" }}>
            {club.totalMessages?.toLocaleString()} xabar
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
            border: "none",
            color: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 8px 32px rgba(245,158,11,0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <Star size={24} />
            <span style={{ fontSize: "14px", opacity: 0.9 }}>Reyting</span>
          </div>
          <div style={{ fontSize: "32px", fontWeight: "bold" }}>{club.rating}/5.0</div>
          <div style={{ fontSize: "12px", opacity: 0.8, marginTop: "4px" }}>Yuqori sifat</div>
        </div>
      </div>

      {/* Club Sections Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {clubSections.map((section) => {
          const IconComponent = section.icon

          return (
            <div
              key={section.id}
              style={{
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: section.isActive ? `2px solid ${section.color}` : "1px solid #e5e7eb",
                transform: section.isActive ? "translateY(-2px)" : "none",
                boxShadow: section.isActive ? `0 8px 25px ${section.color}20` : "0 2px 10px rgba(0,0,0,0.1)",
                borderRadius: "16px",
                padding: "24px",
                position: "relative",
                background: "white",
              }}
              onClick={() => setActiveSection(section.id)}
              onMouseEnter={(e) => {
                if (!section.isActive) {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = `0 8px 25px ${section.color}15`
                }
              }}
              onMouseLeave={(e) => {
                if (!section.isActive) {
                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)"
                }
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                <div
                  style={{
                    background: section.bgColor,
                    borderRadius: "12px",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconComponent size={24} color={section.color} />
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 4px 0" }}>{section.name}</h3>
                  <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>{section.description}</p>
                </div>
              </div>

              {section.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: section.color,
                    color: "white",
                    fontSize: "11px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    padding: "4px 8px",
                  }}
                >
                  {section.badge}
                </div>
              )}

              {section.unreadCount && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {section.unreadCount}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "16px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                  {section.id === "live" && isLiveSessionActive ? "Jonli efir" : "Mavjud"}
                </span>
                <ChevronRight size={16} color="#9ca3af" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Club Ideas Detailed Section */}
 

      {/* Features Section */}
     

      {/* Upcoming Events */}
      <div className="event-card-container">
  <div className="event-card-header">
    <h2 className="event-card-title">
      <Calendar size={24} color="#008c8c" />
      Yaqinlashayotgan tadbirlar
    </h2>
  </div>
  <div className="event-card-list">
    {mockEvents.map((event) => (
      <div
        key={event.id}
        className="event-card"
        onMouseEnter={e => {
          e.currentTarget.classList.add('hovered')
        }}
        onMouseLeave={e => {
          e.currentTarget.classList.remove('hovered')
        }}
      >
        <div
          className="event-card-icon"
          style={{
            background:
              event.type === "webinar"
                ? "#008c8c"
                : event.type === "workshop"
                ? "#00a86b"
                : "#f59e0b",
          }}
        >
          {event.type === "webinar" ? (
            <Video size={24} color="white" />
          ) : event.type === "workshop" ? (
            <Users size={24} color="white" />
          ) : (
            <FileText size={24} color="white" />
          )}
        </div>
        <div className="event-card-info">
          <h4 className="event-card-info-title">{event.title}</h4>
          <p className="event-card-info-desc">{event.description}</p>
          <div className="event-card-meta">
            <span>
              <Clock size={14} />
              {event.date.toLocaleDateString("uz-UZ")} {event.date.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}
            </span>
            <span>
              <Users size={14} />
              {event.attendees}/{event.maxAttendees}
            </span>
            <span>
              <Clock size={14} />
              {event.duration} daqiqa
            </span>
            <span>
              <User size={14} />
              {event.instructor}
            </span>
          </div>
        </div>
        <button
          className="event-card-action"
          onMouseEnter={e => e.currentTarget.classList.add('hovered')}
          onMouseLeave={e => e.currentTarget.classList.remove('hovered')}
        >
          Qatnashish
        </button>
      </div>
    ))}
  </div>
  <style jsx>{`
    .event-card-container {
      background: white;
      border-radius: 16px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      padding: 0;
      margin-bottom: 24px;
    }
    .event-card-header {
      padding: 24px 24px 0 24px;
    }
    .event-card-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 20px;
      font-weight: bold;
      margin: 0 0 20px 0;
    }
    .event-card-list {
      padding: 0 24px 24px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .event-card {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      background: #f8fafc;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .event-card.hovered {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,140,140,0.15);
    }
    .event-card-icon {
      border-radius: 12px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 48px;
      min-height: 48px;
    }
    .event-card-info {
      flex: 1;
      min-width: 0;
    }
    .event-card-info-title {
      font-size: 16px;
      font-weight: bold;
      margin: 0 0 8px 0;
      word-break: break-word;
    }
    .event-card-info-desc {
      font-size: 14px;
      color: #6b7280;
      margin: 0 0 12px 0;
      word-break: break-word;
    }
    .event-card-meta {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 12px;
      color: #9ca3af;
      flex-wrap: wrap;
    }
    .event-card-meta span {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 4px;
    }
    .event-card-action {
      background: #008c8c;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-left: 12px;
    }
    .event-card-action.hovered,
    .event-card-action:hover {
      background: #006666;
    }
    @media (max-width: 700px) {
      .event-card-list {
        padding: 0 6px 16px 6px;
      }
      .event-card {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        padding: 14px 8px;
      }
      .event-card-header {
        padding: 16px 8px 0 8px;
      }
      .event-card-action {
        width: 100%;
        margin-left: 0;
        margin-top: 10px;
      }
    }
  `}</style>
</div>
    </div>
  )

  const renderChat = () => (
    <div
      style={{
        height: "600px",
        display: "flex",
        flexDirection: "column",
        background: "white",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Chat Header */}
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #e5e7eb",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <MessageCircle size={24} color="#008c8c" />
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Klub suhbati</h3>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
              {club.onlineMembers} online • {club.members} a'zo
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            style={{
              border: "1px solid #d1d5db",
              background: "white",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Search size={16} />
          </button>
          <button
            style={{
              border: "1px solid #d1d5db",
              background: "white",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {mockMessages.map((message) => (
          <div key={message.id} style={{ display: "flex", gap: "12px" }}>
            <img
              src={message.user.avatar || "/placeholder.svg"}
              alt={message.user.name}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid #008c8c",
                objectFit: "cover",
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontSize: "14px", fontWeight: "bold", color: "#374151" }}>{message.user.name}</span>
                {message.user.role === "admin" && <Crown size={14} color="#f59e0b" />}
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>{formatTimeAgo(message.timestamp)}</span>
              </div>
              <div
                style={{
                  background: "#f8fafc",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                {message.content}
              </div>
              {message.reactions && (
                <div style={{ display: "flex", gap: "8px" }}>
                  {message.reactions.map((reaction, index) => (
                    <button
                      key={index}
                      style={{
                        background: "#e5e7eb",
                        border: "none",
                        borderRadius: "16px",
                        padding: "4px 8px",
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {reaction.emoji} {reaction.count}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #e5e7eb",
          background: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            style={{
              border: "1px solid #d1d5db",
              background: "white",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paperclip size={16} />
          </button>
          <button
            style={{
              border: "1px solid #d1d5db",
              background: "white",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImageIcon size={16} />
          </button>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Xabar yozing..."
            style={{
              flex: 1,
              border: "1px solid #d1d5db",
              borderRadius: "12px",
              padding: "12px 16px",
              outline: "none",
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              background: "#008c8c",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "12px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )

  const renderMembers = () => (
    <div style={{ padding: "0 0 40px 0" }}>
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ padding: "24px 24px 0 24px" }}>
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "20px",
              fontWeight: "bold",
              margin: "0 0 20px 0",
            }}
          >
            <Users size={24} color="#008c8c" />
            Klub a'zolari ({club.members})
          </h2>
        </div>
        <div style={{ padding: "0 24px 24px 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
            }}
          >
            {mockMembers.map((member) => (
              <div
                key={member.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px",
                  background: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,140,140,0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      border: "3px solid #008c8c",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      right: "2px",
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background:
                        member.status === "online" ? "#10b981" : member.status === "away" ? "#f59e0b" : "#6b7280",
                      border: "2px solid white",
                    }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <h4 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>{member.name}</h4>
                    {member.role === "admin" && <Crown size={16} color="#f59e0b" />}
                    {member.role === "moderator" && <Shield size={16} color="#008c8c" />}
                  </div>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 8px 0" }}>
                    {member.role === "admin" ? "Administrator" : member.role === "moderator" ? "Moderator" : "A'zo"} •
                    {member.joinedDate} dan beri
                  </p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 8px 0" }}>{member.expertise}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Trophy size={14} color="#f59e0b" />
                    <span style={{ fontSize: "12px", color: "#9ca3af" }}>{member.points} ball</span>
                  </div>
                </div>

                <button
                  style={{
                    border: "1px solid #008c8c",
                    color: "#008c8c",
                    background: "white",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#008c8c"
                    e.currentTarget.style.color = "white"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white"
                    e.currentTarget.style.color = "#008c8c"
                  }}
                >
                  <User size={14} />
                  Profil
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 50%, #f0f9ff 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header - Fully Responsive */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "16px 20px",
          }}
        >
          {/* Mobile Header */}
          <div
            style={{
              display: window.innerWidth < 768 ? "flex" : "none",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <button
              onClick={() => navigate(-1)}
              style={{
                border: "1px solid #d1d5db",
                borderRadius: "12px",
                padding: "8px 12px",
                background: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.2s ease",
              }}
            >
              <ArrowLeft size={16} />
              Orqaga
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "12px",
                  padding: "8px",
                  background: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bell size={18} />
              </button>

              <button
                onClick={handleJoinClub}
                style={{
                  background: isJoined ? "#6b7280" : "#008c8c",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {isJoined ? "Chiqish" : "Qo'shilish"}
              </button>
            </div>
          </div>

          {/* Mobile Club Info */}
          <div
            style={{
              display: window.innerWidth < 768 ? "flex" : "none",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={club.logo || "/placeholder.svg"}
              alt={club.name}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                border: "3px solid #008c8c",
                background: "white",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                <h1 style={{ fontSize: "18px", fontWeight: "bold", margin: 0, color: "#111827" }}>{club.name}</h1>
                {club.verified && <BadgeCheck size={20} color="#008c8c" />}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  color: "#6b7280",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    background: "#008c8c",
                    color: "white",
                    borderRadius: "8px",
                    padding: "2px 6px",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {club.category}
                </div>
                <div
                  style={{
                    background: "#10b981",
                    color: "white",
                    borderRadius: "8px",
                    padding: "2px 6px",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {club.status}
                </div>
                <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  <Users size={12} />
                  {club.members.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Header */}
          <div
            style={{
              display: window.innerWidth >= 768 ? "flex" : "none",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <button
                onClick={onBack}
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "12px",
                  padding: "8px 12px",
                  background: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.2s ease",
                }}
              >
                <ArrowLeft size={18} />
                Orqaga
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <img
                  src={club.logo || "/placeholder.svg"}
                  alt={club.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "16px",
                    border: "3px solid #008c8c",
                    background: "white",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                    <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#111827" }}>{club.name}</h1>
                    {club.verified && <BadgeCheck size={24} color="#008c8c" />}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#6b7280" }}
                  >
                    <div
                      style={{
                        background: "#008c8c",
                        color: "white",
                        borderRadius: "8px",
                        padding: "4px 8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {club.category}
                    </div>
                    <div
                      style={{
                        background: "#10b981",
                        color: "white",
                        borderRadius: "8px",
                        padding: "4px 8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {club.status}
                    </div>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Users size={14} />
                      {club.members.toLocaleString()} a'zo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "12px",
                  padding: "8px 12px",
                  background: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bell size={18} />
              </button>

              <button
                onClick={handleJoinClub}
                style={{
                  background: isJoined ? "#6b7280" : "#008c8c",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {isJoined ? "Chiqish" : "Qo'shilish"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Responsive */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            gap: "0",
            minWidth: window.innerWidth < 768 ? "600px" : "auto",
          }}
        >
          {[
            { id: "overview", name: "Umumiy", icon: Globe },
            { id: "chat", name: "Suhbat", icon: MessageCircle },
            { id: "members", name: "A'zolar", icon: Users },
            { id: "events", name: "Tadbirlar", icon: Calendar },
            { id: "resources", name: "Resurslar", icon: Folder },
          ].map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                style={{
                  padding: window.innerWidth < 768 ? "12px 16px" : "16px 24px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: activeSection === tab.id ? "#008c8c" : "#6b7280",
                  borderBottom: activeSection === tab.id ? "3px solid #008c8c" : "3px solid transparent",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                <IconComponent size={18} />
                {tab.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content - Responsive */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: window.innerWidth < 768 ? "20px 16px" : "32px 20px",
        }}
      >
        {activeSection === "overview" && renderOverview()}
        {activeSection === "chat" && renderChat()}
        {activeSection === "members" && renderMembers()}
        {activeSection === "events" && renderOverview()}
        {activeSection === "resources" && renderOverview()}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .grid-responsive {
            grid-template-columns: 1fr !important;
          }
          
          .flex-responsive {
            flex-direction: column !important;
          }
          
          .text-responsive {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  )
}

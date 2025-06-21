"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Default from "../assets/default.png"
import home from "../assets/home.png"
import search from "../assets/search.png"
import addContent from "../assets/add-content.png"
import email from "../assets/email.png"
import apps from "../assets/apps.png"
import React from "react"
import { Send, Smile, Paperclip, Star, StarOff, ArrowLeft, Menu, Search as LucideSearch, Mail, AppWindow, Home, Plus } from "lucide-react"

const handleImageError = (e) => {
  if (!e || !e.target) return
  e.target.onerror = null
  if (Default && typeof Default === "string") {
    e.target.src = Default
  } else {
    e.target.style.display = "none"
  }
}
const Email = ({ onClose }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("email")
  const [showPostCreate, setShowPostCreate] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState(null)

  // Chat state moved to top-level
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState("")

  // Reset chat messages when selectedEmail changes
  React.useEffect(() => {
    if (selectedEmail) {
      setChatMessages([
        { id: 1, sender: "Siz", text: "Salom! Ushbu xabar uchun rahmat.", time: "14:32" },
        { id: 2, sender: selectedEmail.sender, text: "Xush kelibsiz! Yordam bera olsam xursandman.", time: "14:33" },
        { id: 3, sender: "Siz", text: "Yana savollarim bo'lsa yozaman.", time: "14:34" },
      ])
    } else {
      setChatMessages([])
    }
    setChatInput("")
  }, [selectedEmail])

  const handleSendChat = () => {
    if (chatInput.trim() === "") return
    setChatMessages([
      ...chatMessages,
      { id: Date.now(), sender: "Siz", text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ])
    setChatInput("")
  }

  const emails = [
    {
      id: 1,
      sender: "Otabek Arabboyev",
      subject: "Haftalik hisobot - Loyiha yangilanishlari",
      preview:
        "Salom, shu hafta uchun hisobotni yuborishingizni so'rayman. Loyiha bo'yicha muhim yangilanishlar bor...",
      content: `Hurmatli jamoa,

Shu hafta uchun hisobotni taqdim etishdan mamnunman. Quyidagi asosiy yutuqlarimiz:

1. Frontend qismi 85% bajarildi
2. Backend API'lar to'liq tayyor
3. Database optimizatsiyasi amalga oshirildi
4. Testing jarayoni boshlandi

Keyingi hafta rejalari:
- UI/UX testlari
- Performance optimizatsiyasi
- Bug fixing

Savollaringiz bo'lsa, bog'laning.

Hurmat bilan,
Otabek Arabboyev`,
      time: "Bugun, 14:30",
      isStarred: true,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      isRead: false,
    },
    {
      id: 2,
      sender: "Istan",
      subject: "Yangi xabar!",
      preview: "Sizga Abduqodir oshnadan yangi xabar keldi.",
      content: `Yangi xabar keldi!

Kimdan: Abduqodir Oshna
Vaqt: 11:27

Xabar matni:
"Ertangi uchrashuvimiz haqida gaplashmoqchi edim. Soat 15:00da ofisda bo'lamizmi? Muhim masalalar bor."

Javob berish uchun Istan ilovasini oching.`,
      time: "11:27",
      isStarred: false,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      isRead: true,
    },
    {
      id: 3,
      sender: "Istan",
      subject: "Xavfsizlik ogohlantirishi",
      preview: "Sizning mailingizga yangi qurilmadan kirildi.",
      content: `Xavfsizlik ogohlantirishi

Sizning Istan hisobingizga yangi qurilmadan kirildi:

Qurilma: iPhone 14 Pro
Joylashuv: Toshkent, O'zbekiston
Vaqt: Kecha, 22:45

Agar bu siz bo'lmasangiz:
1. Darhol parolingizni o'zgartiring
2. Ikki bosqichli autentifikatsiyani yoqing

Xavfsizligingiz bizning ustuvor vazifamiz.`,
      time: "Kecha",
      isStarred: true,
      avatar: "G",
      isInitial: true,
      isRead: false,
    },
    {
      id: 4,
      sender: "Asaxiy Books",
      subject: "Yangi kitoblar chegirmada!",
      preview: "Sevimli kitoblaringizni 50% gacha chegirma bilan xarid qiling.",
      content: `🎉 Maxsus taklif!

Hurmatli kitobsever,

Bizning yangi kitoblar to'plamimiz 50% gacha chegirma bilan!

Taklif qamrab oladi:
• Badiiy adabiyot
• Ilmiy kitoblar  
• Bolalar uchun kitoblar
• Biznes va rivojlanish

Chegirma muddati: 3 kun

Buyurtma berish uchun saytimizga tashrif buyuring.`,
      time: "2-iyun",
      isStarred: false,
      avatar: "A",
      isInitial: true,
      isRead: true,
    },
    {
      id: 5,
      sender: "Malika Azizova",
      subject: "Uchrashuv haqida",
      preview: "Ertangi uchrashuvimiz soat 10:00da bo'ladi, unutmasangiz...",
      content: `Salom!

Ertangi uchrashuvimiz haqida eslatmoqchi edim:

📅 Sana: Ertaga
⏰ Vaqt: 10:00
📍 Joy: Ofis, 3-qavat, konferens zal

Kun tartibi:
1. Loyiha holati haqida hisobot
2. Yangi takliflarni muhokama qilish
3. Keyingi bosqich rejalari

Prezentatsiya materiallarini tayyorlab keling.

Ko'rishguncha!
Malika`,
      time: "1-iyun",
      isStarred: true,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      isRead: false,
    },
    {
      id: 6,
      sender: "Uztelecom",
      subject: "Hisobingizni to'ldiring",
      preview: "Hurmatli abonent, internet uchun to'lovni amalga oshiring.",
      content: `Hurmatli abonent!

Sizning internet xizmati uchun to'lov muddati o'tib ketgan.

Hisob raqami: 998901234567
Qarz miqdori: 45,000 so'm
To'lov muddati: 25-may 2024

To'lov usullari:
• Click/Payme orqali
• Bank filiallarida
• Uztelecom xizmat markazlarida

Tezroq to'lovni amalga oshiring.`,
      time: "31-may",
      isStarred: false,
      avatar: "U",
      isInitial: true,
      isRead: true,
    },
    {
      id: 7,
      sender: "HR Departamenti",
      subject: "Muhim: Yangi ish tartibi",
      preview: "Ertadan boshlab yangi ish tartibi kuchga kiradi. Faylni ko'rib chiqing.",
      content: `Hurmatli xodimlar!

Ertadan boshlab yangi ish tartibi kuchga kiradi:

🕘 Ish vaqti: 9:00 - 18:00
🍽️ Tushlik: 13:00 - 14:00
🏠 Masofaviy ish: Haftada 2 kun

Yangi qoidalar:
• Kiyim kodi yangilandi
• Xavfsizlik choralari kuchaytirildi
• Sog'liqni saqlash talablari

Savollar bo'lsa HR bo'limiga murojaat qiling.`,
      time: "30-may",
      isStarred: true,
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      isRead: false,
      attachments: [{ type: "Ish_tartibi.pdf" }, { type: "Rasm" }],
    },
    {
      id: 8,
      sender: "LinkedIn",
      subject: "Sizda 5 ta yangi taklif bor",
      preview: "Sizning profilingizni ko'rgan kompaniyalardan yangi takliflar...",
      content: `Yangi imkoniyatlar sizni kutmoqda!

Sizning profilingiz quyidagi kompaniyalar e'tiborini tortdi:

1. 🏢 TechCorp - Senior Frontend Developer
   💰 Maosh: $2000-3000

2. 🏢 StartupHub - Product Manager  
   💰 Maosh: $1800-2500

3. 🏢 DigitalAgency - UI/UX Designer
   💰 Maosh: $1500-2200

Batafsil ma'lumot uchun LinkedIn profilingizga kiring.`,
      time: "29-may",
      isStarred: false,
      avatar: "L",
      isInitial: true,
      isRead: true,
    },
  ]

  const handleEmailClick = (email) => {
    setSelectedEmail(email)
    // Mark as read
    const emailIndex = emails.findIndex((e) => e.id === email.id)
    if (emailIndex !== -1) {
      emails[emailIndex].isRead = true
    }
  }

  const handleBackToList = () => {
    setSelectedEmail(null)
  }

  const toggleStar = (emailId, e) => {
    e.stopPropagation()
    const emailIndex = emails.findIndex((e) => e.id === emailId)
    if (emailIndex !== -1) {
      emails[emailIndex].isStarred = !emails[emailIndex].isStarred
    }
  }

  // Email Detail View
  if (selectedEmail) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {/* Detail Header */}
        <div
          style={{
            backgroundColor: "white",
            borderBottom: "1px solid #e9ecef",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <button
              onClick={handleBackToList}
              style={{
                background: "none",
                border: "none",
                padding: "8px",
                cursor: "pointer",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f3f4")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              <ArrowLeft size={24} />
            </button>
            <h1
              style={{
                flex: 1,
                fontSize: "18px",
                fontWeight: "600",
                color: "#262626",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {selectedEmail.subject}
            </h1>
          </div>
        </div>

        {/* Email Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            {/* Email Header Info */}
            <div
              style={{
                padding: "20px",
                borderBottom: "1px solid #f1f3f4",
              }}
            >
              <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
                {selectedEmail.isInitial ? (
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "#53AFAF",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "600",
                      fontSize: "18px",
                      boxShadow: "0 2px 8px rgba(83, 175, 175, 0.3)",
                    }}
                  >
                    {selectedEmail.avatar}
                  </div>
                ) : (
                  <img
                    src={selectedEmail.avatar || "/placeholder.svg"}
                    alt=""
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#262626",
                        margin: 0,
                      }}
                    >
                      {selectedEmail.sender}
                    </h3>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#8e8e8e",
                      }}
                    >
                      {selectedEmail.time}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#53AFAF",
                      margin: "0 0 8px 0",
                      fontWeight: "500",
                    }}
                  >
                    {selectedEmail.subject}
                  </p>
                </div>
              </div>

              {/* Attachments */}
              {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "12px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6c757d",
                      marginBottom: "8px",
                      fontWeight: "500",
                    }}
                  >
                    📎 Biriktirilgan fayllar:
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {selectedEmail.attachments.map((attachment, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: "#53AFAF",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "500",
                        }}
                      >
                        {attachment.type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Email Body */}
            <div
              style={{
                padding: "20px",
                lineHeight: "1.6",
                fontSize: "14px",
                color: "#495057",
              }}
            >
              <div style={{ whiteSpace: "pre-wrap" }}>{selectedEmail.content}</div>
            </div>

            {/* Chat Section */}
            <div style={{ padding: "20px", borderTop: "1px solid #e9ecef", background: "#f8f9fa" }}>
              <div style={{ fontWeight: 600, marginBottom: 8, color: "#53AFAF" }}>
                Chat
              </div>
              <div style={{ maxHeight: 180, overflowY: "auto", marginBottom: 12 }}>
                {chatMessages.map((msg) => (
                  <div key={msg.id} style={{
                    display: "flex",
                    flexDirection: msg.sender === "Siz" ? "row-reverse" : "row",
                    alignItems: "flex-end",
                    marginBottom: 6
                  }}>
                    <div style={{
                      background: msg.sender === "Siz" ? "#53AFAF" : "#e9ecef",
                      color: msg.sender === "Siz" ? "#fff" : "#262626",
                      borderRadius: "16px",
                      padding: "8px 14px",
                      maxWidth: 220,
                      fontSize: 13,
                      wordBreak: "break-word",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    }}>
                      {msg.text}
                      <div style={{ fontSize: 10, color: "#8e8e8e", marginTop: 2, textAlign: msg.sender === "Siz" ? "right" : "left" }}>{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#53AFAF" }}>
                  <Smile size={22} />
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#53AFAF" }}>
                  <Paperclip size={22} />
                </button>
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Xabar yozing..."
                  style={{
                    flex: 1,
                    border: "1px solid #e9ecef",
                    borderRadius: "16px",
                    padding: "8px 14px",
                    fontSize: 14,
                    outline: "none",
                  }}
                  onKeyDown={e => { if (e.key === "Enter") handleSendChat() }}
                />
                <button
                  onClick={handleSendChat}
                  style={{ background: "#53AFAF", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer" }}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f8f9fa",
                borderTop: "1px solid #e9ecef",
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  backgroundColor: "#53AFAF",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#4a9999")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#53AFAF")}
              >
                Javob berish
              </button>
              <button
                style={{
                  backgroundColor: "white",
                  color: "#495057",
                  border: "1px solid #dee2e6",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
              >
                Yo'naltirish
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Email List View
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: "#f8f9fa" }}>
        <div
          style={{
            backgroundColor: "transparent",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              backgroundColor: "white",
              padding: "12px 16px",
              borderRadius: "24px",
              border: "1px solid #e9ecef",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <button
              style={{
                background: "none",
                border: "none",
                padding: "4px",
                cursor: "pointer",
                opacity: 0.8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "1")}
              onMouseLeave={(e) => (e.target.style.opacity = "0.8")}
            >
              <Menu size={24} />
            </button>
            <h1
              style={{
                flex: 1,
                fontSize: "18px",
                fontWeight: "600",
                color: "#262626",
                margin: 0,
              }}
            >
              Pochta qutisi
            </h1>
            <img
              src="https://static.vecteezy.com/system/resources/previews/048/926/084/non_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg"
              alt="Profil"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #53AFAF",
              }}
            />
          </div>

          {/* Search Bar */}
          <div
            style={{
              position: "relative",
              width: "100%",
              marginTop: "12px",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <LucideSearch size={16} color="#8e8e8e" />
            </div>
            <input
              type="text"
              placeholder="Xabarlarni qidirish..."
              style={{
                width: "100%",
                paddingLeft: "40px",
                paddingRight: "16px",
                paddingTop: "12px",
                paddingBottom: "12px",
                backgroundColor: "white",
                border: "1px solid #e9ecef",
                borderRadius: "12px",
                fontSize: "14px",
                color: "#495057",
                fontFamily: "'Roboto', sans-serif",
                transition: "border-color 0.2s, box-shadow 0.2s",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#53AFAF"
                e.target.style.boxShadow = "0 0 0 3px rgba(83, 175, 175, 0.1)"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e9ecef"
                e.target.style.boxShadow = "none"
              }}
            />
          </div>
        </div>
      </div>

      {/* Email List */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 16px 80px 16px",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 0 8px 0",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#8e8e8e",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Asosiy
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#53AFAF",
              backgroundColor: "#f0fafa",
              padding: "4px 8px",
              borderRadius: "12px",
              fontWeight: "500",
            }}
          >
            {emails.filter((e) => !e.isRead).length} yangi
          </div>
        </div>

        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => handleEmailClick(email)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "16px 0",
              borderBottom: "1px solid #f1f3f4",
              cursor: "pointer",
              transition: "background-color 0.2s",
              borderRadius: "8px",
              margin: "0 -8px",
              paddingLeft: "8px",
              paddingRight: "8px",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                flex: 1,
              }}
            >
              {email.isInitial ? (
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: email.isRead ? "#e9ecef" : "#53AFAF",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                    fontSize: "16px",
                    boxShadow: email.isRead ? "none" : "0 2px 8px rgba(83, 175, 175, 0.3)",
                    transition: "all 0.2s",
                  }}
                >
                  {email.avatar}
                </div>
              ) : (
                <img
                  src={email.avatar || "/placeholder.svg"}
                  alt=""
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
              )}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: email.isRead ? "500" : "600",
                      color: email.isRead ? "#495057" : "#262626",
                      fontSize: "14px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "60%",
                    }}
                  >
                    {email.sender}
                  </span>
                  <span
                    style={{
                      color: "#8e8e8e",
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {email.time}
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: email.isRead ? "500" : "600",
                    color: email.isRead ? "#6c757d" : "#262626",
                    marginBottom: "4px",
                    fontSize: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {email.subject}
                </div>
                <div
                  style={{
                    color: "#8e8e8e",
                    fontSize: "13px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    lineHeight: "1.4",
                  }}
                >
                  {email.preview}
                </div>
                {email.attachments && (
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      marginTop: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    {email.attachments.map((attachment, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: "#f0fafa",
                          color: "#53AFAF",
                          padding: "2px 6px",
                          borderRadius: "8px",
                          fontSize: "11px",
                          fontWeight: "500",
                        }}
                      >
                        📎 {attachment.type}
                      </span>
                    ))}
                  </div>
                )}
                {!email.isRead && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#53AFAF",
                      borderRadius: "50%",
                      marginTop: "6px",
                      boxShadow: "0 0 4px rgba(83, 175, 175, 0.5)",
                    }}
                  ></div>
                )}
              </div>
            </div>
            <button
              onClick={(e) => toggleStar(email.id, e)}
              style={{
                background: "none",
                border: "none",
                padding: "4px",
                color: email.isStarred ? "#ffd700" : "#dee2e6",
                cursor: "pointer",
                transition: "color 0.2s",
                marginLeft: "8px",
              }}
              onMouseEnter={(e) => {
                if (!email.isStarred) e.target.style.color = "#8e8e8e"
              }}
              onMouseLeave={(e) => {
                if (!email.isStarred) e.target.style.color = "#dee2e6"
              }}
            >
              {email.isStarred ? <Star size={18} fill="#ffd700" color="#ffd700" /> : <StarOff size={18} color="#dee2e6" />}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Navigation - Unchanged */}
      <div className="bottom-nav">
        <div className="bottom-nav-container">
          <div className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === "home" ? "active-tab" : ""}`}
              onClick={() => navigate("/home")}
            >
              <img src={home || Default} alt="Home" className="tab-icon" onError={handleImageError} />
            </button>
            <button
              className={`nav-tab ${activeTab === "search" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("search")}
            >
              <img src={search || Default} alt="Search" className="tab-icon" onError={handleImageError} />
            </button>
            <button
              className={`nav-tab ${activeTab === "addContent" ? "active-tab" : ""}`}
              onClick={() => {
                setActiveTab("/createPost")
                setShowPostCreate(true)
              }}
            >
              <img src={addContent || Default} alt="Add Content" className="tab-icon" onError={handleImageError} />
            </button>
            <button
              className={`nav-tab ${activeTab === "email" ? "active-tab" : ""}`}
              onClick={() => {
                setActiveTab("email")
                navigate("/email")
              }}
            >
              <img src={email || Default} alt="Email" className="tab-icon" onError={handleImageError} />
            </button>
            <button
              className={`nav-tab ${activeTab === "apps" ? "active-tab" : ""}`}
              onClick={() => {
                setActiveTab("apps")
                navigate("/more-apps")
              }}
            >
              <img src={apps || Default} alt="Apps" className="tab-icon" onError={handleImageError} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Email

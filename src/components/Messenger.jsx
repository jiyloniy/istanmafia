"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./messenger.css"
import profile1 from "../assets/1.jpg"
import savedMessage from "../assets/3.png"
import zugerberk from "../assets/4.jpg"
import pichaai from "../assets/5.jpg"
import sam from "../assets/7.webp"
const Messenger = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Suhbatlar")
  const [searchQuery, setSearchQuery] = useState("")

  // Fix the allChats object by removing duplicate keys and ensuring all tab IDs have corresponding data
  const allChats = {
    Suhbatlar: [
      {
        id: 1,
        name: "Saqlangan habarlar",
        message: "Kerakli narsalarim",
        time: "04:20 AM",
        image: "https://cdn-icons-png.flaticon.com/512/565/565296.png", // Changed to a bookmark icon
      },
      {
        id: 2,
        name: "Istan Yordam",
        message: "Yangi kirish amalga oshirildi",
        time: "11:38 AM",
        image:
          savedMessage,
        verified: true,
        unread: 1,
      },
      {
        id: 3,
        name: "Otabek Arabboyev",
        message: "Telefon qilib yuboring, muhim masala bor",
        time: "10:24 AM",
        image: profile1,
        sent: true,
      },
      {
        id: 4,
        name: "Abduqodir oshna",
        message: "Ok, ko'rishguncha. Ehtiyot bo'ling!",
        time: "Thu",
        image:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        sent: true,
      },
      {
        id: 5,
        name: "Elon Musk",
        message: "X platformasi uchun yangi g'oyalaringiz bormi?",
        time: "Wed",
        image: "https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg",
        unread: 2,
        verified: true,
      },
      {
        id: 6,
        name: "Mark Zuckerberg",
        message: "Threads ilovasini ko'rib chiqdingizmi?",
        time: "Wed",
        image: zugerberk,
        verified: true,
      },
      {
        id: 7,
        name: "Sundar Pichai",
        message: "Google I/O tadbiriga taklif qilaman",
        time: "Wed",
        image: pichaai,
        verified: true,
        unread: 3,
      },
      {
        id: 8,
        name: "Satya Nadella",
        message: "Microsoft Teams yangilanishini ko'rdingizmi?",
        time: "Tue",
        image: "https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg",
        verified: true,
      },
      {
        id: 9,
        name: "Tim Cook",
        message: "Vision Pro haqida fikringiz qanday?",
        time: "Mon",
        image: "https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg",
        verified: true,
        sent: true,
      },
      {
        id: 10,
        name: "Sam Altman",
        message: "ChatGPT-5 test qilishda yordam bera olasizmi?",
        time: "Sun",
        image: sam,
        verified: true,
        unread: 1,
      },
    ],
    Guruhlar: [
      {
        id: 1,
        name: "IT Developers Uzbekistan",
        message: "Yangi AI loyiha haqida muhokama",
        time: "12:30 PM",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60",
        unread: 5,
        members: 12500,
      },
      {
        id: 2,
        name: "Tashkent Startups Hub",
        message: "Startup Weekend 2025 tadbiri",
        time: "11:00 AM",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=60",
        members: 8300,
        verified: true,
      },
      {
        id: 3,
        name: "UX/UI Designers Club",
        message: "Figma yangi update muhokamasi",
        time: "10:15 AM",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=60",
        unread: 2,
        members: 5600,
      },
      {
        id: 4,
        name: "Digital Marketing Pro",
        message: "SMM strategiyasi 2025",
        time: "09:45 AM",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60",
        members: 7200,
        verified: true,
      },
      {
        id: 5,
        name: "Mobile Developers UZ",
        message: "Flutter vs React Native debate",
        time: "Yesterday",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60",
        unread: 8,
        members: 9400,
      },
      {
        id: 6,
        name: "AI Research Group",
        message: "GPT-4 arxitekturasi haqida",
        time: "Yesterday",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
        members: 3200,
        verified: true,
      },
      {
        id: 7,
        name: "Web3 Developers UZ",
        message: "Blockchain loyihalar taqdimoti",
        time: "Yesterday",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60",
        members: 2800,
        unread: 3,
      },
      {
        id: 8,
        name: "DevOps Community",
        message: "Docker va Kubernetes workshop",
        time: "2 days ago",
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=60",
        members: 4100,
        verified: true,
      },
      {
        id: 9,
        name: "QA Engineers Club",
        message: "Test avtomatizatsiya muhokamasi",
        time: "2 days ago",
        image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&auto=format&fit=crop&q=60",
        members: 2500,
      },
      {
        id: 10,
        name: "Tech Mentors Network",
        message: "Yangi mentorlik dasturi",
        time: "3 days ago",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60",
        members: 1800,
        verified: true,
        unread: 2,
      },
    ],
    Kanallar: [
      {
        id: 1,
        name: "IT News Uzbekistan 🇺🇿",
        message: "Toshkentda IT Park yangi kampusi ochildi",
        time: "3:00 PM",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
        subscribers: 45800,
        verified: true,
        unread: 6,
      },
      {
        id: 2,
        name: "Startup Ecosystem",
        message: "2025-yil Startup trendlari",
        time: "2:45 PM",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=60",
        subscribers: 32400,
        verified: true,
      },
      {
        id: 3,
        name: "Tech Events UZ",
        message: "Digital Future Forum 2025 - 12-14 May",
        time: "2:30 PM",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60",
        subscribers: 28900,
        unread: 2,
      },
      {
        id: 4,
        name: "Digital Marketing Hub",
        message: "Instagram yangi algoritmi haqida",
        time: "1:15 PM",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f1faaa?w=800&auto=format&fit=crop&q=60",
        subscribers: 41200,
        verified: true,
        unread: 4,
      },
      {
        id: 5,
        name: "UX/UI Trends",
        message: "2025 Design trendlari va yangiliklar",
        time: "12:30 PM",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
        subscribers: 25600,
        verified: true,
      },
      {
        id: 6,
        name: "Cybersecurity News",
        message: "Yangi xavfsizlik protokollari",
        time: "2:15 PM",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
        subscribers: 15200,
        verified: true,
        unread: 4,
      },
      {
        id: 7,
        name: "Product Design",
        message: "UX/UI tendensiyalari 2025",
        time: "1:30 PM",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
        subscribers: 28400,
        verified: true,
      },
      {
        id: 8,
        name: "Tech Career Hub",
        message: "IT sohasida ish topish boyicha maslahatlar",
        time: "12:45 PM",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=60",
        subscribers: 31000,
        verified: true,
      },
      {
        id: 9,
        name: "Cloud Computing",
        message: "AWS va GCP yangiliklari",
        time: "11:20 AM",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=60",
        subscribers: 19500,
        verified: true,
        unread: 2,
      },
      {
        id: 10,
        name: "Game Dev UZ",
        message: "Unity va Unreal Engine loyihalar",
        time: "10:30 AM",
        image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&auto=format&fit=crop&q=60",
        subscribers: 12300,
        verified: true,
      },
    ],
    Klublar: [
      {
        id: 1,
        name: "Frontend Development Club",
        type: "LIVE",
        status: "Hozir Efirda",
        topic: "React va NextJS loyihalar",
        time: "Live",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60",
        members: 450,
        verified: true,
        features: ["Live Coding", "Q&A Session", "Project Reviews"],
        instructor: "Aziz Rakhimov",
        nextSession: "Bugun 15:00",
        unread: 5,
      },
      {
        id: 2,
        name: "UX/UI Design Akademiyasi",
        type: "COURSE",
        status: "Yangi Darslar",
        topic: "Figma Professional Kurs",
        time: "2 soat oldin",
        image: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=800&auto=format&fit=crop&q=60",
        members: 850,
        verified: true,
        features: ["Video Darslar", "Amaliy Mashqlar", "Portfolio"],
        instructor: "Malika Azizova",
        nextSession: "Seshanba 18:00",
        progress: 75,
      },
      {
        id: 3,
        name: "Data Science Hub",
        type: "WEBINAR",
        status: "Registratsiya Ochildi",
        topic: "Machine Learning Asoslari",
        time: "3 soat oldin",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
        members: 1200,
        verified: true,
        features: ["Live Stream", "Interaktiv Mashqlar", "Sertifikat"],
        instructor: "Jamshid Tursunov",
        nextSession: "Chorshanba 19:00",
        unread: 3,
      },
      {
        id: 4,
        name: "DevOps Engineering",
        type: "WORKSHOP",
        status: "Registratsiya",
        topic: "CI/CD Pipeline Workshop",
        time: "4 soat oldin",
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=60",
        members: 280,
        verified: true,
        features: ["Hands-on Lab", "Best Practices", "Case Studies"],
        instructor: "Davron Inoyatov",
        nextSession: "Juma 15:00",
      },
      {
        id: 5,
        name: "Product Management",
        type: "COURSE",
        status: "Yangi Modul",
        topic: "Agile va Scrum Asoslari",
        time: "5 soat oldin",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60",
        members: 420,
        verified: true,
        features: ["Scrum Guide", "Sprint Planning", "Product Roadmap"],
        instructor: "Nodira Azizova",
        nextSession: "Dushanba 17:00",
        progress: 35,
      },
      {
        id: 6,
        name: "Cybersecurity Lab",
        type: "WEBINAR",
        status: "Tez Kunda",
        topic: "Ethical Hacking Workshop",
        time: "6 soat oldin",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
        members: 350,
        features: ["Live Demo", "Security Tools", "CTF Challenge"],
        instructor: "Jasur Rahimov",
        nextSession: "Shanba 16:00",
        unread: 2,
      },
      {
        id: 7,
        name: "Cloud Architecture",
        type: "BOOTCAMP",
        status: "Yangi Guruh",
        topic: "AWS Solutions Architect",
        time: "7 soat oldin",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=60",
        members: 180,
        verified: true,
        features: ["AWS Services", "Real Projects", "Certification"],
        instructor: "Kamol Sobitov",
        nextSession: "Seshanba 18:00",
        progress: 20,
      },
      {
        id: 8,
        name: "Game Development",
        type: "COURSE",
        status: "Boshlandi",
        topic: "Unity Game Engine",
        time: "8 soat oldin",
        image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&auto=format&fit=crop&q=60",
        members: 250,
        features: ["3D Modeling", "Game Physics", "Multiplayer"],
        instructor: "Akmal Karimov",
        nextSession: "Chorshanba 19:00",
        progress: 45,
      },
    ],
  }
  // Add these debug logs
  console.log("Active Tab:", activeTab)
  console.log("Available tabs in allChats:", Object.keys(allChats))
  console.log("Data for active tab:", allChats[activeTab])

  const handleBack = () => {
    navigate(-1)
  }

  const tabs = [
    { id: "Suhbatlar", label: "Suhbatlar" },
    { id: "Guruhlar", label: "Guruhlar" },
    { id: "Kanallar", label: "Kanallar" },
    { id: "Klublar", label: "Klublar" },
  ]

  return (
    <div className="messenger">
      <div className="messenger-header">
        <div className="header-top">
          <button className="back-button" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="header-title">Suhbatlar</h1>
          <button className="search-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="tab-container">
          <div className="tab-buttons">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="chat-list">
        {activeTab && allChats[activeTab] ? (
          allChats[activeTab].map((chat) => (
            <div key={chat.id} className={`chat-item ${chat.subscribers ? "channel" : ""} ${chat.type ? "club" : ""}`}>
              {chat.type ? (
                // Club Item Layout
                <>
                  <div className="club-header">
                    <div className="chat-avatar">
                      <img src={chat.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.name)}&background=random`} alt={chat.name} />
                      
                    </div>
                    <div className="club-content">
                      <div className="chat-name">
                        {chat.name}
                        {chat.verified && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="verified-badge">
                            <path
                              d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0Z"
                              fill="#0095F6"
                            />
                            <path d="M7 11.4L3.6 8L5 6.6L7 8.6L11 4.6L12.4 6L7 11.4Z" fill="white" />
                          </svg>
                        )}
                      </div>
                      <div className="club-meta">
                        <span className={`club-type ${chat.type.toLowerCase()}`}>{chat.type}</span>
                        <span className={`club-status ${chat.type.toLowerCase()}`}>{chat.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="club-topic">{chat.topic}</div>
                  <div className="club-features">
                    {chat.features &&
                      chat.features.map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                  </div>
                  <div className="club-footer">
                    <div className="club-instructor">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#65676B" strokeWidth="1.5">
                        <circle cx="8" cy="4" r="3.25" />
                        <path d="M2 14C2 11.7909 4.68629 10 8 10C11.3137 10 14 11.7909 14 14" />
                      </svg>
                      {chat.instructor}
                    </div>
                    <div className="next-session">{chat.nextSession}</div>
                  </div>
                  {chat.progress !== undefined && (
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${chat.progress}%` }}></div>
                    </div>
                  )}
                </>
              ) : (
                // Regular Chat Item Layout
                <>
                  <div className="chat-avatar">
                    <img src={chat.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.name)}&background=random`} alt={chat.name} />
                    
                  </div>
                  <div className="chat-content">
                    <div className="chat-name">
                      {chat.name}
                      {chat.verified && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="verified-badge">
                          <path
                            d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0Z"
                            fill="#0095F6"
                          />
                          <path d="M7 11.4L3.6 8L5 6.6L7 8.6L11 4.6L12.4 6L7 11.4Z" fill="white" />
                        </svg>
                      )}
                    </div>
                    <div className="chat-message">
                      {chat.sent && (
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sent-icon">
                          <path
                            d="M2.5 8L6.5 12L13.5 5"
                            stroke="#34C759"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.5 8L6.5 12L13.5 5"
                            stroke="#34C759"
                            strokeWidth="0.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.3"
                            transform="translate(0, 1)"
                          />
                        </svg>
                      )}
                      <span className="message-text" style={{ color: chat.sent ? "#65676B" : "#050505" }}>
                        {chat.message}
                      </span>
                    </div>
                    {chat.members && (
                      <div className="group-info">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#65676B" strokeWidth="1.5">
                          <circle cx="8" cy="4" r="3.25" />
                          <path d="M2 14C2 11.7909 4.68629 10 8 10C11.3137 10 14 11.7909 14 14" />
                        </svg>
                        <span className="members-count">{chat.members.toLocaleString()}</span>
                      </div>
                    )}
                    {chat.subscribers && (
                      <div className="channel-info">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="#0095F6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8Z" />
                          <path d="M5 8L7 10L11 6" />
                        </svg>
                        <span className="subscribers-count">{chat.subscribers.toLocaleString()} obunachi</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="no-chats">
            <p>No chats available for this tab</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messenger

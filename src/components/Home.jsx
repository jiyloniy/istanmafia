"use client"

// React and routing imports
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

// Styles
import "./home.css"

// API imports
import {
  API,
  API_HOST,
  getTokens,
  likePost,
  savePost,
  addComment,
  getComments,
  getStoryFeed,
  viewStory,
  getMe,
  API_URL2,
  ENDPOINTS,
  API_URL,
  likeArticle,
  saveArticle,
} from "../config/api"
import { deleteComment } from "../config/api"

// Component imports
import CreatePost from "./CreatePost"
import Notifications from "./Notifications"

// Asset imports
import arxiv from "../assets/arxiv.png"
import notfikation from "../assets/notfikation.png"
import message from "../assets/message.png"
import instaImg from "../assets/insta-img.png"
import Default from "../assets/default.png"
import home from "../assets/home.png"
import search from "../assets/search.png"
import addContent from "../assets/add-content.png"
import email from "../assets/email.png"
import apps from "../assets/apps.png"
import profile1 from "../assets/credit-card_12689973.png"
import profile2 from "../assets/business_10412163.png"
import profile3 from "../assets/settings_12280787.png"
import profile4 from "../assets/worldwide_811544.png"
import profile5 from "../assets/customer-support_3193153.png"
import profile6 from "../assets/night-mode_3838496 (1).png"
import profile7 from "../assets/letter-i_9215114.png"
import profile8 from "../assets/user_3161848.png"
import profile10 from "../assets/resume_1069182.png"
import profile11 from "../assets/download-file_7693316.png"

// Styles object
const statusStyles = {
  statusLabel: {
    display: "inline-block",
    fontSize: "0.75rem",
    padding: "2px 6px",
    borderRadius: "4px",
    marginLeft: "6px",
    background: "rgba(15, 14, 14, 0.05)",
    color: "#666",
    fontWeight: "500",
  },
  statusPostAndArticle:{
     display: "inline-block",
    fontSize: "0.9rem",
    padding: "2px 6px",
    borderRadius: "4px",
    marginLeft: "6px",
    background: "rgba(15, 14, 14, 0.05)",
    color: "#666",
    fontWeight: "500",
  }
};
const defaultImageUrl = "../assets/default.png"
const preloadedDefaultImage = new Image()
preloadedDefaultImage.src = defaultImageUrl

const statuses = ["Sulton", "Amir", "Bey", "Mirzo", "Xon", "Bek", "Tolib"]

const getRandomStatus = () => {
  const randomIndex = Math.floor(Math.random() * statuses.length)
  return statuses[randomIndex]
}

// --- Ad data for famous Uzbek companies ---
const adCardsData = [
  {
    id: 'ad-1',
    company: 'UzAuto Motors',
    logo: 'https://api.logobank.uz/media/logos_png/UzAuto-01.png',
    title: "Frontend dasturchi (React)",
    location: "Asaka, Andijon",
    url: "https://uzautomotors.com/careers",
    description: "UzAuto Motors kompaniyasiga zamonaviy React dasturchi kerak. Rasmiy ish, yaxshi jamoa va yuqori maosh!"
  },
  {
    id: 'ad-2',
    company: 'Beeline Uzbekistan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Beeline-Uzbekistan-logo-2022.png',
    title: "Marketing mutaxassisi",
    location: "Toshkent",
    url: "https://beeline.uz/career",
    description: "Beeline Uzbekistan marketing bo‘limiga kreativ va faol mutaxassis qidirmoqda."
  },
  {
    id: 'ad-3',
    company: 'Artel',
    logo: 'https://api.logobank.uz/media/logos_png/Artel-01.png',
    title: "Sifat nazorati muhandisi",
    location: "Toshkent",
    url: "https://artelgroup.org/careers/",
    description: "Artel kompaniyasiga sifat nazorati bo‘yicha muhandis kerak. Tajribangizni biz bilan baham ko‘ring!"
  },
  {
    id: 'ad-4',
    company: 'Yandex Go Uzbekistan',
    logo: 'https://api.ony.ru/images/uploads/a489396996194ce664a490d9d70dbf42.jpeg',
    title: "Backend dasturchi (Python)",
    location: "Toshkent",
    url: "https://yandex.uz/jobs/",
    description: "Yandex Go jamoasiga Python dasturchi kerak. Zamonaviy texnologiyalar va xalqaro loyiha."
  },
  {
    id: 'ad-5',
    company: 'Click',
    logo: 'https://ictweek.uz/uploads/F5Q8C3029/click-01.png',
    title: "Mobil ilovalar testeri",
    location: "Toshkent",
    url: "https://click.uz/careers/",
    description: "Click kompaniyasiga mobil ilovalarni test qiluvchi mutaxassis kerak."
  },
  {
    id: 'ad-6',
    company: 'Uzbektelecom',
    logo: 'https://uztelecom.uz/images/logo.svg',
    title: "Tarmoq administrator",
    location: "Toshkent",
    url: "https://uztelecom.uz/career/",
    description: "Uzbektelecom tarmoq administratorini ishga taklif qiladi."
  },
  {
    id: 'ad-7',
    company: 'TBC Bank Uzbekistan',
    logo: 'https://finrank.uz/wp-content/uploads/2023/07/59f2e34dd318e048acb3547cfdf3fe59.png',
    title: "Data Analyst",
    location: "Toshkent",
    url: "https://tbcbank.uz/career/",
    description: "TBC Bank Uzbekistan ma’lumotlar tahlilchisi lavozimi uchun ochiq ish o‘rni."
  },
  {
    id: 'ad-8',
    company: 'Texnopark',
    logo: 'https://pr.uz/wp-content/uploads/2022/09/logo_white.png',
    title: "HR menejer",
    location: "Toshkent",
    url: "https://texnopark.uz/career/",
    description: "Texnopark HR menejerini ishga taklif qiladi. Jamoamizga qo‘shiling!"
  },
  {
    id: 'ad-9',
    company: 'Ucell',
    logo: 'https://api.logobank.uz/media/logos_png/Ucell-01.png',
    title: "Bosh hisobchi",
    location: "Toshkent",
    url: "https://ucell.uz/career/",
    description: "Ucell kompaniyasiga bosh hisobchi kerak. Moliyaviy barqarorlik va rivojlanish kafolatlanadi."
  },
  {
    id: 'ad-10',
    company: 'MyTaxi',
    logo: 'https://habrastorage.org/getpro/moikrug/uploads/company/100/008/624/8/logo/big_a2328669aab15bee6de3428166617d37.png',
    title: "Product Manager",
    location: "Toshkent",
    url: "https://mytaxi.uz/career/",
    description: "MyTaxi kompaniyasiga Product Manager lavozimi uchun ochiq ish o‘rni."
  },
];


const handleImageError = (e) => {
  if (!e || !e.target) return
  e.target.onerror = null
  if (Default && typeof Default === "string") {
    e.target.src = Default
  } else {
    e.target.style.display = "none"
  }
}

// --- AdCard component ---
const AdCard = ({ ad }) => (
  <div
    className="ad-card"
    style={{
      border: '1px solid #e0f7f7',
      borderRadius: '18px',
      background: 'linear-gradient(135deg, #f7fbfc 0%, #e3f6f6 100%)',
      margin: '20px 0',
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      gap: '20px',
      boxShadow: '0 6px 24px rgba(0,140,140,0.09)',
      position: 'relative',
      transition: 'box-shadow 0.2s',
      overflow: 'hidden',
    }}
    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,140,140,0.17)')}
    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,140,140,0.09)')}
  >
    <span
      style={{
        position: 'absolute',
        top: '14px',
        right: '14px',
        background: 'rgba(0,140,140,0.14)',
        color: '#008c8c',
        padding: '4px 12px',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.5px',
        zIndex: 2,
      }}
    >
      Reklama
    </span>
    <img
      src={ad.logo}
      alt={ad.company}
      style={{
        width: 70,
        height: 70,
        borderRadius: 16,
        background: '#fff',
        objectFit: 'contain',
        border: '1.5px solid #e0f7f7',
        boxShadow: '0 2px 8px rgba(0,140,140,0.08)',
      }}
      onError={handleImageError}
    />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 2, color: '#1a1a1a', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{ad.company}</div>
      <div style={{ fontWeight: 700, fontSize: 15, color: '#008c8c', marginBottom: 2 }}>{ad.title}</div>
      <div style={{ fontSize: 13, color: '#666', marginBottom: 7 }}>{ad.location}</div>
      <div style={{ fontSize: 14, color: '#444', marginBottom: 10, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{ad.description}</div>
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          color: '#fff',
          background: 'linear-gradient(45deg, #008c8c, #00b6b6)',
          padding: '8px 22px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: 15,
          marginTop: 2,
          transition: 'background 0.18s, transform 0.18s',
          boxShadow: '0 2px 8px rgba(0,140,140,0.09)',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(45deg, #00b6b6, #008c8c)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(45deg, #008c8c, #00b6b6)')}
      >
        Ariza topshirish
      </a>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate()

  // AI Status Modal state
  const [showAIStatusModal, setShowAIStatusModal] = useState(false)
  const [selectedAIStatus, setSelectedAIStatus] = useState(null)

  const aiStatuses = {
    "Bahs 🤔": "Foydalanuvchi bahs-munozaralarda faol ishtirok etadi",
    "Yolg'on 🚫": "Bu post haqiqatga to'g'ri kelmasligi mumkin",
    "Shubhali ❓": "Bu kontentning ishonchliligi tekshirilmoqda",
    "Tasdiqlangan ✅": "Bu kontent moderatorlar tomonidan tasdiqlangan"
  }

  const handleAIStatusClick = (status) => {
    setSelectedAIStatus(status)
    setShowAIStatusModal(true)
  }


  // Add state for storing user statuses
  const [userStatuses, setUserStatuses] = useState(new Map())

  // Function to get or create status for a user
  const getUserStatus = (userId) => {
    if (!userStatuses.has(userId)) {
      const newStatuses = new Map(userStatuses)
      newStatuses.set(userId, getRandomStatus())
      setUserStatuses(newStatuses)
    }
    return userStatuses.get(userId) || getRandomStatus()
  }

  // Foydali funksiyasi uchun state
  const [usefulStats, setUsefulStats] = useState({})

  // Reference to the actual default image object
  const defaultImageRef = useRef()

  // Initialize the default image on component mount
  useEffect(() => {
    const defaultImg = new Image()
    defaultImg.src = Default
    defaultImageRef.current = defaultImg
  }, [])

  // Utility function to safely handle image URLs and prevent infinite loading loops
  const getSafeImageUrl = (imageUrl, apiPrefix = "") => {
    if (!imageUrl) return Default
    if (typeof imageUrl !== "string") return Default
    if (imageUrl.startsWith("http")) return imageUrl
    return apiPrefix + imageUrl
  }

  // Utility function to handle image loading errors
  const handleImageError = (e) => {
    if (!e || !e.target) return
    e.target.onerror = null

    if (Default && typeof Default === "string") {
      e.target.src = Default
    } else {
      e.target.style.display = "none"
    }
  }

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showPostCreate, setShowPostCreate] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [activeStory, setActiveStory] = useState(null)
  const [showStory, setShowStory] = useState(false)
  const [expandedCaptions, setExpandedCaptions] = useState({})
  const [activeMediaIndices, setActiveMediaIndices] = useState({})
  const [touchStart, setTouchStart] = useState({})
  const [touchEnd, setTouchEnd] = useState({})
  const [likedPosts, setLikedPosts] = useState({})
  const [savedPosts, setSavedPosts] = useState({})
  // Article like/save state
  const [likedArticles, setLikedArticles] = useState({})
  const [savedArticles, setSavedArticles] = useState({})
  const [showComments, setShowComments] = useState(false)
  const [activeCommentPost, setActiveCommentPost] = useState(null)
  const [comments, setComments] = useState({})
  const [commentText, setCommentText] = useState("")
  const [commentTouchStart, setCommentTouchStart] = useState(null)
  const [commentTouchCurrent, setCommentTouchCurrent] = useState(null)
  const [isSwipingComment, setIsSwipingComment] = useState(false)
  const [isClosingComment, setIsClosingComment] = useState(false)

  // SUPER AI Media long press states
  const [mediaHolding, setMediaHolding] = useState({}) // 3 second hold phase
  const [mediaProgress, setMediaProgress] = useState({}) // Progress bar phase
  const [showProgressBar, setShowProgressBar] = useState({}) // Show progress bar
  const [showSuccess, setShowSuccess] = useState({}) // Success with confetti
  const [mediaTimers, setMediaTimers] = useState({})

  const [showStoryRow, setShowStoryRow] = useState(false)
  const [lastScrollPosition, setLastScrollPosition] = useState(0)
  const [profileVisible, setProfileVisible] = useState(true)
  const [storyCount, setStoryCount] = useState(0)

  // State for expanded articles
  const [expandedArticles, setExpandedArticles] = useState({})

  // Handle scroll to hide stories when scrolling up or down and show profile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      const scrollDifference = Math.abs(currentScrollPos - lastScrollPosition)

      if (scrollDifference > 5 && showStoryRow) {
        setShowStoryRow(false)
        setProfileVisible(true)
      }

      setLastScrollPosition(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollPosition, showStoryRow])

  // Posts data state
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)

  // --- Ad-injected posts state ---
  const [mixedFeed, setMixedFeed] = useState([])
  // Reklama offseti: har page uchun qaysi reklama ishlatilganini saqlaydi
  const [adOffset, setAdOffset] = useState(0);


  // AI status constants
  const AI_STATUS = {
    INTERESTING_FACT: "interesting_fact",
    FUNNY: "funny",
    VERIFIED: "verified",
    FAKE: "fake",
    USEFUL: "useful",
    DEBATABLE: "debatable",
    EDUCATIONAL: "educational",
    TRENDING: "trending",
    BREAKING_NEWS: "breaking_news",
    OPINION: "opinion",
  }

  // AI status styles, icons and descriptions
  const AI_STATUS_CONFIG = {
    interesting_fact: {
      color: "#ffffff",
      label: "qiziqarli",
      description: `Istan AI: Bu post qiziqarli va o'quvchilar uchun foydali faktlarni o'z ichiga oladi. Bunday postlar odatda yangi bilim va tushunchalarni taqdim etadi.`,
    },
    funny: {
      color: "#ffffff",
      icon: "😄",
      label: "kulgu",
      description: `Istan AI: Bu post ko'pchilikni kuldiradigan va kayfiyatni ko'taradigan mazmunda. Ijobiy emotsiyalar uchun tavsiya etiladi!`,
    },
    verified: {
      color: "#ffffff",
      icon: "✓",
      label: "aniq",
      description: `Istan AI: Bu postdagi ma'lumotlar ishonchli manbalardan olingan va tekshirilgan. Siz bu ma'lumotlarga ishonishingiz mumkin.`,
    },
    fake: {
      color: "#ffffff",
      icon: "⚠️",
      label: "yolg'on",
      description: `Istan AI: Bu postdagi ma'lumotlar noto'g'ri yoki chalg'ituvchi. Iltimos, tanqidiy fikrlang va tekshirib ko'ring.`,
    },
    useful: {
      color: "#ffffff",
      icon: "💡",
      label: "foydali",
      description: `Istan AI: Bu post amaliy ahamiyatga ega va kundalik hayotda qo'llash mumkin bo'lgan ma'lumotlarni o'z ichiga oladi.`,
    },
    debatable: {
      color: "#ffffff",
      icon: "🤔",
      label: "bahs",
      description: `Istan AI: Bu mavzu bo'yicha turli fikrlar mavjud. Siz ham o'z fikringizni bildiring va boshqalar bilan muhokama qiling.`,
    },
    educational: {
      color: "#ffffff",
      label: "talim",
      description: `Istan AI: Bu post taʼlim va o'qitish maqsadida yaratilgan. O'quvchilar uchun foydali maʼlumotlar mavjud.`,
    },
    trending: {
      color: "#ffffff",
      icon: "📈",
      label: "trend",
      description: `Istan AI: Bu post hozirda eng ko'p muhokama qilinayotgan mavzulardan biri. Dolzarb yangiliklar va tendentsiyalar haqida.`,
    },
    breaking_news: {
      color: "#ffffff",
      icon: "🔥",
      label: "muhim",
      description: `Istan AI: Bu post muhim va shoshilinch yangilik. Tezkor xabar berish maqsadida joylangan.`,
    },
    opinion: {
      color: "#ffffff",
      icon: "💭",
      label: "fikr",
      description: `Istan AI: Bu post muallifning shaxsiy fikr-mulohazalari. Boshqalar bilan o'z nuqtai nazaringizni ulashing.`,
    },
  }

  // State for showing AI status description modal
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)

  // Function to show AI status description
  const showAIStatusDescription = (status) => {
    setSelectedStatus(status)
    setShowStatusModal(true)
  }

  // Function to analyze content and assign AI status
  const getAIStatus = (post) => {
    const statuses = Object.keys(AI_STATUS)
    const randomIndex = Math.floor(Number.parseInt(post.id) % statuses.length)
    return AI_STATUS[statuses[randomIndex]]
  }

  // Observer for infinite scrolling
  const observer = useRef()
  const lastPostElementRef = useRef()

  // Fetch stories and user data when component mounts
  useEffect(() => {
    if (posts.length > 0) {
      const initialStats = {}
      posts.forEach((post) => {
        initialStats[post.id] = {
          usefulCount: Math.floor(Math.random() * 50),
          totalCount: Math.floor(Math.random() * 100),
          initialPercent: Math.floor(Math.random() * 40) + 20,
        }
      })
      setUsefulStats(initialStats)
    }
  }, [posts])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getMe()
        if (userResponse && userResponse.status === "success" && userResponse.data) {
          setUserData(userResponse.data)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }

      const fetchStories = async () => {
        setStoriesLoading(true)
        setStoriesError(null)

        try {
          const response = await getStoryFeed()

          if (response && response.status === "success" && response.data && response.data.user_stories) {
            setStories(response.data.user_stories)

            const unviewedCount = response.data.user_stories.reduce((count, userStory) => {
              if (userStory.stories && Array.isArray(userStory.stories)) {
                return count + userStory.stories.filter((story) => !story.viewed).length
              }
              return count
            }, 0)

            setStoryCount(unviewedCount)
          } else {
            setStoryCount(0)
          }
        } catch (error) {
          console.error("Error fetching stories:", error)
          setStoriesError("Failed to load stories")
          setStoryCount(4)
        } finally {
          setStoriesLoading(false)
        }
      }

      fetchStories()
    }
    fetchData()
  }, [])

  // --- Helper: Insert ad cards randomly into posts ---
  // Yangi: page-local reklama aralashtirish
  function insertAdsIntoFeedPage(postsArr, adArr, interval = 5, adOffset = 0) {
    const result = [];
    const maxAds = Math.floor(postsArr.length / interval);
    let adIndex = adOffset;
    let adsUsed = 0;
    for (let i = 0; i < postsArr.length; i++) {
      result.push(postsArr[i]);
      // Reklama oxirida chiqmasligi uchun:
      if (
        (i + 1) % interval === 0 &&
        adsUsed < maxAds &&
        adIndex < adArr.length &&
        i + 1 < postsArr.length // oxirgi element emas
      ) {
        result.push({ ...adArr[adIndex], isAd: true });
        adIndex++;
        adsUsed++;
      }
    }
    return { feed: result, nextAdOffset: adIndex };
  }

  // Fetch posts from posts/feed endpoint when component mounts or page changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const tokens = getTokens()
        const token = tokens?.access

        if (!token) {
          setIsLoading(false)
          return
        }

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const paginatedUrl = `${API.POST_FEED}?page=${page}&limit=10`
        const response = await fetch(paginatedUrl, requestOptions)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()

        if (result.status === "success" && result.data && result.data.posts) {
          const initialLikedPosts = {}
          const initialSavedPosts = {}

          result.data.posts.forEach((post) => {
            initialLikedPosts[post.id] = post.has_liked || false
            initialSavedPosts[post.id] = post.has_saved || false
          })

          if (page === 1) {
            setLikedPosts(initialLikedPosts)
            setSavedPosts(initialSavedPosts)
          } else {
            setLikedPosts((prev) => ({ ...prev, ...initialLikedPosts }))
            setSavedPosts((prev) => ({ ...prev, ...initialSavedPosts }))
          }

          if (page === 1) {
            setPosts(result.data.posts)
          } else {
            setPosts((prevPosts) => [...prevPosts, ...result.data.posts])
          }

          setHasMore(result.data.posts.length > 0 && result.data.pagination.has_next)

          // Shuffle ads for each page so the first ad is not always the same
          function shuffleArray(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
          }
          const shuffledAds = shuffleArray(adCardsData);
          if (page === 1) {
            const { feed, nextAdOffset } = insertAdsIntoFeedPage(result.data.posts, shuffledAds, 5, 0);
            setMixedFeed(feed);
            setAdOffset(nextAdOffset);
          } else {
            const { feed, nextAdOffset } = insertAdsIntoFeedPage(result.data.posts, shuffledAds, 5, adOffset);
            setMixedFeed((prev) => [...prev, ...feed]);
            setAdOffset(nextAdOffset);
          }

        } else {
          console.error("Unexpected API response format:", result)
          setError("Unexpected API response format")
        }
      } catch (error) {
        console.error("Error fetching posts feed:", error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [page])

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

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    const currentObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1)
        }
      },
      { threshold: 0.5 },
    )

    observer.current = currentObserver

    const currentElement = lastPostElementRef.current
    if (currentElement) {
      currentObserver.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement)
      }
    }
  }, [hasMore, isLoading, posts])

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const drawer = document.getElementById("drawer")
      if (drawer && !drawer.contains(event.target) && isDrawerOpen) {
        setIsDrawerOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDrawerOpen])

  const menuItems = [
    { icon: profile8, label: "Profilim", onClick: () => navigate("/profile") },

    { icon: profile10, label: "Resume", onClick: () => navigate("/resume") },
    { icon: profile11, label: "Arxiv", onClick: () => navigate("/archive") },
    { icon: profile1, label: "To'lovlar" },
    { icon: profile2, label: "Kontaktlar" },
    { icon: profile3, label: "Sozlamalar", onClick: () => navigate("/settings") },
    { icon: profile4, label: "Tarmoqdan foydalanish" },
    { icon: profile5, label: "Yordam 24/7" },
    { icon: profile6, label: "Tungi rejim" },
    { icon: profile7, label: "Dastur haqida" },
  ]

  // Stories state
  const [stories, setStories] = useState([])
  const [storiesLoading, setStoriesLoading] = useState(false)
  const [storiesError, setStoriesError] = useState(null)
  const [userData, setUserData] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [activeUserStory, setActiveUserStory] = useState(null)
  const [activeStoryIndex, setActiveStoryIndex] = useState(0)
  const [storyProgress, setStoryProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Function to handle caption expansion
  const toggleCaption = (postId) => {
    setExpandedCaptions((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  // Function to navigate to next media item in carousel
  const nextMedia = (postId) => {
    setActiveMediaIndices((prev) => {
      const post = posts.find((p) => p.id === postId)
      const totalMedia = post ? [post.main_media, ...post.additional_media].length : 1
      const currentIndex = prev[postId] || 0
      return {
        ...prev,
        [postId]: (currentIndex + 1) % totalMedia,
      }
    })
  }

  // Function to navigate to previous media item in carousel
  const prevMedia = (postId) => {
    setActiveMediaIndices((prev) => {
      const post = posts.find((p) => p.id === postId)
      const totalMedia = post ? [post.main_media, ...post.additional_media].length : 1
      const currentIndex = prev[postId] || 0
      return {
        ...prev,
        [postId]: (currentIndex - 1 + totalMedia) % totalMedia,
      }
    })
  }

  // Touch handlers for swipe functionality
  const handleTouchStart = (e, postId) => {
    setTouchStart({
      ...touchStart,
      [postId]: { x: e.touches[0].clientX, y: e.touches[0].clientY },
    })
  }

  const handleTouchMove = (e, postId) => {
    if (!touchStart[postId]) return

    setTouchEnd({
      ...touchEnd,
      [postId]: { x: e.touches[0].clientX, y: e.touches[0].clientY },
    })
  }

  const handleTouchEnd = (postId) => {
    if (!touchStart[postId] || !touchEnd[postId]) return

    const xDiff = touchStart[postId].x - touchEnd[postId].x
    const yDiff = touchStart[postId].y - touchEnd[postId].y

    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 30) {
      if (xDiff > 0) {
        nextMedia(postId)
      } else {
        prevMedia(postId)
      }
    }

    const newTouchStart = { ...touchStart }
    const newTouchEnd = { ...touchEnd }
    delete newTouchStart[postId]
    delete newTouchEnd[postId]
    setTouchStart(newTouchStart)
    setTouchEnd(newTouchEnd)
  }

  // Mouse handlers for drag functionality
  const handleMouseDown = (e, postId) => {
    setTouchStart({
      ...touchStart,
      [postId]: { x: e.clientX, y: e.clientY },
    })
  }

  const handleMouseMove = (e, postId) => {
    if (!touchStart[postId]) return

    setTouchEnd({
      ...touchEnd,
      [postId]: { x: e.clientX, y: e.clientY },
    })
  }

  const handleMouseUp = (postId) => {
    handleTouchEnd(postId)
  }

  const handleMouseLeave = (postId) => {
    if (touchStart[postId]) {
      handleTouchEnd(postId)
    }
  }

  // SUPER AI Media long press handlers - 3 phases
  const handleMediaLongPressStart = (postId) => {
    if (showSuccess[postId]) return

    // Phase 1: 3 second mandatory hold (no visual feedback)
    setMediaHolding((prev) => ({ ...prev, [postId]: true }))
    const startTime = Date.now()

    const holdTimer = setInterval(() => {
      const elapsed = Date.now() - startTime

      if (elapsed >= 1200) {
        // Phase 1 complete - start Phase 2 (progress bar)
        clearInterval(holdTimer)
        setMediaHolding((prev) => ({ ...prev, [postId]: false }))
        setShowProgressBar((prev) => ({ ...prev, [postId]: true }))
        setMediaProgress((prev) => ({ ...prev, [postId]: 0 }))

        // Phase 2: Fast progress bar (1.5 seconds)
        const progressStartTime = Date.now()
        const progressTimer = setInterval(() => {
          const progressElapsed = Date.now() - progressStartTime
          const progress = Math.min((progressElapsed / 1500) * 100, 100) // 1.5 seconds

          setMediaProgress((prev) => ({ ...prev, [postId]: progress }))

          if (progress >= 100) {
            // Phase 3: Success with confetti
            clearInterval(progressTimer)
            setShowProgressBar((prev) => ({ ...prev, [postId]: false }))
            setShowSuccess((prev) => ({ ...prev, [postId]: true }))

            // Auto-hide after 2 seconds
            setTimeout(() => {
              setShowSuccess((prev) => ({ ...prev, [postId]: false }))
              setMediaProgress((prev) => ({ ...prev, [postId]: 0 }))
            }, 2000)
          }
        }, 20)

        setMediaTimers((prev) => ({ ...prev, [postId]: progressTimer }))
      }
    }, 50)

    setMediaTimers((prev) => ({ ...prev, [postId]: holdTimer }))
  }

  const handleMediaLongPressEnd = (postId) => {
    if (showSuccess[postId]) return

    const timer = mediaTimers[postId]
    if (timer) {
      clearInterval(timer)
    }

    // Reset all states
    setMediaHolding((prev) => ({ ...prev, [postId]: false }))
    setShowProgressBar((prev) => ({ ...prev, [postId]: false }))
    setMediaProgress((prev) => ({ ...prev, [postId]: 0 }))
    setMediaTimers((prev) => {
      const newTimers = { ...prev }
      delete newTimers[postId]
      return newTimers
    })
  }



  // Handle post likes
  const handleLike = async (postId) => {
    try {
      const previousState = likedPosts[postId]

      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }))

      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              likes_count: previousState ? post.likes_count - 1 : post.likes_count + 1,
            }
          }
          return post
        }),
      )

      const response = await likePost(postId)

      if (response.status !== "success") {
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: previousState,
        }))

        setPosts((prev) =>
          prev.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likes_count: previousState ? post.likes_count + 1 : post.likes_count - 1,
              }
            }
            return post
          }),
        )

        console.error("Error liking post:", response.message)
      }
    } catch (error) {
      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }))
      console.error("Error liking post:", error)
    }
  }
  
  // Handle article likes
  const handleArticleLike = (articleId) => {
    const previousState = likedArticles[articleId];
    setLikedArticles((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }));
    setPosts((prev) => prev.map((post) => {
      if (post.id === articleId && !post.main_media) {
        return {
          ...post,
          likes_count: previousState ? post.likes_count - 1 : post.likes_count + 1,
        };
      }
      return post;
    }));
  }



  // Handle post saves
  const handleSave = async (postId) => {
    try {
      const previousState = savedPosts[postId]

      setSavedPosts((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }))

      const response = await savePost(postId)

      if (response.status !== "success") {
        setSavedPosts((prev) => ({
          ...prev,
          [postId]: previousState,
        }))
        console.error("Error saving post:", response.message)
      }
    } catch (error) {
      setSavedPosts((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }))
      console.error("Error saving post:", error)
    }
  }

  // Handle article saves
  const handleArticleSave = async (articleId) => {
    try {
      const previousState = savedArticles[articleId]
      setSavedArticles((prev) => ({
        ...prev,
        [articleId]: !prev[articleId],
      }))
      const response = await saveArticle(articleId)
      if (response.status !== "success") {
        setSavedArticles((prev) => ({ ...prev, [articleId]: previousState }))
        console.error("Error saving article:", response.message)
      } else {
        console.log(response.message || "Maqola saqlandi!")
        setSavedArticles((prev) => ({ ...prev, [articleId]: response.data.has_saved }))
        setPosts((prev) => prev.map((post) => {
          if (post.id === articleId && !post.main_media) {
            return {
              ...post,
              saved_count: response.data.saved_count,
              has_saved: response.data.has_saved,
            }
          }
          return post
        }))
      }
    } catch (error) {
      setSavedArticles((prev) => ({ ...prev, [articleId]: !prev[articleId] }))
      console.error("Error saving article:", error)
    }
  }

  // Handle comments
  const handleComment = async (postId) => {
    try {
      setActiveCommentPost(postId)
      setShowComments(true)

      try {
        const response = await getComments(postId)
        if (response.status === "success") {
          setComments((prev) => ({
            ...prev,
            [postId]: response.data.comments || [],
          }))
        } else {
          console.error("Error fetching comments:", response.message)
        }
      } catch (error) {
        console.error("Error fetching comments:", error)
      }
    } catch (error) {
      console.error("Error handling comment action:", error)
    }
  }

  // Handle comment submission
  const handleCommentSubmit = async (postId) => {
    if (!commentText.trim()) return

    try {
      const response = await addComment(postId, commentText)

      if (response.status === "success") {
        const newComment = {
          id: response.data.comment_id,
          text: response.data.text,
          user: response.data.user,
          created_at: response.data.created_at,
          is_own_comment: true,
        }

        setComments((prev) => ({
          ...prev,
          [postId]: [newComment, ...(prev[postId] || [])],
        }))

        setCommentText("")
      } else {
        console.error("Error adding comment:", response.message)
      }
    } catch (error) {
      console.error("Error submitting comment:", error)
    }
  }

  // Comment drawer touch handlers
  const handleCommentTouchStart = (e) => {
    setCommentTouchStart(e.touches[0].clientY)
    setCommentTouchCurrent(e.touches[0].clientY)
  }

  const handleCommentTouchMove = (e) => {
    setCommentTouchCurrent(e.touches[0].clientY)
    const diff = e.touches[0].clientY - commentTouchStart

    if (diff > 0) {
      setIsSwipingComment(true)
      const commentContainer = e.currentTarget
      commentContainer.style.transform = `translateY(${diff}px)`
    }
  }

  const handleCommentTouchEnd = (e) => {
    const diff = commentTouchCurrent - commentTouchStart
    const commentContainer = e.currentTarget

    if (diff > 100) {
      setIsClosingComment(true)
      setTimeout(() => {
        setShowComments(false)
        setActiveCommentPost(null)
        setIsClosingComment(false)
        commentContainer.style.transform = ""
      }, 300)
    } else {
      commentContainer.style.transform = ""
    }

    setIsSwipingComment(false)
  }

  // Close comments drawer
  const handleCloseComments = () => {
    setIsClosingComment(true)
    setTimeout(() => {
      setShowComments(false)
      setActiveCommentPost(null)
      setIsClosingComment(false)
    }, 300)
  }

  // Handle comment deletion
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await deleteComment(commentId)

      if (response.status === "success") {
        setComments((prev) => {
          const newComments = {}

          Object.keys(prev).forEach((postId) => {
            newComments[postId] = prev[postId].filter((comment) => comment.id !== commentId)
          })

          return newComments
        })
      } else {
        console.error("Error deleting comment:", response.message)
      }
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  // Handle share
  const handleShare = (postId) => {
    console.log(`Share post ${postId}`)
  }

  // Handle story click
  const handleStoryClick = async (userStory) => {
    if (!userStory) return

    setActiveUserStory(userStory)
    setActiveStoryIndex(0)
    setShowStory(true)
    setStoryProgress(0)
    setIsPaused(false)

    if (userStory.stories && userStory.stories.length > 0) {
      try {
        const response = await viewStory(userStory.stories[0].id)

        setStories((prevStories) => {
          return prevStories.map((story) => {
            if (story.user_id === userStory.user_id) {
              return {
                ...story,
                stories: story.stories.map((s, index) => {
                  if (index === 0) {
                    return { ...s, viewed: true }
                  }
                  return s
                }),
              }
            }
            return story
          })
        })

        setStoryCount((prev) => Math.max(0, prev - 1))
      } catch (error) {
        console.error("Error viewing story:", error)
      }
    }
  }

  // Handle next story
  const handleNextStory = async () => {
    if (!activeUserStory || !activeUserStory.stories || isVideoLoading) return

    const currentStories = activeUserStory.stories

    if (activeStoryIndex < currentStories.length - 1) {
      setActiveStoryIndex((prevIndex) => prevIndex + 1)
      setStoryProgress(0)
      setIsMediaLoaded(false)
      setIsMediaLoading(true)

      try {
        const response = await viewStory(currentStories[activeStoryIndex + 1].id)

        setStories((prevStories) => {
          return prevStories.map((story) => {
            if (story.user_id === activeUserStory.user_id) {
              return {
                ...story,
                stories: story.stories.map((s, index) => {
                  if (index === activeStoryIndex + 1) {
                    return { ...s, viewed: true }
                  }
                  return s
                }),
              }
            }
            return story
          })
        })
      } catch (error) {
        console.error("Error viewing next story:", error)
      }
    } else {
      const currentUserIndex = stories.findIndex((s) => s.user_id === activeUserStory.user_id)

      if (currentUserIndex < stories.length - 1) {
        const nextUserStory = stories[currentUserIndex + 1]
        handleStoryClick(nextUserStory)
      } else {
        handleCloseStory()
      }
    }
  }

  // Handle previous story
  const handlePrevStory = async () => {
    if (!activeUserStory || !activeUserStory.stories || isVideoLoading) return

    if (activeStoryIndex > 0) {
      setActiveStoryIndex((prevIndex) => prevIndex - 1)
      setStoryProgress(0)
      setIsMediaLoaded(false)
      setIsMediaLoading(true)
    } else {
      const currentUserIndex = stories.findIndex((s) => s.user_id === activeUserStory.user_id)

      if (currentUserIndex > 0) {
        const prevUserStory = stories[currentUserIndex - 1]
        setActiveUserStory(prevUserStory)
        setActiveStoryIndex(prevUserStory.stories.length - 1)
        setStoryProgress(0)
        setIsMediaLoaded(false)
        setIsMediaLoading(true)
      }
    }
  }

  // Close story
  const handleCloseStory = () => {
    setShowStory(false)
    setActiveUserStory(null)
    setActiveStoryIndex(0)
    setStoryProgress(0)
    setIsMediaLoaded(false)
    setIsMediaLoading(false)
    setIsVideoLoading(false)
  }

  // State to track media loading
  const [isMediaLoaded, setIsMediaLoaded] = useState(false)
  const [isMediaLoading, setIsMediaLoading] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(false)

  // Handle media load event
  const handleMediaLoaded = () => {
    setIsMediaLoaded(true)
    setIsMediaLoading(false)
    setIsVideoLoading(false)
  }

  // Reset media loaded state when story changes
  useEffect(() => {
    setIsMediaLoaded(false)
    setIsMediaLoading(true)
    setIsVideoLoading(true)
  }, [activeUserStory, activeStoryIndex])

  // Handle story progress and auto-advance
  useEffect(() => {
    if (!showStory || !activeUserStory || isPaused || !isMediaLoaded) return

    const currentStory = activeUserStory.stories[activeStoryIndex]
    const isVideo = currentStory && currentStory.media_type === "video"
    const storyDuration = isVideo ? 30000 : 5000

    const interval = 50
    const increment = (interval / storyDuration) * 100

    const timer = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          handleNextStory()
          return 0
        }
        return prev + increment
      })
    }, interval)

    return () => clearInterval(timer)
  }, [showStory, activeUserStory, activeStoryIndex, isPaused, isMediaLoaded])

  // Font size state for articles
  const [articleFontSize, setArticleFontSize] = useState(17)

  // Stories states and animations
  const [storiesExpanded, setStoriesExpanded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll behavior for stories
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setScrollPosition(currentScroll);
      
      if (currentScroll > 100 && storiesExpanded) {
        setStoriesExpanded(false);
      } else if (currentScroll < 50 && !storiesExpanded) {
        setStoriesExpanded(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [storiesExpanded]);

  // Stories section styles
  const storiesStyles = {
    container: {
      position: 'sticky',
      top: 0,
      width: '100%',
      backgroundColor: '#f7f7f7',
      zIndex: 100,
      transition: 'all 0.3s ease-in-out',
      height: storiesExpanded ? '240px' : '72px',
      boxShadow: storiesExpanded ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
      overflow: 'hidden'
    },
    scrollArea: {
      overflowX: 'auto',
      overflowY: storiesExpanded ? 'auto' : 'hidden',
      WebkitOverflowScrolling: 'touch',
      display: 'flex',
      flexWrap: storiesExpanded ? 'wrap' : 'nowrap',
      padding: '8px',
      gap: '12px',
      height: '100%'
    },
    storyItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      minWidth: storiesExpanded ? '100px' : '64px',
      transition: 'all 0.3s ease'
    },
    storyAvatar: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid #008c8c',
      padding: '2px',
      backgroundColor: 'white'
    },
    storyImage: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    storyUsername: {
      fontSize: '12px',
      marginTop: '4px',
      color: '#333',
      maxWidth: '80px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textAlign: 'center'
    }
  };

  // Stories Section Component
  const StoriesSection = () => (
    <div 
      style={storiesStyles.container}
      onClick={() => !storiesExpanded && setStoriesExpanded(true)}
    >
      <div style={storiesStyles.scrollArea}>
        {/* Add Story Item */}
        <div style={storiesStyles.storyItem}>
          <div style={{...storiesStyles.storyAvatar, border: '2px dashed #008c8c'}}>
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f7f7'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#008c8c" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
          </div>
          <span style={storiesStyles.storyUsername}>Add Story</span>
        </div>

        {/* Story Items */}
        {stories.map((userStory, index) => {
          const hasUnviewedStories = userStory.stories && userStory.stories.some(story => !story.viewed);
          
          return (
            <div 
              key={userStory.user_id || index}
              style={storiesStyles.storyItem}
              onClick={() => handleStoryClick(userStory)}
            >
              <div style={{
                ...storiesStyles.storyAvatar,
                border: hasUnviewedStories ? '2px solid #008c8c' : '2px solid #ddd'
              }}>
                <img
                  src={getSafeImageUrl(userStory.profile_picture, API_URL2) || Default}
                  alt={userStory.name || 'Story'}
                  style={storiesStyles.storyImage}
                  onError={handleImageError}
                />
              </div>
              <span style={storiesStyles.storyUsername}>
                {userStory.name || `User ${index + 1}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  // In the return statement, replace the existing stories row with:
  {/* Stories Section */}
  // <StoriesSection />

  // Remove the separate filtering of articles and posts.
  // const articles = posts.filter((p) => p.type === 'article')
  // const normalPosts = posts.filter((p) => p.type !== 'article')

  // --- Render logic: use mixedFeed if available, fallback to posts ---
  const feedToRender = mixedFeed.length > 0 ? mixedFeed : posts

  return (
    <div className="app-container">
      {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
      {showPostCreate && <CreatePost onClose={() => setShowPostCreate(false)} />}

      {/* --- Feed with Ads and Posts --- */}
      

      {/* Full Screen Story Viewer */}
      {showStory && activeUserStory && activeUserStory.stories && activeUserStory.stories.length > 0 && (
        <div className="story-viewer" onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)}>
          {/* Progress bars */}
          <div className="story-progress-container">
            {activeUserStory.stories.map((_, index) => (
              <div key={index} className="story-progress-bar-container">
                <div
                  className={`story-progress-bar ${index < activeStoryIndex ? "completed" : index === activeStoryIndex ? "active" : ""}`}
                  style={index === activeStoryIndex ? { width: `${storyProgress}%` } : {}}
                ></div>
              </div>
            ))}
          </div>

          {/* Story header */}
          <div className="story-header">
            <div className="story-user-info">
              <div className="story-user-avatar">
                <img
                  src={getSafeImageUrl(activeUserStory.profile_picture, "https://api.istan.uz/", instaImg || Default)}
                  onError={handleImageError}
                  alt={activeUserStory.name}
                />
              </div>
              <div className="story-info">
                <div className="story-username">
                  {activeUserStory.name}
                  <span style={{...statusStyles.statusLabel, background: 'rgba(255, 255, 255, 0.2)', color: '#fff'}}>{getRandomStatus()}</span>
                </div>
                <div className="story-time">
                  {activeUserStory.stories[activeStoryIndex] &&
                    new Date(activeUserStory.stories[activeStoryIndex].created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </div>
              </div>
            </div>
            <button className="story-close-btn" onClick={handleCloseStory}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="24"
                height="24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Story content */}
          <div className="story-content">
            {isMediaLoading && (
              <div className="story-loading">
                <div className="loading-spinner"></div>
              </div>
            )}

            {activeUserStory.stories[activeStoryIndex] &&
              (activeUserStory.stories[activeStoryIndex].media_type === "video" ? (
                <video
                  key={`story-video-${activeStoryIndex}`}
                  src={`https://api.istan.uz/${activeUserStory.stories[activeStoryIndex].media_url}`}
                  className="story-media"
                  autoPlay
                  playsInline
                  controls
                  onLoadStart={() => {
                    setIsVideoLoading(true)
                    setIsMediaLoading(true)
                    setIsMediaLoaded(false)
                  }}
                  onLoadedData={() => {
                    setIsVideoLoading(false)
                    setIsMediaLoading(false)
                    setIsMediaLoaded(true)
                    const video = document.querySelector(".story-media")
                    if (video) {
                      video.volume = 1.0
                      video.play()
                    }
                  }}
                  onError={() => {
                    console.error("Error loading video")
                    setIsMediaLoading(false)
                    setIsMediaLoaded(true)
                    setIsVideoLoading(false)
                  }}
                />
              ) : (
                <img
                  src={`https://api.istan.uz/${activeUserStory.stories[activeStoryIndex].media_url}`}
                  alt="Story content"
                  className="story-media"
                  onLoad={handleMediaLoaded}
                  onError={() => {
                    console.error("Error loading image")
                    setIsMediaLoading(false)
                    setIsMediaLoaded(true)
                  }}
                />
              ))}

            {/* Navigation controls */}
            <div className="story-navigation">
              <div className="story-nav-prev" onClick={handlePrevStory}></div>
              <div className="story-nav-next" onClick={handleNextStory}></div>
            </div>
          </div>
        </div>
      )}

      {/* Comments Drawer */}
      {showComments && activeCommentPost && (
        <div
          className="comments-modal"
          onClick={(e) => {
            if (e.target.className === "comments-modal") {
              handleCloseComments()
            }
          }}
        >
          <div
            className={`comments-container ${isSwipingComment ? "swiping" : ""} ${isClosingComment ? "closing" : ""}`}
            onTouchStart={handleCommentTouchStart}
            onTouchMove={handleCommentTouchMove}
            onTouchEnd={handleCommentTouchEnd}
          >
            <div className="comments-handle"></div>
            <div className="comments-header">
              <h3>Comments</h3>
              <button className="comments-close-btn" onClick={handleCloseComments}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="18"
                  height="18"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="comments-list">
              {comments[activeCommentPost] && comments[activeCommentPost].length > 0 ? (
                comments[activeCommentPost].map((comment, index) => (
                  <div key={comment.id || index} className="comment-item">
                    <div className="comment-avatar">
                      <img
                        src={getSafeImageUrl(comment.user?.profile_picture, API_URL2, instaImg || Default)}
                        onError={handleImageError}
                        alt={comment.user?.username || "User"}
                        className="comment-avatar-img"
                      />
                    </div>
                    <div className="comment-content">
                      <div className="comment-username">
                        {comment.user?.username || "User"}
                        <span style={statusStyles.statusLabel}>{getUserStatus(comment.user?.id)}</span>
                      </div>
                      <div className="comment-text">{comment.text}</div>
                      <div className="comment-time">
                        {new Date(comment.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                      {comment.is_own_comment && (
                        <button className="comment-delete-btn" onClick={() => handleDeleteComment(comment.id)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-comments">No comments yet. Be the first to comment!</div>
              )}
            </div>

            <div className="comment-input-container">
              <input
                type="text"
                className="comment-input"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCommentSubmit(activeCommentPost)}
              />
              <button
                className="comment-submit-btn"
                onClick={() => handleCommentSubmit(activeCommentPost)}
                disabled={!commentText.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer Backdrop */}
      {isDrawerOpen && <div className="drawer-backdrop" onClick={() => setIsDrawerOpen(false)} />}

      {/* Drawer */}
      <div id="drawer" className={`drawer ${isDrawerOpen ? "drawer-open" : "drawer-closed"}`}>
        {/* Profile Section */}
        <div className="drawer-profile">
          <button className="drawer-close-btn" onClick={() => setIsDrawerOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Profile Info */}
          <div className="profile-info">
            <div className="profile-header">
              <div className="profile-avatar-container">
                <div className="profile-avatar" style={{ width: "84px", height: "84px" }}>
                  <img
                    src={getSafeImageUrl(userData?.profile_picture, "https://api.istan.uz/") || "/placeholder.svg"}
                    alt="Profile"
                    className="avatar-img"
                    onError={handleImageError}
                  />
                </div>
                <div className="profile-badges-container">
                  <div className="profile-badge">
                    {/* <span className="badge-text">
                      {Array.isArray(userData?.profession) ? userData.profession[0] : userData?.profession || "Dasturchi"}
                    </span>
                    <span className="badge-rating">{userData?.rating || "5.5"}</span> */}
                  
                  <div className="profile-status" style={{
                    background:'#008c8c',
                    padding: "4px 12px",
                    borderRadius: "20px",
                    color: "white",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    marginTop: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    display: "inline-block"
                  }}>
                    {getUserStatus(userData?.id)}
                  </div>
                  </div>
                </div>
              </div>

              <div className="profile-details">
                <div className="profile-name-container">
                  <h3 className="profile-name">{userData?.name || "Loading..."}</h3>
                  {userData?.is_verified && (
                    <svg className="verification-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                <p className="profile-phone">{userData?.phone || "Loading..."}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-divider"></div>

        <div className="drawer-menu">
          {menuItems.map((item, index) => (
            <button key={index} className="menu-item" onClick={item.onClick}>
              <div className="menu-icon">
                <img src={item.icon || Default} onError={handleImageError} alt={item.label} className="menu-icon-img" />
              </div>
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="version-info">
          <p className="version-text">
            Istan superapp android uchun
            <br />
            versiya 0.1 - a15.amd64
          </p>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="top-nav">
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-left">
              <button className="menu-button" onClick={() => setIsDrawerOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  position: 'relative',
                  alignItems: 'center'
                }}>
                  {stories.slice(0, 3).map((userStoryItem, index) => (
                    <div
                      key={userStoryItem.user_id}
                      onClick={() => handleStoryClick(userStoryItem)}
                      style={{
                        marginLeft: index === 0 ? '0' : '-8px',
                        position: 'relative',
                        cursor: 'pointer',
                        zIndex: 3 - index
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background:   'linear-gradient(45deg, #e0f7f7 0%, #b2eaea 100%)',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img
                          src={getSafeImageUrl(userStoryItem.profile_picture, "https://api.istan.uz/") || "/placeholder.svg"}
                          alt={userStoryItem.name || "Story User"}
                          onError={handleImageError}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            border: '2px solid white',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {stories.length > 0 && <span style={{
                  fontSize: '18px',
                  color: '#262626',
                  fontWeight: '500'
                }}>{` ${stories.length === 1 ? 'Hikoya' : 'Hikoyalar'}`}</span>}
              </div>
            </div>

            <div className="nav-right">
             
              <button className="nav-icon-button" onClick={() => setShowNotifications(true)}>
                <img src={notfikation || Default} alt="notfikation" className="nav-icon" onError={handleImageError} />
                <div className="notification-badge">
                  <span className="badge-count">1</span>
                </div>
              </button>
              <button className="nav-icon-button" onClick={() => navigate("/messenger")}>
                <img src={message || Default} alt="message" className="nav-icon" onError={handleImageError} />
                <div className="notification-badge">
                  <span className="badge-count">1</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Stories Section */}
        {/* <StoriesSection /> */}

        {/* Posts content */}
        <div className="posts-container">
          {/* {error && (
            <div className="error-message">
              <p>Error: {error}</p>
              <button
                onClick={() => {
                  setError(null)
                  setPage(1)
                }}
                style={{ padding: "8px 16px", marginTop: "10px", cursor: "pointer" }}
              >
                Try Again
              </button>
            </div>
          )} */}

          {mixedFeed.length > 0
            ? mixedFeed.map((item, index) => {
                if (item.isAd) {
                  return <AdCard ad={item} key={item.id} />;
                }
                // eski post rendering code shu yerda bo'ladi
                const post = item;
                const isLastItem = index === mixedFeed.length - 1;

                // Render different UI based on post type
                if (!post.main_media) {
                  // Article rendering
                  const isExpanded = expandedArticles[post.id]
                  const words = (post.content || "").split(" ")
                  const shortContent = words.slice(0, 10).join(" ")

                  return (
                    <div key={post.id} className="post article-card" ref={isLastItem ? lastPostElementRef : null}>
                      <div className="article-header">
                        <div className="article-profile">
                          <span
                            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                            onClick={() => navigate(`/profile/${post.user.id}`)}
                            tabIndex={0}
                            role="button"
                            aria-label={`View ${post.user.name}'s profile`}
                            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/profile/${post.user.id}`) }}
                          >
                            <img
                              src={getSafeImageUrl(post.user.profile_picture, API_URL2) || Default}
                              alt={post.user.name}
                              className="article-avatar"
                              onError={handleImageError}
                            />
                            <span className="article-author">{post.user.name}</span>
                          </span>
                          <div className="article-user-info"
                            style={{
                              display: "flex",
                              alignItems: "center"
                            }}
                          >
                            <div className="article-ai-badges">
                              <span style={{
                                display: "inline-block",
                                fontSize: "0.9rem",
                                padding: "2px 6px",
                                
                                borderRadius: "4.5px",
                                marginLeft: "12px",
                                marginRight: "6px",
                                background: "rgba(2, 2, 2, 0.05)",
                                color: "#666",
                                fontWeight: "500",
                              }}>
                                {getUserStatus(post.user.id)}
                              </span>
                              <span 
                                onClick={() => handleAIStatusClick("Bahs 🤔")}
                                style={{
                                  display: "inline-block",
                                  background: "#2D3748",
                                  padding: "3px 8px",
                                  borderRadius: "12px",
                                  color: "white",
                                  fontSize: "0.8rem",
                                  fontWeight: "500",
                                  opacity: "0.9",
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                  ':hover': {
                                    opacity: "1",
                                    transform: "scale(1.05)"
                                  }
                                }}>
                                Bahs 🤔
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="article-date">{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="article-title">{post.caption}</div>
                      <div
                        className={`article-content${isExpanded ? " expanded" : ""}`}
                        style={{ fontSize: articleFontSize }}
                      >
                        {isExpanded ? post.content : shortContent + (words.length > 10 ? "..." : "")}
                      </div>
                      
                      {/* Additional Media Section */}
                      {post.additional_media && post.additional_media.length > 0 && (
                        <div style={{
                          marginTop: '16px',
                          display: isExpanded ? 'grid' : 'none',
                          gridTemplateColumns: post.additional_media.length === 1 ? '1fr' : 
                                             post.additional_media.length === 2 ? '1fr 1fr' :   
                                             'repeat(auto-fill, minmax(200px, 1fr))',
                          gap: '8px',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}>
                          {post.additional_media.map((media, index) => (
                            <div key={media.id} style={{
                              position: 'relative',
                              paddingBottom: post.additional_media.length === 1 ? '56.25%' : '100%',
                              height: 0,
                              borderRadius: '8px',
                              overflow: 'hidden'
                            }}>
                              {media.media_type === 'image' && (
                                /\.heic$/i.test(media.file_url || media.filename)
                                  ? (
                                    <img
                                      src={Default}
                                      alt="Unsupported format"
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.7
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={media.file_url}
                                      alt={media.filename}
                                      onError={handleImageError}
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                      }}
                                    />
                                  )
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {(words.length > 10 || (post.additional_media && post.additional_media.length > 0)) && (
                        <button
                          className="article-readmore-btn"
                          onClick={() => setExpandedArticles((prev) => ({ ...prev, [post.id]: !isExpanded }))}
                          style={{
                            marginTop: '12px',
                            background: 'none',
                            border: 'none',
                            color: '#008c8c',
                            fontWeight: '500',
                            cursor: 'pointer',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            transition: 'background 0.2s ease'
                          }}
                        >
                          {isExpanded ? "Yopish" : (post.additional_media && post.additional_media.length > 0 ? 
                            `${words.length > 10 ? '...batafsil' : 'Rasmlarni ko\'rish'} (${post.additional_media.length} ta rasm)` : 
                            "...batafsil")}
                        </button>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="article-tags">
                          {post.tags.map((tag, i) => (
                            <span key={i} className="article-tag">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {/* Article actions and useful stats */}
                      <div className="article-actions-row">
                        <button
                          className={`action-button ${likedArticles[post.id] ? "liked" : ""}`}
                          onClick={() => handleArticleLike(post.id)}
                        >
                          {likedArticles[post.id] ? (
                            <svg
                              aria-label="Unlike"
                              className="action-icon"
                              fill="#ed4956"
                              height="24"
                              role="img"
                              viewBox="0 0 48 48"
                              width="24"
                            >
                              <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                            </svg>
                          ) : (
                            <svg
                              aria-label="Like"
                              className="action-icon"
                              fill="none"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="none"
                                stroke="black"
                                strokeWidth="2"
                              ></path>
                            </svg>
                          )}
                        </button>
                        <button className="action-button" onClick={() => handleComment(post.id)}>
                          <svg
                            aria-label="Comment"
                            className="action-icon"
                            fill="none"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path
                              d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                              fill="none"
                              stroke="#000"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></path>
                          </svg>
                        </button>
                        <button className="action-button" onClick={() => handleShare(post.id)}>
                          <svg
                            aria-label="Share post"
                            className="action-icon"
                            fill="#000"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path
                              d="M22 3 9.218 10.083M11.698 20.334 22 3.001 2 3.001 9.218 10.084l2.48 10.25z"
                              fill="none"
                              stroke="#000"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></path>
                          </svg>
                        </button>
                        <div className="useful-people">
                          <span className="useful-people-icon" role="img" aria-label="useful">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m18 9-6-6-6 6" />
                              <path d="M12 3v14" />
                              <path d="M5 21h14" />
                            </svg>
                          </span>
                          <span className="useful-people-count">{usefulStats[post.id]?.usefulCount || 0}</span>
                        </div>
                        <div className="useful-percentage-circle">
                          <svg width="34" height="34" viewBox="0 0 34 34">
                            <circle cx="17" cy="17" r="14" stroke="#e6f4fa" strokeWidth="4" fill="none" />
                            <circle
                              cx="17"
                              cy="17"
                              r="14"
                              stroke="#1da1f2"
                              strokeWidth="4"
                              fill="none"
                              strokeDasharray={2 * Math.PI * 14}
                              strokeDashoffset={
                                2 * Math.PI * 14 * (1 - (usefulStats[post.id]?.initialPercent || 0) / 100)
                              }
                              style={{ transition: "stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)" }}
                            />
                          </svg>
                          <span className="useful-percentage-label">
                            {usefulStats[post.id]?.initialPercent || 0}%
                          </span>
                        </div>
                        <button
                          className={`action-button ${savedPosts[post.id] ? "saved" : ""}`}
                          onClick={() => handleSave(post.id)}
                          style={{ marginLeft: "auto", marginRight: "8px" }}
                        >
                          {savedPosts[post.id] ? (
                            <svg
                              aria-label="Remove"
                              className="action-icon"
                              fill="#000000"
                              height="26"
                              role="img"
                              viewBox="0 0 24 24"
                              width="26"
                            >
                              <polygon
                                fill="#000000"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="none"
                              ></polygon>
                            </svg>
                          ) : (
                            <svg
                              aria-label="Save"
                              className="action-icon"
                              fill="none"
                              height="26"
                              role="img"
                              viewBox="0 0 24 24"
                              width="26"
                            >
                              <polygon
                                fill="none"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></polygon>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  )
                } else {
                  // Regular post rendering
                  return (
                    <div key={post.id} className="post milliy-post" ref={isLastItem ? lastPostElementRef : null}>
                      {/* AI Status Badge */}
                      <div
                        className={`ai-status-badge ai-status-${getAIStatus(post)}`}
                        onClick={() => showAIStatusDescription(getAIStatus(post))}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          top: "35px",
                          right: "16px",
                          left: "auto",
                          padding: "4px 12px",
                          color: "#222",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                          fontWeight: 700,
                          zIndex: 2,
                          minWidth: "unset",
                          maxWidth: "60vw",
                          flexWrap: "nowrap",
                          letterSpacing: "0.01em",
                          boxShadow: "none",
                          fontStyle: "italic",
                        }}
                      >
                        <span style={{ fontSize: "14px", fontWeight: 700 }}>
                          <span
                            style={{
                              fontSize: "15px",
                              fontStyle: "normal",
                            }}
                          >
                            AI tekshirgan:{" "}
                          </span>
                          {AI_STATUS_CONFIG[getAIStatus(post)].label}
                        </span>
                      </div>

                      {/* AI Status Description Modal */}
                      {showStatusModal && selectedStatus === getAIStatus(post) && (
                        <div
                          className="ai-status-modal"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowStatusModal(false)
                          }}
                          style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.35)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000,
                            padding: "20px",
                          }}
                        >
                          <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "18px",
                              padding: "22px",
                              maxWidth: "95%",
                              width: "340px",
                              position: "relative",
                              boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                            }}
                          >
                            <p
                              style={{
                                margin: "0",
                                fontSize: "14px",
                                lineHeight: "1.6",
                                color: "#333",
                                textAlign: "left",
                              }}
                            >
                              {AI_STATUS_CONFIG[selectedStatus].description}
                            </p>
                            <button
                              onClick={() => setShowStatusModal(false)}
                              style={{
                                position: "absolute",
                                top: "-12px",
                                right: "-12px",
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                border: "none",
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                              }}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="post-header">
                        <div
                          className="post-avatar"
                          style={{
                            borderRadius: "50%",
                            padding: "3px",
                            boxShadow: "0 2px 8px rgba(80,80,180,0.10)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "58px",
                            height: "58px",
                          }}
                        >
                          <span
  style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
  onClick={() => navigate(`/profile/${post.user.id}`)}
  tabIndex={0}
  role="button"
  aria-label={`View ${post.user.name}'s profile`}
  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/profile/${post.user.id}`) }}
>
  <img
    src={getSafeImageUrl(post.user.profile_picture, API_URL2) || "/placeholder.svg"}
    alt={post.user.name}
    className="avatar-img"
    onError={handleImageError}
    style={{
      borderRadius: "50%",
      width: "52px",
      height: "52px",
      objectFit: "cover",
      border: "2px solid #fff",
    }}
  />
</span>
                        </div>
                        <div className="post-user-info">
                          <div className="user-name-container">
                            <span
  style={{ cursor: "pointer", display: "inline-block" }}
  onClick={() => navigate(`/profile/${post.user.id}`)}
  tabIndex={0}
  role="button"
  aria-label={`View ${post.user.name}'s profile`}
  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/profile/${post.user.id}`) }}
>
  <div
    className="user-name"
    style={{
      color: "#262626",
      fontWeight: 700,
      fontSize: "16px",
      letterSpacing: "0.01em",
    }}
  >
    {post.user.name} <span style={statusStyles.statusPostAndArticle}>{getUserStatus(post.user.id)}</span>
  </div>
</span>
                            {post.is_own_post && (
                              <div className="verification-badge">
                                <svg className="verification-icon-small" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          {post.location_name && <div className="user-location">{post.location_name}</div>}
                        </div>
                      </div>

                      <div className="post-image">
                        {(() => {
                          const allMedia = post.main_media ? [post.main_media, ...post.additional_media] : []
                          const currentIndex = activeMediaIndices[post.id] || 0
                          const currentMedia = allMedia[currentIndex]

                          return allMedia.length > 0 ? (
                            <div className="carousel-container">
                              <div
                                className="media-container"
                                style={{ position: "relative" }}
                                onTouchStart={(e) => {
                                  handleTouchStart(e, post.id)
                                  handleMediaLongPressStart(post.id)
                                }}
                                onTouchMove={(e) => handleTouchMove(e, post.id)}
                                onTouchEnd={() => {
                                  handleTouchEnd(post.id)
                                  handleMediaLongPressEnd(post.id)
                                }}
                                                               onMouseDown={(e) => {
                                  handleMouseDown(e, post.id)
                                  handleMediaLongPressStart(post.id)
                                }}
                                onMouseMove={(e) => handleMouseMove(e, post.id)}
                                onMouseUp={() => {
                                  handleMouseUp(post.id)
                                  handleMediaLongPressEnd(post.id)
                                }}
                                onMouseLeave={() => {
                                  handleMouseLeave(post.id)
                                  handleMediaLongPressEnd(post.id)
                                }}
                              >
                                {/* Phase 1: Holding (no visual feedback) */}
                                {mediaHolding[post.id] && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "0",
                                      left: "0",
                                      right: "0",
                                      bottom: "0",
                                      zIndex: 5,
                                      // background: "rgba(0,0,0,0.1)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "white",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        // textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                                      }}
                                    >
                                      {/* Bosib turing... */}
                                    </div>
                                  </div>
                                )}

                                {/* Phase 2: Progress Bar */}
                                {showProgressBar[post.id] && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "0",
                                      left: "0",
                                      right: "0",
                                      bottom: "0",
                                      zIndex: 10,
                                      background: "rgba(0,0,0,0.7)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      backdropFilter: "blur(2px)",
                                    }}
                                  >
                                    <div
                                      style={{
                                        background: "rgba(255,255,255,0.95)",
                                        borderRadius: "20px",
                                        padding: "24px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "16px",
                                        minWidth: "160px",
                                        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                                      }}
                                    >
                                      {/* Progress Circle */}
                                      <div
                                        style={{
                                          width: "80px",
                                          height: "80px",
                                          position: "relative",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <svg
                                          style={{
                                            width: "80px",
                                            height: "80px",
                                            transform: "rotate(-90deg)",
                                            position: "absolute",
                                          }}
                                        >
                                          <circle
                                            cx="40"
                                            cy="40"
                                            r="32"
                                            stroke="rgba(59, 130, 246, 0.2)"
                                            strokeWidth="6"
                                            fill="none"
                                          />
                                          <circle
                                            cx="40"
                                            cy="40"
                                            r="32"
                                            stroke="#3b82f6"
                                            strokeWidth="6"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray={201.06}
                                            strokeDashoffset={201.06 - (mediaProgress[post.id] / 100) * 201.06}
                                            style={{
                                              transition: "stroke-dashoffset 0.1s ease",
                                            }}
                                          />
                                        </svg>
                                        <div
                                          style={{
                                            color: "#3b82f6",
                                            fontSize: "18px",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                          }}
                                        >
                                          {Math.round(mediaProgress[post.id])}%
                                        </div>
                                      </div>

                                      <div
                                        style={{
                                          textAlign: "center",
                                          color: "#374151",
                                          fontSize: "14px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Baholanmoqda...
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Phase 3: Success with Confetti */}
                                {showSuccess[post.id] && (
                                  <div
                                    className="super-ai-success"
                                    style={{
                                      position: "absolute",
                                      top: "0",
                                      left: "0",
                                      right: "0",
                                      bottom: "0",
                                      zIndex: 15,
                                      background: "rgba(16, 185, 129, 0.15)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      backdropFilter: "blur(3px)",
                                      animation: "superAiFadeIn 0.4s ease-out",
                                    }}
                                  >
                                    {/* Confetti particles */}
                                    <div className="confetti-container">
                                      {[...Array(12)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="confetti-particle"
                                          style={{
                                            position: "absolute",
                                            width: "8px",
                                            height: "8px",
                                            background: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"][i % 5],
                                            borderRadius: "50%",
                                            animation: `confettiFall 2s ease-out ${i * 0.1}s infinite`,
                                            left: `${20 + (i * 60) / 12}%`,
                                            top: "20%",
                                          }}
                                        />
                                      ))}
                                    </div>

                                    <div
                                      style={{
                                        background: "rgba(255,255,255,0.95)",
                                        borderRadius: "24px",
                                        padding: "32px 24px",
                                        textAlign: "center",
                                        maxWidth: "280px",
                                        width: "90%",
                                        boxShadow: "0 16px 64px rgba(0,0,0,0.2)",
                                        animation: "superAiBounceIn 0.6s ease-out 0.2s both",
                                      }}
                                    >
                                      {/* Success Icon */}
                                      <div
                                        style={{
                                          width: "64px",
                                          height: "64px",
                                          background: "linear-gradient(135deg, #10b981, #059669)",
                                          borderRadius: "50%",
                                          margin: "0 auto 20px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          animation: "superAiPulse 1.5s infinite",
                                        }}
                                      >
                                        <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                        </svg>
                                      </div>

                                      {/* Success Message */}
                                      <h3
                                        style={{
                                          color: "#1f2937",
                                          fontSize: "20px",
                                          fontWeight: "700",
                                          margin: "0 0 8px 0",
                                        }}
                                      >
                                        Qabul qilindi!
                                      </h3>

                                      <p
                                        style={{
                                          color: "#6b7280",
                                          fontSize: "14px",
                                          margin: "0",
                                        }}
                                      >
                                        Sizning fikringiz muhim
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {/* Media content */}
                                {currentMedia && currentMedia.media_type === "image" ? (
                                  <img
                                    src={
                                      currentMedia.file_url.startsWith("http")
                                        ? currentMedia.file_url
                                        : `https://${API_HOST}${currentMedia.file_url}`
                                    }
                                    alt="Post content"
                                    className="post-img"
                                    loading="lazy"
                                    onError={handleImageError}
                                    draggable="false"
                                  />
                                ) : (
                                  currentMedia && (
                                    <video
                                      src={
                                        currentMedia.file_url.startsWith("http")
                                          ? currentMedia.file_url
                                          : `https://${API_HOST}${currentMedia.file_url}`
                                      }
                                      controls
                                      className="post-video"
                                      preload="metadata"
                                      onError={(e) => {
                                        e.target.onerror = null
                                        e.target.poster = Default
                                      }}
                                    />
                                  )
                                )}
                              </div>

                              {allMedia.length > 1 && (
                                <div className="carousel-indicators">
                                  {allMedia.map((_, index) => (
                                    <span
                                      key={index}
                                      className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveMediaIndices((prev) => ({
                                          ...prev,
                                          [post.id]: index,
                                        }))
                                      }}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : null
                        })()}
                      </div>

                      <div className="post-actions">
                        <div className="action-buttons" style={{}}>
                          <div className="action-buttons-left">
                            <button
                              className={`action-button ${likedPosts[post.id] ? "liked" : ""}`}
                              onClick={() => handleLike(post.id)}
                            >
                              {likedPosts[post.id] ? (
                                <svg
                                  aria-label="Unlike"
                                  className="action-icon"
                                  fill="#ed4956"
                                  height="24"
                                  role="img"
                                  viewBox="0 0 48 48"
                                  width="24"
                                >
                                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                </svg>
                              ) : (
                                <svg
                                  aria-label="Like"
                                  className="action-icon"
                                  fill="none"
                                  height="24"
                                  role="img"
                                  viewBox="0 0 24 24"
                                  width="24"
                                >
                                  <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="2"
                                  ></path>
                                </svg>
                              )}
                            </button>
                            <button className="action-button" onClick={() => handleComment(post.id)}>
                              <svg
                                aria-label="Comment"
                                className="action-icon"
                                fill="none"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path
                                  d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                  fill="none"
                                  stroke="#000"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                ></path>
                              </svg>
                            </button>
                            <button className="action-button" onClick={() => handleShare(post.id)}>
                              <svg
                                aria-label="Share post"
                                className="action-icon"
                                fill="#000"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path
                                  d="M22 3 9.218 10.083M11.698 20.334 22 3.001 2 3.001 9.218 10.084l2.48 10.25z"
                                  fill="none"
                                  stroke="#000"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                ></path>
                              </svg>
                            </button>
                            <div className="useful-people">
                              <span className="useful-people-icon" role="img" aria-label="useful">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m18 9-6-6-6 6" />
                                  <path d="M12 3v14" />
                                  <path d="M5 21h14" />
                                </svg>
                              </span>
                              <span className="useful-people-count">{usefulStats[post.id]?.usefulCount || 0}</span>
                            </div>
                            <div className="useful-percentage-circle">
                              <svg width="34" height="34" viewBox="0 0 34 34">
                                <circle cx="17" cy="17" r="14" stroke="#e6f4fa" strokeWidth="4" fill="none" />
                                <circle
                                  cx="17"
                                  cy="17"
                                  r="14"
                                  stroke="#1da1f2"
                                  strokeWidth="4"
                                  fill="none"
                                  strokeDasharray={2 * Math.PI * 14}
                                  strokeDashoffset={
                                    2 * Math.PI * 14 * (1 - (usefulStats[post.id]?.initialPercent || 0) / 100)
                                  }
                                  style={{ transition: "stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)" }}
                                />
                              </svg>
                              <span className="useful-percentage-label">
                                {usefulStats[post.id]?.initialPercent || 0}%
                              </span>
                            </div>
                          </div>
                          <div className="useful-stats-row"></div>
                          <button
                            className={`action-button ${savedPosts[post.id] ? "saved" : ""}`}
                            onClick={() => handleSave(post.id)}
                            style={{ marginLeft: "auto", marginRight: "8px" }}
                          >
                            {savedPosts[post.id] ? (
                              <svg
                                aria-label="Remove"
                                className="action-icon"
                                fill="#000000"
                                height="26"
                                role="img"
                                viewBox="0 0 24 24"
                                width="26"
                            >
                              <polygon
                                fill="#000000"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="none"
                              ></polygon>
                            </svg>
                            ) : (
                              <svg
                                aria-label="Save"
                                className="action-icon"
                                fill="none"
                                height="26"
                                role="img"
                                viewBox="0 0 24 24"
                                width="26"
                              >
                              <polygon
                                fill="none"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></polygon>
                            </svg>
                            )}
                          </button>
                        </div>

                        <div className="likes-container">
                          {post.likes_count > 0 && (
                            <div className="likes-avatars">
                              <div className="like-avatar">
                                <img
                                  src={instaImg || Default}
                                  alt="Liker"
                                  className="like-avatar-img"
                                  onError={handleImageError}
                                />
                              </div>
                            </div>
                          )}
                          <div className="likes-text">
                            {post.likes_count > 0 ? (
                              <>
                                <span className="bold-text">
                                  {post.likes_count} {post.likes_count === 1 ? "like" : "likes"}
                                </span>
                              </>
                            ) : (
                              <>Be the first to like this</>
                            )}
                          </div>
                        </div>

                        {post.comments_count > 0 && (
                          <div className="comments-count" onClick={() => handleComment(post.id)}>
                            View all {post.comments_count} {post.comments_count === 1 ? "comment" : "comments"}
                          </div>
                        )}

                        {post.caption && (
                          <div className="post-caption">
                            <span className="bold-text">{post.user.name}</span>{" "}
                            {expandedCaptions[post.id] || post.caption.length <= 100 ? (
                              <span>{post.caption}</span>
                            ) : (
                              <>
                                <span>{post.caption.substring(0, 100)}...</span>
                                <button
                                  className="more-button"
                                  onClick={() => setExpandedCaptions({ ...expandedCaptions, [post.id]: true })}
                                >
                                  more
                                </button>
                              </>
                            )}
                          </div>
                        )}

                        <div className="post-date">
                          {new Date(post.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            : !isLoading && (
                <div className="no-posts-message">
                  <p>No posts available. Follow users to see their posts here.</p>
                </div>
              )}

          {isLoading && (
            <>
              {[1, 2, 3].map((_, index) => (
                <div key={`skeleton-${index}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="post skeleton-post">
                    <div className="post-header">
                      <div className="skeleton-avatar"></div>
                      <div className="post-user-info">
                        <div className="skeleton-text skeleton-username"></div>
                        <div className="skeleton-text skeleton-location"></div>
                      </div>
                      <div className="skeleton-icon right-icon"></div>
                    </div>
                    <div className="skeleton-image"></div>
                    <div className="post-actions">
                      <div className="action-buttons">
                        <div className="skeleton-icon"></div>
                        <div className="skeleton-icon"></div>
                        <div className="skeleton-icon"></div>
                        <div className="skeleton-icon right-icon"></div>
                      </div>
                      <div className="skeleton-text skeleton-caption-line"></div>
                      <div className="skeleton-text skeleton-caption-line short"></div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {isLoading && posts.length > 0 && <div className="loading-text">Loading more posts...</div>}

          {!isLoading && !hasMore && posts.length > 0 && <div className="loading-text">No more posts to load</div>}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="bottom-nav-container">
          <div className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === "home" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("home")}
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
                setActiveTab("addContent")
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

export default Home

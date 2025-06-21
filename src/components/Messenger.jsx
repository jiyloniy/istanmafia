"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./messenger.css"
import profile1 from "../assets/1.jpg"
import logo from "../assets/25.png"
import savedMessage from "../assets/3.png"
import zugerberk from "../assets/4.webp"
import pichaai from "../assets/5.jpg"
import sam from "../assets/7.webp"
import ChatView from './ChatView';
import { Users, Lock, Unlock, BadgeCheck, UserCheck, Lightbulb, Calendar, Video, FileText, MessageCircle, MessageSquare, TrendingUp, Coins, Award } from 'lucide-react';

const Messenger = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Suhbatlar")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChat, setSelectedChat] = useState(null);

  const [clubTab, setClubTab] = useState('Barchasi');

  const handleChatClick = (chat) => {
    // Guruhlar uchun ham xabarlar mavjud bo'lsa, ChatView ochiladi
    if (chat.messages) {
      setSelectedChat(chat);
    }
    // Aks holda, hozircha hech narsa qilinmaydi yoki kelajakda boshqa funksiya qo'shish mumkin
  };

  // Fix the allChats object by removing duplicate keys and ensuring all tab IDs have corresponding data
  const allChats = {
    Suhbatlar: [
      {
        id: 1,
        name: "Saqlangan habarlar",
        message: "Kerakli narsalarim",
        time: "04:20 AM",
        image: savedMessage,
        messages: [
          { id: 1, text: "Kerakli link: https://react.dev/", time: "04:20 AM", sender: "me" },
          { id: 2, text: "Ertangi uchrashuvni unutmaslik.", time: "04:21 AM", sender: "me" },
          { id: 3, text: "Istanmafia loyihasini yakunlash kerak.", time: "04:22 AM", sender: "me" },
          { id: 4, text: "Passport skaneri: /docs/passport.pdf", time: "04:23 AM", sender: "me" },
          { id: 5, text: "To'lov kvitansiyasi: /docs/payment.png", time: "04:24 AM", sender: "me" },
          { id: 6, text: "Frontend uchun cheat sheet", time: "04:25 AM", sender: "me" },
          { id: 7, text: "React hooks haqida maqola", time: "04:26 AM", sender: "me" },
          { id: 8, text: "Portfolio uchun rasm: /images/portfolio.jpg", time: "04:27 AM", sender: "me" },
          { id: 9, text: "Ishga kirish uchun savollar", time: "04:28 AM", sender: "me" },
          { id: 10, text: "Telegram bot token: 123456:ABC-DEF", time: "04:29 AM", sender: "me" },
          { id: 11, text: "Yangi loyiha g'oyasi: AI yordamchi", time: "04:30 AM", sender: "me" },
          { id: 12, text: "Dasturiy ta'minot litsenziyasi", time: "04:31 AM", sender: "me" },
          { id: 13, text: "O'qish uchun kitoblar ro'yxati", time: "04:32 AM", sender: "me" },
          { id: 14, text: "Ish jadvali: 09:00-18:00", time: "04:33 AM", sender: "me" },
          { id: 15, text: "Portfolio link: github.com/username", time: "04:34 AM", sender: "me" },
          { id: 16, text: "Dizayn uchun rang palitrasi", time: "04:35 AM", sender: "me" },
          { id: 17, text: "Yangi kontakt: +998 90 123 45 67", time: "04:36 AM", sender: "me" },
          { id: 18, text: "Zoom uchrashuv havolasi", time: "04:37 AM", sender: "me" },
          { id: 19, text: "Ish haqi hisoboti", time: "04:38 AM", sender: "me" },
          { id: 20, text: "Oylik reja: 1. Kurs, 2. Portfolio, 3. Ish", time: "04:39 AM", sender: "me" },
          { id: 21, text: "Yangi loyiha uchun deadline: 15-iyun", time: "04:40 AM", sender: "me" },
          { id: 22, text: "O'qish uchun maqola: https://dev.to/", time: "04:41 AM", sender: "me" },
        ]
      },
      {
        id: 2,
        name: "Istan Yordam",
        message: "Yangi kirish amalga oshirildi",
        time: "11:38 AM",
        image: logo,
        verified: true,
        unread: 1,
        messages: [
          { id: 1, text: "Assalomu alaykum! Sizga qanday yordam bera olamiz?", time: "11:30 AM", sender: "them" },
          { id: 2, text: "Yangi kirish amalga oshirildi", time: "11:38 AM", sender: "them" },
          { id: 3, text: "Vaalaykum assalom. Bu men emas edim. Hisobim xavfsizligini qanday ta'minlashim mumkin?", time: "11:40 AM", sender: "me" },
          { id: 4, text: "Xavotir olmang. Parolni o'zgartiring va ikki faktorli autentifikatsiyani yoqing.", time: "11:41 AM", sender: "them" },
          { id: 5, text: "Rahmat, hozir bajaraman.", time: "11:42 AM", sender: "me" },
          { id: 6, text: "Qo'shimcha savollaringiz bo'lsa, yozing.", time: "11:43 AM", sender: "them" },
          { id: 7, text: "Ikki faktorli autentifikatsiyani yoqdim.", time: "11:44 AM", sender: "me" },
          { id: 8, text: "Ajoyib! Endi hisobingiz xavfsiz.", time: "11:45 AM", sender: "them" },
          { id: 9, text: "Yangi qurilmadan kirishda ogohlantirish olamanmi?", time: "11:46 AM", sender: "me" },
          { id: 10, text: "Ha, email va telefon raqamingizga xabar boradi.", time: "11:47 AM", sender: "them" },
          { id: 11, text: "Yordam uchun rahmat!", time: "11:48 AM", sender: "me" },
          { id: 12, text: "Doimo yordam beramiz.", time: "11:49 AM", sender: "them" },
          { id: 13, text: "Hisobimda shubhali faollik bo'lsa, qanday bilsam bo'ladi?", time: "11:50 AM", sender: "me" },
          { id: 14, text: "Sozlamalardan 'Faollik tarixi' bo'limini tekshiring.", time: "11:51 AM", sender: "them" },
          { id: 15, text: "Tushunarli, rahmat.", time: "11:52 AM", sender: "me" },
          { id: 16, text: "Yangi xususiyatlar haqida xabar bering.", time: "11:53 AM", sender: "me" },
          { id: 17, text: "Albatta, yangiliklar bo'lsa, sizga xabar qilamiz.", time: "11:54 AM", sender: "them" },
          { id: 18, text: "Botdan qanday foydalanaman?", time: "11:55 AM", sender: "me" },
          { id: 19, text: "Bot uchun /help buyrug'ini yuboring.", time: "11:56 AM", sender: "them" },
          { id: 20, text: "Yordam uchun yana rahmat!", time: "11:57 AM", sender: "me" },
          { id: 21, text: "Omad!", time: "11:58 AM", sender: "them" },
        ]
      },
      {
        id: 3,
        name: "Otabek Arabboyev",
        message: "Telefon qilib yuboring, muhim masala bor",
        time: "10:24 AM",
        image: profile1,
        sent: true,
        messages: [
          { id: 1, text: 'Assalomu alaykum, Otabek aka.', time: '10:20 AM', sender: 'them' },
          { id: 2, text: 'Vaalaykum assalom. Yaxshimisiz?', time: '10:21 AM', sender: 'me' },
          { id: 3, text: 'Rahmat, yaxshi. O\'zingiz tinchmisiz?', time: '10:22 AM', sender: 'them' },
          { id: 4, text: 'Telefon qilib yuboring, muhim masala bor', time: '10:24 AM', sender: 'them' },
          { id: 5, text: 'Ho\'p bo\'ladi, hozir telefon qilaman.', time: '10:25 AM', sender: 'me' },
          { id: 6, text: 'Kutaman.', time: '10:26 AM', sender: 'them' },
          { id: 7, text: 'Aloqa bo\'lmadi, yana urinib ko\'ring.', time: '10:27 AM', sender: 'them' },
          { id: 8, text: 'Yana bir marta telefon qilaman.', time: '10:28 AM', sender: 'me' },
          { id: 9, text: 'Rahmat.', time: '10:29 AM', sender: 'them' },
          { id: 10, text: 'Masala haqida qisqacha yozib yuboring.', time: '10:30 AM', sender: 'me' },
          { id: 11, text: 'Yangi loyiha uchun hamkor kerak.', time: '10:31 AM', sender: 'them' },
          { id: 12, text: 'Qaysi sohada?', time: '10:32 AM', sender: 'me' },
          { id: 13, text: 'Web dasturlash.', time: '10:33 AM', sender: 'them' },
          { id: 14, text: 'Tajriba talab qilinadimi?', time: '10:34 AM', sender: 'me' },
          { id: 15, text: 'Ha, kamida 2 yil.', time: '10:35 AM', sender: 'them' },
          { id: 16, text: 'Portfolio yuborsam bo\'ladimi?', time: '10:36 AM', sender: 'me' },
          { id: 17, text: 'Albatta.', time: '10:37 AM', sender: 'them' },
          { id: 18, text: 'Yubordim.', time: '10:38 AM', sender: 'me' },
          { id: 19, text: 'Ko\'rib chiqaman.', time: '10:39 AM', sender: 'them' },
          { id: 20, text: 'Javobingizni kutaman.', time: '10:40 AM', sender: 'me' },
          { id: 21, text: 'Bugun javob beraman.', time: '10:41 AM', sender: 'them' },
        ]
      },
      {
        id: 4,
        name: "Abduqodir oshna",  
        message: "Ok, ko'rishguncha. Ehtiyot bo'ling!",
        time: "Thu",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60",
        sent: true,
        messages: [
          { id: 1, text: "Salom, qayerdasan?", time: "09:00 AM", sender: "me" },
          { id: 2, text: "Ishdaman, kechroq uchrashamizmi?", time: "09:01 AM", sender: "them" },
          { id: 3, text: "Bo'ladi, 18:00 da Chorsuda ko'rishamiz.", time: "09:02 AM", sender: "me" },
          { id: 4, text: "Ok, ko'rishguncha.", time: "09:03 AM", sender: "them" },
          { id: 5, text: "Ehtiyot bo'ling!", time: "09:04 AM", sender: "me" },
          { id: 6, text: "Siz ham.", time: "09:05 AM", sender: "them" },
          { id: 7, text: "Qaysi kafeda o'tiramiz?", time: "09:06 AM", sender: "me" },
          { id: 8, text: "KofeLabda.", time: "09:07 AM", sender: "them" },
          { id: 9, text: "Yaxshi, ko'rdim.", time: "09:08 AM", sender: "me" },
          { id: 10, text: "Yangi loyiha haqida gaplashamizmi?", time: "09:09 AM", sender: "them" },
          { id: 11, text: "Ha, albatta.", time: "09:10 AM", sender: "me" },
          { id: 12, text: "Portfolio olib kelaman.", time: "09:11 AM", sender: "me" },
          { id: 13, text: "Kutaman.", time: "09:12 AM", sender: "them" },
          { id: 14, text: "Telefoningizni zaryad qilib oling.", time: "09:13 AM", sender: "them" },
          { id: 15, text: "Rahmat, eslab qo'ydim.", time: "09:14 AM", sender: "me" },
          { id: 16, text: "Yana kimlar keladi?", time: "09:15 AM", sender: "me" },
          { id: 17, text: "Jasur ham keladi.", time: "09:16 AM", sender: "them" },
          { id: 18, text: "Ajoyib!", time: "09:17 AM", sender: "me" },
          { id: 19, text: "Ko'rishguncha!", time: "09:18 AM", sender: "them" },
          { id: 20, text: "Ko'rishguncha.", time: "09:19 AM", sender: "me" },
        ]
      },
      {
        id: 5,
        name: "Elon Musk",
        message: "X platformasi uchun yangi g'oyalaringiz bormi?",
        time: "Wed",
        image: "https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg",
        unread: 2,
        verified: true,
        messages: [
          { id: 1, text: 'X platformasi uchun yangi g\'oyalaringiz bormi?', time: '10:00 AM', sender: 'them' },
          { id: 2, text: 'Ha, AI asosida kontent moderatsiyasi tizimini taklif qilaman.', time: '10:01 AM', sender: 'me' },
          { id: 3, text: 'Qiziq. Prototip bormi?', time: '10:02 AM', sender: 'them' },
          { id: 4, text: 'Ha, kelasi hafta taqdimot qilaman.', time: '10:03 AM', sender: 'me' },
          { id: 5, text: 'Ajoyib! Kutaman.', time: '10:04 AM', sender: 'them' },
          { id: 6, text: 'Yana qanday g\'oyalar bor?', time: '10:05 AM', sender: 'them' },
          { id: 7, text: 'Spam filtrlash uchun ML model.', time: '10:06 AM', sender: 'me' },
          { id: 8, text: 'Beta testga taklif qilaman.', time: '10:07 AM', sender: 'them' },
          { id: 9, text: 'Albatta, ishtirok etaman.', time: '10:08 AM', sender: 'me' },
          { id: 10, text: 'Xizmat uchun to\'lov qanday?', time: '10:09 AM', sender: 'them' },
          { id: 11, text: 'Freemium model.', time: '10:10 AM', sender: 'me' },
          { id: 12, text: 'Investorlar bormi?', time: '10:11 AM', sender: 'them' },
          { id: 13, text: 'Hozircha yo\'q.', time: '10:12 AM', sender: 'me' },
          { id: 14, text: 'Pitch deck yuboring.', time: '10:13 AM', sender: 'them' },
          { id: 15, text: 'Yubordim.', time: '10:14 AM', sender: 'me' },
          { id: 16, text: 'Ko\'rib chiqaman.', time: '10:15 AM', sender: 'them' },
          { id: 17, text: 'Feedback kutaman.', time: '10:16 AM', sender: 'me' },
          { id: 18, text: 'Albatta.', time: '10:17 AM', sender: 'them' },
          { id: 19, text: 'Yangi loyiha uchun omad!', time: '10:18 AM', sender: 'them' },
          { id: 20, text: 'Rahmat!', time: '10:19 AM', sender: 'me' },
        ]
      },
      {
        id: 6,
        name: "Mark Zuckerberg",
        message: "Threads ilovasini ko'rib chiqdingizmi?",
        time: "Wed",
        image: zugerberk,
        verified: true,
        messages: [
          { id: 1, text: "Threads ilovasini ko'rib chiqdingizmi?", time: "08:00 AM", sender: "them" },
          { id: 2, text: "Ha, ko'rdim. Raqobatchilarni o'rganish muhim.", time: "08:01 AM", sender: "me" },
          { id: 3, text: "Fikringiz qanday?", time: "08:02 AM", sender: "them" },
          { id: 4, text: "Yaxshi boshlanish, lekin hali ancha ishlash kerak.", time: "08:03 AM", sender: "me" },
          { id: 5, text: "Yangi funksiyalar qo'shishni rejalashtiryapsizmi?", time: "08:04 AM", sender: "them" },
          { id: 6, text: "Ha, tez orada stories ham bo'ladi.", time: "08:05 AM", sender: "me" },
          { id: 7, text: "Beta testga taklif qilasizmi?", time: "08:06 AM", sender: "them" },
          { id: 8, text: "Albatta.", time: "08:07 AM", sender: "me" },
          { id: 9, text: "Feedback yuboraman.", time: "08:08 AM", sender: "them" },
          { id: 10, text: "Kutaman.", time: "08:09 AM", sender: "me" },
          { id: 11, text: "Instagram bilan integratsiya bo'ladimi?", time: "08:10 AM", sender: "them" },
          { id: 12, text: "Ha, API tayyorlanmoqda.", time: "08:11 AM", sender: "me" },
          { id: 13, text: "Ajoyib!", time: "08:12 AM", sender: "them" },
          { id: 14, text: "Yangi dizayn haqida nima deysiz?", time: "08:13 AM", sender: "me" },
          { id: 15, text: "Minimalist uslub yaxshi.", time: "08:14 AM", sender: "them" },
          { id: 16, text: "Rahmat.", time: "08:15 AM", sender: "me" },
          { id: 17, text: "Yangi loyihalar kutyapman.", time: "08:16 AM", sender: "them" },
          { id: 18, text: "Tez orada e'lon qilamiz.", time: "08:17 AM", sender: "me" },
          { id: 19, text: "Omad!", time: "08:18 AM", sender: "them" },
          { id: 20, text: "Rahmat!", time: "08:19 AM", sender: "me" },
        ]
      },
      {
        id: 7,
        name: "Sundar Pichai",
        message: "Google I/O tadbiriga taklif qilaman",
        time: "Wed",
        image: pichaai,
        verified: true,
        unread: 3,
        messages: [
          { id: 1, text: "Google I/O tadbiriga taklif qilaman", time: "07:00 AM", sender: "them" },
          { id: 2, text: "Rahmat, qatnashaman!", time: "07:01 AM", sender: "me" },
          { id: 3, text: "Sizni u yerda ko'rishdan xursand bo'laman.", time: "07:02 AM", sender: "them" },
          { id: 4, text: "Men ham.", time: "07:03 AM", sender: "me" },
          { id: 5, text: "Yangi mahsulotlar taqdimoti bo'ladi.", time: "07:04 AM", sender: "them" },
          { id: 6, text: "AI haqida ham gaplashamizmi?", time: "07:05 AM", sender: "me" },
          { id: 7, text: "Ha, asosiy mavzu AI.", time: "07:06 AM", sender: "them" },
          { id: 8, text: "Panelda qatnashaman.", time: "07:07 AM", sender: "me" },
          { id: 9, text: "Savollar tayyorlab qo'ying.", time: "07:08 AM", sender: "them" },
          { id: 10, text: "Albatta.", time: "07:09 AM", sender: "me" },
          { id: 11, text: "Networking uchun imkoniyatlar ham bo'ladi.", time: "07:10 AM", sender: "them" },
          { id: 12, text: "Ajoyib!", time: "07:11 AM", sender: "me" },
          { id: 13, text: "Tadbir joyi: Google HQ", time: "07:12 AM", sender: "them" },
          { id: 14, text: "Manzilni yuboring.", time: "07:13 AM", sender: "me" },
          { id: 15, text: "Maps havolasi: goo.gl/maps/xyz", time: "07:14 AM", sender: "them" },
          { id: 16, text: "Ko'rdim, rahmat.", time: "07:15 AM", sender: "me" },
          { id: 17, text: "Ko'rishguncha!", time: "07:16 AM", sender: "them" },
          { id: 18, text: "Ko'rishguncha.", time: "07:17 AM", sender: "me" },
          { id: 19, text: "Omad!", time: "07:18 AM", sender: "them" },
          { id: 20, text: "Rahmat!", time: "07:19 AM", sender: "me" },
        ]
      },
      {
        id: 8,
        name: "Satya Nadella",
        message: "Microsoft Teams yangilanishini ko'rdingizmi?",
        time: "Tue",
        image: "https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg",
        verified: true,
        messages: [
          { id: 1, text: "Microsoft Teams yangilanishini ko'rdingizmi?", time: "06:00 AM", sender: "them" },
          { id: 2, text: "Ha, yangi funksiyalar juda qulay.", time: "06:01 AM", sender: "me" },
          { id: 3, text: "Ayniqsa, AI yordamchisi.", time: "06:02 AM", sender: "them" },
          { id: 4, text: "Ha, bu ish samaradorligini oshiradi.", time: "06:03 AM", sender: "me" },
          { id: 5, text: "Yangi interfeys haqida nima deysiz?", time: "06:04 AM", sender: "them" },
          { id: 6, text: "Minimalist va qulay.", time: "06:05 AM", sender: "me" },
          { id: 7, text: "Integratsiyalar soni oshdi.", time: "06:06 AM", sender: "them" },
          { id: 8, text: "Slack bilan solishtirdingizmi?", time: "06:07 AM", sender: "me" },
          { id: 9, text: "Ha, Teamsda ko'proq imkoniyat bor.", time: "06:08 AM", sender: "them" },
          { id: 10, text: "Yangi update uchun rahmat.", time: "06:09 AM", sender: "me" },
          { id: 11, text: "Feedback uchun minnatdorman.", time: "06:10 AM", sender: "them" },
          { id: 12, text: "Yangi xususiyatlar kutyapman.", time: "06:11 AM", sender: "me" },
          { id: 13, text: "Tez orada e'lon qilamiz.", time: "06:12 AM", sender: "them" },
          { id: 14, text: "Beta testga taklif qilasizmi?", time: "06:13 AM", sender: "me" },
          { id: 15, text: "Albatta.", time: "06:14 AM", sender: "them" },
          { id: 16, text: "Omad!", time: "06:15 AM", sender: "me" },
          { id: 17, text: "Sizga ham!", time: "06:16 AM", sender: "them" },
          { id: 18, text: "Ko'rishguncha.", time: "06:17 AM", sender: "me" },
          { id: 19, text: "Ko'rishguncha.", time: "06:18 AM", sender: "them" },
          { id: 20, text: "Yangi loyiha haqida yozaman.", time: "06:19 AM", sender: "me" },
        ]
      },
      {
        id: 9,
        name: "Tim Cook",
        message: "Vision Pro haqida fikringiz qanday?",
        time: "Mon",
        image: "https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg",
        verified: true,
        sent: true,
        messages: [
          { id: 1, text: "Vision Pro haqida fikringiz qanday?", time: "05:00 AM", sender: "them" },
          { id: 2, text: "Innovatsion mahsulot, kelajagi bor.", time: "05:01 AM", sender: "me" },
          { id: 3, text: "Narxi biroz qimmat emasmi?", time: "05:02 AM", sender: "them" },
          { id: 4, text: "Ha, lekin texnologiya uchun arziydi.", time: "05:03 AM", sender: "me" },
          { id: 5, text: "AR va VR imkoniyatlari qanday?", time: "05:04 AM", sender: "them" },
          { id: 6, text: "Juda yuqori darajada.", time: "05:05 AM", sender: "me" },
          { id: 7, text: "Dasturchilar uchun SDK bormi?", time: "05:06 AM", sender: "them" },
          { id: 8, text: "Ha, Apple Developer portalida.", time: "05:07 AM", sender: "me" },
          { id: 9, text: "Demo video yuboring.", time: "05:08 AM", sender: "them" },
          { id: 10, text: "Yubordim.", time: "05:09 AM", sender: "me" },
          { id: 11, text: "Ko'rdim, rahmat.", time: "05:10 AM", sender: "them" },
          { id: 12, text: "Yangi funksiyalar kutyapman.", time: "05:11 AM", sender: "me" },
          { id: 13, text: "Tez orada e'lon qilamiz.", time: "05:12 AM", sender: "them" },
          { id: 14, text: "Beta testga taklif qilasizmi?", time: "05:13 AM", sender: "me" },
          { id: 15, text: "Albatta.", time: "05:14 AM", sender: "them" },
          { id: 16, text: "Omad!", time: "05:15 AM", sender: "me" },
          { id: 17, text: "Sizga ham!", time: "05:16 AM", sender: "them" },
          { id: 18, text: "Ko'rishguncha.", time: "05:17 AM", sender: "me" },
          { id: 19, text: "Ko'rishguncha.", time: "05:18 AM", sender: "them" },
          { id: 20, text: "Yangi loyiha haqida yozaman.", time: "05:19 AM", sender: "me" },
        ]
      },
      {
        id: 10,
        name: "Sam Altman",
        message: "ChatGPT-5 test qilishda yordam bera olasizmi?",
        time: "Sun",
        image: sam,
        verified: true,
        unread: 1,
        messages: [
          { id: 1, text: "ChatGPT-5 test qilishda yordam bera olasizmi?", time: "04:00 AM", sender: "them" },
          { id: 2, text: "Albatta, qachon boshlaymiz?", time: "04:01 AM", sender: "me" },
          { id: 3, text: "Kelasi haftadan.", time: "04:02 AM", sender: "them" },
          { id: 4, text: "Yaxshi, men tayyorman.", time: "04:03 AM", sender: "me" },
          { id: 5, text: "Test uchun maxfiylik shartlari bor.", time: "04:04 AM", sender: "them" },
          { id: 6, text: "Imzolash uchun yuboring.", time: "04:05 AM", sender: "me" },
          { id: 7, text: "Yubordim.", time: "04:06 AM", sender: "them" },
          { id: 8, text: "Imzoladim va qaytardim.", time: "04:07 AM", sender: "me" },
          { id: 9, text: "Test topshiriqlari tayyor.", time: "04:08 AM", sender: "them" },
          { id: 10, text: "Qachon boshlaymiz?", time: "04:09 AM", sender: "me" },
          { id: 11, text: "Dushanba kuni.", time: "04:10 AM", sender: "them" },
          { id: 12, text: "Zoom havolasi yuboring.", time: "04:11 AM", sender: "me" },
          { id: 13, text: "Yubordim.", time: "04:12 AM", sender: "them" },
          { id: 14, text: "Ko'rdim, rahmat.", time: "04:13 AM", sender: "me" },
          { id: 15, text: "Savollar bo'lsa, yozing.", time: "04:14 AM", sender: "them" },
          { id: 16, text: "Albatta.", time: "04:15 AM", sender: "me" },
          { id: 17, text: "Omad!", time: "04:16 AM", sender: "them" },
          { id: 18, text: "Sizga ham!", time: "04:17 AM", sender: "me" },
          { id: 19, text: "Ko'rishguncha.", time: "04:18 AM", sender: "them" },
          { id: 20, text: "Ko'rishguncha.", time: "04:19 AM", sender: "me" },
        ]
      },
      // Qolgan chatlar messages massivlari ham xuddi shunday 20 tadan ortiq realistik muloqotlar bilan to'ldirilishi mumkin
      // ...
    ],
    Guruhlar: [
      {
        id: 1,
        name: "IT Developers Uzbekistan",
        verified: true,
        lastMessage: { sender: "Aziz", text: "Kimda qanday g'oyalar bor?", status: 'read' },
        time: "12:30 PM",
        image: "https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_960_720.jpg",
        unread: 5,
        members: 12500,
        messages: [
          { id: 1, sender: "You", text: "Salom hammaga!" },
          { id: 2, sender: "Aziz", text: "Kimda qanday g'oyalar bor?" },
        ],
      },
      {
        id: 2,
        name: "Grafik Dizaynerlar",
        lastMessage: { sender: "Laylo", text: "Yangi logotipni ko'rdingizmi?", status: 'sent' },
        time: "11:45 AM",
        image: "https://lets.uz/uploads/2120230502131607.jpg",
        unread: 2,
        members: 8300,
        messages: [
          { id: 1, sender: "You", text: "Bu ajoyib!" },
          { id: 2, sender: "Laylo", text: "Yangi logotipni ko'rdingizmi?" },
        ],
      },
      {
        id: 3,
        name: "Toshkent Python Devs",
        lastMessage: { sender: "Malika", text: "Django yoki FastAPI? Qaysi birini tanlaymiz?", status: 'read' },
        time: "Kecha",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=60",
        unread: 10,
        members: 5300,
        messages: [
            { id: 1, text: "Yangi loyiha uchun backend framework tanlashimiz kerak.", time: "10:00 AM", sender: "Admin" },
            { id: 2, text: "Django yoki FastAPI? Qaysi birini tanlaymiz?", time: "10:05 AM", sender: "Malika" },
        ]
      },
      {
        id: 4,
        name: "Family ❤️",
        lastMessage: { sender: "Onam", text: "Bugun kechga nima ovqat qilay?" },
        time: "18:05",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9bX4-AhJRvyb8tFT_U9Z3szbSi1g0-fqMJg&s",
        unread: 1,
        members: 5,
        messages: [
            { id: 1, text: "Bugun kechga nima ovqat qilay?", time: "18:05 PM", sender: "Onam" },
        ]
      }
    ],
    Kanallar: [
      // Kanallar uchun hozircha messages yo'q
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
        name: "Frontend Darslari",
        message: "ReactJS bo'yicha yangi video dars",
        time: "2:30 PM",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&auto=format&fit=crop&q=60",
        subscribers: 12500,
        verified: true,
        unread: 2,
      },
      {
        id: 3,
        name: "Python Uzbek",
        message: "Django REST API haqida maqola",
        time: "1:45 PM",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=60",
        subscribers: 9800,
        verified: false,
        unread: 0,
      },
      {
        id: 4,
        name: "AI Yangiliklari",
        message: "OpenAI GPT-5 chiqdi!",
        time: "1:00 PM",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60",
        subscribers: 22000,
        verified: true,
        unread: 4,
      },
      {
        id: 5,
        name: "Dizayn Inspiration",
        message: "Minimalist UI trendi",
        time: "12:30 PM",
        image: "https://lets.uz/uploads/2120230502131607.jpg",
        subscribers: 5400,
        verified: false,
        unread: 1,
      },
      {
        id: 6,
        name: "Startup Ovozlari",
        message: "Pitching uchun maslahatlar",
        time: "11:50 AM",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
        subscribers: 3100,
        verified: false,
        unread: 0,
      },
      {
        id: 7,
        name: "Microsoft Uzbekistan",
        message: "Teams uchun yangi funksiya",
        time: "11:00 AM",
        image: "https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg",
        subscribers: 8000,
        verified: true,
        unread: 3,
      },
      {
        id: 8,
        name: "Apple News",
        message: "iOS 18 beta chiqdi",
        time: "10:30 AM",
        image: "https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg",
        subscribers: 12000,
        verified: true,
        unread: 0,
      },
      {
        id: 9,
        name: "Google Developers",
        message: "Google I/O 2024 anonsi",
        time: "10:00 AM",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60",
        subscribers: 15000,
        verified: true,
        unread: 2,
      },
      {
        id: 10,
        name: "Cybersecurity Alert",
        message: "Yangi fishing xurujlari haqida ogohlantirish",
        time: "9:30 AM",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&auto=format&fit=crop&q=60",
        subscribers: 6700,
        verified: false,
        unread: 1,
      },
      {
        id: 11,
        name: "Mobile Devs",
        message: "Flutter 4.0 chiqdi",
        time: "9:00 AM",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&auto=format&fit=crop&q=60",
        subscribers: 4300,
        verified: false,
        unread: 0,
      },
      {
        id: 12,
        name: "Blockchain UZ",
        message: "Ethereum 2.0 yangilanishi",
        time: "8:30 AM",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&auto=format&fit=crop&q=60",
        subscribers: 5100,
        verified: false,
        unread: 0,
      },
      {
        id: 13,
        name: "QA & Testing",
        message: "Selenium bo'yicha yangi kurs",
        time: "8:00 AM",
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=800&auto=format&fit=crop&q=60",
        subscribers: 2200,
        verified: true,
        unread: 1,
      },
      {
        id: 14,
        name: "DevOps Uzbekistan",
        message: "CI/CD pipeline haqida video",
        time: "7:30 AM",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
        subscribers: 3900,
        verified: false,
        unread: 0,
      },
      {
        id: 15,
        name: "Data Science UZ",
        message: "Pandas va NumPy darslari",
        time: "7:00 AM",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&auto=format&fit=crop&q=60",
        subscribers: 4700,
        verified: false,
        unread: 2,
      },
      {
        id: 16,
        name: "Robotics News",
        message: "Arduino uchun yangi sensor",
        time: "6:30 AM",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60",
        subscribers: 1800,
        verified: false,
        unread: 0,
      },
      {
        id: 17,
        name: "Product Management",
        message: "Agile va Scrum haqida maqola",
        time: "6:00 AM",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&auto=format&fit=crop&q=60",
        subscribers: 2600,
        verified: true,
        unread: 1,
      },
      {
        id: 18,
        name: "Digital Marketing",
        message: "SEO 2024 trendlar",
        time: "5:30 AM",
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=800&auto=format&fit=crop&q=60",
        subscribers: 3400,
        verified: false,
        unread: 0,
      },
      {
        id: 19,
        name: "Freelance UZ",
        message: "Upwork uchun portfolio tayyorlash",
        time: "5:00 AM",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60",
        subscribers: 2900,
        verified: false,
        unread: 1,
      },
      {
        id: 20,
        name: "Women in Tech",
        message: "Mentorlik dasturi boshlandi",
        time: "4:30 AM",
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=800&auto=format&fit=crop&q=60",
        subscribers: 2100,
        verified: true,
        unread: 0,
      },
      // ...
        ],
        Klublar: [
      {
        id: 1,
        name: "IELTS Accelerator Club",
        banner: "https://optim.tildacdn.pro/tild3230-6530-4263-b865-616432653462/-/resize/400x/-/format/webp/logo1.png.webp",
        logo: "https://optim.tildacdn.pro/tild3230-6530-4263-b865-616432653462/-/resize/400x/-/format/webp/logo1.png.webp",
        category: "Til",
        status: "Premium",
        description: "Foydalanuvchilarni 6 oy ichida IELTS 6.5–7.0 darajaga olib chiqish. Mentorlar: 7.5+ ball olgan ustozlar. Haftalik jonli darslar, test arxivlari, model javoblar, writing correction, speaking pair tizimi.",
        features: [
          "Haftalik jonli darslar (speaking, writing)",
          "Test arxivlari, model javoblar",
          "Writing correction replay'lari",
          "Speaking Pair tizimi",
          "Mentorlar: IELTS bo‘yicha 7.5+ ball olgan ustozlar",
          "Statusga qarab kirish: 'Bek' dan yuqori"
        ],
        monetization: [
          "Premium speaking guruhi (har oy $10)",
          "Essay tahlili xizmatlari"
        ],
        members: 320,
        instructor: "Dilshod Karimov",
        nextSession: "Payshanba 20:00",
        badge: "IELTS Hero",
        leaderboard: true,
        progress: 70,
      },
      {
        id: 2,
        name: "Frontend Developer Starter Club",
        banner: "https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1212702%2F8ce9906d-ce52-4c20-abe6-af3708fb3577.png",
        logo: "https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F1212702%2F8ce9906d-ce52-4c20-abe6-af3708fb3577.png",
        category: "Texnika",
        status: "Premium",
        description: "HTML, CSS, JavaScript asoslarini o‘rgatish (0 → Junior). Har oyda 1 loyiha, har hafta jonli kodlash sessiyasi, GitHub portfel, interaktiv forum va mini hackathonlar.",
        features: [
          "Project-based learning",
          "Har oyda 1 loyiha",
          "Har hafta jonli kodlash sessiyasi",
          "GitHub’da yakuniy portfel",
          "Interaktiv forum: 'Kodim ishlamayapti'",
          "Mini hackathonlar"
        ],
        monetization: [
          "Portfolio review",
          "Mentorlik sessiyalari"
        ],
        members: 450,
        instructor: "Aziz Rakhimov",
        nextSession: "Dushanba 18:00",
        badge: "Frontend Star",
        leaderboard: true,
        progress: 55,
      },
      {
        id: 3,
        name: "KitobXonlik & Fikr",
        banner: "https://eventgo-asset.s3.eu-central-1.amazonaws.com/events/images/01J4SMEBQ1FCM70N1KGXSH98M7.jpg",
        logo: "https://eventgo-asset.s3.eu-central-1.amazonaws.com/events/images/01J4SMEBQ1FCM70N1KGXSH98M7.jpg",
        category: "Ilhom",
        status: "Ochiq",
        description: "Har oy bir ta’sirchan kitobni o‘qib, tahlil qilish, fikr almashish. Liderlik, o‘zini rivojlantirish, badiiy psixologik kitoblar, BookTalk va Best Essay yorlig‘i.",
        features: [
          "1 ta kitob + 3 ta sessiya",
          "Tahliliy essay topshiruv",
          "Best Essay yorlig‘i",
          "BookTalk — Zoom’dagi muhokama sessiyasi"
        ],
        monetization: [
          "Best Essay badge",
          "Audio/video review"
        ],
        members: 210,
        instructor: "Kamola Tursunova",
        nextSession: "Juma 19:00",
        badge: "BookTalk Winner",
        leaderboard: true,
        progress: 80,
      },
      {
        id: 4,
        name: "Soft Skills & Leadership Club",
        banner: "https://c8.alamy.com/comp/2CAPMC4/soft-skills-round-ribbon-isolated-label-soft-skills-sign-2CAPMC4.jpg",
        logo: "https://c8.alamy.com/comp/2CAPMC4/soft-skills-round-ribbon-isolated-label-soft-skills-sign-2CAPMC4.jpg",
        category: "Kasbiy",
        status: "So‘rov orqali",
        description: "Talabalar va yosh mutaxassislar uchun kelajak liderlarini shakllantirish. Public speaking, conflict resolution, teamwork, time management, feedback sessiyalar.",
        features: [
          "Public Speaking",
          "Conflict Resolution",
          "Teamwork & Emotional Intelligence",
          "Time Management",
          "Role play — 'CEO bo‘lib nutq so‘zla' challenge"
        ],
        monetization: [
          "Certificate kurs ($5–10)",
          "Mentorlik (individual konsultatsiya)"
        ],
        members: 150,
        instructor: "Shahnoza Karimova",
        nextSession: "Shanba 17:00",
        badge: "Leader of the Month",
        leaderboard: true,
        progress: 45,
      },
      {
        id: 5,
        name: "Startup Lab Club",
        banner: "https://i.ytimg.com/vi/ZqJSpB9zLqo/maxresdefault.jpg",
        logo: "https://i.ytimg.com/vi/ZqJSpB9zLqo/maxresdefault.jpg",
        category: "Texnika",
        status: "Status talab qiladi",
        description: "Yoshlar o‘z startuplarini MVP bosqichigacha yetkazish. G‘oya tanlash, raqobatchi tahlili, MVP qurish, pitch tayyorlash, demo day va grant imkoniyati.",
        features: [
          "G‘oya tanlash",
          "Raqobatchi tahlili",
          "MVP qurish (NoCode yordamida)",
          "Pitch tayyorlash",
          "Investor simulate session",
          "Demo day, grant imkoniyati"
        ],
        monetization: [
          "Mentorlik",
          "Demo day grant"
        ],
        members: 90,
        instructor: "Akmal Karimov",
        nextSession: "Yakshanba 18:00",
        badge: "Startup Hero",
        leaderboard: true,
        progress: 60,
      },
    ],
      // ...
    };
  
  // Add these debug logs
  console.log("Active Tab:", activeTab)
  console.log("Available tabs in allChats:", Object.keys(allChats))
  console.log("Data for active tab:", allChats[activeTab])

  const handleBack = () => {
    if (selectedChat) {
      setSelectedChat(null);
    } else {
      navigate(-1);
    }
  };

  const tabs = [
    { id: "Suhbatlar", label: "Suhbatlar" },
    { id: "Guruhlar", label: "Guruhlar" },
    { id: "Kanallar", label: "Kanallar" },
    { id: "Klublar", label: "Klublar" },
  ]

  // Klub uchun modal yoki kengaygan kartochka


  if (selectedChat) {
    return <ChatView chat={selectedChat} onBack={handleBack} />;
  }

  // --- INLINE STYLES for CLUBS ---
  const styles = {
    clubsSection: {
      background: 'linear-gradient(120deg, #f0f2f5 0%, #e7eaf0 100%)',
      minHeight: '100vh',
      paddingBottom: 32,
    },
    clubList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '32px 24px',
      justifyContent: 'flex-start',
      margin: '24px 0 0 0',
    },
    clubCard: {
      background: '#fff',
      borderRadius: 20,
      boxShadow: '0 4px 24px 0 rgba(60,60,100,0.07), 0 1.5px 4px 0 rgba(60,60,100,0.08)',
      width: 340,
      cursor: 'pointer',
      transition: 'transform 0.15s, box-shadow 0.15s',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      border: '1.5px solid #f1f3f7',
      position: 'relative',
    },
    clubCardHover: {
      transform: 'translateY(-4px) scale(1.03)',
      boxShadow: '0 8px 32px 0 rgba(60,60,100,0.14), 0 3px 8px 0 rgba(60,60,100,0.12)',
      borderColor: '#c3e8fa',
    },
    clubCardBanner: (banner) => ({
      height: 120,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '0 0 0 12px',
      backgroundImage: `url(${banner})`,
    }),
    clubCardLogo: {
      width: 56,
      height: 56,
      borderRadius: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
      background: '#fff',
      border: '2px solid #f8fafc',
      position: 'absolute',
      left: 18,
      bottom: -28,
      zIndex: 2,
    },
    clubCardStatus: {
      position: 'absolute',
      top: 10,
      right: 18,
      background: 'linear-gradient(90deg,#34c759,#00c6fb)',
      color: '#fff',
      fontSize: 12,
      fontWeight: 600,
      padding: '4px 14px',
      borderRadius: 14,
      boxShadow: '0 2px 8px rgba(52,199,89,0.06)',
      letterSpacing: '0.2px',
    },
    clubCardContent: {
      padding: '38px 20px 18px 20px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    clubCardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    clubCardTitle: {
      fontSize: 20,
      fontWeight: 700,
      color: '#222',
      margin: 0,
    },
    clubCardBadge: {
      background: '#f8fafc',
      color: '#00c6fb',
      fontSize: 13,
      fontWeight: 600,
      padding: '3px 9px 3px 5px',
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 3,
    },
    clubCardDesc: {
      fontSize: 14,
      color: '#666',
      margin: '8px 0 0 0',
      minHeight: 36,
    },
    clubCardMeta: {
      display: 'flex',
      gap: 18,
      marginTop: 12,
      fontSize: 13,
      color: '#00b2ff',
      alignItems: 'center',
    },
  };

  // Klub status badge (inline style)
  const ClubStatus = ({ open }) => open
    ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#16a34a', fontSize: 12, fontWeight: 600 }}> <Unlock size={16}/> Ochiq</span>
    : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#ef4444', fontSize: 12, fontWeight: 600 }}> <Lock size={16}/> Yopiq</span>;

// Klub kartasi (inline style)
const ClubListItem = ({ club }) => {
  const navigate = useNavigate();
  // Always show a valid image (fallback to avatar if missing)
  const imageSrc = club.image || club.logo || club.banner || `https://ui-avatars.com/api/?name=${encodeURIComponent(club.name)}&background=random`;
  return (
    <div
      style={{
        background: '#fff',
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)',
        borderRadius: 18,
        padding: '18px 16px',
        marginBottom: 12,
        cursor: 'pointer',
        border: '1.5px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        transition: 'all 0.2s',
        position: 'relative',
      }}
      onClick={() => navigate(`/clubs/${club.id}`)}
    >
      <img src={imageSrc} alt={club.name} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', border: '1.5px solid #e5e7eb' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontWeight: 600, fontSize: 16, color: '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{club.name}</span>
          {club.verified && <BadgeCheck size={16} color="#2563eb" />}
          <ClubStatus open={club.open} />
          <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 8, background: club.type === 'LIVE' ? '#fee2e2' : '#dcfce7', color: club.type === 'LIVE' ? '#ef4444' : '#16a34a', fontWeight: 600 }}>{club.type}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', marginBottom: 2 }}><Lightbulb size={14}/>{club.topic}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: '#60a5fa' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Users size={13}/>{club.members} a'zo</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><UserCheck size={13}/>{club.instructor}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Calendar size={13}/>{club.nextSession}</span>
        </div>
      </div>
    </div>
  );
};

const newStyles = `
    .messenger {
      background-color: #f0f2f5; /* Light gray background for the whole component */
    }
    .chat-list {
        background-color: #ffffff; /* White background for the list itself */
        padding: 0;
    }
    .chat-item {
        border-bottom: 1px solid #f0f2f5; /* Separator line */
        transition: background-color 0.2s ease-in-out;
        padding: 12px;
    }
    .chat-item:hover {
        background-color: #f5f5f5; /* Hover effect */
    }
    .chat-item:last-child {
        border-bottom: none; /* No separator for the last item */
    }
    .chat-avatar {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
    }
    .chat-avatar img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
    .chat-item.group .chat-content {
      flex-grow: 1;
      margin-left: 12px;
      overflow: hidden;
    }
    .chat-item.group .chat-name-row, .chat-item.group .chat-message-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .chat-item.group .chat-name-row .chat-name {
      font-weight: 600;
      font-size: 16px;
    }
    .chat-item.group .chat-name-row .chat-time {
      font-size: 12px;
      color: #65676B;
      margin-left: 8px;
    }
    .chat-item.group .chat-message-row {
      margin-top: 2px;
    }
    .chat-item.group .chat-message-row .chat-message {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 1;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #65676B;
    }
    .chat-item.group .message-sender {
      color: #005FC6; /* Blue color for sender name */
      font-weight: 500;
      margin-right: 4px;
    }
    .chat-item.group .message-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .chat-name-row .chat-name {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 16px;
    }
    .verified-badge {
        display: inline-block;
        vertical-align: middle;
        margin-left: 6px;
        flex-shrink: 0;
    }
    .sent-icon {
        flex-shrink: 0;
    }
    .chat-item.group .unread-badge {
      background-color: #34C759; /* Green badge */
      color: white;
      font-size: 12px;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 12px;
      margin-left: 8px;
      min-width: 22px;
      text-align: center;
    }
  `;

// Asosiy render
  return (
    <div className="messenger">
      <style>{newStyles}</style>
      <div className="messenger-header">
        <div className="header-top">
          <button className="back-button" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="header-title">{activeTab}</h1>
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
                onClick={() => { setActiveTab(tab.id); }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="chat-list">
        {activeTab === 'Klublar' ? (
          allChats.Klublar.map(club => (
            <ClubListItem key={club.id} club={club} />
          ))
        ) : activeTab && allChats[activeTab] ? (
          allChats[activeTab].map((chat) => {
            const isGroup = activeTab === 'Guruhlar';
            return (
              <div key={chat.id} className={`chat-item ${isGroup ? 'group' : ''} ${chat.subscribers ? "channel" : ""} ${chat.type ? "club" : ""}`} onClick={isGroup ? undefined : () => handleChatClick(chat)}>
                {chat.type ? (
                  // Club Item Layout
                  <>
                    {/* Club layout remains unchanged */}
                    <div className="club-header">
                      <div className="chat-avatar">
                        <img src={chat.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.name)}&background=random`} alt={chat.name} />
                      </div>
                      <div className="club-content">
                        <div className="chat-name">{chat.name}</div>
                        <div className="club-meta">
                          <span className={`club-type ${chat.type.toLowerCase()}`}>{chat.type}</span>
                          <span className={`club-status ${chat.type.toLowerCase()}`}>{chat.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="club-topic">{chat.topic}</div>
                  </>
                ) : isGroup ? (
                  // New Group Item Layout
                  <>
                    <div className="chat-avatar">
                      <img src={chat.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.name)}&background=random`} alt={chat.name} />
                    </div>
                    <div className="chat-content">
                      <div className="chat-name-row">
                        <div className="chat-name">
                          <span>{chat.name}</span>
                          {chat.verified && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="verified-badge">
                              <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0Z" fill="#0095F6"/>
                              <path d="M7 11.4L3.6 8L5 6.6L7 8.6L11 4.6L12.4 6L7 11.4Z" fill="white" />
                            </svg>
                          )}
                        </div>
                        <span className="chat-time">{chat.time}</span>
                      </div>
                      <div className="chat-message-row">
                        <div className="chat-message">
                          {chat.lastMessage && chat.lastMessage.status === 'read' && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="sent-icon" style={{ marginRight: '4px' }}>
                                  <path d="M2.5 8L6.5 12L13.5 5" stroke="#34C759" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M2.5 8L6.5 12L13.5 5" stroke="#34C759" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" transform="translate(3, -3)"/>
                              </svg>
                          )}
                          {chat.lastMessage && <span className="message-sender">{chat.lastMessage.sender}:&nbsp;</span>}
                          <span className="message-text">{chat.lastMessage ? chat.lastMessage.text : chat.message}</span>
                        </div>
                        {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                      </div>
                    </div>
                  </>
                ) : (
                  // Regular Chat/Channel Item Layout
                  <>
                    <div className="chat-avatar">
                      <img src={chat.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.name)}&background=random`} alt={chat.name} />
                    </div>
                    <div className="chat-content">
                      <div className="chat-name-row">
                          <div className="chat-name">
                            {chat.name}
                            {chat.verified && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="verified-badge">
                                <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0Z" fill="#0095F6"/>
                                <path d="M7 11.4L3.6 8L5 6.6L7 8.6L11 4.6L12.4 6L7 11.4Z" fill="white" />
                              </svg>
                            )}
                          </div>
                          <div className="chat-time">{chat.time}</div>
                      </div>
                      <div className="chat-message-row">
                          <div className="chat-message">
                            {chat.sent && (
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sent-icon">
                                <path d="M2.5 8L6.5 12L13.5 5" stroke="#34C759" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            <span className="message-text" style={{ color: chat.sent ? "#65676B" : "#050505" }}>
                              {chat.message}
                            </span>
                          </div>
                          {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                      </div>
                      {chat.subscribers && (
                        <div className="channel-info">
                          {chat.subscribers.toLocaleString()} obunachi
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })
        ) : (
          <div className="no-chats">
            <p>No chats available for this tab</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messenger

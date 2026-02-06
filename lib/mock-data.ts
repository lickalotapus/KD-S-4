// ============================================================
// MOCK DATA - Replace with API calls when backend is connected
// All data fetching functions are async to match future API patterns
// ============================================================

// ---- TYPES ----

export interface MealItem {
  name: string
  isVeg: boolean
  calories?: number
  allergens?: string[]
}

export interface Meal {
  type: "breakfast" | "lunch" | "snacks" | "dinner"
  time: string
  items: MealItem[]
  rating: number
  totalRatings: number
}

export interface MessMenu {
  date: string
  day: string
  meals: Meal[]
}

export interface EmailSummary {
  id: string
  from: string
  subject: string
  summary: string
  category: "academic" | "event" | "urgent" | "general"
  priority: "high" | "medium" | "low"
  actionItems: string[]
  receivedAt: string
  isRead: boolean
}

export interface Announcement {
  id: string
  title: string
  body: string
  category: "event" | "maintenance" | "academic" | "emergency"
  timestamp: string
  isNew: boolean
}

export interface LostFoundItem {
  id: string
  type: "lost" | "found"
  title: string
  description: string
  category: string
  location: string
  date: string
  imageUrl?: string
  contactInfo: string
  status: "open" | "resolved"
}

export interface MarketplaceItem {
  id: string
  title: string
  description: string
  price: number
  suggestedPrice?: number
  category: string
  condition: "new" | "like-new" | "good" | "fair"
  seller: string
  imageUrl?: string
  postedAt: string
  isSold: boolean
}

export interface CabPoolTrip {
  id: string
  from: string
  to: string
  date: string
  time: string
  seatsAvailable: number
  totalSeats: number
  pricePerSeat: number
  driver: string
  status: "open" | "full" | "completed"
  passengers: string[]
}

export interface NearbyPlace {
  id: string
  name: string
  type: "restaurant" | "cafe" | "attraction" | "study-spot" | "shopping"
  vibe: string[]
  rating: number
  priceRange: "$" | "$$" | "$$$"
  distance: string
  hasStudentDiscount: boolean
  openNow: boolean
  imageUrl?: string
  description: string
}

export interface TimetableEntry {
  id: string
  subject: string
  code: string
  instructor: string
  room: string
  day: string
  startTime: string
  endTime: string
  type: "lecture" | "lab" | "tutorial"
  isCancelled: boolean
  cancellationNote?: string
}

export interface Assignment {
  id: string
  title: string
  course: string
  courseCode: string
  dueDate: string
  status: "pending" | "submitted" | "graded"
  grade?: string
  maxGrade?: string
  description: string
  submittedAt?: string
}

export interface Course {
  id: string
  name: string
  code: string
  instructor: string
  credits: number
  grade?: string
  attendance: number
  assignments: Assignment[]
}

// ---- MOCK DATA ----

export const mockMessMenu: MessMenu = {
  date: "2026-02-06",
  day: "Friday",
  meals: [
    {
      type: "breakfast",
      time: "7:30 - 9:30 AM",
      items: [
        { name: "Aloo Paratha", isVeg: true, calories: 320 },
        { name: "Curd", isVeg: true, calories: 60 },
        { name: "Boiled Eggs", isVeg: false, calories: 155, allergens: ["eggs"] },
        { name: "Toast & Butter", isVeg: true, calories: 190, allergens: ["gluten", "dairy"] },
        { name: "Tea / Coffee", isVeg: true, calories: 45 },
        { name: "Cornflakes", isVeg: true, calories: 130, allergens: ["gluten"] },
      ],
      rating: 4.2,
      totalRatings: 87,
    },
    {
      type: "lunch",
      time: "12:00 - 2:00 PM",
      items: [
        { name: "Rajma Chawal", isVeg: true, calories: 420 },
        { name: "Chicken Curry", isVeg: false, calories: 380 },
        { name: "Mixed Veg", isVeg: true, calories: 180 },
        { name: "Roti", isVeg: true, calories: 100, allergens: ["gluten"] },
        { name: "Rice", isVeg: true, calories: 200 },
        { name: "Salad", isVeg: true, calories: 45 },
        { name: "Gulab Jamun", isVeg: true, calories: 150, allergens: ["dairy"] },
      ],
      rating: 3.8,
      totalRatings: 142,
    },
    {
      type: "snacks",
      time: "4:30 - 6:00 PM",
      items: [
        { name: "Samosa", isVeg: true, calories: 262, allergens: ["gluten"] },
        { name: "Tea", isVeg: true, calories: 45 },
        { name: "Biscuits", isVeg: true, calories: 120, allergens: ["gluten"] },
      ],
      rating: 3.5,
      totalRatings: 56,
    },
    {
      type: "dinner",
      time: "7:30 - 9:30 PM",
      items: [
        { name: "Paneer Butter Masala", isVeg: true, calories: 350, allergens: ["dairy"] },
        { name: "Fish Fry", isVeg: false, calories: 290, allergens: ["fish"] },
        { name: "Dal Tadka", isVeg: true, calories: 220 },
        { name: "Jeera Rice", isVeg: true, calories: 230 },
        { name: "Naan", isVeg: true, calories: 260, allergens: ["gluten"] },
        { name: "Ice Cream", isVeg: true, calories: 200, allergens: ["dairy"] },
      ],
      rating: 4.0,
      totalRatings: 98,
    },
  ],
}

export const mockEmails: EmailSummary[] = [
  {
    id: "1",
    from: "Dean, Academic Affairs",
    subject: "Mid-Semester Examination Schedule - Spring 2026",
    summary: "Mid-semester exams start Feb 20. Schedule available on portal. Bring ID cards.",
    category: "academic",
    priority: "high",
    actionItems: ["Check exam schedule on portal", "Carry ID card to exams"],
    receivedAt: "2026-02-06T08:30:00",
    isRead: false,
  },
  {
    id: "2",
    from: "Cultural Committee",
    subject: "Riviera 2026 - Annual Cultural Fest Registration Open",
    summary: "Riviera fest on Mar 15-18. Register by Feb 25. Early bird discounts available.",
    category: "event",
    priority: "medium",
    actionItems: ["Register for Riviera before Feb 25"],
    receivedAt: "2026-02-05T14:20:00",
    isRead: false,
  },
  {
    id: "3",
    from: "IT Services",
    subject: "Scheduled Network Maintenance - Feb 8, 2026",
    summary: "WiFi will be down 2-6 AM on Feb 8 for router upgrades across all hostels.",
    category: "general",
    priority: "low",
    actionItems: ["Plan offline work for Feb 8 early morning"],
    receivedAt: "2026-02-05T10:00:00",
    isRead: true,
  },
  {
    id: "4",
    from: "Hostel Warden",
    subject: "URGENT: Water Supply Disruption in Hostel Block C",
    summary: "Water supply disrupted in Block C due to pipe repair. Expected fix by 4 PM today.",
    category: "urgent",
    priority: "high",
    actionItems: ["Store water if in Block C", "Use Block D facilities temporarily"],
    receivedAt: "2026-02-06T07:15:00",
    isRead: false,
  },
  {
    id: "5",
    from: "Training & Placement Cell",
    subject: "Pre-Placement Talk by Google - Feb 12",
    summary: "Google PPT on Feb 12 at 5 PM in Auditorium. Open to CSE and ECE final year students.",
    category: "academic",
    priority: "high",
    actionItems: ["Mark calendar for Feb 12, 5 PM", "Prepare resume"],
    receivedAt: "2026-02-04T16:45:00",
    isRead: true,
  },
  {
    id: "6",
    from: "Library Services",
    subject: "Extended Library Hours During Exam Season",
    summary: "Library will remain open until 2 AM from Feb 15 to Mar 5 for exam preparation.",
    category: "academic",
    priority: "medium",
    actionItems: ["Note extended library hours"],
    receivedAt: "2026-02-04T09:00:00",
    isRead: true,
  },
]

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Campus Road Closed for Marathon",
    body: "The main campus road from Gate 1 to Gate 3 will be closed on Sunday, Feb 8 from 6 AM to 12 PM for the annual marathon event.",
    category: "event",
    timestamp: "2026-02-06T09:00:00",
    isNew: true,
  },
  {
    id: "2",
    title: "Mess Menu Changes Next Week",
    body: "Special South Indian menu on Monday and Wednesday next week due to popular demand. Check the app for details.",
    category: "maintenance",
    timestamp: "2026-02-05T18:00:00",
    isNew: true,
  },
  {
    id: "3",
    title: "Emergency Drill - Feb 10",
    body: "Mandatory emergency evacuation drill across all hostels on Feb 10 at 10 AM. All residents must participate.",
    category: "emergency",
    timestamp: "2026-02-05T12:00:00",
    isNew: false,
  },
  {
    id: "4",
    title: "New Semester Course Registration Deadline",
    body: "Last date to add/drop courses for Spring 2026 is February 14. Visit the academic portal to make changes.",
    category: "academic",
    timestamp: "2026-02-04T08:00:00",
    isNew: false,
  },
]

export const mockLostFound: LostFoundItem[] = [
  {
    id: "1",
    type: "lost",
    title: "Blue JBL Headphones",
    description: "Lost my blue JBL Tune 510BT near the library entrance. Has a small scratch on the right ear.",
    category: "Electronics",
    location: "Central Library",
    date: "2026-02-05",
    contactInfo: "Rahul S. - rahul@iitropar.ac.in",
    status: "open",
  },
  {
    id: "2",
    type: "found",
    title: "Student ID Card",
    description: "Found a student ID card belonging to entry number 2023CSB1045 near the cafeteria.",
    category: "ID/Documents",
    location: "Main Cafeteria",
    date: "2026-02-06",
    contactInfo: "Guard Room - ext. 1234",
    status: "open",
  },
  {
    id: "3",
    type: "lost",
    title: "Black Leather Wallet",
    description: "Lost a black leather wallet with some cash and debit card. Last seen at basketball court.",
    category: "Personal",
    location: "Sports Complex",
    date: "2026-02-04",
    contactInfo: "Ankit K. - ankit@iitropar.ac.in",
    status: "open",
  },
  {
    id: "4",
    type: "found",
    title: "Ti-84 Calculator",
    description: "Found a TI-84 graphing calculator in Lecture Hall 3 after the math class.",
    category: "Electronics",
    location: "Lecture Hall 3",
    date: "2026-02-06",
    contactInfo: "Prof. Sharma's Office - Room 204",
    status: "open",
  },
  {
    id: "5",
    type: "lost",
    title: "Hydroflask Water Bottle",
    description: "Pink Hydroflask 32oz water bottle with stickers. Left in the computer lab.",
    category: "Personal",
    location: "Computer Lab 2",
    date: "2026-02-03",
    contactInfo: "Priya M. - priya@iitropar.ac.in",
    status: "resolved",
  },
]

export const mockMarketplace: MarketplaceItem[] = [
  {
    id: "1",
    title: "Engineering Mathematics Textbook (Kreyszig)",
    description: "Advanced Engineering Mathematics, 10th Edition. Slightly highlighted but in great condition.",
    price: 450,
    suggestedPrice: 500,
    category: "Books",
    condition: "good",
    seller: "Arjun P.",
    postedAt: "2026-02-04T10:00:00",
    isSold: false,
  },
  {
    id: "2",
    title: "HP Scientific Calculator",
    description: "HP 35s Scientific Calculator. Used for one semester. Works perfectly.",
    price: 1200,
    suggestedPrice: 1100,
    category: "Electronics",
    condition: "like-new",
    seller: "Neha R.",
    postedAt: "2026-02-05T14:30:00",
    isSold: false,
  },
  {
    id: "3",
    title: "Study Table with Chair",
    description: "Wooden study table with ergonomic chair. Perfect for hostel room. Moving out, must sell.",
    price: 2500,
    suggestedPrice: 2800,
    category: "Furniture",
    condition: "good",
    seller: "Karan M.",
    postedAt: "2026-02-03T09:00:00",
    isSold: false,
  },
  {
    id: "4",
    title: "MTB Bicycle - Firefox",
    description: "Firefox Cyclone 26T. Used for 8 months. Minor scratches. All gears work fine.",
    price: 5000,
    suggestedPrice: 5500,
    category: "Cycles",
    condition: "fair",
    seller: "Vikram S.",
    postedAt: "2026-02-02T11:00:00",
    isSold: false,
  },
  {
    id: "5",
    title: "Arduino Starter Kit",
    description: "Complete Arduino Uno starter kit with sensors, LEDs, breadboard. Used once for a project.",
    price: 800,
    suggestedPrice: 900,
    category: "Electronics",
    condition: "like-new",
    seller: "Divya T.",
    postedAt: "2026-02-05T16:00:00",
    isSold: false,
  },
]

export const mockCabPool: CabPoolTrip[] = [
  {
    id: "1",
    from: "IIT Ropar Campus",
    to: "Chandigarh Railway Station",
    date: "2026-02-07",
    time: "06:00 AM",
    seatsAvailable: 2,
    totalSeats: 4,
    pricePerSeat: 350,
    driver: "Amit G.",
    status: "open",
    passengers: ["Rahul S.", "Priya K."],
  },
  {
    id: "2",
    from: "IIT Ropar Campus",
    to: "Delhi (Kashmere Gate ISBT)",
    date: "2026-02-08",
    time: "05:30 AM",
    seatsAvailable: 3,
    totalSeats: 4,
    pricePerSeat: 600,
    driver: "Sanjay P.",
    status: "open",
    passengers: ["Neha M."],
  },
  {
    id: "3",
    from: "Chandigarh Airport",
    to: "IIT Ropar Campus",
    date: "2026-02-09",
    time: "02:00 PM",
    seatsAvailable: 0,
    totalSeats: 3,
    pricePerSeat: 400,
    driver: "Kavya R.",
    status: "full",
    passengers: ["Arjun L.", "Sneha D.", "Rohan K."],
  },
  {
    id: "4",
    from: "IIT Ropar Campus",
    to: "Rupnagar City Center",
    date: "2026-02-06",
    time: "04:00 PM",
    seatsAvailable: 2,
    totalSeats: 3,
    pricePerSeat: 100,
    driver: "Manish T.",
    status: "open",
    passengers: ["Pooja S."],
  },
]

export const mockNearbyPlaces: NearbyPlace[] = [
  {
    id: "1",
    name: "Chai Point",
    type: "cafe",
    vibe: ["study-friendly", "budget"],
    rating: 4.3,
    priceRange: "$",
    distance: "0.5 km",
    hasStudentDiscount: true,
    openNow: true,
    description: "Cozy chai cafe with free WiFi. Great for late-night study sessions.",
  },
  {
    id: "2",
    name: "Satluj View Restaurant",
    type: "restaurant",
    vibe: ["group-dining", "rooftop"],
    rating: 4.1,
    priceRange: "$$",
    distance: "1.2 km",
    hasStudentDiscount: false,
    openNow: true,
    description: "Multi-cuisine restaurant with a beautiful river view. Popular for birthday celebrations.",
  },
  {
    id: "3",
    name: "Rupnagar Fort",
    type: "attraction",
    vibe: ["heritage", "photography"],
    rating: 3.9,
    priceRange: "$",
    distance: "3.5 km",
    hasStudentDiscount: true,
    openNow: true,
    description: "Historical fort with panoramic views. Great weekend outing spot for history enthusiasts.",
  },
  {
    id: "4",
    name: "The Study Nook",
    type: "study-spot",
    vibe: ["quiet", "study-friendly", "coffee"],
    rating: 4.5,
    priceRange: "$$",
    distance: "0.8 km",
    hasStudentDiscount: true,
    openNow: true,
    description: "Quiet workspace with great coffee and power outlets at every table.",
  },
  {
    id: "5",
    name: "Punjab Bazaar",
    type: "shopping",
    vibe: ["budget", "local-experience"],
    rating: 3.7,
    priceRange: "$",
    distance: "2.0 km",
    hasStudentDiscount: false,
    openNow: false,
    description: "Local market for essentials, stationery, and street food. Best prices in town.",
  },
  {
    id: "6",
    name: "Tandoori Nights",
    type: "restaurant",
    vibe: ["date-spot", "non-veg"],
    rating: 4.4,
    priceRange: "$$$",
    distance: "1.8 km",
    hasStudentDiscount: false,
    openNow: true,
    description: "Premium North Indian restaurant known for its tandoori specials and ambience.",
  },
]

export const mockTimetable: TimetableEntry[] = [
  { id: "1", subject: "Data Structures & Algorithms", code: "CS201", instructor: "Dr. Sharma", room: "LH-1", day: "Monday", startTime: "09:00", endTime: "10:00", type: "lecture", isCancelled: false },
  { id: "2", subject: "Linear Algebra", code: "MA201", instructor: "Dr. Gupta", room: "LH-3", day: "Monday", startTime: "10:00", endTime: "11:00", type: "lecture", isCancelled: false },
  { id: "3", subject: "Digital Electronics", code: "EE201", instructor: "Dr. Patel", room: "LH-2", day: "Monday", startTime: "11:00", endTime: "12:00", type: "lecture", isCancelled: true, cancellationNote: "Faculty on leave. Class rescheduled to Wednesday." },
  { id: "4", subject: "DSA Lab", code: "CS201L", instructor: "Dr. Sharma", room: "CL-2", day: "Monday", startTime: "14:00", endTime: "16:00", type: "lab", isCancelled: false },
  { id: "5", subject: "Data Structures & Algorithms", code: "CS201", instructor: "Dr. Sharma", room: "LH-1", day: "Tuesday", startTime: "09:00", endTime: "10:00", type: "lecture", isCancelled: false },
  { id: "6", subject: "Digital Electronics", code: "EE201", instructor: "Dr. Patel", room: "LH-2", day: "Tuesday", startTime: "11:00", endTime: "12:00", type: "lecture", isCancelled: false },
  { id: "7", subject: "Linear Algebra Tutorial", code: "MA201T", instructor: "TA Ravi", room: "TR-4", day: "Tuesday", startTime: "14:00", endTime: "15:00", type: "tutorial", isCancelled: false },
  { id: "8", subject: "Linear Algebra", code: "MA201", instructor: "Dr. Gupta", room: "LH-3", day: "Wednesday", startTime: "09:00", endTime: "10:00", type: "lecture", isCancelled: false },
  { id: "9", subject: "Data Structures & Algorithms", code: "CS201", instructor: "Dr. Sharma", room: "LH-1", day: "Wednesday", startTime: "10:00", endTime: "11:00", type: "lecture", isCancelled: false },
  { id: "10", subject: "Digital Electronics Lab", code: "EE201L", instructor: "Dr. Patel", room: "EL-1", day: "Wednesday", startTime: "14:00", endTime: "16:00", type: "lab", isCancelled: false },
  { id: "11", subject: "Digital Electronics", code: "EE201", instructor: "Dr. Patel", room: "LH-2", day: "Thursday", startTime: "09:00", endTime: "10:00", type: "lecture", isCancelled: false },
  { id: "12", subject: "Linear Algebra", code: "MA201", instructor: "Dr. Gupta", room: "LH-3", day: "Thursday", startTime: "10:00", endTime: "11:00", type: "lecture", isCancelled: false },
  { id: "13", subject: "DSA Tutorial", code: "CS201T", instructor: "TA Meera", room: "TR-2", day: "Thursday", startTime: "14:00", endTime: "15:00", type: "tutorial", isCancelled: false },
  { id: "14", subject: "Data Structures & Algorithms", code: "CS201", instructor: "Dr. Sharma", room: "LH-1", day: "Friday", startTime: "09:00", endTime: "10:00", type: "lecture", isCancelled: false },
  { id: "15", subject: "Linear Algebra", code: "MA201", instructor: "Dr. Gupta", room: "LH-3", day: "Friday", startTime: "11:00", endTime: "12:00", type: "lecture", isCancelled: false },
]

export const mockCourses: Course[] = [
  {
    id: "1",
    name: "Data Structures & Algorithms",
    code: "CS201",
    instructor: "Dr. Sharma",
    credits: 4,
    grade: "A-",
    attendance: 92,
    assignments: [
      { id: "a1", title: "Array & Linked List Implementation", course: "Data Structures & Algorithms", courseCode: "CS201", dueDate: "2026-02-10", status: "submitted", grade: "18", maxGrade: "20", description: "Implement dynamic array and doubly linked list.", submittedAt: "2026-02-08T23:45:00" },
      { id: "a2", title: "Binary Tree Operations", course: "Data Structures & Algorithms", courseCode: "CS201", dueDate: "2026-02-20", status: "pending", description: "Implement BST with insert, delete, and traversal operations." },
      { id: "a3", title: "Graph Algorithms", course: "Data Structures & Algorithms", courseCode: "CS201", dueDate: "2026-03-05", status: "pending", description: "Implement BFS, DFS, and Dijkstra's algorithm." },
    ],
  },
  {
    id: "2",
    name: "Linear Algebra",
    code: "MA201",
    instructor: "Dr. Gupta",
    credits: 3,
    grade: "B+",
    attendance: 85,
    assignments: [
      { id: "a4", title: "Matrix Operations Problem Set", course: "Linear Algebra", courseCode: "MA201", dueDate: "2026-02-08", status: "graded", grade: "45", maxGrade: "50", description: "Problems on matrix multiplication, determinants, and inverses.", submittedAt: "2026-02-07T20:00:00" },
      { id: "a5", title: "Eigenvalues & Eigenvectors", course: "Linear Algebra", courseCode: "MA201", dueDate: "2026-02-22", status: "pending", description: "Compute eigenvalues and eigenvectors for given matrices." },
    ],
  },
  {
    id: "3",
    name: "Digital Electronics",
    code: "EE201",
    instructor: "Dr. Patel",
    credits: 4,
    grade: "A",
    attendance: 78,
    assignments: [
      { id: "a6", title: "Logic Gate Design", course: "Digital Electronics", courseCode: "EE201", dueDate: "2026-02-12", status: "submitted", grade: "22", maxGrade: "25", description: "Design combinational circuits using basic logic gates.", submittedAt: "2026-02-11T18:30:00" },
      { id: "a7", title: "Flip-Flop Circuits", course: "Digital Electronics", courseCode: "EE201", dueDate: "2026-02-25", status: "pending", description: "Implement SR, JK, and D flip-flop circuits." },
    ],
  },
]

// ---- DATA FETCHING FUNCTIONS (async for future API compatibility) ----

export async function getMessMenu(): Promise<MessMenu> {
  // TODO: Replace with API call - GET /api/mess/menu?date=today
  return mockMessMenu
}

export async function getEmails(): Promise<EmailSummary[]> {
  // TODO: Replace with API call - GET /api/emails/summarized
  return mockEmails
}

export async function getAnnouncements(): Promise<Announcement[]> {
  // TODO: Replace with API call - GET /api/announcements
  return mockAnnouncements
}

export async function getLostFoundItems(): Promise<LostFoundItem[]> {
  // TODO: Replace with API call - GET /api/lost-found
  return mockLostFound
}

export async function getMarketplaceItems(): Promise<MarketplaceItem[]> {
  // TODO: Replace with API call - GET /api/marketplace
  return mockMarketplace
}

export async function getCabPoolTrips(): Promise<CabPoolTrip[]> {
  // TODO: Replace with API call - GET /api/cab-pool
  return mockCabPool
}

export async function getNearbyPlaces(): Promise<NearbyPlace[]> {
  // TODO: Replace with API call - GET /api/nearby
  return mockNearbyPlaces
}

export async function getTimetable(): Promise<TimetableEntry[]> {
  // TODO: Replace with API call - GET /api/timetable
  return mockTimetable
}

export async function getCourses(): Promise<Course[]> {
  // TODO: Replace with API call - GET /api/courses
  return mockCourses
}

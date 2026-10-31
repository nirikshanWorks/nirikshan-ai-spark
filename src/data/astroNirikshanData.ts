import adityaImg from "@/assets/astro/acharya-aditya.jpg";
import nitinImg from "@/assets/astro/pnditnitin.png";
import astrolabeHeroImg from "@/assets/astro/astrolabe-hero.jpg";
import heroMandalaImg from "@/assets/astro/hero-mandala.jpg";
import vastuMandalaImg from "@/assets/astro/vastu-mandala.jpg";
import zodiacEngravingsImg from "@/assets/astro/zodiac-engravings.jpg";
import kundliCover from "@/assets/astro/Kundli Analysis & Diagnostics.png";
import matchmakingCover from "@/assets/astro/Kundli Milan & Marriage Compatibility.png";
import numerologyCover from "@/assets/astro/Vedic & Chaldean Numerology.png";
import tarotCover from "@/assets/astro/Interactive 3-Card Tarot Reading.png";
import vastuCover from "@/assets/astro/Vastu Shastra Explorer.png";

// Zodiac Sign Images
import ariesImg from "@/assets/astro/zodiac/aries.jpg";
import taurusImg from "@/assets/astro/zodiac/taurus.jpg";
import geminiImg from "@/assets/astro/zodiac/gemini.jpg";
import cancerImg from "@/assets/astro/zodiac/cancer.jpg";
import leoImg from "@/assets/astro/zodiac/leo.jpg";
import virgoImg from "@/assets/astro/zodiac/virgo.jpg";
import libraImg from "@/assets/astro/zodiac/libra.jpg";
import scorpioImg from "@/assets/astro/zodiac/scorpio.jpg";
import sagittariusImg from "@/assets/astro/zodiac/sagittarius.jpg";
import capricornImg from "@/assets/astro/zodiac/capricorn.jpg";
import aquariusImg from "@/assets/astro/zodiac/aquarius.jpg";
import piscesImg from "@/assets/astro/zodiac/pisces.jpg";

export const ASTRO_NIRIKSHAN_EXTERNAL_URL = "https://astro.nirikshanai.com";

export const ASTRO_NIRIKSHAN_META = {
  parentCompany: "Nirikshan AI Pvt. Ltd.",
  productName: "Astro Nirikshan",
  hindiName: "एस्ट्रो निरीक्षण",
  category: "ASTROLOGY & HOLISTIC SCIENCES",
  categorySubtitle: "AI-Enabled Digital Astrology & Holistic Guidance Platform",
  brandTagline: "Ancient Cosmic Sciences with AI Precision.",
  coreMessage: "Where Sacred Cosmic Sciences Meet AI Precision.",
  cardHeadline: "Ancient Wisdom. Modern Intelligence.",
  cardDescription:
    "Explore Vedic astrology, numerology, Vastu, Kundli analysis, and Tarot through a modern digital platform designed to bring traditional cosmic sciences into the digital age.",
  overviewHeading: "Ancient Cosmic Sciences Meet Modern Technology.",
  overviewDescription:
    "Astro Nirikshan is a digital astrology and holistic guidance platform developed by Nirikshan AI Pvt. Ltd. It brings together five traditional disciplines through interactive digital tools and expert-led guidance.",
  ctaHeading: "Explore the Universe of Astro Nirikshan.",
  ctaDescription:
    "Explore your daily horoscope, discover your Chaldean numerology numbers, generate your Vedic Janam Kundli, harmonize your home with Vastu Shastra, or draw guidance through interactive Tarot readings.",
  disclaimer:
    "Astro Nirikshan combines classical Vedic mathematical systems, Chaldean numerological algorithms, and archetypal frameworks. Traditional astrology and holistic disciplines are interpretive cultural and personal growth systems; our tools offer introspective clarity and guidance with zero data exploitation.",
};

export interface AstroFeatureBlock {
  id: string;
  discipline: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  image: string;
  expertLead: string;
  tags: string[];
  capabilities: string[];
  routePath?: string;
}

export const ASTRO_FEATURE_BLOCKS: AstroFeatureBlock[] = [
  {
    id: "vedic-astrology",
    discipline: "Vedic Astrology",
    title: "Classical Jyotish & Planetary Ephemeris",
    shortDesc:
      "Classical Jyotish, planetary positions, Lagna, Rashi, and Mahadasha analysis.",
    detailedDesc:
      "Mathematical ephemeris calculations evaluating precise celestial longitude, 12 Bhava house placements, planetary states (Avasthas), and 120-year Vimshottari Mahadasha forecasting.",
    image: kundliCover,
    expertLead: "Acharya Aditya Kothari",
    tags: ["Lagna & Rashi", "12 Bhavas", "Mahadasha Cycles", "Transit Gochar"],
    capabilities: [
      "Exact planetary degree calculation across 12 houses",
      "Vimshottari Mahadasha & Antardasha timeline mapping",
      "Planetary transit (Gochar) diagnostics and impact",
      "Scriptural gemstone and remedial recommendations",
    ],
    routePath: "/products/astro-nirikshan#vedic",
  },
  {
    id: "chaldean-numerology",
    discipline: "Chaldean Numerology",
    title: "Vibrational Resonance & Life Codes",
    shortDesc:
      "Mulank, Bhagyank, Driver Number, Destiny Number, and name numerology.",
    detailedDesc:
      "Ancient Chaldean vibration matrices converting personal names and birth dates into numerical frequencies to evaluate planetary alignment, compatibility, and milestone periods.",
    image: numerologyCover,
    expertLead: "Acharya Pandit Nitin Bhardwaj",
    tags: ["Mulank (Driver)", "Bhagyank (Destiny)", "Name Vibration", "Favorable Dates"],
    capabilities: [
      "Driver (Mulank) and Conductor (Bhagyank) calculation",
      "Phonetic name spelling vibration alignment",
      "Planetary compatibility index for personal & business names",
      "Favorable calendar cycles, auspicious dates & colors",
    ],
    routePath: "/products/astro-nirikshan#numerology",
  },
  {
    id: "vastu-shastra",
    discipline: "Vastu Shastra",
    title: "Spatial Energetics & Panchtattva Balance",
    shortDesc:
      "Eight directions, five Panchtattvas, and spatial guidance for homes and workplaces.",
    detailedDesc:
      "Architectural directional alignment harmonizing living and workspace zones with Earth, Water, Fire, Air, and Ether without structural demolition.",
    image: vastuCover,
    expertLead: "Acharya Aditya Kothari",
    tags: ["8 Directions", "5 Panchtattvas", "Brahmasthan", "Non-Demolition"],
    capabilities: [
      "8 cardinal and ordinal directional zone auditing",
      "Panchtattva (Five Elements) balance verification",
      "Residential room placement and entrance orientation",
      "Commercial workspace layout & energetic rectification",
    ],
    routePath: "/products/astro-nirikshan#vastu",
  },
  {
    id: "janam-kundli",
    discipline: "Janam Kundli & Kundli Milan",
    title: "Birth Chart & 36 Guna Ashtakoota Milan",
    shortDesc:
      "Birth chart analysis, planetary degrees, 12 Bhava houses, and 36 Guna Ashtakoota compatibility.",
    detailedDesc:
      "Deep natal chart synthesis paired with rigorous 36-point Ashtakoota Milan (Nadi, Bhakoot, Gana, Yoni, Maitri, Tara, Vasya, Varna) and Manglik Dosha mitigation.",
    image: matchmakingCover,
    expertLead: "Acharya Aditya & Pandit Nitin",
    tags: ["36 Guna Milan", "Manglik Analysis", "Nadi & Bhakoot", "Navamsha D-9"],
    capabilities: [
      "Parashari birth chart synthesis with Navamsha (D-9)",
      "Comprehensive 36-point Ashtakoota Guna compatibility",
      "Manglik Dosha and Sade Sati diagnostic verification",
      "Matrimonial and relationship long-term harmony scoring",
    ],
    routePath: "/products/astro-nirikshan#kundli",
  },
  {
    id: "interactive-tarot",
    discipline: "Interactive Tarot",
    title: "Archetypal Arcana & 3-Card Guidance",
    shortDesc:
      "Three-card readings covering past origins, present dynamics, and future trajectory.",
    detailedDesc:
      "Digital archetypal spread drawing from classical major and minor arcana to provide intuitive perspective on career decisions, emotional clarity, and life crossroads.",
    image: tarotCover,
    expertLead: "Acharya Pandit Nitin Bhardwaj",
    tags: ["Past / Present / Future", "Major Arcana", "Symbolic Wisdom", "Decision Clarity"],
    capabilities: [
      "Interactive 3-card spread with randomized digital draw",
      "Past Foundation, Present Challenge & Future Trajectory",
      "Symbolic archetypal interpretations for career and love",
      "Reflective journaling prompts for personal decision making",
    ],
    routePath: "/products/astro-nirikshan#tarot",
  },
];

export interface AstrologerProfile {
  name: string;
  hindiName?: string;
  title: string;
  experience: string;
  specialisations: string[];
  bio: string;
  focusAreas: string[];
  image: string;
  rating: string;
  consults: string;
}

export const FEATURED_ASTROLOGERS: AstrologerProfile[] = [
  {
    name: "Acharya Aditya Kothari",
    hindiName: "आचार्य आदित्य कोठारी",
    title: "Senior Vedic Astrologer & Vastu Consultant",
    experience: "15+ years experience",
    specialisations: ["Vedic Jyotish", "Kundli Analysis", "Vastu Shastra"],
    bio: "Acharya Aditya Kothari is an eminent authority in classical Vedic Jyotish and spatial energetics (Vastu Shastra). He specializes in natal chart evaluations, planetary dasha cycles, and architectural energy balancing to resolve obstacles and foster sustainable prosperity.",
    focusAreas: [
      "Parashari Janam Kundli diagnostics & 120-yr Mahadashas",
      "Vastu audit for residential homes & commercial enterprises",
      "Planetary dosha diagnostics & scriptural remedies",
      "Career milestone timing & financial progression",
    ],
    image: adityaImg,
    rating: "4.96 / 5.0",
    consults: "1,480+ consultations",
  },
  {
    name: "Acharya Pandit Nitin Bhardwaj",
    hindiName: "आचार्य पंडित नितिन भारद्वाज",
    title: "Vedic Scholar, Numerologist & Tarot Reader",
    experience: "12+ years experience",
    specialisations: ["Chaldean Numerology", "Tarot Arcana", "Kundli Analysis"],
    bio: "Acharya Pandit Nitin Bhardwaj combines timeless Vedic wisdom with Pythagorean & Chaldean Numerology and intuitive Tarot guidance. His sessions provide profound clarity on life-path numbers, phonetic name alignments, and decisive crossroad decisions.",
    focusAreas: [
      "Mulank, Bhagyank & phonetic name numerology alignment",
      "Intuitive 3-card Tarot spreads for life crossroads",
      "Kundli matching, Guna Milan & relationship harmony",
      "Auspicious Muhurat timing & holistic remedial paths",
    ],
    image: nitinImg,
    rating: "4.94 / 5.0",
    consults: "1,390+ consultations",
  },
];

export interface TechInnovationPillar {
  title: string;
  badge: string;
  description: string;
  highlight: string;
}

export const TECH_INNOVATION_PILLARS: TechInnovationPillar[] = [
  {
    title: "Interactive Astrology Tools",
    badge: "Interactive UI",
    description:
      "Modern, responsive web applications allowing users to explore natal charts, directional Vastu grids, and tarot spreads with fluid micro-interactions.",
    highlight: "Smooth Web Experience",
  },
  {
    title: "Client-Side Birth Chart Calculations",
    badge: "Zero-Latency Math",
    description:
      "Ephemeris algorithms and house cusps are calculated directly in your web browser, ensuring lightning-fast results without backend round trips.",
    highlight: "Instant Local Engine",
  },
  {
    title: "Vedic & Chaldean Mathematical Systems",
    badge: "Scriptural Precision",
    description:
      "Strict algorithmic fidelity to Brihat Parashara Hora Shastra, Jaimini Sutras, and authentic Chaldean phonetic sound frequency tables.",
    highlight: "Algorithmic Integrity",
  },
  {
    title: "Interactive 3D Zodiac Experience",
    badge: "Celestial Visualization",
    description:
      "A living, tactile celestial wheel presenting the 12 Rashis, elemental rulers, planetary states, and seasonal transitions in real-time space.",
    highlight: "Tactile Rashi Wheel",
  },
  {
    title: "Digital Vastu Exploration",
    badge: "Spatial Vector Grids",
    description:
      "Eight-directional digital floor plan overlays evaluating the balance of the 5 Panchtattvas and recommending non-demolition remedial adjustments.",
    highlight: "Architectural Energetics",
  },
  {
    title: "Privacy-Focused Architecture",
    badge: "100% Data Sovereignty",
    description:
      "Personal birth dates, birth times, and geographic coordinates remain entirely on the client side. No data harvesting or profile selling.",
    highlight: "Zero Data Harvesting",
  },
];

export interface ZodiacSign {
  slug: string;
  name: string;
  hindi: string;
  dates: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  ruler: string;
  image: string;
  reflection: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    slug: "aries",
    name: "Aries",
    hindi: "मेष",
    dates: "Mar 21 – Apr 19",
    element: "Fire",
    ruler: "Mars (Mangal)",
    image: ariesImg,
    reflection: "Harness your natural courage with deliberate patience; decisive action yields enduring momentum.",
  },
  {
    slug: "taurus",
    name: "Taurus",
    hindi: "वृषभ",
    dates: "Apr 20 – May 20",
    element: "Earth",
    ruler: "Venus (Shukra)",
    image: taurusImg,
    reflection: "Ground your ambitions in steady daily habits; sustainable consistency outlasts sporadic bursts.",
  },
  {
    slug: "gemini",
    name: "Gemini",
    hindi: "मिथुन",
    dates: "May 21 – Jun 20",
    element: "Air",
    ruler: "Mercury (Budha)",
    image: geminiImg,
    reflection: "Clarity comes from structured communication; synthesize diverse ideas into a focused outcome.",
  },
  {
    slug: "cancer",
    name: "Cancer",
    hindi: "कर्क",
    dates: "Jun 21 – Jul 22",
    element: "Water",
    ruler: "Moon (Chandra)",
    image: cancerImg,
    reflection: "Trust your emotional intuition while establishing healthy boundaries in personal relationships.",
  },
  {
    slug: "leo",
    name: "Leo",
    hindi: "सिंह",
    dates: "Jul 23 – Aug 22",
    element: "Fire",
    ruler: "Sun (Surya)",
    image: leoImg,
    reflection: "Lead with warmth and generous mentorship; your authentic presence naturally elevates those around you.",
  },
  {
    slug: "virgo",
    name: "Virgo",
    hindi: "कन्या",
    dates: "Aug 23 – Sep 22",
    element: "Earth",
    ruler: "Mercury (Budha)",
    image: virgoImg,
    reflection: "Channel analytical precision into practical solutions; perfection is found in purposeful balance.",
  },
  {
    slug: "libra",
    name: "Libra",
    hindi: "तुला",
    dates: "Sep 23 – Oct 22",
    element: "Air",
    ruler: "Venus (Shukra)",
    image: libraImg,
    reflection: "Seek equilibrium through thoughtful compromise, but remain anchored in your personal values.",
  },
  {
    slug: "scorpio",
    name: "Scorpio",
    hindi: "वृश्चिक",
    dates: "Oct 23 – Nov 21",
    element: "Water",
    ruler: "Mars (Mangal)",
    image: scorpioImg,
    reflection: "Embrace transformative inner growth; shedding obsolete beliefs creates room for empowerment.",
  },
  {
    slug: "sagittarius",
    name: "Sagittarius",
    hindi: "धनु",
    dates: "Nov 22 – Dec 21",
    element: "Fire",
    ruler: "Jupiter (Guru)",
    image: sagittariusImg,
    reflection: "Expand your intellectual horizon through philosophical inquiry and lifelong pursuit of knowledge.",
  },
  {
    slug: "capricorn",
    name: "Capricorn",
    hindi: "मकर",
    dates: "Dec 22 – Jan 19",
    element: "Earth",
    ruler: "Saturn (Shani)",
    image: capricornImg,
    reflection: "Perseverance and ethical discipline build enduring legacies; honor the steps along the ascent.",
  },
  {
    slug: "aquarius",
    name: "Aquarius",
    hindi: "कुंभ",
    dates: "Jan 20 – Feb 18",
    element: "Air",
    ruler: "Saturn (Shani)",
    image: aquariusImg,
    reflection: "Pioneer innovative solutions for collective wellbeing; authentic individuality inspires community.",
  },
  {
    slug: "pisces",
    name: "Pisces",
    hindi: "मीन",
    dates: "Feb 19 – Mar 20",
    element: "Water",
    ruler: "Jupiter (Guru)",
    image: piscesImg,
    reflection: "Deepen your creative imagination and compassionate connection while remaining mindful of reality.",
  },
];

export interface Navagraha {
  name: string;
  sanskrit: string;
  planet: string;
  ruler: string;
  mantra: string;
  element: string;
  domain: string;
  metal: string;
  gem: string;
}

export const NAVAGRAHAS: Navagraha[] = [
  {
    name: "Surya",
    sanskrit: "सूर्य",
    planet: "Sun",
    ruler: "Leo (Simha)",
    mantra: "ॐ सूर्याय नमः",
    element: "Fire (Agni)",
    domain: "Soul (Atma), Vitality, Willpower & Authority",
    metal: "Pure Copper & Gold",
    gem: "Ruby (Manikya)",
  },
  {
    name: "Chandra",
    sanskrit: "चन्द्र",
    planet: "Moon",
    ruler: "Cancer (Karka)",
    mantra: "ॐ चन्द्राय नमः",
    element: "Water (Jala)",
    domain: "Mind (Manas), Emotions, Memory & Intuition",
    metal: "Pure Silver",
    gem: "Natural Pearl (Moti)",
  },
  {
    name: "Mangal",
    sanskrit: "मङ्गल",
    planet: "Mars",
    ruler: "Aries & Scorpio",
    mantra: "ॐ मङ्गलाय नमः",
    element: "Fire (Agni)",
    domain: "Courage, Strategic Drive, Physical Energy & Land",
    metal: "Red Copper",
    gem: "Red Coral (Moonga)",
  },
  {
    name: "Budha",
    sanskrit: "बुध",
    planet: "Mercury",
    ruler: "Gemini & Virgo",
    mantra: "ॐ बुधाय नमः",
    element: "Earth (Prithvi)",
    domain: "Intellect (Buddhi), Logic, Speech & Trade",
    metal: "Brass & Bell Metal",
    gem: "Emerald (Panna)",
  },
  {
    name: "Guru",
    sanskrit: "बृहस्पति",
    planet: "Jupiter",
    ruler: "Sagittarius & Pisces",
    mantra: "ॐ बृहस्पतये नमः",
    element: "Ether (Akash)",
    domain: "Wisdom, Dharma, Higher Learning & Grace",
    metal: "Yellow Gold",
    gem: "Yellow Sapphire (Pukhraj)",
  },
  {
    name: "Shukra",
    sanskrit: "शुक्र",
    planet: "Venus",
    ruler: "Taurus & Libra",
    mantra: "ॐ शुक्राय नमः",
    element: "Water (Jala)",
    domain: "Aesthetic Arts, Harmony, Love & Prosperity",
    metal: "Silver & Platinum",
    gem: "Diamond (Heera)",
  },
  {
    name: "Shani",
    sanskrit: "शनि",
    planet: "Saturn",
    ruler: "Capricorn & Aquarius",
    mantra: "ॐ शनैश्चराय नमः",
    element: "Air (Vayu)",
    domain: "Karma, Perseverance, Justice & Longevity",
    metal: "Black Iron",
    gem: "Blue Sapphire (Neelam)",
  },
  {
    name: "Rahu",
    sanskrit: "राहु",
    planet: "North Lunar Node",
    ruler: "Shadow Force",
    mantra: "ॐ राहवे नमः",
    element: "Cosmic Shadow",
    domain: "Innovation, Unconventional Paths & Worldly Ambition",
    metal: "Mixed Astadhatu",
    gem: "Hessonite (Gomed)",
  },
  {
    name: "Ketu",
    sanskrit: "केतु",
    planet: "South Lunar Node",
    ruler: "Shadow Force",
    mantra: "ॐ केतवे नमः",
    element: "Spiritual Fire",
    domain: "Moksha, Metaphysics, Detachment & Intuition",
    metal: "White Metal",
    gem: "Cat's Eye (Lehsuniya)",
  },
];

export {
  adityaImg,
  nitinImg,
  astrolabeHeroImg,
  heroMandalaImg,
  vastuMandalaImg,
  zodiacEngravingsImg,
  kundliCover,
  matchmakingCover,
  numerologyCover,
  tarotCover,
  vastuCover,
};


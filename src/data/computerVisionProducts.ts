import cvPpeImg from "@/assets/cv-ppe.png";
import cvFireImg from "@/assets/cv-fire.png";
import cvPhoneImg from "@/assets/cv-phone.png";
import cvDemoImg from "@/assets/computer-vision-demo.png";

export type SolutionCategoryId =
  | "residential"
  | "workplace-safety"
  | "vehicle-intelligence"
  | "manufacturing-quality"
  | "inventory-tracking"
  | "platform-analytics";

export interface SolutionCategory {
  id: SolutionCategoryId;
  title: string;
  shortTitle: string;
  source: string;
  description: string;
  capabilities: string[];
  image: string;
  accent: string;
  borderAccent: string;
  iconBg: string;
}

export interface CVSolution {
  id: string;
  name: string;
  slug: string;
  category: SolutionCategoryId;
  categoryName: string;
  shortDescription: string;
  detailedOverview: string;
  problem: string;
  capabilities: string[];
  howItWorks: string[];
  deploymentEnvironments: string[];
  useCases: string[];
  relatedSolutionIds: string[];
  badge: string;
  image: string;
  accentColor: string;
}

export interface PlatformWorkflowStep {
  step: string;
  number: number;
  title: string;
  subhead: string;
  description: string;
  inputs: string[];
  outputs: string;
  iconName: string;
}

export interface DeploymentModel {
  title: string;
  tagline: string;
  description: string;
  points: string[];
  bestFor: string;
  badge: string;
}

export interface IndustryApplication {
  id: string;
  name: string;
  description: string;
  useCases: string[];
  image: string;
  categoryTag: SolutionCategoryId;
  badge: string;
}

export interface ComparisonRow {
  feature: string;
  residential: boolean;
  industrial: boolean;
  commercial: boolean;
  realTimeAlerts: boolean;
  notes?: string;
}

/* ──────────────────────────────────────────────────────────
   1. PRIMARY PRODUCT CATEGORIES (Source: PDF Pages 5–25)
────────────────────────────────────────────────────────── */
export const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    id: "residential",
    title: "Smart Home & Residential Security",
    shortTitle: "Residential Security",
    source: "PDF pages 5–8",
    description:
      "Enhance residential security with intelligent visual monitoring that helps identify suspicious activity, detect safety incidents, and monitor entrances and shared spaces.",
    capabilities: [
      "Intruder & Perimeter Detection",
      "Unwanted Person & Loitering Alert",
      "Door & Entrance Monitoring",
      "Vehicle & Parking Space Monitoring",
      "Residential Fire & Smoke Detection",
      "Elderly & Vulnerable Person Fall Detection",
      "Unusual Night-Time Activity Detection",
      "Package & Left-Behind Object Detection",
      "Apartment & Gated-Community Surveillance",
    ],
    image:
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1000&q=80",
    accent: "from-blue-600/20 to-cyan-500/10",
    borderAccent: "border-blue-500/30 hover:border-blue-500",
    iconBg: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "workplace-safety",
    title: "Industrial Safety & Workplace Monitoring",
    shortTitle: "Workplace Safety",
    source: "PDF pages 9–12",
    description:
      "Support safer industrial operations through visual monitoring of protective equipment, restricted areas, worker behavior, and potential workplace hazards.",
    capabilities: [
      "PPE Compliance (Helmet, Vest, Gloves, Goggles)",
      "Industrial Fire & Smoke Detection",
      "Hazard Zone & Restricted Perimeter Monitoring",
      "Mobile Phone Usage & Distraction Detection",
      "Unsafe Worker Behavior Identification",
      "Unauthorized Access to Control Rooms",
      "Worker Fall & Man-Down Emergency Alerts",
      "Worker–Equipment Proximity Alerts",
      "Machinery Operational Zone Safeguards",
    ],
    image: cvPpeImg,
    accent: "from-emerald-600/20 to-teal-500/10",
    borderAccent: "border-emerald-500/30 hover:border-emerald-500",
    iconBg: "bg-emerald-500/10 text-emerald-500",
  },
  {
    id: "vehicle-intelligence",
    title: "Industrial Vehicle & Traffic Intelligence",
    shortTitle: "Vehicle Intelligence",
    source: "PDF page 14",
    description:
      "Improve vehicle visibility and operational awareness by monitoring vehicle movement, parking areas, access restrictions, and vehicle–pedestrian interactions.",
    capabilities: [
      "Industrial Vehicle & Forklift Detection",
      "Number Plate Recognition (ANPR / LPR)",
      "Vehicle–Person Proximity & Collision Alert",
      "Multi-Camera Vehicle Fleet Tracking",
      "Dock & Loading Bay Traffic Monitoring",
      "Automated Gate Entry/Exit Authorization",
      "Restricted Vehicle Access Zone Alerts",
      "Internal Yard Speed & Direction Compliance",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    accent: "from-amber-600/20 to-orange-500/10",
    borderAccent: "border-amber-500/30 hover:border-amber-500",
    iconBg: "bg-amber-500/10 text-amber-500",
  },
  {
    id: "manufacturing-quality",
    title: "Quality Inspection & Manufacturing",
    shortTitle: "Manufacturing & Quality",
    source: "PDF page 15",
    description:
      "Apply computer vision to manufacturing workflows to identify visible defects, inspect packaging, verify assembly, and support consistent quality-control processes.",
    capabilities: [
      "Automated Product Surface Defect Detection",
      "Packaging Integrity & Seal Inspection",
      "Missing Label & Barcode Quality Check",
      "Complex Component Assembly Verification",
      "Missing Bolt, Cover & Part Detection",
      "Real-Time Production Line Throughput Monitoring",
      "Defect Rate Analytics & Yield Optimization",
    ],
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80",
    accent: "from-violet-600/20 to-purple-500/10",
    borderAccent: "border-violet-500/30 hover:border-violet-500",
    iconBg: "bg-violet-500/10 text-violet-500",
  },
  {
    id: "inventory-tracking",
    title: "Object Tracking, Inventory & Material Intelligence",
    shortTitle: "Object & Inventory",
    source: "PDF pages 16–18",
    description:
      "Turn visual information into operational insights by identifying objects, tracking movement, monitoring inventory, and detecting unusual activities.",
    capabilities: [
      "Multi-Object Detection across Frames",
      "High-Speed Automated Item & Pipe Counting",
      "Material Identification (Steel, Aluminum, PVC)",
      "Pallet & Box Stock Visibility Mapping",
      "Asset & Equipment Location Monitoring",
      "Material Movement Tracking & Trajectory Heatmaps",
      "Spatial Anomaly & Operational Deviation Alerts",
      "Custom Object Detection for Specialized Cargo",
    ],
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80",
    accent: "from-indigo-600/20 to-blue-500/10",
    borderAccent: "border-indigo-500/30 hover:border-indigo-500",
    iconBg: "bg-indigo-500/10 text-indigo-500",
  },
  {
    id: "platform-analytics",
    title: "Computer Vision Platform & Analytics",
    shortTitle: "Platform & Analytics",
    source: "PDF pages 19–25",
    description:
      "Bring computer vision capabilities together through a flexible monitoring platform with event visibility, configurable alerts, analytics, and deployment options suited to organizational requirements.",
    capabilities: [
      "Centralized Multi-Camera Stream Management",
      "Sub-Second Real-Time Alert Dispatch",
      "Multi-Channel Notifications (App, Email, SMS)",
      "Interactive Operational Monitoring Dashboard",
      "Configurable Detection Zones & Virtual Fences",
      "Incident Evidence Vault & Timestamped Logging",
      "Visual Compliance & Safety Audit Reports",
      "Flexible Cloud, On-Premises & Hybrid Deployment",
    ],
    image: cvDemoImg,
    accent: "from-cyan-600/20 to-blue-500/10",
    borderAccent: "border-cyan-500/30 hover:border-cyan-500",
    iconBg: "bg-cyan-500/10 text-cyan-500",
  },
];

/* ──────────────────────────────────────────────────────────
   2. INDIVIDUAL SOLUTIONS REPOSITORY (Centralized Data)
────────────────────────────────────────────────────────── */
export const CV_SOLUTIONS: CVSolution[] = [
  // ── RESIDENTIAL SOLUTIONS ──
  {
    id: "res-intruder",
    name: "Intruder & Perimeter Detection",
    slug: "intruder-perimeter-detection",
    category: "residential",
    categoryName: "Smart Home & Residential Security",
    shortDescription:
      "Identifies unauthorized persons crossing compound boundaries or entering private perimeters with zero blind-spot night capability.",
    detailedOverview:
      "Traditional perimeter security relies on passive infrared sensors that suffer from frequent false triggers caused by stray animals or shifting vegetation. Nirikshan AI's intruder detection analyzes video streams to isolate human movement signatures, track perimeter crossings, and verify boundary violations before dispatching targeted alerts.",
    problem:
      "Delayed intrusion detection and high false alarm rates from conventional motion sensors in residential compounds and villas.",
    capabilities: [
      "Virtual tripwire & polygon boundary monitoring",
      "Human signature recognition under low-light/night conditions",
      "Distinction between pets/wildlife and actual intruders",
      "Instant snapshot capture with timestamp & camera ID",
      "Automated siren trigger or security guard notification",
    ],
    howItWorks: [
      "Camera Input: Optical or thermal CCTV feed at boundary fences.",
      "AI Detection: Deep learning model isolates human silhouette and trajectory.",
      "Rule Evaluation: Validates crossing of configured restricted polygon.",
      "Action Trigger: Sends priority push alert and logs 15-second evidence clip.",
    ],
    deploymentEnvironments: [
      "Gated Communities & Estates",
      "Independent Villas & Farmhouses",
      "Perimeter Fences & Boundary Walls",
      "Roof Access Points & Terraces",
    ],
    useCases: [
      "Boundary wall climbing detection",
      "After-hours private garden perimeter intrusion",
      "Secondary access gate breach monitoring",
    ],
    relatedSolutionIds: ["res-unwanted", "res-entrance", "res-unusual"],
    badge: "Security Critical",
    image:
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-blue-600 to-cyan-500",
  },
  {
    id: "res-unwanted",
    name: "Unwanted Person & Loitering Detection",
    slug: "unwanted-person-loitering-detection",
    category: "residential",
    categoryName: "Smart Home & Residential Security",
    shortDescription:
      "Monitors shared building corridors and driveways to alert security when unknown individuals linger past defined dwell thresholds.",
    detailedOverview:
      "Loitering detection continuously assesses dwell time for individuals in sensitive areas such as apartment lobbies, basements, and service stairs. When an unauthorized individual remains static or wanders in a monitored zone longer than configured limits, the platform issues proactive warnings.",
    problem:
      "Security personnel cannot continuously watch dozens of static monitors to spot individuals casing property or loitering near entrances.",
    capabilities: [
      "Configurable dwell-time thresholds (e.g., >60 seconds)",
      "Trajectory & suspicious loitering pattern classification",
      "Multi-camera handoff across residential common areas",
      "Privacy-preserving blurring for non-incident occupants",
    ],
    howItWorks: [
      "Camera Input: Corridor, elevator lobby, or driveway IP camera feeds.",
      "AI Detection: Real-time multi-person tracking with individual timers.",
      "Rule Evaluation: Triggers when stationary dwell exceeds threshold.",
      "Action Trigger: Guard post alert with live camera focus.",
    ],
    deploymentEnvironments: [
      "Apartment Elevators & Corridors",
      "Basement Parking & Storage Rooms",
      "Rear Service Alleys & Stairwells",
    ],
    useCases: [
      "Loitering near residential apartment main doors",
      "Suspicious dwelling in underground parking bays",
      "Unescorted visitor roaming in residential towers",
    ],
    relatedSolutionIds: ["res-intruder", "res-entrance", "res-facility"],
    badge: "Proactive Alert",
    image:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-blue-500 to-indigo-500",
  },
  {
    id: "res-entrance",
    name: "Door & Entrance Monitoring",
    slug: "door-entrance-monitoring",
    category: "residential",
    categoryName: "Smart Home & Residential Security",
    shortDescription:
      "Maintains continuous visual oversight of building lobbies and private door fronts with visitor counting and tailgating awareness.",
    detailedOverview:
      "Provides structured visibility over main building gates, lobby doors, and individual doorways. The system tracks visitor flow, logs entry timestamps, and provides residents with clear visual confirmation of who approaches their premises.",
    problem:
      "Manual sign-in registers at apartment gates are inaccurate and unverified, allowing untracked entry.",
    capabilities: [
      "Automated visitor arrival classification",
      "Doorway obstruction & propped-door detection",
      "Entry & exit directional flow counting",
      "Integration with resident mobile app notifications",
    ],
    howItWorks: [
      "Camera Input: Front door video doorbell or overhead lobby CCTV.",
      "AI Detection: Classifies approaching individuals and vehicle arrivals.",
      "Rule Evaluation: Verifies if entry occurred within authorized schedule.",
      "Action Trigger: Logs visitor event and notifies resident/security.",
    ],
    deploymentEnvironments: [
      "Residential Tower Lobbies",
      "Individual Apartment Front Doors",
      "Clubhouse & Gym Entrances",
    ],
    useCases: [
      "Visitor presence notifications for residents",
      "Delivery agent arrival verification",
      "Propped open fire-exit or security gate alerts",
    ],
    relatedSolutionIds: ["res-unwanted", "res-parking", "res-package"],
    badge: "Access Aware",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "res-parking",
    name: "Vehicle & Residential Parking Monitoring",
    slug: "vehicle-parking-monitoring",
    category: "residential",
    categoryName: "Smart Home & Residential Security",
    shortDescription:
      "Tracks resident and visitor vehicle movements, prevents unauthorized slot parking, and detects blocked driveways in residential layouts.",
    detailedOverview:
      "Monitors vehicle movement across residential basements and open-air parking lots. Identifies unauthorized vehicles occupying assigned resident bays, flags vehicles parked in fire lanes or driveways, and logs entry/exit timestamps.",
    problem:
      "Disputes over reserved parking spaces and delivery vans blocking residential emergency exits.",
    capabilities: [
      "Vehicle classification (Car, SUV, Bike, Van, Delivery Truck)",
      "Reserved parking slot occupancy tracking",
      "No-parking & fire lane obstruction alerts",
      "Optional license plate logging for authorized vehicles",
    ],
    howItWorks: [
      "Camera Input: Basement ceiling or pole-mounted entrance cameras.",
      "AI Detection: Identifies vehicle bounding box and mapped bay polygon.",
      "Rule Evaluation: Checks if vehicle is authorized for detected slot.",
      "Action Trigger: Sends parking violation notification to estate management.",
    ],
    deploymentEnvironments: [
      "Basement Resident Parking",
      "Visitor Parking Lots",
      "Residential Driveways & Emergency Access Roads",
    ],
    useCases: [
      "Alerting when visitor parks in an owner's private bay",
      "Detecting vehicles double-parked or blocking fire lanes",
      "Tracking overnight unknown vehicle presence",
    ],
    relatedSolutionIds: ["res-entrance", "veh-anpr", "veh-traffic"],
    badge: "Traffic Control",
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-blue-600 to-sky-500",
  },
  {
    id: "res-fire-smoke",
    name: "Residential Fire & Early Smoke Detection",
    slug: "residential-fire-smoke-detection",
    category: "residential",
    categoryName: "Smart Home & Residential Security",
    shortDescription:
      "Optical flame and smoke detection that identifies fire signatures in common kitchens, corridors, and waste chutes faster than ceiling sensors.",
    detailedOverview:
      "Standard heat and ionization smoke detectors can take minutes to respond, especially in high-ceiling lobbies, outdoor parking, or drafty staircases. Nirikshan AI uses optical pattern analysis to recognize flame flickers and rising smoke plumes within seconds.",
    problem:
      "Delayed fire alarm activation in residential lobbies and basement areas with high airflow.",
    capabilities: [
      "Visual flame flicker and color temperature analysis",
      "Plume dynamic tracking to identify rising smoke",
      "Distinction between cooking steam and true combustion smoke",
      "Emergency push notification with visual snapshot confirmation",
    ],
    howItWorks: [
      "Camera Input: Common area or kitchen-facing security cameras.",
      "AI Detection: Analyzes pixel motion and combustion spectrum patterns.",
      "Rule Evaluation: Verifies sustained fire/smoke characteristics.",
      "Action Trigger: Triggers emergency broadcast and security alerts.",
    ],
    deploymentEnvironments: [
      "Apartment Kitchens & Cafeterias",
      "Basement Electrical Rooms & DG Sets",
      "Garbage Chutes & Utility Shafts",
    ],
    useCases: [
      "Stove fire flare-up detection in clubhouse kitchens",
      "Short-circuit smoke detection in electrical meter rooms",
      "Dry leaf or trash bin fire alerts in residential gardens",
    ],
    relatedSolutionIds: ["safe-fire-smoke", "res-intruder", "res-facility"],
    badge: "Life Safety",
    image: cvFireImg,
    accentColor: "from-red-600 to-amber-500",
  },
  {
    id: "res-fall",
    name: "Fall & Vulnerable-Person Detection",
    slug: "fall-vulnerable-person-detection",
    category: "residential",
    categoryName: "Smart Home & Residential Security",
    shortDescription:
      "Detects sudden human falls and prolonged immobility in residential elderly care, common walkways, and private senior apartments.",
    detailedOverview:
      "Uses skeletal pose estimation to detect sudden postural transitions and prolonged recumbent states on the floor. When an individual collapses or remains prone without getting up, an immediate alert is generated for caregivers or building medical staff.",
    problem:
      "Elderly residents experiencing unassisted falls without wearable emergency buttons on hand.",
    capabilities: [
      "Real-time skeletal pose & velocity vector estimation",
      "Post-fall immobility duration confirmation",
      "No wearable hardware required — operates on camera feed",
      "Configurable privacy masking to protect personal dignity",
    ],
    howItWorks: [
      "Camera Input: Living area or hallway CCTV with privacy settings.",
      "AI Detection: Pose model monitors head/body center of gravity trajectory.",
      "Rule Evaluation: Rapid downward acceleration followed by inactivity.",
      "Action Trigger: High-priority SMS, app notification, and audible alert.",
    ],
    deploymentEnvironments: [
      "Senior Living Communities",
      "Assisted Care Facilities",
      "Residential Common Lounges & Walkways",
    ],
    useCases: [
      "Elderly resident falling in common residential garden",
      "Slip-and-fall detection on wet poolside surfaces",
      "Unresponsive person alert in residential elevators",
    ],
    relatedSolutionIds: ["safe-fall", "res-facility", "safe-ppe"],
    badge: "Care & Health",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-rose-500 to-pink-500",
  },
  {
    id: "res-package",
    name: "Package & Left-Behind Object Monitoring",
    slug: "package-left-behind-object-monitoring",
    category: "residential",
    categoryName: "Smart Home & Residential Security",
    shortDescription:
      "Monitors parcels left at residential doorsteps, prevents package theft, and alerts on unattended suspicious baggage in common areas.",
    detailedOverview:
      "Detects the placement and removal of packages at individual doorways or residential package rooms. Tracks who placed the parcel and immediately warns if an unauthorized person picks it up or tampers with it.",
    problem:
      "Porch piracy, stolen e-commerce deliveries, and unattended bags raising security alarms in residential lobbies.",
    capabilities: [
      "Box & parcel object detection upon placement",
      "Person-to-object interaction tracking (placement vs removal)",
      "Unattended object timer in high-security common areas",
      "Delivery audit trail with time-stamped visual proof",
    ],
    howItWorks: [
      "Camera Input: Doorstep or package drop-off area camera.",
      "AI Detection: Identifies newly introduced static object bounding box.",
      "Rule Evaluation: Alerts on package presence or unverified pickup.",
      "Action Trigger: Sends delivery arrival notification to homeowner.",
    ],
    deploymentEnvironments: [
      "Apartment Door Fronts & Porches",
      "Residential Mail & Parcel Rooms",
      "Main Lobby Reception Counters",
    ],
    useCases: [
      "Instant notification when courier drops off a delivery",
      "Theft alert if a non-resident lifts package from porch",
      "Abandoned bag alert in clubhouse lounge",
    ],
    relatedSolutionIds: ["res-entrance", "res-facility", "inv-counting"],
    badge: "Asset Security",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-amber-500 to-blue-500",
  },
  {
    id: "res-facility",
    name: "Residential Facility & Common-Area Monitoring",
    slug: "residential-facility-common-area-monitoring",
    category: "residential",
    categoryName: "Smart Home & Residential Security",
    shortDescription:
      "Surveillance for shared community facilities including swimming pools, gyms, playgrounds, and clubhouse occupancy levels.",
    detailedOverview:
      "Helps community managers maintain safety regulations across shared amenities. Monitors swimming pools for after-hours unauthorized swimming or lone child presence, manages gym occupancy, and tracks playground security.",
    problem:
      "Drowning risks from unsupervised children near pools and safety incidents in unmonitored clubhouse zones.",
    capabilities: [
      "Water zone intrusion & lone child pool proximity detection",
      "Playground occupancy & after-hours access tracking",
      "Clubhouse crowd counting to prevent overcrowding",
      "Vandalism & fixture damage alert generation",
    ],
    howItWorks: [
      "Camera Input: Amenity cameras positioned at pool, gym, and grounds.",
      "AI Detection: Classifies human proximity to water edge and occupancy count.",
      "Rule Evaluation: Triggers if pool entered outside operational hours.",
      "Action Trigger: Automated speaker alert and clubhouse manager notification.",
    ],
    deploymentEnvironments: [
      "Community Swimming Pools & Spas",
      "Children's Playgrounds & Sports Courts",
      "Clubhouse Gyms, Lounges & Party Halls",
    ],
    useCases: [
      "Alerting if a child approaches pool perimeter without adult accompaniment",
      "Detecting after-midnight swimming pool access",
      "Managing clubhouse capacity compliance during community events",
    ],
    relatedSolutionIds: ["res-intruder", "res-unwanted", "res-fall"],
    badge: "Community Care",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-teal-500 to-cyan-500",
  },

  // ── INDUSTRIAL SAFETY & WORKPLACE MONITORING ──
  {
    id: "safe-ppe",
    name: "PPE Compliance Monitoring",
    slug: "ppe-compliance-monitoring",
    category: "workplace-safety",
    categoryName: "Industrial Safety & Workplace Monitoring",
    shortDescription:
      "Automated verification of hard hats, high-visibility reflective vests, safety gloves, goggles, and steel-toe footwear across shop floors.",
    detailedOverview:
      "Computer vision-based monitoring designed to identify missing or improperly worn personal protective equipment in industrial environments. Using multi-class object detection, the system checks whether workers on active shop floors adhere to mandatory safety attire before and during high-risk tasks.",
    problem:
      "Manual safety audits cover only a fraction of shift hours, leaving non-compliant workers exposed to preventable head and bodily injuries.",
    capabilities: [
      "Helmet / Hard Hat detection with color/role classification",
      "High-visibility reflective safety vest detection",
      "Gloves, safety goggles, face masks, and safety footwear where configured",
      "Zone-specific PPE requirements (e.g., ear protection in heavy mill bay)",
      "Automated violation logging with timestamp, location, and snapshot",
    ],
    howItWorks: [
      "Camera Input: Standard overhead IP CCTV stream from factory work zones.",
      "AI Detection: YOLO-based detection model scans every worker for mandatory PPE items.",
      "Rule Evaluation: Evaluates worker PPE against the designated safety protocol for that specific zone.",
      "Action Trigger: Triggers an alert or incident record if missing gear is confirmed over consecutive frames.",
    ],
    deploymentEnvironments: [
      "Automotive & Heavy Assembly Plants",
      "Construction Sites & Scaffolding Zones",
      "Chemical & Oil Refineries",
      "Warehouses, Steel Mills & Mining Sites",
    ],
    useCases: [
      "Worker entering fabrication bay without wearing hard hat",
      "Logistics personnel walking across forklift lanes without high-vis vest",
      "Contractor entering high-noise zone without mandatory ear protection",
    ],
    relatedSolutionIds: ["safe-hazard-zone", "safe-worker-equip", "safe-fire-smoke"],
    badge: "Safety Essential",
    image: cvPpeImg,
    accentColor: "from-emerald-500 to-teal-400",
  },
  {
    id: "safe-fire-smoke",
    name: "Industrial Fire, Flame & Smoke Detection",
    slug: "industrial-fire-smoke-detection",
    category: "workplace-safety",
    categoryName: "Industrial Safety & Workplace Monitoring",
    shortDescription:
      "Early optical flame and smoke detection for expansive factory halls, chemical warehouses, and combustible storage bays.",
    detailedOverview:
      "Industrial facilities with high ceilings, mechanical ventilation, or open yard storage often suffer from delayed smoke detection because smoke disperses before reaching ceiling detectors. Nirikshan AI's visual fire detection analyzes CCTV feeds to detect open flames and rising combustion smoke in under 10 seconds.",
    problem:
      "Slow activation of conventional fire sensors in high-ceiling factories leads to catastrophic damage before emergency intervention.",
    capabilities: [
      "Direct optical flame and flicker frequency analysis",
      "Turbulent smoke plume expansion tracking",
      "Wide-angle coverage of high-bay factory ceilings (up to 30m height)",
      "Zero interference with dusty industrial atmospheres",
      "Direct integration with plant fire control panels and deluge valves",
    ],
    howItWorks: [
      "Camera Input: Existing wide-angle CCTV cameras across factory bays.",
      "AI Detection: Specialized CNN model identifies visual combustion signatures.",
      "Rule Evaluation: Validates flame dynamics and excludes welding flash or reflections.",
      "Action Trigger: Sends instant fire alarm, triggers sirens, and dispatches SMS/email.",
    ],
    deploymentEnvironments: [
      "Raw Material & Chemical Warehouses",
      "Power Plants, Substations & Boiler Rooms",
      "Fabrication & Welding Shops",
      "Timber Mills & Paper Processing Lines",
    ],
    useCases: [
      "Early spark or open flame detection in packaging materials storage",
      "Smoldering cable tray smoke detection in electrical tunnels",
      "Refinery tank farm perimeter fire surveillance",
    ],
    relatedSolutionIds: ["res-fire-smoke", "safe-ppe", "safe-hazard-zone"],
    badge: "Disaster Prevention",
    image: cvFireImg,
    accentColor: "from-red-600 to-orange-500",
  },
  {
    id: "safe-hazard-zone",
    name: "Hazard Zone & Restricted Area Monitoring",
    slug: "hazard-zone-monitoring",
    category: "workplace-safety",
    categoryName: "Industrial Safety & Workplace Monitoring",
    shortDescription:
      "Defines virtual safety boundaries around live machinery, high-voltage equipment, and robotic cells to prevent crush and shock incidents.",
    detailedOverview:
      "Creates dynamic virtual exclusion zones around dangerous manufacturing assets such as robotic arms, stamping presses, and overhead cranes. If a worker crosses into the danger zone while machinery is live, an immediate warning or automated machine interlock is triggered.",
    problem:
      "Workers inadvertently entering hazardous operational zones during automated production cycles, leading to crush or pinch injuries.",
    capabilities: [
      "Custom polygon hazard boundary mapping per camera view",
      "Directional entry & exit validation (allows retreat, flags entry)",
      "Integration with PLC / SCADA relays for emergency machine pause",
      "Audible broadcast warning directed at the specific zone",
    ],
    howItWorks: [
      "Camera Input: Overhead camera focused on robotic or hydraulic cell.",
      "AI Detection: Tracks human coordinates relative to mapped virtual fence.",
      "Rule Evaluation: Checks if machinery is in active state during breach.",
      "Action Trigger: Triggers emergency machine stop relay and logs violation.",
    ],
    deploymentEnvironments: [
      "Automated Robotic Welding & Assembly Cells",
      "High-Voltage Substations & Switchgear Rooms",
      "Crushing & Milling Machine Zones",
      "Overhead Crane Swing Paths",
    ],
    useCases: [
      "Technician stepping inside robotic cell perimeter during operation",
      "Unauthorized personnel walking under suspended crane loads",
      "Worker entering laser cutting safety enclosure without authorization",
    ],
    relatedSolutionIds: ["safe-machinery", "safe-worker-equip", "safe-unauthorized"],
    badge: "Zero-Harm",
    image:
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-amber-600 to-red-600",
  },
  {
    id: "safe-phone",
    name: "Mobile Phone Usage & Distraction Detection",
    slug: "mobile-phone-distraction-detection",
    category: "workplace-safety",
    categoryName: "Industrial Safety & Workplace Monitoring",
    shortDescription:
      "Identifies workers operating smartphones while driving forklifts, managing machinery, or working at critical assembly stations.",
    detailedOverview:
      "Mobile phone distractions in industrial environments are a primary cause of forklift collisions, falls, and assembly errors. Nirikshan AI detects workers holding devices to their ears, texting, or browsing while situated in active machine zones or equipment cabs.",
    problem:
      "Distracted operators causing avoidable industrial collisions and equipment damage due to smartphone use.",
    capabilities: [
      "Phone-to-ear posture and two-handed texting gesture detection",
      "Distraction duration scoring (filters quick checks vs prolonged browsing)",
      "Cab-mounted camera support for forklift and crane operators",
      "Anonymous compliance statistics to support safety training",
    ],
    howItWorks: [
      "Camera Input: Station-facing or inside-cab camera feed.",
      "AI Detection: Detects phone object and hand-to-head postural alignment.",
      "Rule Evaluation: Verifies phone usage occurred during machine operation.",
      "Action Trigger: Visual/audible in-cab reminder and supervisor event log.",
    ],
    deploymentEnvironments: [
      "Forklift & Heavy Vehicle Cabs",
      "Precision Machine Operation Stations",
      "Chemical Handling & Dispensing Bays",
      "Pharmaceutical Cleanrooms & Quality Labs",
    ],
    useCases: [
      "Forklift driver texting while maneuvering in warehouse aisle",
      "Assembly technician browsing phone during critical torque tightening",
      "Crane operator distracted by phone during lifting operation",
    ],
    relatedSolutionIds: ["safe-ppe", "safe-unsafe-behavior", "veh-forklift"],
    badge: "Risk Reduction",
    image: cvPhoneImg,
    accentColor: "from-amber-500 to-yellow-500",
  },
  {
    id: "safe-unsafe-behavior",
    name: "Unsafe Behavior & Action Detection",
    slug: "unsafe-behavior-action-detection",
    category: "workplace-safety",
    categoryName: "Industrial Safety & Workplace Monitoring",
    shortDescription:
      "Recognizes reckless actions such as running on shop floors, climbing racking, riding forklift forks, or taking shortcuts across conveyers.",
    detailedOverview:
      "Understands human kinematic actions to detect ergonomic and behavioral risks before they materialize into severe accidents. Identifies unsafe manual lifting postures, climbing without safety harnesses, jumping off loading docks, and improper tool handling.",
    problem:
      "Unsafe behaviors often go unnoticed until a near-miss or reportable lost-time injury occurs.",
    capabilities: [
      "Kinematic action recognition (running, climbing, jumping, riding forks)",
      "Ergonomic posture analysis (curved spine heavy lifting detection)",
      "Multi-person physical altercation or scuffle detection",
      "Safety cultural index tracking across shifts and production departments",
    ],
    howItWorks: [
      "Camera Input: General shop floor and warehouse aisle cameras.",
      "AI Detection: Spatio-temporal neural network classifies action verbs.",
      "Rule Evaluation: Flags actions designated as high-risk under plant safety policy.",
      "Action Trigger: Sends coachable safety event clip to EHS team.",
    ],
    deploymentEnvironments: [
      "Warehouse Storage Aisles & High-Bay Racking",
      "Factory Floor Pedestrian Walkways",
      "Loading Docks & Dispatch Bays",
    ],
    useCases: [
      "Worker climbing pallet racking instead of using safety ladder",
      "Employee riding on the forks of a moving forklift",
      "Running on slick chemical processing flooring",
    ],
    relatedSolutionIds: ["safe-phone", "safe-worker-equip", "safe-ppe"],
    badge: "Behavioral AI",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-orange-500 to-amber-500",
  },
  {
    id: "safe-unauthorized",
    name: "Unauthorized Access & Control Room Security",
    slug: "unauthorized-access-control-room-security",
    category: "workplace-safety",
    categoryName: "Industrial Safety & Workplace Monitoring",
    shortDescription:
      "Restricts access to critical plant infrastructure including SCADA control rooms, server closets, chemical stores, and testing labs.",
    detailedOverview:
      "Prevents unvetted personnel, visitors, or non-certified contractors from wandering into high-security control hubs or hazardous chemical zones. Verifies badges or facial profiles and detects tailgating through access turnstiles.",
    problem:
      "Tailgating and unescorted visitors entering critical plant rooms and causing operational downtime or safety breaches.",
    capabilities: [
      "Access door tailgating (two persons entering on one badge swipe)",
      "Unauthorized personnel classification in sensitive zones",
      "After-hours access breach alerts",
      "Time-stamped audit logs of all access attempts",
    ],
    howItWorks: [
      "Camera Input: Overhead entrance camera at control room door.",
      "AI Detection: Counts entering individuals and correlates with badge event.",
      "Rule Evaluation: Discrepancy between badge swipe and person count triggers breach.",
      "Action Trigger: Sounds local buzzer and alerts central security desk.",
    ],
    deploymentEnvironments: [
      "SCADA & DCS Industrial Control Rooms",
      "Enterprise Server Rooms & Data Closets",
      "Hazardous Chemical & Explosive Stores",
      "R&D Cleanrooms & Quality Assurance Labs",
    ],
    useCases: [
      "Tailgating through security turnstile into server farm",
      "Unescorted visitor walking into chemical mixing room",
      "Night shift contractor entering electrical substation without permit",
    ],
    relatedSolutionIds: ["safe-hazard-zone", "res-intruder", "safe-ppe"],
    badge: "Access Control",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-blue-600 to-indigo-600",
  },
  {
    id: "safe-worker-equip",
    name: "Worker–Equipment & Forklift Proximity Detection",
    slug: "worker-equipment-proximity-detection",
    category: "workplace-safety",
    categoryName: "Industrial Safety & Workplace Monitoring",
    shortDescription:
      "Calculates distance between moving machinery (forklifts, AGVs, cranes) and nearby pedestrians to prevent devastating collision injuries.",
    detailedOverview:
      "Forklift-pedestrian impacts remain among the deadliest industrial incidents. Nirikshan AI dynamically computes the real-time distance vector between mobile plant equipment and walking personnel. If the separation distance drops below configured safety buffers, both the operator and the worker are warned.",
    problem:
      "Blind spots at aisle intersections and noisy plant environments preventing workers from hearing oncoming industrial vehicles.",
    capabilities: [
      "Real-time 3D spatial distance calculation in physical metric units",
      "Dynamic speed-adjusted warning buffers (faster vehicle = larger buffer)",
      "Intersection blind-spot projection and crossing warning lights",
      "Vehicle-mounted edge AI camera option with in-cab buzzer",
    ],
    howItWorks: [
      "Camera Input: Ceiling-mounted wide-angle cameras or vehicle-mounted cameras.",
      "AI Detection: Detects both vehicle bounding boxes and pedestrian foot locations.",
      "Rule Evaluation: Distance metric calculated; triggers alert if <2.5 meters.",
      "Action Trigger: In-cab warning sound, floor-projected laser warning, and event log.",
    ],
    deploymentEnvironments: [
      "High-Density Warehouses & Logistics Hubs",
      "Manufacturing Shipping & Receiving Bays",
      "Outdoor Material Yards & Ports",
    ],
    useCases: [
      "Worker stepping out of storage aisle into forklift trajectory",
      "Forklift reversing into blind corner with pedestrian behind",
      "Worker walking too close to active automated guided vehicle (AGV)",
    ],
    relatedSolutionIds: ["veh-forklift", "safe-machinery", "safe-ppe"],
    badge: "Life-Saver",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-amber-500 to-red-500",
  },
  {
    id: "safe-machinery",
    name: "Machinery & Robotic Zone Operational Safety",
    slug: "machinery-robotic-zone-safety",
    category: "workplace-safety",
    categoryName: "Industrial Safety & Workplace Monitoring",
    shortDescription:
      "Monitors heavy hydraulic presses, robotic arms, and conveyers to ensure human clearance before automated cycles begin.",
    detailedOverview:
      "Provides fail-safe visual interlocks for automated industrial equipment. Validates that all human operators have safely cleared conveyor lines, clamping jaws, and robotic tool paths before automated startup or cycle repetition.",
    problem:
      "Accidental machine startup while maintenance technicians or operators are still positioned near mechanical pinch points.",
    capabilities: [
      "Zone clearance verification before cycle start permit",
      "Continuous boundary monitoring during machine operation",
      "Detection of reach-in behaviors over safety light curtains",
      "Integrates with safety relays and emergency stop loops",
    ],
    howItWorks: [
      "Camera Input: Overhead high-framerate camera focused on machine envelope.",
      "AI Detection: Analyzes entire operational envelope for any human body part.",
      "Rule Evaluation: Asserts 100% clearance before signaling machine cycle enable.",
      "Action Trigger: Immediate machine pause if clearance is breached during cycle.",
    ],
    deploymentEnvironments: [
      "Automotive Stamping & Press Lines",
      "Robotic Welding & Palletizing Cells",
      "High-Speed Conveyor Sorting Lines",
    ],
    useCases: [
      "Preventing hydraulic press descent while operator hand is inside die area",
      "Stopping robotic palletizer if person crosses fence line",
      "Conveyor emergency stop when worker clothing or body gets trapped",
    ],
    relatedSolutionIds: ["safe-hazard-zone", "safe-worker-equip", "mfg-defect"],
    badge: "Interlock AI",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-emerald-600 to-blue-600",
  },
  {
    id: "safe-fall",
    name: "Worker Fall & Man-Down Detection",
    slug: "worker-fall-man-down-detection",
    category: "workplace-safety",
    categoryName: "Industrial Safety & Workplace Monitoring",
    shortDescription:
      "Instantly identifies falls from scaffolding, ladders, or sudden worker medical collapses with lone-worker emergency dispatch.",
    detailedOverview:
      "In heavy industrial plants, lone workers operating in isolated pump houses, tank farms, or high catwalks may collapse without immediate discovery. Nirikshan AI continuously tracks worker posture, instantly detecting falls from height or prolonged recumbent states on the floor.",
    problem:
      "Isolated workers experiencing traumatic falls or medical emergencies without rapid medical assistance.",
    capabilities: [
      "Scaffold and elevated platform fall detection",
      "Lone worker man-down / prolonged immobility monitoring",
      "Zero wearable dependency — functions on camera visibility",
      "Immediate GPS/zone location dispatch to plant emergency medical team",
    ],
    howItWorks: [
      "Camera Input: Catwalk, tank farm, or plant floor CCTV stream.",
      "AI Detection: Tracks human velocity vectors and posture transitions.",
      "Rule Evaluation: Confirms rapid vertical drop or horizontal ground posture.",
      "Action Trigger: Triggers high-priority siren and dispatches plant medic team.",
    ],
    deploymentEnvironments: [
      "High Scaffolding & Construction Frameworks",
      "Chemical Tank Farms & Remote Pump Stations",
      "Underground Mining Tunnels & Confined Spaces",
    ],
    useCases: [
      "Construction worker falling from intermediate scaffold tier",
      "Maintenance technician slipping on oil spill in basement corridor",
      "Lone operator suffering heat stroke or medical collapse in boiler room",
    ],
    relatedSolutionIds: ["res-fall", "safe-ppe", "safe-unsafe-behavior"],
    badge: "Emergency Care",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-rose-600 to-red-600",
  },

  // ── INDUSTRIAL VEHICLE & TRAFFIC INTELLIGENCE ──
  {
    id: "veh-forklift",
    name: "Industrial Vehicle & Forklift Detection",
    slug: "industrial-vehicle-forklift-detection",
    category: "vehicle-intelligence",
    categoryName: "Industrial Vehicle & Traffic Intelligence",
    shortDescription:
      "Detects, classifies, and tracks forklifts, reach trucks, pallet jacks, and heavy transport vehicles across busy plant yards.",
    detailedOverview:
      "Industrial plants host a constant mix of internal material handling equipment and external commercial vehicles. Nirikshan AI detects and classifies each vehicle type, tracks its movement trajectory, and monitors operational compliance across indoor aisles and outdoor yards.",
    problem:
      "Lack of real-time visibility into internal fleet movement, resulting in traffic bottlenecks and unmonitored vehicle operation.",
    capabilities: [
      "Multi-class vehicle recognition (Forklift, AGV, Truck, Van, Trailer)",
      "Trajectory mapping and vehicle dwell time analysis",
      "Identification of overloaded or improperly carried pallets",
      "Fleet utilization and idle time analytics",
    ],
    howItWorks: [
      "Camera Input: High-mount yard and warehouse aisle CCTV cameras.",
      "AI Detection: YOLO model identifies vehicle bounding box and equipment type.",
      "Rule Evaluation: Compares vehicle path with designated traffic flow rules.",
      "Action Trigger: Updates logistics dashboard and logs any traffic infraction.",
    ],
    deploymentEnvironments: [
      "Automotive Logistics Yards",
      "3PL Distribution Centers & Warehouses",
      "Heavy Machinery Manufacturing Compounds",
    ],
    useCases: [
      "Real-time tracking of active vs idle forklifts across plant bays",
      "Detecting overloaded forklift with compromised driver forward visibility",
      "Monitoring yard turnaround time for inbound delivery trucks",
    ],
    relatedSolutionIds: ["safe-worker-equip", "veh-anpr", "veh-traffic"],
    badge: "Fleet Vision",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-amber-500 to-orange-500",
  },
  {
    id: "veh-anpr",
    name: "Automatic Number Plate Recognition (ANPR / LPR)",
    slug: "automatic-number-plate-recognition-anpr",
    category: "vehicle-intelligence",
    categoryName: "Industrial Vehicle & Traffic Intelligence",
    shortDescription:
      "High-accuracy optical license plate reading that automates weighbridge logging, barrier gate access, and vehicle turnaround audits.",
    detailedOverview:
      "High-speed OCR-based recognition optimized for diverse license plate styles, dirty plates, low-angle approaches, and night lighting. Integrates directly with barrier gates, weighbridges, and ERP databases to automate transport entry, weighing, and departure.",
    problem:
      "Long entry queues and human error in logging vehicle registration numbers at factory security gates and weighbridges.",
    capabilities: [
      "Multi-standard license plate character recognition (over 98% accuracy in verified lighting)",
      "Automated barrier boom gate control via relay trigger",
      "Integration with digital weighbridges to tag tare & gross weight",
      "Blacklist & whitelist management with instant security alerts",
    ],
    howItWorks: [
      "Camera Input: High-contrast ANPR camera positioned at gate choke point.",
      "AI Detection: Localizes license plate rectangle and performs optical character extraction.",
      "Rule Evaluation: Verifies plate against authorized delivery or resident whitelist.",
      "Action Trigger: Sends barrier open command and registers entry time in ERP.",
    ],
    deploymentEnvironments: [
      "Factory Entry & Weighbridge Gates",
      "Gated Residential Communities & Tech Parks",
      "Logistics Terminals & Toll Plazas",
      "Commercial Mall Parking Ramps",
    ],
    useCases: [
      "Automated truck gate entry authorization based on purchase order",
      "Weighbridge gross weight logging linked directly to truck registration",
      "Blacklisted vehicle alert dispatched to plant security chief",
    ],
    relatedSolutionIds: ["veh-forklift", "veh-traffic", "res-parking"],
    badge: "Gate Automation",
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-blue-600 to-cyan-500",
  },
  {
    id: "veh-traffic",
    name: "Industrial Traffic Flow & Parking Management",
    slug: "industrial-traffic-flow-parking-management",
    category: "vehicle-intelligence",
    categoryName: "Industrial Vehicle & Traffic Intelligence",
    shortDescription:
      "Monitors internal yard congestion, enforces one-way speed lanes, and directs heavy trucks to available loading docks.",
    detailedOverview:
      "Large industrial complexes face severe congestion when dozens of transport carriers arrive simultaneously. Nirikshan AI monitors yard occupancy, calculates queue lengths, enforces internal speed limits and one-way directional routing, and directs drivers to open loading docks.",
    problem:
      "Logistics gridlock in industrial yards resulting in carrier demurrage charges and safety hazards.",
    capabilities: [
      "Real-time dock and bay availability detection",
      "Queue length monitoring and predicted wait-time calculation",
      "Wrong-way driving and internal speed compliance alerts",
      "Digital signage integration to guide drivers to open docks",
    ],
    howItWorks: [
      "Camera Input: Multi-camera yard overview feeds.",
      "AI Detection: Identifies truck queues, dock bays, and velocity vectors.",
      "Rule Evaluation: Flags blocked driveways or trucks parked in unassigned zones.",
      "Action Trigger: Updates yard management display and informs dock crew.",
    ],
    deploymentEnvironments: [
      "FMCG & Retail Distribution Centers",
      "Manufacturing Dispatch & Raw Material Yards",
      "Container Freight Stations & Dry Ports",
    ],
    useCases: [
      "Directing arriving 40ft container truck to vacant unloading bay 04",
      "Alerting safety marshal when truck travels opposite to one-way arrow",
      "Minimizing truck idling times to reduce factory carbon footprint",
    ],
    relatedSolutionIds: ["veh-anpr", "veh-forklift", "res-parking"],
    badge: "Logistics Optimization",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-amber-600 to-yellow-500",
  },

  // ── QUALITY INSPECTION & MANUFACTURING ──
  {
    id: "mfg-defect",
    name: "Automated Product Defect Detection",
    slug: "automated-product-defect-detection",
    category: "manufacturing-quality",
    categoryName: "Quality Inspection & Manufacturing",
    shortDescription:
      "Inline high-speed visual inspection that detects cracks, porosity, discoloration, scratches, and dimensional flaws on manufactured parts.",
    detailedOverview:
      "Human visual inspection on high-speed conveyor lines is prone to fatigue, subjective standards, and missed defects. Nirikshan AI integrates telecentric or high-resolution industrial cameras with trained deep learning anomaly models to inspect parts at line speed, rejecting defective units automatically.",
    problem:
      "Defective components slipping past manual inspectors, leading to customer warranty claims, chargebacks, and brand damage.",
    capabilities: [
      "Sub-millimeter crack, scratch, dent, and porosity detection",
      "Color uniformity, gloss, and coating defect analysis",
      "High-speed inline inspection supporting up to hundreds of parts per minute",
      "Integration with pneumatic reject arms to blow defective parts off conveyor",
    ],
    howItWorks: [
      "Camera Input: Industrial machine vision camera with controlled LED lighting.",
      "AI Detection: Micro-defect neural network analyzes part texture against golden model.",
      "Rule Evaluation: Classifies defect severity against acceptance tolerances.",
      "Action Trigger: Sends reject signal to pneumatic actuator and logs defect image.",
    ],
    deploymentEnvironments: [
      "Automotive Machining & Casting Lines",
      "Plastic Injection Molding Facilities",
      "Electronics PCB & SMT Assembly Lines",
      "Pharmaceutical Blister Pack & Vial Inspection",
    ],
    useCases: [
      "Detecting surface cracks on automotive brake disc castings",
      "Identifying scratches on painted consumer appliance panels",
      "Spotting broken tablets inside sealed pharmaceutical blister packs",
    ],
    relatedSolutionIds: ["mfg-surface", "mfg-assembly", "mfg-packaging"],
    badge: "Zero-Defect",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-violet-600 to-indigo-600",
  },
  {
    id: "mfg-surface",
    name: "Surface & Material Texture Inspection",
    slug: "surface-material-inspection",
    category: "manufacturing-quality",
    categoryName: "Quality Inspection & Manufacturing",
    shortDescription:
      "Scans continuous webs of sheet metal, textiles, paper, glass, or plastic film to identify microscopic voids, tears, and impurities.",
    detailedOverview:
      "For continuous roll and web manufacturing, maintaining consistent surface quality is critical. Nirikshan AI processes continuous video streams to map defects across width and length, enabling operators to trim or grade rolls accurately.",
    problem:
      "Continuous web defects discovered only after entire thousand-meter rolls have been wound and shipped.",
    capabilities: [
      "Continuous web scanning with coordinate defect mapping",
      "Classification of pinholes, inclusions, streaks, and weave flaws",
      "Real-time defect roll map generation for downstream slitters",
      "Lighting-adaptive algorithms handling reflective steel or glossy films",
    ],
    howItWorks: [
      "Camera Input: Line-scan camera focused across rolling material web.",
      "AI Detection: Analyzes pixel variations against continuous texture baseline.",
      "Rule Evaluation: Filters harmless dust from actual material tears or voids.",
      "Action Trigger: Marks defect position on roll map and sounds operator alarm.",
    ],
    deploymentEnvironments: [
      "Cold-Rolled Steel & Aluminum Sheet Mills",
      "Textile Weaving & Fabric Finishing Mills",
      "Glass Sheet & Solar Panel Fabrication",
    ],
    useCases: [
      "Detecting pinhole punctures in pharmaceutical aluminum foil wraps",
      "Spotting roll scratches on cold-rolled stainless steel sheets",
      "Identifying thread dropouts in industrial woven textiles",
    ],
    relatedSolutionIds: ["mfg-defect", "mfg-packaging", "inv-material"],
    badge: "Precision AI",
    image:
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-purple-600 to-violet-500",
  },
  {
    id: "mfg-packaging",
    name: "Packaging Verification & Missing Label Detection",
    slug: "packaging-missing-label-detection",
    category: "manufacturing-quality",
    categoryName: "Quality Inspection & Manufacturing",
    shortDescription:
      "Verifies correct label placement, barcode legibility, expiration date printing, and package seal integrity before dispatch.",
    detailedOverview:
      "Mislabeled food, beverage, or chemical products pose catastrophic regulatory recall risks. Nirikshan AI inspects packaging at the end of the line, verifying label alignment, lot number printing, cap placement, and tamper-evident seal integrity.",
    problem:
      "Incorrect product labels or illegible expiry batch codes leading to mandatory regulatory recalls.",
    capabilities: [
      "Label presence, skew angle, and label mismatch verification",
      "OCR validation of printed expiration dates and batch codes",
      "Bottle cap placement, skew, and tamper-band integrity checks",
      "Corrugated carton seal, barcode, and tape inspection",
    ],
    howItWorks: [
      "Camera Input: Multi-angle camera station at packaging station output.",
      "AI Detection: Matches label artwork and performs OCR on printed text.",
      "Rule Evaluation: Verifies extracted batch code against current ERP production order.",
      "Action Trigger: Diverts mislabeled cartons into rework lane.",
    ],
    deploymentEnvironments: [
      "Food & Beverage Bottling & Canning Lines",
      "Pharmaceutical Packaging & Cartoning",
      "Cosmetics & Personal Care Production",
      "Agrochemical & Lubricant Bottling Plants",
    ],
    useCases: [
      "Rejecting beverage bottles with missing or crooked labels",
      "Verifying printed best-before date legibility on milk cartons",
      "Ensuring allergen warning label is present on food packaging",
    ],
    relatedSolutionIds: ["mfg-defect", "mfg-assembly", "inv-counting"],
    badge: "Compliance First",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-violet-500 to-pink-500",
  },
  {
    id: "mfg-assembly",
    name: "Component Assembly & Missing Part Verification",
    slug: "assembly-verification-missing-part",
    category: "manufacturing-quality",
    categoryName: "Quality Inspection & Manufacturing",
    shortDescription:
      "Validates that all bolts, clips, O-rings, wiring harnesses, and subcomponents are present and seated correctly before shipment.",
    detailedOverview:
      "Complex mechanical assemblies require dozens of small fastening components. A single missing bolt or misplaced seal can cause field failure. Nirikshan AI performs visual checklists of complex sub-assemblies, providing green/red feedback directly on operator workstations.",
    problem:
      "Missing subcomponents discovered only after final customer installation or during catastrophic field breakdowns.",
    capabilities: [
      "Multi-point checklist verification on complex mechanical assemblies",
      "Color-coded wiring harness pinout and routing validation",
      "Fastener count and torque-marking line alignment checks",
      "Real-time visual guidance display for manual assembly operators",
    ],
    howItWorks: [
      "Camera Input: Overhead workstation inspection camera.",
      "AI Detection: Object detection models locate and count each required part.",
      "Rule Evaluation: Evaluates complete bill-of-materials visual checklist.",
      "Action Trigger: Displays assembly PASS / FAIL screen and locks part release jig.",
    ],
    deploymentEnvironments: [
      "Automotive Engine & Transmission Assembly",
      "Industrial Pump, Motor & Gearbox Manufacturing",
      "Consumer Electronics & Appliance Assembly Lines",
    ],
    useCases: [
      "Verifying all 12 bolts are present on automotive cylinder head",
      "Confirming rubber O-ring is seated in hydraulic valve manifold",
      "Checking wiring harness connectors are fully locked in chassis",
    ],
    relatedSolutionIds: ["mfg-defect", "mfg-packaging", "safe-machinery"],
    badge: "Poka-Yoke AI",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-indigo-600 to-purple-600",
  },

  // ── OBJECT TRACKING, INVENTORY & MATERIAL INTELLIGENCE ──
  {
    id: "inv-counting",
    name: "Automated Object & Item Counting",
    slug: "automated-object-item-counting",
    category: "inventory-tracking",
    categoryName: "Object Tracking, Inventory & Material Intelligence",
    shortDescription:
      "Instantly counts pipes, steel rebars, timber logs, cartons, and manufactured items on moving conveyors or bundled truckloads.",
    detailedOverview:
      "Manual counting of nested industrial items such as pipes, reinforcement steel rods, and cartons is slow, hazardous, and notoriously error-prone. Nirikshan AI captures static bundle photos or continuous conveyor video to deliver precise item counts with visual bounding proof in seconds.",
    problem:
      "Inaccurate shipment counts leading to billing disputes, inventory shrinkage, and delayed transport dispatch.",
    capabilities: [
      "Cross-sectional circular nested counting (pipes, rebars, timber logs)",
      "High-speed conveyor carton and packet tally counting",
      "Detection of overlapped or partially occluded units",
      "Export count reports with visual audit overlay for logistics records",
    ],
    howItWorks: [
      "Camera Input: High-resolution camera over staging dock or conveyor.",
      "AI Detection: Circular and boundary Hough/CNN algorithms count unit heads.",
      "Rule Evaluation: Verifies bundle total against shipping manifest.",
      "Action Trigger: Prints count verification certificate and syncs to inventory ERP.",
    ],
    deploymentEnvironments: [
      "Steel Pipe, Tube & Rebar Manufacturing Yards",
      "Timber & Lumber Processing Facilities",
      "FMCG Carton Warehouses & Pallet Loading Bays",
    ],
    useCases: [
      "Counting 450 steel tubes bundled on flatbed trailer in 2 seconds",
      "Tallying cartons loaded onto shipping container via telescopic conveyor",
      "Verifying bundled PVC pipe quantities prior to dispatch",
    ],
    relatedSolutionIds: ["inv-material", "inv-visibility", "veh-forklift"],
    badge: "Instant Count",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-indigo-600 to-blue-500",
  },
  {
    id: "inv-material",
    name: "Material Identification & Classification",
    slug: "material-identification-classification",
    category: "inventory-tracking",
    categoryName: "Object Tracking, Inventory & Material Intelligence",
    shortDescription:
      "Distinguishes between similar-looking raw materials such as steel vs aluminum, PVC vs HDPE, and scrap grades automatically.",
    detailedOverview:
      "In scrap yards, recycling centers, and metal stockyards, misclassifying materials causes severe production contamination. Nirikshan AI analyzes specular reflectivity, surface texture, and geometry to distinguish between metals, polymers, and raw material grades.",
    problem:
      "Mismatched materials loaded into furnaces or manufacturing processes causing expensive batch contamination.",
    capabilities: [
      "Optical material differentiation (Steel, Aluminum, Copper, PVC, Poly)",
      "Scrap metal grade classification for recycling chutes",
      "Contaminant and foreign object detection in bulk feed streams",
      "Sorting actuator integration for automated diverter chutes",
    ],
    howItWorks: [
      "Camera Input: Hyperspectral or high-CRI illuminated camera over sorting belt.",
      "AI Detection: Analyzes visual reflectance and surface grain signature.",
      "Rule Evaluation: Matches detected signature to material library.",
      "Action Trigger: Triggers air-jet or diverter gate to direct material into correct bin.",
    ],
    deploymentEnvironments: [
      "Scrap Metal & Material Recycling Facilities",
      "Foundry Charge Preparation Yards",
      "Plastic Granule & Polymer Processing Plants",
    ],
    useCases: [
      "Preventing aluminum scrap from contaminating steel melting furnace",
      "Sorting PET bottles from HDPE containers on municipal recycling belt",
      "Identifying foreign stone or timber debris in bulk coal conveyors",
    ],
    relatedSolutionIds: ["inv-counting", "inv-visibility", "mfg-defect"],
    badge: "Material AI",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-blue-600 to-indigo-600",
  },
  {
    id: "inv-visibility",
    name: "Warehouse Inventory Visibility & Asset Tracking",
    slug: "warehouse-inventory-visibility-asset-tracking",
    category: "inventory-tracking",
    categoryName: "Object Tracking, Inventory & Material Intelligence",
    shortDescription:
      "Provides digital twin visibility over pallet rack occupancy, detects misplaced inventory, and tracks high-value asset locations.",
    detailedOverview:
      "Transforms standard ceiling and drone cameras into an automated warehouse audit team. Scans vertical racking to report empty slot percentages, identify pallets stored in incorrect aisle locations, and track mobile tools and lifting equipment.",
    problem:
      "Lost pallets and misplaced inventory requiring hours of manual searching in multi-thousand-pallet distribution hubs.",
    capabilities: [
      "Racking slot occupancy percentage mapping (Empty, Partial, Full)",
      "Misplaced pallet and cross-docking anomaly alerts",
      "High-value tooling and equipment geolocation tracking",
      "Automated cycle-counting visual reports synced with WMS",
    ],
    howItWorks: [
      "Camera Input: Pan-tilt-zoom ceiling cameras or automated audit drone.",
      "AI Detection: Maps 3D rack bay coordinates and identifies pallet barcode/label.",
      "Rule Evaluation: Compares physical visual occupancy with WMS database.",
      "Action Trigger: Highlights discrepancy list on warehouse supervisor screen.",
    ],
    deploymentEnvironments: [
      "High-Bay Pallet Warehouses",
      "Cold Storage & Perishable Logistics Centers",
      "Equipment Maintenance Tool Cribs",
    ],
    useCases: [
      "Identifying empty rack slots to optimize inbound pallet putaway",
      "Locating missing high-value die tool in manufacturing tool crib",
      "Automating daily inventory physical count audits without halting operations",
    ],
    relatedSolutionIds: ["inv-counting", "inv-material", "veh-forklift"],
    badge: "Digital Twin",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-cyan-600 to-blue-600",
  },

  // ── COMPUTER VISION PLATFORM & ANALYTICS ──
  {
    id: "plat-multicam",
    name: "Multi-Camera Enterprise Monitoring Platform",
    slug: "multi-camera-monitoring-platform",
    category: "platform-analytics",
    categoryName: "Computer Vision Platform & Analytics",
    shortDescription:
      "Centralizes hundreds of live camera feeds across multiple factory sites or residential complexes into a unified low-latency portal.",
    detailedOverview:
      "The Nirikshan AI platform aggregates heterogeneous camera streams (ONVIF, RTSP, analog through DVR encoders, drone streams) into a single web-based operations center. Operators can manage camera layouts, configure detection zones, and monitor live detections without proprietary hardware lock-in.",
    problem:
      "Fragmented, incompatible camera systems across different facilities requiring separate monitoring software.",
    capabilities: [
      "Unified streaming pipeline supporting H.264, H.265, WebRTC, and RTSP",
      "Multi-site hierarchy (Enterprise → Facility → Building → Zone → Camera)",
      "Zero-client web portal accessible from desktop, tablet, and mobile",
      "Role-based access control with audited viewing permissions",
    ],
    howItWorks: [
      "Stream Ingestion: Edge gateways or cloud connectors pull video streams.",
      "AI Engine: Runs configured detection pipelines on prioritized feeds.",
      "Web Presentation: Delivers sub-second latency video with bounding overlays.",
      "Management: Allows remote firmware updates and rule configurations.",
    ],
    deploymentEnvironments: [
      "Enterprise Central Security Operations Centers (SOC)",
      "Multi-Facility Manufacturing Corporations",
      "Smart City & Infrastructure Command Centers",
    ],
    useCases: [
      "Monitoring 8 factories across different states from headquarters",
      "Switching view between warehouse aisle and loading bay on alarm",
      "Managing operator permissions for security guards vs plant managers",
    ],
    relatedSolutionIds: ["plat-alerts", "plat-incident", "plat-analytics"],
    badge: "Enterprise Ready",
    image: cvDemoImg,
    accentColor: "from-blue-600 to-cyan-500",
  },
  {
    id: "plat-alerts",
    name: "Intelligent Real-Time Alerting System",
    slug: "intelligent-alerting-system",
    category: "platform-analytics",
    categoryName: "Computer Vision Platform & Analytics",
    shortDescription:
      "Sub-second alert dispatch with video snapshots, severity tiering, and escalation workflows to mobile apps, SMS, and email.",
    detailedOverview:
      "Raw video feeds are useless if incident notifications arrive late. Nirikshan AI's alerting engine prioritizes events into Info, Warning, and Critical tiers, instantly dispatching notifications with captured proof clips to the exact personnel assigned to handle that incident.",
    problem:
      "Alert fatigue from unverified notifications and delayed response to safety-critical incidents.",
    capabilities: [
      "Multi-tiered incident prioritization (Critical, Warning, Informational)",
      "Multi-channel dispatch (Push Notification, WhatsApp, SMS, Email, Webhook)",
      "Alert deduplication to prevent repetitive notifications for ongoing events",
      "Escalation workflows if critical alert is unacknowledged within 3 minutes",
    ],
    howItWorks: [
      "Event Ingestion: Detection engine emits verified violation event.",
      "Rules Processing: Checks time-of-day, zone priority, and assigned responder.",
      "Payload Generation: Bundles timestamp, camera name, snapshot, and clip link.",
      "Dispatch: Sends alert via configured channels with acknowledgment tracking.",
    ],
    deploymentEnvironments: [
      "24/7 Security Desks",
      "EHS (Environmental Health & Safety) Teams",
      "Plant Maintenance & Operations Managers",
    ],
    useCases: [
      "Sending immediate fire alert with snapshot to plant fire safety officer",
      "Dispatching unauthorized entry notification to night guard mobile app",
      "Triggering external webhook to sound audible yard siren",
    ],
    relatedSolutionIds: ["plat-multicam", "plat-incident", "safe-ppe"],
    badge: "Sub-Second Alert",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "plat-incident",
    name: "Incident History & Evidence Vault",
    slug: "incident-history-evidence-vault",
    category: "platform-analytics",
    categoryName: "Computer Vision Platform & Analytics",
    shortDescription:
      "Tamper-evident event logging, searchable video clip archive, and audit trails for compliance reporting and incident investigation.",
    detailedOverview:
      "Maintains a forensic-grade repository of every safety violation, intrusion, or operational anomaly. Each event is recorded with timestamped metadata, camera identifier, detection confidence, and a short video snippet, streamlining internal EHS investigations and external compliance audits.",
    problem:
      "Scouring through weeks of continuous CCTV recordings to locate a 10-second safety violation clip.",
    capabilities: [
      "Instant keyword and faceted search (Date, Zone, Incident Type, Severity)",
      "Stored 15–30 second pre-and-post event evidence video clips",
      "Cryptographic timestamping to ensure evidence integrity",
      "Exportable compliance dossiers for regulatory safety authorities",
    ],
    howItWorks: [
      "Capture: Event trigger initiates short ring-buffer video recording.",
      "Cataloging: Stores clip with detection metadata in secure cloud or on-prem vault.",
      "Indexing: Makes event instantly searchable via dashboard filters.",
      "Review: Authorized investigators review, tag, and export incident dossiers.",
    ],
    deploymentEnvironments: [
      "Corporate Legal & Compliance Departments",
      "Factory Safety & EHS Audit Teams",
      "Residential Estate Association Management",
    ],
    useCases: [
      "Investigating a reported forklift near-miss from the previous week",
      "Exporting quarterly PPE compliance logs for ISO safety certification",
      "Reviewing night perimeter intrusion attempts with timestamped evidence",
    ],
    relatedSolutionIds: ["plat-multicam", "plat-alerts", "plat-analytics"],
    badge: "Forensic Audit",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-blue-600 to-violet-600",
  },
  {
    id: "plat-analytics",
    name: "Operational Analytics & Reporting Dashboard",
    slug: "operational-analytics-reporting",
    category: "platform-analytics",
    categoryName: "Computer Vision Platform & Analytics",
    shortDescription:
      "Aggregates visual events into executive KPI dashboards, trend graphs, safety scores, and exportable weekly compliance summaries.",
    detailedOverview:
      "Converts raw detection events into actionable strategic intelligence. Factory leaders and community administrators gain clear visibility into hourly safety violation trends, traffic bottlenecks, production throughput, and zone utilization to make data-backed operational improvements.",
    problem:
      "Visual data sits unused on hard drives without providing high-level operational insights to leadership.",
    capabilities: [
      "Interactive charts covering safety violations, throughput, and traffic",
      "Departmental and shift safety compliance leaderboards",
      "Automated PDF and Excel report generation sent to management emails",
      "Spatial heatmaps showing worker traffic density and dwell hotspots",
    ],
    howItWorks: [
      "Data Pipeline: Aggregates detection events into analytical database.",
      "Analytics Engine: Computes compliance ratios, trend lines, and heatmaps.",
      "Visualization: Renders interactive charts on management dashboard.",
      "Scheduled Dispatch: Automatically emails weekly EHS summary report.",
    ],
    deploymentEnvironments: [
      "Executive Boardrooms & Operations Management",
      "Continuous Improvement & Lean Teams",
      "EHS & Quality Control Leadership",
    ],
    useCases: [
      "Comparing PPE compliance scores across Morning vs Night shifts",
      "Identifying peak congestion hours at factory raw material gates",
      "Reviewing 30-day product defect reduction after line modifications",
    ],
    relatedSolutionIds: ["plat-multicam", "plat-incident", "plat-alerts"],
    badge: "Executive Insight",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-cyan-600 to-teal-500",
  },
];

/* ──────────────────────────────────────────────────────────
   3. PLATFORM WORKFLOW STEPS (Source: PDF Page 19)
────────────────────────────────────────────────────────── */
export const PLATFORM_WORKFLOW_STEPS: PlatformWorkflowStep[] = [
  {
    number: 1,
    step: "01",
    title: "Capture",
    subhead: "Visual Input Ingestion",
    description:
      "Receive real-time video or high-resolution imagery from compatible cameras, IP CCTV systems, industrial lenses, or drone video feeds.",
    inputs: ["Standard CCTV Cameras", "IP / RTSP / ONVIF Feeds", "Edge Industrial Cameras", "Drone Video Streams"],
    outputs: "Sub-second encrypted video stream",
    iconName: "Camera",
  },
  {
    number: 2,
    step: "02",
    title: "Analyze",
    subhead: "Frame Preprocessing",
    description:
      "Video frames are buffered and normalized through the computer vision pipeline, applying motion filtering, distortion correction, and region masking.",
    inputs: ["Live Video Stream", "Recorded Surveillance Clips", "Motion-Triggered Bursts"],
    outputs: "Normalized frame tensor batch",
    iconName: "Cpu",
  },
  {
    number: 3,
    step: "03",
    title: "Detect",
    subhead: "AI Vision Inference",
    description:
      "Proprietary deep neural networks identify people, vehicles, protective gear, flames, packaging defects, and spatial coordinates simultaneously.",
    inputs: ["Object Detection Models", "Pose Estimation", "OCR & Pattern Classifiers", "Spatio-Temporal Tracking"],
    outputs: "Classified bounding boxes & confidence scores",
    iconName: "Scan",
  },
  {
    number: 4,
    step: "04",
    title: "Notify",
    subhead: "Rule Evaluation & Alert",
    description:
      "The rules engine checks detections against spatial polygon boundaries, dwell times, and safety protocols to immediately generate alerts on violations.",
    inputs: ["Configurable Zone Rules", "Dwell Time Thresholds", "PPE Matrices", "Safety Boundaries"],
    outputs: "Real-time alerts via App, Email, SMS & Webhooks",
    iconName: "Bell",
  },
  {
    number: 5,
    step: "05",
    title: "Review",
    subhead: "Dashboard Presentation",
    description:
      "Incidents are presented on live operations dashboards with video snapshots, severity indicators, and archived evidence clips for clear review.",
    inputs: ["Live Camera Multi-View", "Incident History Logs", "Event Evidence Snippets"],
    outputs: "Unified operational visibility",
    iconName: "LayoutDashboard",
  },
  {
    number: 6,
    step: "06",
    title: "Respond",
    subhead: "Authorized Action",
    description:
      "Empower security teams and plant managers to take swift operational action, acknowledge alerts, or trigger automated physical interlocks.",
    inputs: ["Automated Gate / Machine Relays", "Supervisor Dispatch", "EHS Audit Logging"],
    outputs: "Verified risk resolution & incident closure",
    iconName: "ShieldCheck",
  },
];

/* ──────────────────────────────────────────────────────────
   4. FLEXIBLE DEPLOYMENT OPTIONS (Source: PDF Page 21)
────────────────────────────────────────────────────────── */
export const DEPLOYMENT_MODELS: DeploymentModel[] = [
  {
    title: "On-Premises Deployment",
    tagline: "Total Data Sovereignty & Zero Latency",
    description:
      "Runs entirely within your local facility network. Video streams and inference processing never leave your physical premises, ensuring strict compliance with high-security data mandates.",
    points: [
      "Complete local processing and on-site storage options",
      "Zero dependency on external internet bandwidth for detection",
      "Seamless integration with existing air-gapped industrial IT/OT systems",
      "Full administrative control over data governance and retention",
      "Supports local server clusters or GPU-equipped server rooms",
    ],
    bestFor: "Defense, chemical plants, critical infrastructure, and privacy-mandated enterprises.",
    badge: "Maximum Security",
  },
  {
    title: "Cloud Deployment",
    tagline: "Global Scalability & Centralized Oversight",
    description:
      "Hosted on scalable, secure cloud infrastructure. Seamlessly aggregate video feeds from dozens of geographically distributed branches, warehouses, or residential towers into a central dashboard.",
    points: [
      "Scalable infrastructure that grows effortlessly from 5 to 5,000 cameras",
      "Secure remote access from web browsers and native mobile applications anywhere",
      "Automated platform updates, security patches, and model enhancements",
      "Lower upfront hardware investment with centralized cloud storage",
      "Built-in cloud redundancy, disaster recovery, and multi-tenant management",
    ],
    bestFor: "Distributed retail chains, commercial offices, logistics fleets, and multi-tower residential developers.",
    badge: "Infinite Scale",
  },
  {
    title: "Hybrid Deployment",
    tagline: "Edge Inference with Cloud Analytics",
    description:
      "The best of both worlds: compact edge AI boxes process video feeds locally at the camera for sub-second safety alerts, while analytical summaries, incident clips, and reports sync to the cloud.",
    points: [
      "Local edge AI processing enables sub-second alerts even during internet dropouts",
      "Significantly reduced internet bandwidth usage (only alerts and clips sync to cloud)",
      "Centralized cloud dashboard provides cross-facility benchmarking and analytics",
      "Local storage for high-definition video archives with lightweight cloud sync",
      "Flexible, future-ready architecture adapted to challenging bandwidth environments",
    ],
    bestFor: "Manufacturing plants, remote mining sites, construction projects, and large factory campuses.",
    badge: "Recommended",
  },
];

export const SUPPORTED_INFRASTRUCTURE = [
  {
    title: "Existing CCTV Infrastructure",
    description:
      "Compatible with existing analog or IP camera infrastructure via network video encoders or RTSP streams—no mandatory camera replacement required.",
    icon: "Camera",
  },
  {
    title: "Modern IP Cameras",
    description:
      "Direct integration with major enterprise IP camera brands supporting ONVIF profile S/G/T and H.264/H.265 RTSP streams up to 4K resolution.",
    icon: "Wifi",
  },
  {
    title: "Edge AI Acceleration Devices",
    description:
      "Optimized for NVIDIA Jetson series (Nano, Xavier, Orin), Intel edge appliances, and industrial fanless GPU edge servers.",
    icon: "Cpu",
  },
  {
    title: "Specialized Video Sources",
    description:
      "Connects with industrial machine vision cameras, aerial drone video streams, thermal cameras, and body-worn cameras where technically supported.",
    icon: "Video",
  },
];

/* ──────────────────────────────────────────────────────────
   5. INDUSTRY APPLICATIONS (Source: PDF Page 22)
────────────────────────────────────────────────────────── */
export const INDUSTRY_APPLICATIONS: IndustryApplication[] = [
  {
    id: "ind-residential",
    name: "Residential Communities",
    description:
      "Gated societies, high-rise condominiums, and private housing townships seeking intelligent protection.",
    useCases: [
      "Perimeter intrusion & wall climbing alerts",
      "Visitor entry/exit logging & door monitoring",
      "Pool safety & unattended child warnings",
    ],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    categoryTag: "residential",
    badge: "Smart Living",
  },
  {
    id: "ind-manufacturing",
    name: "Manufacturing",
    description:
      "Automotive, steel, electronics, and consumer product manufacturing facilities optimizing safety and quality.",
    useCases: [
      "Worker PPE compliance & zone safeguards",
      "Inline surface crack & defect detection",
      "Production line cycle counting & bottle-neck analysis",
    ],
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    categoryTag: "manufacturing-quality",
    badge: "Industry 4.0",
  },
  {
    id: "ind-construction",
    name: "Construction",
    description:
      "Civil infrastructure, commercial real estate, and heavy engineering project construction sites.",
    useCases: [
      "Mandatory helmet & reflective vest auditing",
      "Scaffolding fall detection & worker man-down",
      "Excavator & worker dangerous proximity alerts",
    ],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    categoryTag: "workplace-safety",
    badge: "EHS Safety",
  },
  {
    id: "ind-warehousing",
    name: "Warehousing",
    description:
      "Large-scale distribution centers, e-commerce fulfillment hubs, and automated storage yards.",
    useCases: [
      "Forklift-pedestrian collision warning alerts",
      "Pallet rack occupancy visibility mapping",
      "Automated carton & item tally counting",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    categoryTag: "inventory-tracking",
    badge: "Intralogistics",
  },
  {
    id: "ind-logistics",
    name: "Logistics",
    description:
      "Intermodal freight stations, trucking terminals, container depots, and transit hubs.",
    useCases: [
      "Automatic number plate recognition at gates",
      "Loading dock bay availability monitoring",
      "Vehicle tracking & turnaround audit logs",
    ],
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
    categoryTag: "vehicle-intelligence",
    badge: "Supply Chain",
  },
  {
    id: "ind-mining",
    name: "Mining",
    description:
      "Open-cast pits, underground extraction tunnels, and mineral processing refineries.",
    useCases: [
      "Heavy haul truck perimeter hazard alerts",
      "Lone worker man-down & fall monitoring",
      "Restricted blasting zone unauthorized entry",
    ],
    image:
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80",
    categoryTag: "workplace-safety",
    badge: "Heavy Duty",
  },
  {
    id: "ind-retail",
    name: "Retail",
    description:
      "Supermarket chains, shopping malls, flagship stores, and retail franchise outlets.",
    useCases: [
      "Customer footfall & queue dwell monitoring",
      "Suspicious loitering & theft risk alerts",
      "After-hours stockroom perimeter surveillance",
    ],
    image:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=600&q=80",
    categoryTag: "residential",
    badge: "Commercial",
  },
  {
    id: "ind-offices",
    name: "Offices",
    description:
      "Corporate headquarters, IT tech parks, shared co-working spaces, and multi-tenant office complexes.",
    useCases: [
      "Tailgating detection at turnstiles",
      "Server room unauthorized entry alerts",
      "Occupancy analytics & meeting room usage",
    ],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    categoryTag: "platform-analytics",
    badge: "Corporate",
  },
  {
    id: "ind-hospitals",
    name: "Hospitals",
    description:
      "Multi-specialty medical centers, nursing homes, clinics, and psychiatric health facilities.",
    useCases: [
      "Vulnerable patient fall detection in rooms",
      "Restricted pharmacy & ICU entry control",
      "Ambulance bay emergency parking clearance",
    ],
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    categoryTag: "residential",
    badge: "Healthcare",
  },
  {
    id: "ind-hotels",
    name: "Hotels",
    description:
      "Luxury resorts, business hotels, convention pavilions, and hospitality venues.",
    useCases: [
      "VIP vehicle arrival number plate recognition",
      "Unattended luggage alert in main lobbies",
      "Service area safety & fire exit clearance",
    ],
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    categoryTag: "residential",
    badge: "Hospitality",
  },
  {
    id: "ind-campuses",
    name: "Educational Campuses",
    description:
      "Universities, engineering colleges, residential boarding schools, and technical institutes.",
    useCases: [
      "Campus boundary wall intrusion alerts",
      "Hostel entry monitoring & curfews",
      "Overcrowding & physical altercation detection",
    ],
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
    categoryTag: "residential",
    badge: "Education",
  },
  {
    id: "ind-facilities",
    name: "Industrial Facilities",
    description:
      "Power utility substations, water treatment plants, chemical storage, and tank farms.",
    useCases: [
      "Continuous process & smoke/flame monitoring",
      "High-voltage area safety boundary interlocks",
      "Visual equipment leak & gauge deviation alerts",
    ],
    image:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80",
    categoryTag: "workplace-safety",
    badge: "Critical Infra",
  },
  {
    id: "ind-parking",
    name: "Parking & Infrastructure",
    description:
      "Multi-level parking structures, toll corridors, airport pickup zones, and urban interchanges.",
    useCases: [
      "Automated license plate access & fee gates",
      "Real-time bay occupancy guidance displays",
      "Wrong-way & speed infraction detection",
    ],
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80",
    categoryTag: "vehicle-intelligence",
    badge: "Smart Transit",
  },
];

/* ──────────────────────────────────────────────────────────
   6. WHY NIRIKSHAN AI (Source: PDF Page 23)
────────────────────────────────────────────────────────── */
export const WHY_NIRIKSHAN_PILLARS = [
  {
    title: "AI-Powered Visual Intelligence",
    description:
      "Advanced neural networks that move beyond basic motion detection to understand context, human posture, and complex real-world events.",
    icon: "Brain",
  },
  {
    title: "Custom Computer Vision Models",
    description:
      "Tailored AI models trained directly on your industry's specific lighting, machinery, materials, and operational parameters.",
    icon: "Cpu",
  },
  {
    title: "Industry-Specific Solutions",
    description:
      "Pre-configured capability templates purpose-built for manufacturing plants, logistics hubs, residential campuses, and construction sites.",
    icon: "Building2",
  },
  {
    title: "Existing-Camera Integration",
    description:
      "Deploy intelligent vision on top of your current CCTV and IP infrastructure without the expense of replacing existing cameras.",
    icon: "Camera",
  },
  {
    title: "Real-Time Monitoring",
    description:
      "Continuous, automated surveillance with sub-second inference speeds that catches risks the moment they unfold.",
    icon: "Zap",
  },
  {
    title: "Scalable Architecture",
    description:
      "Engineered to scale friction-free from a single 4-camera workshop to thousands of concurrent streams across multi-national sites.",
    icon: "Layers",
  },
  {
    title: "Custom Detection Capabilities",
    description:
      "Easily configure detection for custom objects, proprietary packaging, unique PPE gear, and specialized operational anomalies.",
    icon: "Target",
  },
  {
    title: "Actionable Alerts",
    description:
      "Context-rich notifications delivered via dashboard, mobile app, email, or SMS complete with timestamped visual evidence clips.",
    icon: "BellRing",
  },
  {
    title: "Multi-Camera Support",
    description:
      "Monitor, track individuals across frames, and unify feeds from multiple separate facilities through a single administrative portal.",
    icon: "Monitor",
  },
  {
    title: "Data-Driven Operational Insights",
    description:
      "Convert passive video footage into actionable analytics, compliance scores, trend reports, and operational bottleneck discoveries.",
    icon: "BarChart3",
  },
];

/* ──────────────────────────────────────────────────────────
   7. CUSTOM SOLUTION DEVELOPMENT PROCESS (Source: PDF Page 24)
────────────────────────────────────────────────────────── */
export const CUSTOM_DEVELOPMENT_STEPS = [
  {
    step: 1,
    title: "Requirement Discovery",
    description:
      "We collaborate with your operational team to understand the specific problem, environment constraints, camera angles, and target success criteria.",
  },
  {
    step: 2,
    title: "Dataset Collection & Preparation",
    description:
      "Curate and annotate relevant image and video samples representing day, night, edge cases, and diverse operational lighting conditions.",
  },
  {
    step: 3,
    title: "Model Development",
    description:
      "Train, fine-tune, and optimize custom deep learning architectures tailored to your targeted detection classes and inference hardware.",
  },
  {
    step: 4,
    title: "Testing & Validation",
    description:
      "Rigorous benchmarking in real-world conditions to test false positive rates, lighting robustness, and latency against agreed benchmarks.",
  },
  {
    step: 5,
    title: "Deployment",
    description:
      "Deploy the validated pipeline onto your choice of on-premise edge servers, industrial appliances, or secure cloud infrastructure.",
  },
  {
    step: 6,
    title: "Monitoring & Optimization",
    description:
      "Continuous telemetry monitoring, active learning retraining loops, and ongoing support to ensure peak performance as operations evolve.",
  },
];

export const CUSTOM_SOLUTION_AREAS = [
  {
    title: "Custom Object Detection",
    description: "Detect unique proprietary machinery, custom components, specialty cargo, or site-specific tools.",
  },
  {
    title: "Custom Safety Rules",
    description: "Enforce company-specific EHS protocols, zone restrictions, and specialized protective equipment checks.",
  },
  {
    title: "Custom Industrial Inspection",
    description: "Identify unique surface flaws, proprietary packaging defects, or custom assembly step verifications.",
  },
  {
    title: "Custom Activity Detection",
    description: "Recognize complex workflow sequences, restricted access patterns, and specialized worker actions.",
  },
  {
    title: "Custom Anomaly Detection",
    description: "Detect subtle operational deviations, uncharacteristic machinery vibrations, or process irregularities.",
  },
];

/* ──────────────────────────────────────────────────────────
   8. SOLUTION COMPARISON MATRIX (Source: PDF Page 25)
────────────────────────────────────────────────────────── */
export const COMPARISON_MATRIX: ComparisonRow[] = [
  {
    feature: "Intruder Detection",
    residential: true,
    industrial: true,
    commercial: true,
    realTimeAlerts: true,
    notes: "Boundary tripwires & polygon perimeters",
  },
  {
    feature: "Fire Detection",
    residential: true,
    industrial: true,
    commercial: true,
    realTimeAlerts: true,
    notes: "Optical flame flicker analysis",
  },
  {
    feature: "Smoke Detection",
    residential: true,
    industrial: true,
    commercial: true,
    realTimeAlerts: true,
    notes: "Plume dynamics for high ceilings",
  },
  {
    feature: "PPE Detection",
    residential: false,
    industrial: true,
    commercial: false,
    realTimeAlerts: true,
    notes: "Helmet, vest, gloves, goggles, footwear",
  },
  {
    feature: "Phone Detection",
    residential: false,
    industrial: true,
    commercial: true,
    realTimeAlerts: true,
    notes: "Distraction in vehicle cabs & machinery",
  },
  {
    feature: "Vehicle Detection",
    residential: true,
    industrial: true,
    commercial: true,
    realTimeAlerts: true,
    notes: "Cars, trucks, forklifts & ANPR",
  },
  {
    feature: "Fall Detection",
    residential: true,
    industrial: true,
    commercial: false,
    realTimeAlerts: true,
    notes: "Pose estimation for elderly & lone workers",
  },
  {
    feature: "Object Tracking",
    residential: true,
    industrial: true,
    commercial: true,
    realTimeAlerts: true,
    notes: "Multi-camera persistent ID tracking",
  },
  {
    feature: "Anomaly Detection",
    residential: true,
    industrial: true,
    commercial: true,
    realTimeAlerts: true,
    notes: "Behavioral & operational deviations",
  },
];

/* ──────────────────────────────────────────────────────────
   9. INTERACTIVE DASHBOARD DEMO FEEDS (Source: PDF Page 20)
────────────────────────────────────────────────────────── */
export const DEMO_CAMERA_FEEDS = [
  {
    id: "cam-01",
    camCode: "CAM-01",
    location: "Main Gate & Entry Barrier",
    category: "vehicle-intelligence",
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80",
    fps: 30,
    status: "LIVE",
    detections: [
      { label: "TRUCK [UK-07-AB-1234]", score: 99, color: "border-emerald-500 text-emerald-400 bg-emerald-500/10", top: "42%", left: "28%", width: "42%", height: "46%" },
      { label: "ANPR: VERIFIED", score: 98, color: "border-cyan-500 text-cyan-400 bg-cyan-500/10", top: "72%", left: "38%", width: "22%", height: "12%" },
    ],
    recentAlerts: [
      { time: "Just now", type: "ANPR Match", detail: "Vehicle UK-07-AB-1234 authorized for bay 03", level: "info" },
      { time: "3m ago", type: "Gate Entry", detail: "Visitor Car (DL-08-CC-4421) logged", level: "info" },
    ],
  },
  {
    id: "cam-02",
    camCode: "CAM-02",
    location: "Production Line — Assembly Bay 04",
    category: "workplace-safety",
    image: cvPpeImg,
    fps: 60,
    status: "LIVE",
    detections: [
      { label: "WORKER 01: PPE OK", score: 99, color: "border-emerald-500 text-emerald-400 bg-emerald-500/10", top: "18%", left: "42%", width: "22%", height: "70%" },
      { label: "VIOLATION: NO HELMET", score: 96, color: "border-red-500 text-red-400 bg-red-500/10", top: "28%", left: "74%", width: "18%", height: "55%" },
    ],
    recentAlerts: [
      { time: "1m ago", type: "PPE Violation", detail: "Worker without safety helmet in Bay 04", level: "critical" },
      { time: "8m ago", type: "Shift Check", detail: "Safety vest compliance at 98.4%", level: "info" },
    ],
  },
  {
    id: "cam-03",
    camCode: "CAM-03",
    location: "Warehouse Aisle 12 — Forklift Lane",
    category: "workplace-safety",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    fps: 30,
    status: "LIVE",
    detections: [
      { label: "FORKLIFT-02", score: 99, color: "border-amber-500 text-amber-400 bg-amber-500/10", top: "30%", left: "12%", width: "35%", height: "52%" },
      { label: "PEDESTRIAN (1.8m)", score: 97, color: "border-red-500 text-red-400 bg-red-500/10", top: "34%", left: "54%", width: "16%", height: "48%" },
      { label: "WARNING: CLOSE PROXIMITY", score: 95, color: "border-yellow-500 text-yellow-400 bg-yellow-500/20", top: "48%", left: "40%", width: "20%", height: "16%" },
    ],
    recentAlerts: [
      { time: "2m ago", type: "Proximity Alert", detail: "Worker within 2m of moving forklift", level: "warning" },
      { time: "14m ago", type: "Speed Alert", detail: "Forklift-02 exceeded 8 km/h aisle speed", level: "warning" },
    ],
  },
  {
    id: "cam-04",
    camCode: "CAM-04",
    location: "North Perimeter & Chemical Storage",
    category: "residential",
    image: cvFireImg,
    fps: 30,
    status: "LIVE",
    detections: [
      { label: "WARNING: FIRE SIGNATURE [97%]", score: 97, color: "border-red-500 text-red-400 bg-red-500/20 shadow-red-500/50", top: "36%", left: "32%", width: "38%", height: "44%" },
    ],
    recentAlerts: [
      { time: "Just now", type: "Fire Detected", detail: "Thermal plume identified in North Bay", level: "critical" },
      { time: "1h ago", type: "Perimeter Check", detail: "Fence line verified secure", level: "info" },
    ],
  },
];

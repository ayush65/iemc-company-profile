export type Product = {
  id: string;
  index: string;
  category: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  imageAlt: string;
  specs: { label: string; value: string }[];
  details: string;
};

export const products: Product[] = [
  {
    id: "neeri-sense",
    index: "01",
    category: "Domestic Automated Water Management",
    title: "Neeri-Sense",
    tagline: "App Monitoring & Leak Detection",
    desc: "Wireless, retrofit-friendly water management with real-time usage monitoring and automatic leak detection. Backed by an unconditional 1-year replacement warranty and an industry-leading 5-year service assurance.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Neeri-Sense automated water management control hardware",
    specs: [
      { label: "Power Input", value: "Direct / Battery" },
      { label: "Wireless Coverage", value: "500 m" },
      { label: "Dimensions", value: "800 × 750 × 500 mm" },
    ],
    details:
      "Seamlessly track and manage multiple overhead tanks and sumps simultaneously from a single smartphone dashboard. Automatic pump control, overflow protection, and instant leak alerts keep homes and facilities protected around the clock.",
  },
  {
    id: "smart-flow-meter",
    index: "02",
    category: "Industrial Metering",
    title: "Precision Flow Metering System",
    tagline: "Tamper-Proof Inline Telemetry",
    desc: "High-accuracy inline flow metering with tamper-proof logging, engineered for municipal and industrial water networks running continuous duty cycles.",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Precision flow metering system installed in an industrial facility",
    specs: [
      { label: "Accuracy", value: "±0.5%" },
      { label: "Max Flow Rate", value: "12,000 L/h" },
      { label: "Enclosure Rating", value: "IP68" },
    ],
    details:
      "Continuous flow telemetry with cloud dashboards, alarm thresholds, and automated usage reports for facility operators. Built to survive full submersion and harsh plant environments without calibration drift.",
  },
  {
    id: "iot-gateway-hub",
    index: "03",
    category: "Connectivity & Telemetry",
    title: "Industrial IoT Gateway Hub",
    tagline: "One Uplink for an Entire Plant",
    desc: "Edge gateway aggregating Modbus, LoRaWAN, and GSM telemetry into a single encrypted uplink — purpose-built for remote plant environments.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Industrial IoT gateway hub circuit board detail",
    specs: [
      { label: "Protocols", value: "Modbus / LoRa / GSM" },
      { label: "Uptime SLA", value: "99.9%" },
      { label: "Operating Temp", value: "−20°C to 60°C" },
    ],
    details:
      "Deploy once and connect an entire site's sensors. Over-the-air updates, encrypted transport, and store-and-forward buffering keep fleets secure and data intact even through network outages.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  focus: string[];
};

export const team: TeamMember[] = [
  {
    name: "Manikandan Govindarajan",
    role: "Managing Director & CEO",
    bio: "Over 35 years of leadership directing manufacturing facilities, enterprise operations, and international engineering partnerships.",
    linkedin: "#",
    focus: ["Strategy", "Global Partnerships", "Operations"],
  },
  {
    name: "Mathivanan",
    role: "CTO & Head of Engineering",
    bio: "Certified Six Sigma Black Belt overseeing stringent ISO 9001/14001, ASME, and CE standard compliance across all manufactured units.",
    linkedin: "#",
    focus: ["Quality Systems", "R&D", "Compliance"],
  },
];

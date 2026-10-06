type IconName =
  | "industry"
  | "gears"
  | "globe"
  | "chip"
  | "droplet"
  | "gauge"
  | "network"
  | "shield"
  | "compass"
  | "target"
  | "check"
  | "arrowRight"
  | "arrowUpRight"
  | "chevronLeft"
  | "chevronRight"
  | "close"
  | "menu"
  | "location"
  | "mail"
  | "phone"
  | "linkedin"
  | "send"
  | "zap"
  | "plus";

const paths: Record<IconName, React.ReactNode> = {
  industry: (
    <>
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1M12 18h1M7 18h1" />
    </>
  ),
  gears: (
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.5-3a7.5 7.5 0 0 1-.14 1.37l2.06 1.6a1 1 0 0 1 .12 1.58l-2 3.46a1 1 0 0 1-1.36.36l-2.2-1.1a7.6 7.6 0 0 1-2.35 1.36l-.34 2.4a1 1 0 0 1-1 1H6.4a1 1 0 0 1-1-1l-.34-2.4a7.6 7.6 0 0 1-2.35-1.36l-2.2 1.1a1 1 0 0 1-1.36-.36l-2-3.46a1 1 0 0 1 .12-1.58l2.06-1.6A7.5 7.5 0 0 1 4.5 12a7.5 7.5 0 0 1-.14-1.37l-2.06-1.6a1 1 0 0 1-.12-1.58l2-3.46a1 1 0 0 1 1.36-.36l2.2 1.1a7.6 7.6 0 0 1 2.35-1.36l.34-2.4a1 1 0 0 1 1-1h3.2a1 1 0 0 1 1 1l.34 2.4a7.6 7.6 0 0 1 2.35 1.36l2.2-1.1a1 1 0 0 1 1.36.36l2 3.46a1 1 0 0 1-.12 1.58l-2.06 1.6c.09.45.14.92.14 1.37Z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3" />
    </>
  ),
  droplet: <path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z" />,
  gauge: (
    <>
      <path d="M12 15l4-6" />
      <path d="M3.5 15a9 9 0 1 1 17 0" />
    </>
  ),
  network: (
    <>
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M7.3 7.3l3.4 8.2M16.7 7.3l-3.4 8.2M7.5 6h9" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  check: <path d="M4.5 12.5l5 5 10-11" />,
  arrowRight: <path d="M4 12h15M13 5.5L19.5 12 13 18.5" />,
  arrowUpRight: <path d="M6 18L18 6M8 6h10v10" />,
  chevronLeft: <path d="M14.5 5.5L8 12l6.5 6.5" />,
  chevronRight: <path d="M9.5 5.5L16 12l-6.5 6.5" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  location: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l1.5 4.5L8 10.5a12 12 0 0 0 5.5 5.5l2-2.5L20 15v4a1.5 1.5 0 0 1-1.6 1.5C10 20 4 14 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
  ),
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.08 21 14v7h-4v-6.2c0-1.5-.03-3.4-2.07-3.4-2.08 0-2.4 1.62-2.4 3.3V21H9z"
    />
  ),
  send: (
    <>
      <path d="M21 3L10.5 13.5" />
      <path d="M21 3l-6.8 18-3.7-8.3L2 9l19-6Z" />
    </>
  ),
  zap: <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

export function Icon({
  name,
  size = 20,
  className,
  strokeWidth = 1.7,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

export const IMAGES = {
  focBench: 'https://d64gsuwffb70l.cloudfront.net/6a19c3476b8ee19cbbcba448_1780073309060_f13284b1.png',
  dyno: 'https://d64gsuwffb70l.cloudfront.net/6a19c3476b8ee19cbbcba448_1780073310343_c596b685.png',
  matrixDriver: 'https://d64gsuwffb70l.cloudfront.net/6a19c3476b8ee19cbbcba448_1780073311462_425499ae.png',
  controlPanel: 'https://d64gsuwffb70l.cloudfront.net/6a19c3476b8ee19cbbcba448_1780073312502_17aaad31.png',
  cm4Carrier: 'https://d64gsuwffb70l.cloudfront.net/6a19c3476b8ee19cbbcba448_1780073313778_fd351ca0.png',
  headshot: 'https://d64gsuwffb70l.cloudfront.net/6a19c3476b8ee19cbbcba448_1780073502815_46a45478.png',
};

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'foc',
    title: '3-Phase BLDC FOC Motor Controller',
    category: 'Firmware / Control Systems',
    image: IMAGES.focBench,
    summary:
      'Field-oriented control firmware for a 3-phase brushless DC motor achieving 98.5% efficiency with sub-50µs control-loop response on an STM32 platform.',
    highlights: [
      'Closed-loop FOC with Clarke/Park transforms and SVPWM modulation',
      'Inline phase-current sensing with <50µs PID response time',
      'Live tuning + telemetry over STM32CubeIDE debugger',
    ],
    tech: ['STM32F4', 'C / Bare-metal', 'FOC', 'SVPWM', 'ADC'],
  },
  {
    id: 'dyno',
    title: 'Industrial Motor Dynamometer Rig',
    category: 'Hardware / Test Engineering',
    image: IMAGES.dyno,
    summary:
      'A full dynamometer test bench characterizing high-torque industrial motors with multi-phase current capture, regenerative load control and automated logging.',
    highlights: [
      'Multi-node CAN bus drive coordination with J1939 support',
      'Regenerative braking and load-profile automation',
      'Real-time 3-phase current & torque waveform capture',
    ],
    tech: ['CAN bus', 'J1939', 'Power Electronics', 'Python', 'Test Automation'],
  },
  {
    id: 'matrix',
    title: 'ESP32 Industrial Matrix Driver',
    category: 'PCB Design / Firmware',
    image: IMAGES.matrixDriver,
    summary:
      'A 4-layer mixed-signal carrier integrating an ESP32-WROOM, RS-485 (MAX3485), M8 industrial connectors and a constant-current LED matrix driver chain.',
    highlights: [
      'STP16CP05 constant-current matrix driver array',
      'Isolated RS-485 industrial fieldbus over M8 connectors',
      'Wi-Fi/BLE provisioning + OTA firmware updates',
    ],
    tech: ['ESP32', 'RS-485', 'KiCad', '4-layer PCB', 'OTA'],
  },
  {
    id: 'panel',
    title: 'Automated Climbing-Wall Control Panel',
    category: 'Industrial Automation / HMI',
    image: IMAGES.controlPanel,
    summary:
      'A complete industrial control cabinet driving an automated adjustable-angle climbing wall — PLC logic, multi-axis servo drives, HMI touchscreen and safety interlocks.',
    highlights: [
      'HMI touchscreen with live angle, mode & fault diagnostics',
      'Coordinated multi-motor actuation with E-stop safety circuit',
      'CAN-networked drives with remote monitoring & logging',
    ],
    tech: ['PLC', 'HMI', 'Servo Drives', 'Safety Systems', 'CAN'],
  },
  {
    id: 'cm4',
    title: 'Raspberry Pi CM4 + STM32H7 Carrier',
    category: 'PCB Design / Edge Compute',
    image: IMAGES.cm4Carrier,
    summary:
      'Production-grade edge-gateway carrier pairing a Raspberry Pi CM4 with an STM32H753 co-processor, triple isolated CAN, dual Ethernet and wide-input DC-DC power.',
    highlights: [
      'Triple isolated CAN (CAN1–3) with TVS protection',
      'Dual gigabit Ethernet + STM32H7 real-time co-processor',
      '12–24V wide-input DC-DC to 5V/3A + 3.3V rails',
    ],
    tech: ['Raspberry Pi CM4', 'STM32H753', 'Linux', 'Dual Ethernet', 'DC-DC'],
  },
  {
    id: 'cloud',
    title: 'Cloud IoT Monitoring SaaS Platform',
    category: 'Full-Stack / Cloud',
    image: IMAGES.focBench,
    summary:
      'A real-time fleet-monitoring dashboard ingesting telemetry from networked controllers, built on Next.js 14 with WebSocket streaming and serverless AWS infrastructure.',
    highlights: [
      'Next.js 14 with React Server Components',
      'Real-time WebSocket telemetry streaming',
      'AWS Lambda + DynamoDB + CloudFront CDN',
    ],
    tech: ['Next.js 14', 'GoLang', 'AWS', 'DynamoDB', 'WebSocket'],
  },
];

export interface SkillGroup {
  title: string;
  icon: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    title: 'Embedded & Firmware',
    icon: 'cpu',
    items: ['STM32F4 / H7', 'ESP32 / ATmega', 'Bare-metal C/C++', 'FreeRTOS', 'FOC & PID Control', 'I²C / SPI / UART'],
  },
  {
    title: 'Hardware & PCB',
    icon: 'circuit',
    items: ['4-layer PCB Layout', 'Mixed-signal Design', 'Power Electronics', 'EMI Mitigation', 'KiCad / Altium', 'Schematic Capture'],
  },
  {
    title: 'Industrial & Comms',
    icon: 'network',
    items: ['CAN bus / J1939', 'RS-485 / Modbus', 'PLC & HMI', 'SCADA Integration', 'Safety Systems', 'M8 / M12 Connectors'],
  },
  {
    title: 'Full-Stack & Cloud',
    icon: 'cloud',
    items: ['Next.js 14 / React', 'GoLang / Python', 'AWS (Lambda, EC2)', 'DynamoDB', 'WebSocket / REST', 'CI/CD & DevOps'],
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Senior Embedded Hardware & Web Solutions Contractor',
    company: 'Multiple Regional Technology Agencies',
    location: 'Montgomery, AL — Remote & On-site',
    period: 'June 2022 – Present',
    points: [
      'Architected production-grade embedded systems and full-stack web solutions for industrial automation, IoT monitoring and enterprise SaaS clients across the Southeast region.',
      'Designed 12+ custom microcontroller carrier boards featuring STM32F4/H7, ESP32 and Raspberry Pi CM4 with multi-protocol communication (CAN bus, RS-485, dual Ethernet, I²C/SPI).',
      'Developed deterministic control firmware implementing FOC motor control and PID loops with <50µs response times on multi-threaded RTOS architectures.',
      'Built scalable monitoring dashboards with Next.js 14 and real-time WebSocket streaming, deployed on AWS Lambda, DynamoDB and CloudFront.',
      'Delivered 8 turnkey engineering projects on-time and within budget — from requirements through field commissioning and documentation.',
    ],
  },
  {
    role: 'Full-Stack Developer & Embedded Systems Contractor',
    company: 'Freelance Technology Specialist',
    location: 'Remote',
    period: 'March 2018 – May 2022',
    points: [
      'Contracted with early-stage startups and small businesses to deliver custom software applications, MERN-stack dashboards and prototype hardware integrations.',
      'Integrated third-party APIs and built secure real-time data pipelines bridging physical sensor inputs with web-based cloud interfaces.',
      'Developed low-level Python/C++ scripts and managed multiple codebases, repository versions and infrastructure deployments independently.',
      'Maintained strict self-discipline and met tight client milestones across concurrent engagements.',
    ],
  },
];

export const STATS = [
  { value: '12+', label: 'Custom PCB Designs' },
  { value: '98.5%', label: 'BLDC FOC Efficiency' },
  { value: '<50µs', label: 'Control Loop Response' },
  { value: '8', label: 'Turnkey Projects Delivered' },
];

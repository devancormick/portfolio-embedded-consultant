import { jsPDF } from 'jspdf';
import { EXPERIENCE, SKILLS } from '@/data/portfolio';

const ACCENT: [number, number, number] = [14, 165, 233]; // sky-500
const DARK: [number, number, number] = [15, 23, 42]; // slate-900
const GRAY: [number, number, number] = [71, 85, 105]; // slate-600

export function generateResume() {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentW = pageW - margin * 2;
  let y = 0;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // ---- Header banner ----
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pageW, 110, 'F');
  doc.setFillColor(...ACCENT);
  doc.rect(0, 110, pageW, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('Devan McCormick', margin, 56);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(56, 189, 248);
  doc.text('Senior Embedded Systems & Full-Stack Engineer', margin, 76);

  doc.setFontSize(9.5);
  doc.setTextColor(203, 213, 225);
  doc.text(
    ' Montgomery, AL  -  Remote   |   linkedin.com/in/devanmccormick',
    margin,
    96,
  );

  y = 142;

  // ---- Section helper ----
  const sectionTitle = (title: string) => {
    ensureSpace(40);
    doc.setTextColor(...ACCENT);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(title.toUpperCase(), margin, y);
    doc.setDrawColor(...ACCENT);
    doc.setLineWidth(1.2);
    doc.line(margin, y + 6, pageW - margin, y + 6);
    y += 24;
  };

  // ---- Summary ----
  sectionTitle('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  const summary =
    'Senior-level embedded systems architect and full-stack engineer with proven expertise delivering production-grade hardware solutions and scalable web applications. Specialized in custom PCB design, bare-metal firmware development, real-time control systems and cloud-native SaaS platforms, with a track record of managing complete product lifecycles from schematic capture through production deployment.';
  const sumLines = doc.splitTextToSize(summary, contentW);
  doc.text(sumLines, margin, y);
  y += sumLines.length * 13 + 14;

  // ---- Experience ----
  sectionTitle('Professional Experience');
  EXPERIENCE.forEach((exp) => {
    ensureSpace(60);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...DARK);
    doc.text(exp.role, margin, y);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    const periodW = doc.getTextWidth(exp.period);
    doc.text(exp.period, pageW - margin - periodW, y);
    y += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...ACCENT);
    doc.text(`${exp.company}  |  ${exp.location}`, margin, y);
    y += 16;

    doc.setTextColor(...GRAY);
    doc.setFontSize(9.5);
    exp.points.forEach((pt) => {
      const lines = doc.splitTextToSize(pt, contentW - 14);
      ensureSpace(lines.length * 12 + 4);
      doc.setFillColor(...ACCENT);
      doc.circle(margin + 3, y - 3, 1.5, 'F');
      doc.text(lines, margin + 14, y);
      y += lines.length * 12 + 3;
    });
    y += 12;
  });

  // ---- Technical Skills ----
  sectionTitle('Technical Expertise');
  SKILLS.forEach((g) => {
    ensureSpace(28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...DARK);
    doc.text(`${g.title}:`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRAY);
    const itemsText = g.items.join('  -  ');
    const lines = doc.splitTextToSize(itemsText, contentW - 110);
    doc.text(lines, margin + 110, y);
    y += Math.max(lines.length * 12, 14) + 6;
  });

  y += 6;

  // ---- Key Achievements ----
  sectionTitle('Key Technical Achievements');
  const achievements = [
    '3-phase BLDC FOC motor control system achieving 98.5% efficiency with sub-50us control-loop response.',
    'Designed 12+ custom microcontroller carrier boards (STM32F4/H7, ESP32, Raspberry Pi CM4).',
    'Multi-node CAN bus networks with J1939 support and Modbus RTU/TCP gateways for SCADA integration.',
    'Delivered 8 turnkey engineering projects on-time and within budget across the Southeast region.',
  ];
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...GRAY);
  achievements.forEach((a) => {
    const lines = doc.splitTextToSize(a, contentW - 14);
    ensureSpace(lines.length * 12 + 4);
    doc.setFillColor(...ACCENT);
    doc.circle(margin + 3, y - 3, 1.5, 'F');
    doc.text(lines, margin + 14, y);
    y += lines.length * 12 + 4;
  });

  // ---- Footer on every page ----
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Devan McCormick  -  Embedded - Firmware - Full-Stack - Cloud', margin, pageH - 24);
    doc.text(`Page ${i} of ${pages}`, pageW - margin - 50, pageH - 24);
  }

  doc.save('Devan-McCormick-Resume.pdf');
}

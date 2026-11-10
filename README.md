# SMART CM HELPLINE UTTARAKHAND 1905
## मुख्यमंत्री हेल्पलाइन उत्तराखण्ड 1905
### PRAYAS 2026 — Government Digital Services Innovation Prototype

> **HACKATHON DEMONSTRATION PROTOTYPE — NOT AN OFFICIAL GOVERNMENT PORTAL.**  
> *यह एक प्रदर्शन प्रोटोटाइप है, उत्तराखण्ड शासन का आधिकारिक पोर्टल नहीं।*

---

## 1. Project Overview & Identity

- **Project Name:** SMART CM HELPLINE UTTARAKHAND 1905
- **Hindi Name:** मुख्यमंत्री हेल्पलाइन उत्तराखण्ड
- **Primary Tagline:** आपकी समस्या, हमारी प्राथमिकता। (Your Voice, Our Priority.)
- **Secondary Tagline:** एक बेहतर उत्तराखण्ड, हर नागरिक की आवाज़ के साथ। (A Smarter, More Accessible and More Responsive Uttarakhand.)
- **Hackathon Context:** PRAYAS 2026 — Government Digital Services Innovation
- **Toll-Free Helpline:** 1905 (24x7)
- **Primary Official Reference:** https://cmhelpline.uk.gov.in/

---

## 2. Key Capabilities & Features

1. **3-Layer Government Header & Navigation:**
   - **Layer 1 (Utility Bar):** State branding, Text size controls (`A-`, `A`, `A+`), High Contrast mode, Low-Bandwidth / Rural 2G/3G Data Saver toggle, Screen Reader audio readout, 5-language selector (Hindi, English, Garhwali, Kumaoni, Jaunsari), and quick Officer Portal link.
   - **Layer 2 (Branding Header):** Uttarakhand State Emblem vector, CM Helpline 1905 logo, bilingual state titles, 24x7 helpline call badge (`tel:1905`).
   - **Layer 3 (Main Navbar):** Sticky navigation with quick CTA "शिकायत दर्ज करें" and touch-friendly mobile navigation drawer.
2. **Interactive 4-Step Complaint Registration:**
   - **Step 1 — Citizen Information:** Name, 10-digit mobile, Demo OTP generation & verification with 1-click auto-fill (`1905`), District (all 13 Uttarakhand districts), dynamic Tehsil & Block, Village/Ward.
   - **Step 2 — Category Selection:** 15 distinct categories with search, icons, and AI recommendation badge.
   - **Step 3 — Grievance Details & Evidence:** Pre-fill from AI Assistant, Voice input with audio wave visualizer, suggested department auto-matcher, date of issue, priority, and Evidence Uploader (device upload + camera simulation, JPG/PNG/WebP/PDF up to 5MB).
   - **Step 4 — Review & Confirmation:** Full summary review, explicit declaration confirmation -> Generates standard reference number: `DEMO-UK-1905-2026-XXXXXX`.
   - **Printable Acknowledgment:** Download / Print demo receipt with simulated QR verification.
   - **Draft Save & Resume:** Local storage draft management.
3. **8-Stage Live Status Tracking System:**
   - Lookup by Complaint ID (e.g. `DEMO-UK-1905-2026-000001`) or Mobile number.
   - Interactive vertical status timeline: Registered → Initial Review → Forwarded to Dept → Assigned to Officer → Action in Progress → Resolution Submitted → Citizen Feedback → Resolved (plus Reopened & Rejected states).
   - Officer remarks and Action Taken Report (ATR) download.
   - Citizen Feedback widget (1-5 stars, satisfaction level, written remarks).
   - Reopening Request modal (allows citizens to reopen unresolved grievances with reasons).
4. **AI-Powered Complaint Assistant (सीएम हेल्पलाइन सारथी):**
   - Floating chat assistant.
   - Analyzes natural language grievance queries, predicts category & department with match confidence & rationale, generates formal structured complaint draft in Hindi, and populates the form in 1-click.
5. **Voice-Assisted Complaint Input:**
   - Microphone recording with animated audio visualizer.
   - Support for Hindi, English, Garhwali, Kumaoni, and Jaunsari dialects with fallback simulation.
6. **Multi-Role Officer Portal & Workflow:**
   - Quick role switcher:
     - Level 1 Block Officer: इंजी. राजेश चौहान (लो.नि.वि. श्रीनगर)
     - Level 2 District Nodal Officer: इंजी. विक्रम सिंह रावत (जल संस्थान, चमोली)
     - Level 3 Head of Dept: डॉ. आर.के. ध्यानी (स्वास्थ्य सेवा, देहरादून)
     - District Administrator: श्री आनंद स्वरूप (ADM Grievance, Dehradun)
     - State Administrator: श्री शैलेश बगोली, IAS (सचिव / राज्य नोडल अधिकारी, ITDA)
   - Filter complaints by District, Department, Status, Search.
   - Update complaint status, confirm/reassign department, record remarks, attach ATR report -> Instantly updates the shared store and citizen tracking timeline!
7. **State Administrator Analytics Dashboard:**
   - KPI counters: Total complaints, Resolved %, Avg redressal days, Satisfaction rate.
   - Responsive Recharts visualizations:
     - 13 Districts Bar Chart with Garhwal / Kumaon division filters.
     - Status distribution Donut Chart.
     - Monthly resolution trend Line Chart.
     - Department-wise workload distribution.
   - CSV report export.
8. **Public Demand & Public Suggestion Modules:**
   - Independent submission forms with separate reference numbers (`DEMO-UK-DEM-2026-XXXXXX` and `DEMO-UK-SUG-2026-XXXXXX`).
9. **All 13 Uttarakhand Districts Directory:**
   - Garhwal Division: Dehradun, Haridwar, Chamoli, Rudraprayag, Tehri Garhwal, Pauri Garhwal, Uttarkashi.
   - Kumaon Division: Nainital, Almora, Bageshwar, Pithoragarh, Champawat, Udham Singh Nagar.
   - Verified NIC portal links (`dehradun.nic.in`, `chamoli.gov.in`, etc.), nodal contacts, demo stats.
10. **State Government Schemes & Departments Directory:**
    - 8+ flagship schemes (Atal Ayushman, Gaura Devi, Kisan Kalyan, MSY, Mahalakshmi, Vatsalya, Veer Chandra Singh Garhwali, Old Age Pension).
    - 14 state departments with nodal contacts and service keywords.
11. **PWA & Low-Bandwidth Mode:**
    - Web App Manifest (`manifest.json`), service worker (`sw.js`).
    - Rural 2G/3G low-bandwidth mode.

---

## 3. Technology Stack

- **Frontend:** React 18, TypeScript, Vite 5, Tailwind CSS
- **Routing:** React Router DOM v6
- **Icons:** Lucide React
- **Visualizations & Charts:** Recharts
- **State Management:** Reactive Store Context with `localStorage` persistence
- **Speech & Audio:** Web Speech API (with regional dialect fallback simulation)
- **Design System:** Uttarakhand Himalayan Palette (Deep Navy `#102A43`, Govt Blue `#145DA0`, Saffron `#E68A2E`, Himalayan Green `#26734D`, White `#FFFFFF`)
- **Typography:** Inter & Noto Sans Devanagari

---

## 4. Setup & Running the Application

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation
```bash
# Clone or navigate to the project directory
cd "cm help line prototype"

# Install dependencies
npm install

# Start development server
npm run dev
```

The application runs at: `http://localhost:3000`

### Production Build
```bash
npm run build
npm run preview
```

---

## 5. End-to-End Workflow Testing Guide

Follow these steps to demonstrate the complete 9-step connected lifecycle:

1. **Register a Complaint as a Citizen:**
   - Click **"शिकायत दर्ज करें (Register Complaint)"** on the homepage or navigation bar.
   - Step 1: Keep or edit the pre-filled citizen name and mobile number. Click "ओटीपी भेजें" (Demo OTP: `1905`) and verify. Select Chamoli district and village.
   - Step 2: Select **"पेयजल आपूर्ति एवं स्वच्छता (Drinking Water & Sanitation)"**.
   - Step 3: Enter the problem description or click **"बोलकर दर्ज करें (Voice Input)"** or use the **AIAssistantWidget (सारथी)**. Click "कैमरा से फोटो लें" or upload a file.
   - Step 4: Check the declaration and click **"शिकायत जमा करें"**.
   - Note the generated reference ID (e.g., `DEMO-UK-1905-2026-000006`).
2. **Inspect the Officer Dashboard:**
   - Go to **"अधिकारी पोर्टल (Officer Portal)"** in the top utility bar or navbar.
   - The newly registered complaint appears at the top of the assigned complaints list.
   - Click on the complaint row to open the **Officer Action Modal**.
   - Change the status to **"कार्रवाई गतिमान (Action in Progress)"**, enter inspection remarks, and click **"कार्रवाई सहेजें"**.
3. **Track as Citizen:**
   - Go to **"शिकायत की स्थिति देखें (Track Complaint)"**.
   - Enter your reference ID or select it from the quick demo chips.
   - Observe the 8-stage interactive visual timeline showing the exact officer update, timestamp, and remarks!
4. **Officer Resolves the Grievance:**
   - Return to the Officer Dashboard.
   - Open the complaint again, change status to **"संतुष्टिपूर्वक निस्तारित (Resolved)"**, enter the resolution summary and signed ATR filename, and save.
5. **Citizen Rates or Reopens:**
   - Refresh or view the Tracking page.
   - Observe the **Action Taken Report (ATR)** card.
   - Rate the resolution (1-5 stars) and submit feedback.
   - Or click **"शिकायत पुनः खोलने हेतु आवेदन करें (Request Reopening)"**, enter a reason, and watch the status update to `REOPENED` and notify the officer dashboard!

---

## 6. Demonstration Transparency & Simulated Features

| Feature | Current Prototype Implementation | Live Government Requirement |
|---|---|---|
| **OTP Verification** | Deterministic Demo OTP `1905` | SMS Gateway Integration (CDAC / NIC / C-DoT) |
| **Grievance Storage** | Local Browser Storage & In-Memory Reactive Store | Secure State Data Center (SDC) PostgreSQL Database |
| **Speech-to-Text** | Web Speech API + Regional Dialect Fallback Simulator | Authorized Bhashini API integration |
| **Grievance Submission** | Strictly in-memory prototype reference generation | Production CM Helpline 1905 NIC Core Engine |
| **Officer Accounts** | Simulated role switcher (Level 1 to State Admin) | SSO / Jan Parichay Government Authentication |
| **Statistics** | Curated illustrative demo figures labeled **DEMO DATA** | Real-time live CM Helpline BI analytics |

---

## 7. Compliance with Official Directives

- **Helpline Number:** Verified Uttarakhand CM Helpline number `1905` (Never uses MP helpline `181`).
- **No Fabricated Quotes:** Strict factual representation of Hon'ble Chief Minister Shri Pushkar Singh Dhami and official state portals.
- **Privacy First:** No Aadhaar collection; masked citizen mobile numbers; no sensitive telemetry.
- **All 13 Districts:** Complete Garhwal & Kumaon administrative directories.

---
*Developed for PRAYAS 2026 Hackathon — Government Digital Services Innovation.*

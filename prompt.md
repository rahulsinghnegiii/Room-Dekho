Create a Next.js website named "Room Dekho".

🛠️ Tech Stack:
- Framework: Next.js (using App Router or Pages Router)
- Styling: Tailwind CSS
- Form Handling: Google Form embed or connect custom form to Google Sheets via API
- Hosting: Vercel

📄 Required Pages and Features:

1. **Home Page:**
   - Intro section: What is Room Dekho?
   - How it works: Room owners can list their rooms; tenants can search and contact them.

2. **Listings Page:**
   - List of available rooms (dummy data or fetched from a local JSON/Google Sheet)
   - Filters:
     - City (dropdown)
     - Rent Range (min-max)
     - Facilities (WiFi, Furnished, etc. as checkboxes)

3. **Room Owner Form Page:**
   - A form to let room owners submit their room details
   - Options:
     - Embed Google Form
     - Or use a custom form that connects to Google Sheets using an API route and fetch

4. **Contact Page:**
   - WhatsApp button with pre-filled message
   - Basic contact form (name, email, message)

🎨 Design Goals:
- Clean, minimal UI
- Fully responsive
- Fast load times
- Use modern fonts and soft colors

📦 Extras:
- Floating WhatsApp button on all pages
- Deploy-ready code for Vercel

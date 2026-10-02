# Prompt สำหรับให้ ChatGPT สร้างรูปปกบทความ (14 รูป)

## วิธีใช้
1. เปิดแชตใหม่ใน ChatGPT แล้ววาง **"ข้อความตั้งค่า"** ด้านล่างก่อน 1 ครั้ง
2. จากนั้นส่ง prompt ทีละรูป (ข้อ 1–14) ทีละข้อความ
3. ดาวน์โหลดรูป แปลงเป็น `.webp` (คุณภาพ ~80) แล้วตั้งชื่อตามที่ระบุในแต่ละข้อ
4. วางไฟล์ทั้งหมดไว้ที่ `public/creative-home/images/articles/` แล้วบอก Claude ให้ผูกรูปเข้ากับบทความ

> ทำไมต้องไม่มีตัวหนังสือ: AI มักสร้างตัวอักษรไทยเพี้ยน ดังนั้นทุกรูปให้หน้าจอแสดงเป็นบล็อก UI เบลอ ๆ แทนข้อความ (เหมือนรูปปก 3 รูปที่มีอยู่แล้ว)

---

## ข้อความตั้งค่า (วางครั้งแรกครั้งเดียว)

```
You are going to create a series of 14 blog cover photos for WAENWEB, a Thai web design studio.
Every image in this series must follow these rules:

STYLE
- Photorealistic, candid editorial photography, like a real photo taken on a full-frame camera with a 35mm lens.
- Soft natural daylight, slightly muted and calm color grading with neutral greys, warm wood and a touch of green from plants.
- Real Thai / Southeast Asian small-business settings (cafés, shops, offices, clinics, home studios). People, if present, are Thai/Southeast Asian adults dressed casually, shown naturally and never posing at the camera.
- Clean, uncluttered composition with shallow depth of field.

FORMAT
- Landscape 3:2, 1536 x 1024 px.
- Keep the main subject in the central 60% of the frame with calm space on the left and right, because the image will also be cropped to a wide 2.3:1 banner.

STRICT DON'TS
- No readable text, letters or numbers anywhere: screens, paper, signs and packaging must show only blurred UI blocks, shapes or illegible marks.
- No real brand logos, no Apple logo, no watermarks.
- No illustration, 3D render, cartoon or stock-photo "thumbs up" poses.

Reply "ready" and wait for my first prompt.
```

---

## Prompt รายรูป

### 1. ทำเว็บไซต์ธุรกิจราคาเท่าไหร่ในปี 2026
ไฟล์: `cover-pricing.webp`
```
A Thai small-business owner at a café table comparing two printed website quotations side by side, a calculator and a laptop showing a blurred pricing-table layout, a cup of iced coffee nearby. Over-the-shoulder view, focus on the hands and papers. All text illegible.
```

### 2. WordPress vs เว็บสำเร็จรูป
ไฟล์: `cover-wordpress-vs-builder.webp`
```
Two laptops side by side on a light wooden desk in a bright home office: the left one shows a blurred website editor dashboard with a sidebar menu, the right one shows a blurred drag-and-drop website builder with colorful blocks. A person's hand rests between them as if deciding. Plants and a notebook in the background.
```

### 3. SEO คืออะไร
ไฟล์: `cover-seo.webp`
```
Close-up of a smartphone held in a person's hand on a busy Bangkok street at golden hour, the screen showing a blurred list of search results with one result softly highlighted. Shallow depth of field, city lights and street-food stalls bokeh in the background.
```

### 4. เตรียมทำเว็บร้านค้าออนไลน์
ไฟล์: `cover-ecommerce-prep.webp`
```
A small Thai online-shop owner photographing handmade products (ceramic mugs) on a simple white backdrop with a phone on a mini tripod, parcel boxes and packing tape stacked nearby, a laptop showing a blurred product-grid page. Bright natural window light.
```

### 5. เว็บไซต์รองรับมือถือ
ไฟล์: `cover-mobile-friendly.webp`
```
A Thai commuter on the BTS Skytrain scrolling a clean, well-designed shop website on their smartphone (blurred UI blocks, large product image). Focus on the phone and hands, train window with soft city view behind.
```

### 6. จ้างทำเว็บแล้วได้อะไร ก่อนจ่ายเงิน
ไฟล์: `cover-hiring-checklist.webp`
```
A business owner and a web designer sitting across a meeting table in a small bright studio, reviewing a printed project checklist and a tablet with a blurred website mockup. Natural, friendly discussion, faces partly turned away from camera, coffee cups on the table.
```

### 7. Google My Business / Google Business Profile
ไฟล์: `cover-google-business.webp`
```
A smartphone held up in front of a cozy neighborhood Thai noodle shop storefront, the phone screen showing a blurred map with a location pin and a business information card. Shallow depth of field so the shopfront is softly blurred behind the phone.
```

### 8. Landing Page กับเว็บไซต์ต่างกันยังไง
ไฟล์: `cover-landing-vs-website.webp`
```
A desk with a large monitor showing a blurred multi-section website layout with navigation, and next to it a tablet showing a single long blurred one-page layout with one big button shape. Sticky notes and a pen beside them, minimalist workspace, soft daylight.
```

### 9. ทำไมเว็บโหลดช้า และวิธีแก้
ไฟล์: `cover-slow-website.webp`
```
A slightly frustrated shop owner behind a retail counter looking at a laptop showing a blurred webpage with a loading spinner and grey placeholder boxes, a customer waiting softly out of focus in the background. Realistic everyday moment, not exaggerated.
```

### 10. เว็บ Portfolio สำหรับฟรีแลนซ์และครีเอเตอร์
ไฟล์: `cover-portfolio.webp`
```
A Thai freelance photographer at a home studio desk reviewing an online portfolio on a large monitor showing a blurred grid of beautiful photographs, a camera body and lens on the desk, prints pinned on the wall behind. Calm creative atmosphere.
```

### 11. UX/UI Design สำคัญกว่าความสวยงาม
ไฟล์: `cover-ux-ui.webp`
```
A designer's hands sketching smartphone wireframes on paper next to a tablet showing a clean blurred app interface, sticky notes with simple arrows and boxes (no text), a stylus and a coffee cup. Top-down angled view on a light wooden table.
```

### 12. PDPA คืออะไร เว็บไซต์ต้องเตรียมตัวยังไง
ไฟล์: `cover-pdpa.webp`
```
A laptop on an office desk showing a blurred website with a cookie consent banner at the bottom of the screen, a small padlock-shaped desk object and a neat folder of documents beside it. Calm, trustworthy mood, soft daylight from a window.
```

### 13. หลังส่งมอบเว็บต้องดูแลอะไรบ้าง
ไฟล์: `cover-maintenance.webp`
```
A web developer at a tidy desk doing website maintenance: laptop showing a blurred admin dashboard with green status indicators, an external drive labeled with a blank sticker for backups, and a phone showing a blurred notification. Early-morning light, focused and calm.
```

### 14. LINE OA กับเว็บไซต์ทำงานร่วมกัน
ไฟล์: `cover-line-oa-website.webp`
```
A Thai café owner behind the counter holding a smartphone showing a blurred chat conversation with green message bubbles, while a laptop on the counter shows the café's blurred website menu page. Warm, busy café atmosphere softly out of focus.
```

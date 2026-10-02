# Prompt รอบ 2: ทำรูปปกใหม่ 9 รูปให้ดูเป็นภาพถ่ายจริง

## ปัญหาของรอบแรก
- คนซ้ำ: ผู้หญิงมวยผมเสื้อลินินครีมอยู่ใน 9 รูป ผู้ชายเสื้อเทาเข้ม 3 รูป แมวตัวเดิม 2 รูป
- ฉากซ้ำ: โต๊ะไม้ คาเฟ่ปูนเปลือย มอนสเตอร่า แก้วเซรามิก และแสงหน้าต่างนุ่มๆ แทบทุกรูป
- หน้าจอเป็นบล็อกสีเทาว่างๆ ซึ่งเป็นจุดที่ฟ้องว่าเป็น AI ชัดที่สุด
- ท่าโพสและพร็อพที่จัดฉากเกินไป เช่น กุมขมับ เท้าคาง วางแม่กุญแจ

## วิธีใช้
1. **เปิดแชตใหม่** ใน ChatGPT ห้ามใช้แชตเดิม เพราะ AI จะจำคนและฉากจากรอบแรกมาใช้ซ้ำ
2. วาง "ข้อความตั้งค่า" ด้านล่าง 1 ครั้ง แล้วส่ง prompt ทีละรูป
3. ถ้ารูปไหนยังได้คนหน้าเดิม หรือได้โต๊ะไม้กับต้นมอนสเตอร่ามาอีก ให้พิมพ์ต่อว่า
   `Different person, different place, remove the wooden desk and plants, make it look like an unedited phone/camera snapshot.`
4. บันทึกเป็น `.webp` แล้วตั้งชื่อตามที่ระบุ (ชื่อลงท้าย `-v2` หรือ `-v3` เพื่อให้ cache รูปเก่าหายเอง)

---

## ข้อความตั้งค่า (วางครั้งเดียว)

```
I need 9 editorial blog cover photos for a Thai web-design studio. They must look like real,
unstaged documentary photographs, NOT AI images and NOT stock photos.

REALISM RULES
- Shot like a real photographer or a good phone camera: natural, slightly imperfect framing,
  mild sensor noise, real lens depth of field, true-to-life (not glossy) skin and materials.
- Mixed, believable lighting that differs per image: fluorescent office light, overcast daylight,
  warm tungsten at night, harsh midday sun, etc. Do not default to soft golden window light.
- Real Thai everyday environments with honest clutter: cables, receipts, stickers, wall calendars,
  plastic stools, steel shelves, tiled floors, electric fans, price tags, worn surfaces.
- People are ordinary Thai people of different ages, body types, hairstyles and clothing, caught
  mid-action and unaware of the camera. Never posed thinking, smiling at camera or holding head.
- Screens: show real-looking content that is out of focus, at an angle, or partly washed out by
  glare/reflection. Do NOT draw clean grey placeholder blocks or wireframe boxes.

VARIETY RULES (very important)
- Every image must feature a clearly different person and a clearly different location from the
  others. Do not reuse a woman with a messy bun in a beige linen shirt.
- Avoid these overused props entirely: wooden café desks, monstera/pothos plants, ceramic mugs,
  latte art, cats, padlocks, notebooks with pens placed neatly, matching laptops.

FORMAT
- Landscape 3:2, 1536 x 1024 px. Keep the main subject within the central 60% (it will also be
  cropped to a wide 2.3:1 banner).
- No legible text, logos or brand marks anywhere (text may exist but must be unreadable/blurred).

Reply "ready" and wait for my prompts.
```

---

## Prompt รายรูป

### 1. ราคาทำเว็บไซต์ → `cover-pricing-v2.webp`
```
Inside a small Thai family-run auto repair shop in the late afternoon. A man in his 50s in a
grease-stained polo shirt sits on a plastic stool at a cluttered steel workbench, comparing two
printed quotations held in his hands, reading glasses pushed up on his forehead. Spare parts,
an old calculator, a wall calendar and a hanging fluorescent tube behind him. Shot at eye level
with a 35mm lens, shallow depth of field on the papers; the quotation text is unreadable.
```

### 2. WordPress vs เว็บสำเร็จรูป → `cover-wordpress-vs-builder-v2.webp`
```
A young Thai man in his 20s working late at night at home, sitting on the floor of a small
condo living room with a low table. One older laptop shows a website admin dashboard (out of
focus, slight screen glare); next to it his phone shows a website-builder app with colourful
template thumbnails. Warm tungsten lamp light mixed with cool screen light, instant noodle cup
and charger cables on the table. Over-the-shoulder, slightly high angle, candid.
```

### 3. เว็บไซต์รองรับมือถือ → `cover-mobile-friendly-v3.webp`
```
Rainy-season afternoon at a busy Bangkok bus stop. A Thai university student in uniform shelters
under the bus-stop roof, thumb-scrolling a shop website on her phone while waiting. Raindrops,
wet pavement reflections, a passing bus out of focus. Overcast, soft but cool light. Telephoto
look (85mm), phone screen at an angle with real-looking content slightly blurred by reflection.
```

### 4. จ้างทำเว็บแล้วได้อะไร → `cover-hiring-checklist-v2.webp`
```
A small accounting firm's meeting room with fluorescent ceiling lights and frosted glass walls.
A Thai businesswoman in her 40s in a navy blazer sits across a laminate table from a web agency
staff member (seen from behind, shoulder only). She is marking printed proposal pages with a red
pen; a laptop between them shows an out-of-focus project timeline. Real office clutter: binders,
a water bottle, a desk phone. Documentary style, eye level, natural expressions.
```

### 5. Landing Page กับเว็บไซต์ → `cover-landing-vs-website-v2.webp`
```
A Thai marketing team of three in a modest open-plan office, standing around a large wall-mounted
TV screen that shows a long single-page promotional website scrolled halfway (blurred, glare on
the screen). One person points at the screen, another holds a phone showing an ad. Mixed
daylight and fluorescent light, whiteboard with unreadable marker notes in the background.
Wide 28mm documentary shot, slight motion blur on the pointing hand.
```

### 6. ทำไมเว็บโหลดช้า → `cover-slow-website-v2.webp`
```
At a fresh fruit stall in a Thai market at midday, a customer in her 30s holds her phone up,
waiting, while the elderly stall owner leans in to look. The phone screen shows a half-loaded
web page with a spinner, slightly washed out by harsh sunlight. Plastic baskets of mangoes,
hanging scale, tarp shade casting coloured light. Candid street photography, 50mm, natural
impatience, no exaggerated expressions.
```

### 7. เว็บ Portfolio ฟรีแลนซ์ → `cover-portfolio-v2.webp`
```
A Thai wedding photographer in his 30s with a camera strap still around his neck, sitting in
the back of a hatchback car with the boot open after a shoot, reviewing photos on a laptop
balanced on a camera bag. Golden-hour light outside a temple-hall venue, string lights and
event chairs out of focus behind him. The laptop shows a photo grid, out of focus with screen
glare. Candid, slightly low angle, real gear clutter (memory cards, batteries, lens cap).
```

### 8. PDPA → `cover-pdpa-v2.webp`
```
Reception counter of a small Thai dental clinic. A receptionist in her 20s in a light-blue clinic
uniform helps an older patient fill in a consent form on a tablet; a clipboard of paper forms
sits beside it. Clean clinical lighting, a queue number display and waiting chairs blurred in
the background. Shot from behind the patient's shoulder; all text on the form and tablet is
unreadable. Natural, documentary feel.
```

### 9. หลังส่งมอบเว็บต้องดูแลอะไรบ้าง → `cover-maintenance-v2.webp`
```
A Thai IT freelancer in her 30s with short hair and a denim shirt works at a shared coworking
space at night, two monitors showing an out-of-focus server dashboard and update list; one
monitor has a sticky note on its bezel. Cool monitor light on her face mixed with warm overhead
pendant light, other coworkers blurred far behind. Shot from a low side angle, 35mm, candid,
honest desk clutter (external drive, tangled cables, energy drink can).
```

import Link from "next/link"
import { LegalPageShell } from "@/components/home/legal-page-shell"

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Privacy Policy"
      title="นโยบายความเป็นส่วนตัว"
      summary="เอกสารนี้อธิบายว่า WAENWEB เก็บ ใช้ เปิดเผย และคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้งานอย่างไร รวมถึงสิทธิของคุณภายใต้กฎหมายที่เกี่ยวข้อง เช่น PDPA"
      lastUpdated="13 มีนาคม 2026"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. ข้อมูลที่เราเก็บรวบรวม</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เมื่อคุณใช้งานเว็บไซต์หรือส่งข้อมูลผ่านฟอร์มติดต่อ เราอาจเก็บข้อมูล เช่น ชื่อ อีเมล ชื่อบริษัท รายละเอียดโปรเจกต์ ข้อมูลการใช้งานเว็บไซต์ ข้อมูลอุปกรณ์ และข้อมูลทางเทคนิคที่เกี่ยวข้องกับความปลอดภัยและประสิทธิภาพของระบบ
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. วัตถุประสงค์ในการใช้ข้อมูล</h2>
        <ul className="space-y-3 pl-5 text-slate-600 dark:text-slate-400">
          <li className="list-disc">เพื่อตอบกลับคำถาม ประเมินราคา และดำเนินการตามคำขอของคุณ</li>
          <li className="list-disc">เพื่อปรับปรุงคุณภาพเว็บไซต์ ประสิทธิภาพ และประสบการณ์ใช้งาน</li>
          <li className="list-disc">เพื่อรักษาความปลอดภัยของระบบ ป้องกันการใช้งานที่ผิดปกติ และจัดเก็บบันทึกที่จำเป็น</li>
          <li className="list-disc">เพื่อปฏิบัติตามกฎหมาย คำสั่งทางราชการ หรือข้อกำหนดด้านการกำกับดูแลที่เกี่ยวข้อง</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. คุกกี้และเทคโนโลยีที่เกี่ยวข้อง</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เว็บไซต์นี้ใช้คุกกี้ที่จำเป็นต่อการทำงานของเว็บไซต์ และอาจใช้คุกกี้หรือเครื่องมือวิเคราะห์เพื่อวัดประสิทธิภาพและพัฒนาบริการ คุณสามารถเลือกยอมรับเฉพาะคุกกี้ที่จำเป็น หรือยอมรับคุกกี้ทั้งหมดผ่านแบนเนอร์คุกกี้ที่แสดงบนเว็บไซต์ได้
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4. การเปิดเผยข้อมูล</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เราจะไม่ขายข้อมูลส่วนบุคคลของคุณ และจะเปิดเผยข้อมูลเท่าที่จำเป็นให้แก่ผู้ให้บริการระบบ โฮสติ้ง เครื่องมือวิเคราะห์ หรือผู้ประมวลผลข้อมูลที่เกี่ยวข้องกับการให้บริการเท่านั้น รวมถึงกรณีที่กฎหมายกำหนดให้ต้องเปิดเผย
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">5. ระยะเวลาการเก็บรักษา</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เราจะเก็บข้อมูลเท่าที่จำเป็นตามวัตถุประสงค์ที่แจ้งไว้ หรือตามระยะเวลาที่กฎหมายกำหนด เมื่อพ้นความจำเป็นแล้ว เราจะลบ ทำลาย หรือทำให้ข้อมูลไม่สามารถระบุตัวบุคคลได้ตามแนวทางที่เหมาะสม
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">6. สิทธิของเจ้าของข้อมูล</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          คุณมีสิทธิขอเข้าถึง ขอรับสำเนา ขอแก้ไข ขอให้ลบ ขอให้ระงับการใช้ คัดค้านการประมวลผล หรือถอนความยินยอมตามที่กฎหมายกำหนด โดยสามารถติดต่อเราได้ผ่านช่องทางที่ระบุไว้ในหน้านี้
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">7. การรักษาความมั่นคงปลอดภัยของข้อมูล</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เราใช้มาตรการด้านเทคนิคและการบริหารจัดการที่เหมาะสมเพื่อป้องกันการเข้าถึง การเปิดเผย การแก้ไข หรือการทำลายข้อมูลโดยไม่ได้รับอนุญาต อย่างไรก็ตาม ไม่มีระบบใดที่ปลอดภัยได้อย่างสมบูรณ์ 100%
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">8. การปรับปรุงนโยบาย</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราวเพื่อให้สอดคล้องกับการเปลี่ยนแปลงของบริการ กฎหมาย หรือแนวปฏิบัติที่เกี่ยวข้อง โดยจะเผยแพร่ฉบับล่าสุดบนหน้านี้พร้อมวันที่อัปเดตล่าสุด
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">9. ช่องทางติดต่อ</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          หากคุณมีคำถามเกี่ยวกับนโยบายนี้ หรือต้องการใช้สิทธิที่เกี่ยวข้องกับข้อมูลส่วนบุคคล สามารถติดต่อเราได้ทางอีเมลหรือ Line ตามข้อมูลที่ระบุด้านล่าง หรือกลับไปที่
          {" "}
          <Link href="/#contact" className="font-semibold text-lime-600 transition-colors hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300">
            หน้าติดต่อเรา
          </Link>
        </p>
      </section>
    </LegalPageShell>
  )
}

import Link from "next/link"
import { LegalPageShell } from "@/components/home/legal-page-shell"

export default function TermsOfUsePage() {
  return (
    <LegalPageShell
      eyebrow="Terms of Use"
      title="เงื่อนไขการใช้งาน"
      summary="เงื่อนไขการใช้งานนี้กำหนดหลักเกณฑ์ในการเข้าถึงและใช้บริการของ WAENWEB รวมถึงสิทธิ หน้าที่ และข้อจำกัดความรับผิดชอบที่เกี่ยวข้อง"
      lastUpdated="13 มีนาคม 2026"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. การยอมรับเงื่อนไข</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เมื่อคุณเข้าถึงหรือใช้งานเว็บไซต์นี้ ถือว่าคุณรับทราบและยอมรับเงื่อนไขการใช้งานนี้ หากคุณไม่เห็นด้วยกับเงื่อนไขใด โปรดหยุดใช้งานเว็บไซต์ทันที
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. ขอบเขตของบริการ</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เว็บไซต์นี้ใช้เพื่อแสดงข้อมูลบริการ ผลงาน ราคาโดยประมาณ ช่องทางติดต่อ และข้อมูลที่เกี่ยวข้องกับการพัฒนาเว็บไซต์ ทั้งนี้รายละเอียดงาน ราคา และขอบเขตการให้บริการจริงอาจขึ้นอยู่กับข้อตกลงหรือใบเสนอราคาที่ทำเป็นลายลักษณ์อักษรภายหลัง
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. การใช้งานที่เหมาะสม</h2>
        <ul className="space-y-3 pl-5 text-slate-600 dark:text-slate-400">
          <li className="list-disc">ห้ามใช้เว็บไซต์ในทางที่ผิดกฎหมาย หรือกระทบต่อความมั่นคงปลอดภัยของระบบ</li>
          <li className="list-disc">ห้ามส่งข้อมูลอันเป็นเท็จ สแปม มัลแวร์ หรือเนื้อหาที่ละเมิดสิทธิของผู้อื่น</li>
          <li className="list-disc">ห้ามพยายามเข้าถึงระบบ ส่วนจัดการหลังบ้าน หรือข้อมูลที่ไม่ได้เปิดให้ใช้งานสาธารณะ</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4. ทรัพย์สินทางปัญญา</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เนื้อหา องค์ประกอบการออกแบบ ข้อความ ภาพ เครื่องหมายการค้า และซอฟต์แวร์บนเว็บไซต์นี้ เป็นทรัพย์สินของ WAENWEB หรือผู้ให้สิทธิที่เกี่ยวข้อง ห้ามนำไปใช้ ทำซ้ำ ดัดแปลง หรือเผยแพร่โดยไม่ได้รับอนุญาตล่วงหน้าเป็นลายลักษณ์อักษร
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">5. ข้อมูล ราคา และข้อเสนอ</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          ข้อมูลบนเว็บไซต์จัดทำขึ้นเพื่อวัตถุประสงค์ในการให้ข้อมูลเบื้องต้น ราคา แพ็คเกจ ระยะเวลา และรายละเอียดต่าง ๆ อาจมีการเปลี่ยนแปลงได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า และจะมีผลผูกพันเมื่อได้รับการยืนยันอย่างเป็นทางการจากเราเท่านั้น
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">6. ข้อจำกัดความรับผิด</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เราพยายามดูแลให้ข้อมูลบนเว็บไซต์ถูกต้องและเป็นปัจจุบัน แต่ไม่รับประกันว่าข้อมูลทั้งหมดจะครบถ้วน ถูกต้อง หรือพร้อมใช้งานตลอดเวลา และไม่รับผิดชอบต่อความเสียหายทางอ้อม ความเสียหายพิเศษ หรือความเสียหายต่อเนื่องที่เกิดจากการใช้งานเว็บไซต์เท่าที่กฎหมายอนุญาต
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">7. ลิงก์ไปยังบริการของบุคคลภายนอก</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เว็บไซต์อาจมีลิงก์ไปยังบริการหรือเว็บไซต์ของบุคคลภายนอกเพื่อความสะดวก เราไม่ควบคุมเนื้อหา นโยบาย หรือแนวปฏิบัติของเว็บไซต์ดังกล่าว และไม่รับผิดชอบต่อความเสียหายที่เกิดจากการเข้าถึงบริการภายนอกเหล่านั้น
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">8. การแก้ไขเงื่อนไข</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เราขอสงวนสิทธิในการแก้ไขหรือปรับปรุงเงื่อนไขการใช้งานนี้ได้ทุกเมื่อ โดยจะเผยแพร่ฉบับล่าสุดบนหน้านี้ การใช้งานเว็บไซต์อย่างต่อเนื่องหลังมีการเปลี่ยนแปลงถือว่าคุณยอมรับเงื่อนไขฉบับที่แก้ไขแล้ว
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">9. กฎหมายที่ใช้บังคับและการติดต่อ</h2>
        <p className="leading-8 text-slate-600 dark:text-slate-400">
          เงื่อนไขนี้อยู่ภายใต้กฎหมายไทย หากมีข้อสงสัยเกี่ยวกับการใช้งานเว็บไซต์นี้ หรือข้อตกลงที่เกี่ยวข้อง สามารถดูรายละเอียดการเก็บข้อมูลเพิ่มเติมได้ที่
          {" "}
          <Link href="/privacy-policy" className="font-semibold text-lime-600 transition-colors hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300">
            นโยบายความเป็นส่วนตัว
          </Link>
          {" "}
          หรือกลับไปที่
          {" "}
          <Link href="/#contact" className="font-semibold text-lime-600 transition-colors hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300">
            หน้าติดต่อเรา
          </Link>
        </p>
      </section>
    </LegalPageShell>
  )
}

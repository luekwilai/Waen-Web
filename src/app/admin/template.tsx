export default function AdminTemplate({ children }: { children: React.ReactNode }) {
  // ไม่เรียกใช้ PageTransition ในหน้า Admin เพื่อปิด Animation ตอนสลับเมนู
  return <>{children}</>
}

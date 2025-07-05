import TerminalPane from "@/components/terminal"
import "@/style/layout/contact.css"

export default function Contact() {
  return <section className='contact-section'>
    <h1>Type "contact"</h1>
    <TerminalPane className='w-[calc(100%-40px)] bg-transparent mb-12 font-[JetBrains_MonoNerd] font-light' />
  </section>
}

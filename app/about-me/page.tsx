// app/about-me/page.tsx
import Header from "@/components/header"
import AboutMe from "@/components/about-me"
import Footer from "@/components/footer"

export default function AboutMePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20"> {/* Padding to prevent content from being hidden under the fixed header */}
        <AboutMe />
      </main>
      <Footer />
    </div>
  )
}

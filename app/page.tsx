import { Topbar } from "@/components/topbar"
import { Footer } from "@/components/footer"
import { LandingPage } from "@/components/landing-page"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <LandingPage />
      <Footer />
    </div>
  )
}

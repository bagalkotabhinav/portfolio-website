// components/header.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when changing paths
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { name: "Home", href: "/", isHash: false },
    { name: "About", href: "#about", isHash: true },
    { name: "Skills", href: "#skills", isHash: true },
    { name: "Projects", href: "#projects", isHash: true },
    { name: "Resume", href: "#resume", isHash: true },
    { name: "Contact", href: "#contact", isHash: true },
    { name: "About me - A bit more!", href: "/about-me", isHash: false },
    { name: "Play", href: "/play", isHash: false },
  ]

  const isActive = (href : string) => {
    if (href === "/" && pathname === "/") return true
    if (href === "/about-me" && pathname === "/about-me") return true
    if (pathname === "/" && href.startsWith("#")) return true
    return false
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-lg py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">
              Portfolio
              <span className="block h-0.5 max-w-0 bg-emerald-600 transition-all duration-500 group-hover:max-w-full"></span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <li key={link.name}>
                    <Link
                      href={link.isHash && pathname === '/about-me' ? `/${link.href}` : link.href}
                      className={`relative px-2 py-1 text-gray-700 hover:text-emerald-600 transition-colors duration-300 ${
                        active ? "text-emerald-600 font-medium" : ""
                      }`}
                    >
                      {link.name}
                      {active && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded"></span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className={`md:hidden transition-colors ${isMenuOpen ? "bg-gray-100" : ""}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="text-emerald-600" /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-3">
                {navLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.isHash && pathname === '/about-me' ? `/${link.href}` : link.href}
                        className={`block py-2 px-3 rounded-md transition-all ${
                          active 
                            ? "bg-emerald-50 text-emerald-600 font-medium" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
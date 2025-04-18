"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <button
            onClick={scrollToTop}
            className="p-3 bg-emerald-600 text-white rounded-full mb-8 hover:bg-emerald-700 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>

          <div className="flex space-x-6 mb-8">
            <Link href="https://github.com/bagalkotabhinav" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
            </Link>
            <Link href="https://www.linkedin.com/in/abhinav-bagalkot/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
            </Link>
            <Link href="https://x.com/BagalkotAbhinav" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
            </Link>
            <Link href="https://leetcode.com/abhinavbagalkot/" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" className="h-6 w-6" />
            </Link>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-2">&copy; {new Date().getFullYear()} Abhinav Bagalkot. All rights reserved.</p>
            <p className="text-gray-500 text-sm">Designed and built with ❤️</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

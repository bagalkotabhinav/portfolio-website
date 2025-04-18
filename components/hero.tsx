"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = "I'm a Software Engineer working in DevOps and Cloud Engineering."

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-emerald-50 to-gray-100">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-300 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-300 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 py-32 md:py-0 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative w-40 h-40 overflow-hidden rounded-full border-4 border-emerald-600 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img 
                src="/image2.jpg" 
                alt="Abhinav Bagalkot" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Hello, I'm <span>Abhinav Bagalkot</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-700 mb-8 h-8 font-medium">
            {typedText}
            <span className="animate-pulse text-emerald-600">|</span>
          </h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Welcome to my portfolio! I specialize in creating efficient and scalable digital solutions, focusing on AWS and DevOps to ensure smooth and reliable performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 transform hover:translate-y-[-2px] transition-all shadow-lg"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 transform hover:translate-y-[-2px] transition-all shadow-md"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </Button>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/bagalkotabhinav" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <Github className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/abhinav-bagalkot/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <Linkedin className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
            </a>
            <a href="https://x.com/BagalkotAbhinav" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <Twitter className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
            </a>
            <a href="https://leetcode.com/abhinavbagalkot" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" 
                alt="LeetCode" 
                width={24} 
                height={24} 
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
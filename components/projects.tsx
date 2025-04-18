"use client"

import { useRef } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useInView } from "framer-motion"

export default function Projects() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const projects = [
    {
      title: "Cyclomatic Complexity Analysis",
      description:
        "A tool for analyzing cyclomatic complexity in software code using LLVM and Clang. It provides metrics on the complexity of code, helping developers understand and improve maintainability.",
      image: "/cyclomaticcomplexity.png",
      tags: ["LLVM", "Clang"],
      liveLink: "https://cyclomatic-complexity-analyzer.onrender.com",
      githubLink: "https://github.com/bagalkotabhinav/Cyclomatic-Complexity",
    },
    {
      title: "Faculty Competence Management System",
      description:
        "A web-based application for managing faculty publications, patents and papers. Built with React, Express, Node.js, and MySQL for efficient management and reporting.",
      image: "/facultycompetence.png",
      tags: ["React", "Express", "Node.js", "MySQL"],
      liveLink: "https://faculty-competence-management.netlify.app/",
      githubLink: "https://github.com/bagalkotabhinav/faculty-competence",
    },
    {
      title: "Food Calorie Estimator",
      description:
        "A web app that estimates the calorie content of food items using a ResNet50 model. Built with Python Flask for the backend and HTML for the front-end.",
      image: "/foodcalorie.png",
      tags: ["ResNet50", "Python Flask", "HTML"],
      githubLink: "https://github.com/bagalkotabhinav/Food-Calorie-Estimator",
    }
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div 
            className="mb-16 text-center"
            style={{
              transform: isInView ? "none" : "translateY(20px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
            }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-full mb-4">
              My Work
            </span>
            <h2 className="text-4xl font-bold mb-3">Featured Projects</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Here are some projects I've worked on that showcase my skills and interests in software development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="overflow-hidden group border-none shadow-lg hover:shadow-xl transition-all duration-500 rounded-xl"
                style={{
                  transform: isInView ? "none" : "translateY(40px)",
                  opacity: isInView ? 1 : 0,
                  transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.2 + index * 0.1}s`
                }}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={project.image || "/placeholder.svg"} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} className="bg-white/90 backdrop-blur-sm text-emerald-800 shadow-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <CardContent className="p-6 bg-white">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                </CardContent>
                
                <CardFooter className="px-6 pb-6 pt-0 bg-white flex justify-between">
                  <Button asChild variant="outline" size="sm" className="rounded-full border-gray-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                    <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                  
                  {project.liveLink && (
                    <Button asChild size="sm" className="rounded-full bg-emerald-600 hover:bg-emerald-700 transition-all">
                      <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
          </div>
        </div>
      </div>
    </div>
  )
}
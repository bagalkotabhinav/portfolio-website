"use client"

import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Building, ChevronRight, Code, Star, BarChart } from "lucide-react"
import { useInView } from "framer-motion"
import Image from "next/image"

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const experiences = [
    {
      title: "DevOps Intern",
      company: "Vantive",
      period: "January 2025 - Present",
      description:
        "Working on DevOps practices and cloud solutions using AWS to enhance operational efficiency and scalability.",
    }
  ]

  const skills = [
    { name: "Cloud Computing", level: 90, icon: <BarChart className="h-5 w-5 text-blue-500" /> },
    { name: "DevOps", level: 85, icon: <Code className="h-5 w-5 text-emerald-500" /> },
    { name: "React", level: 80, icon: <Star className="h-5 w-5 text-yellow-500" /> },
  ]

  return (
    <div 
      className="py-24 bg-gradient-to-b from-white to-gray-50" 
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto"
          style={{
            transform: isInView ? "none" : "translateY(20px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-full mb-3">
              About Me
            </span>
            <h2 className="text-4xl font-bold mb-3">Who I Am</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Get to know more about me, my background, and what drives me.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side: Image */}
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl"
              style={{
                transform: isInView ? "none" : "translateX(-20px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"
              }}
            >
              <div className="absolute inset-0 bg-emerald-600/20"></div>
              <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-emerald-500 rounded-full opacity-20"></div>
              <div className="absolute -top-2 -left-2 w-24 h-24 bg-emerald-500 rounded-full opacity-20"></div>
              <Image
                src="/image.jpg" 
                alt="Abhinav Bagalkot"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Right side: Text */}
            <div
              style={{
                transform: isInView ? "none" : "translateX(20px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s"
              }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Computer Engineer & DevOps Enthusiast
              </h3>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                I am a Computer Engineer from RV College of Engineering, Bangalore, currently working at Vantive, a leading healthcare company specializing in kidney care. In my role, I focus on DevOps practices and cloud solutions using AWS to enhance operational efficiency and scalability.
              </p>
              
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                My journey in technology began during college, where I worked on various hands-on projects that ignited my passion for coding and computer engineering. These experiences laid the foundation for my career, and I've been committed to continuous learning and growth ever since.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-md">
                    <div className="mr-3">
                      {skill.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{skill.name}</p>
                      <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16"
            style={{
              transform: isInView ? "none" : "translateY(20px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s"
            }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <span className="inline-block w-2 h-6 bg-emerald-500 mr-3"></span>
              Professional Experience
            </h3>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="h-1 bg-emerald-500"></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800">{exp.title}</h4>
                        <div className="flex items-center text-emerald-600 mt-1">
                          <Building className="h-4 w-4 mr-2" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full mt-3 md:mt-0 w-fit">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <div className="mt-4 pl-4 border-l-2 border-emerald-200">
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["AWS", "Docker", "CI/CD", "Kubernetes"].map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-10">
            <a href="/about-me" className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium group">
              Read more about me
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
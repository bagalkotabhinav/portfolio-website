"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Briefcase, GraduationCap, Award, FileText } from "lucide-react"
import { useInView } from "framer-motion"

export default function Resume() {
  const [activeTab, setActiveTab] = useState("experience")
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf" // path inside public folder
    link.download = "Abhinav_Bagalkot_Resume.pdf" // name to save as
    link.click()
  }
  
  const experiences = [
    {
      title: "DevOps Intern",
      company: "Vantive",
      period: "January 2025 - Present",
      description:
        "Working on DevOps practices and cloud solutions using AWS to enhance operational efficiency and scalability.",
      skills: ["AWS", "Docker", "CI/CD", "Terraform", "Kubernetes"]
    }
  ]

  const education = [
    {
      degree: "B.E. in Information Science and Engineering",
      institution: "RV College of Engineering",
      period: "2021 - 2025",
      cgpa: "9.03 / 10",
      achievements: [
        "Student Placement Coordinator for Batch of 2025",
      ]
    }
  ]
  
  const certifications = [
    {
      name: "Data Mining",
      issuer: "NPTEL",
      date: "2024",
      description: "Certification for data mining techniques and applications.",
      badge: "/badges/data-mining.svg"
    },
    {
      name: "Data Science for Engineers",
      issuer: "NPTEL",
      date: "2023",
      description: "Certification for data science methodologies and tools using R language.",
      badge: "/badges/data-science.svg"
    },
    {
      name: "Developing a Multithreaded Kernel From Scratch!",
      issuer: "Udemy",
      date: "2023",
      description: "Certification for developing a multithreaded kernel.",
      badge: "/badges/kernel.svg"
    },
  ]

  return (
    <div 
      className="py-24 bg-gradient-to-b from-gray-50 to-white" 
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto"
          style={{
            transform: isInView ? "none" : "translateY(20px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-full mb-3">
                CV / Resume
              </span>
              <h2 className="text-4xl font-bold mb-2">Professional Journey</h2>
              <div className="w-20 h-1 bg-emerald-500 mb-4"></div>
              <p className="text-gray-600 max-w-md">
                A snapshot of my professional experience, education, and skills.
              </p>
            </div>
            
            <Button 
              onClick={handleDownload} 
              className="mt-6 md:mt-0 bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all group rounded-lg"
            >
              <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Download Full CV
            </Button>
          </div>

          <Tabs 
            defaultValue="experience" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mt-8"
          >
            <TabsList className="grid w-full grid-cols-3 mb-12 rounded-full p-1 bg-gray-100">
              <TabsTrigger 
                value="experience" 
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-full transition-all duration-300"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Experience
              </TabsTrigger>
              <TabsTrigger 
                value="education" 
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-full transition-all duration-300"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Education
              </TabsTrigger>
              <TabsTrigger 
                value="certifications" 
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-full transition-all duration-300"
              >
                <Award className="mr-2 h-4 w-4" />
                Certifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experience" className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
                  <div className="h-1 bg-emerald-500"></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800">{exp.title}</h4>
                        <p className="text-emerald-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full mt-2 md:mt-0 inline-block">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{exp.description}</p>
                    {exp.skills && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.skills.map((skill, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
                  <div className="h-1 bg-blue-500"></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800">{edu.degree}</h4>
                        <p className="text-blue-600 font-medium">{edu.institution}</p>
                      </div>
                      <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full mt-2 md:mt-0 inline-block">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-gray-800 font-medium mb-3">CGPA: {edu.cgpa}</p>
                    {edu.achievements && (
                      <div className="mt-4">
                        <p className="font-medium text-gray-700 mb-2">Responsibilities:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {edu.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="certifications" className="space-y-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
                  <div className="h-1 bg-purple-500"></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-800">{cert.name}</h4>
                            <p className="text-purple-600 font-medium">{cert.issuer}</p>
                          </div>
                          <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full mt-2 md:mt-0 inline-block">
                            {cert.date}
                          </span>
                        </div>
                        <p className="text-gray-700">{cert.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import emailjs from "emailjs-com"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Replace these values with your own
    const serviceID = "service_4y6iwld"   // Found in EmailJS dashboard
    const templateID = "template_5qyc53v" // Found in EmailJS dashboard
    const userID = "a3oGpOKuODCoxwHWU"    // Found in EmailJS dashboard

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log("Message sent successfully:", response)
        setIsSubmitted(true)
        setIsSubmitting(false)
        setFormData({
          name: "",
          email: "",
          message: "",
        })
        setTimeout(() => setIsSubmitted(false), 5000)
      })
      .catch((error) => {
        console.log("Error sending message:", error)
        setError("Failed to send message. Please try again later.")
        setIsSubmitting(false)
      })
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "bagalkotabhinav@gmail.com",
      link: "mailto:bagalkotabhinav@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "+91 7990228189",
      link: "tel:+917990228189",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Bengaluru, Karnataka, India",
      link: "https://www.google.com/maps/dir//16,+Whitefield+Main+Rd,+Thigalarapalya,+Hoodi,+Bengaluru,+Karnataka+560048/@12.9888427,77.6466246,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae1136515eed15:0xad4d4995657b3d7d!2m2!1d77.7290265!2d12.9888557?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">Get In Touch</h2>
        <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have a question or want to work together? Feel free to reach out to me using any of the methods below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-emerald-500 group">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-4 bg-emerald-100 rounded-full text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                <a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  {info.value}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 bg-emerald-600 text-white">
              <h3 className="text-2xl font-bold mb-6">Let's Start a Conversation</h3>
              <p className="mb-6">
                I'm always open to discussing new projects, opportunities, or just having a chat about technology.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  <span>bagalkotabhinav@gmail.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>+91 7990228189</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>Bengaluru, Karnataka, India</span>
                </li>
              </ul>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Me a Message</h3>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <CheckCircle className="h-12 w-12 text-emerald-500 mb-4" />
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">Message Sent!</h4>
                  <p className="text-gray-600">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Abhinav"
                        className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="abhi@example.com"
                        className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message here..."
                        rows={4}
                        className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>
                  {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Layout, Smartphone, Server, GitBranch, Terminal } from "lucide-react"
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaFigma, FaHtml5, FaCss3Alt, FaJsSquare, FaCuttlefish } from "react-icons/fa";

export default function Skills() {
  const skills = [
    { 
      name: "AWS", 
      icon: <FaAws className="h-8 w-8 text-yellow-600" />,
      level: 80, // percentage of skill level
      color: "yellow"
    },
    { 
      name: "HTML & CSS", 
      icon: <FaHtml5 className="h-8 w-8 text-orange-600" />,
      level: 90,
      color: "orange"
    },
    { 
      name: "JavaScript", 
      icon: <FaJsSquare className="h-8 w-8 text-yellow-600" />,
      level: 85,
      color: "yellow"
    },
    { 
      name: "React", 
      icon: <FaReact className="h-8 w-8 text-blue-600" />,
      level: 75,
      color: "blue"
    },
    { 
      name: "Node.js", 
      icon: <FaNodeJs className="h-8 w-8 text-green-600" />,
      level: 70,
      color: "green"
    },
    { 
      name: "Express", 
      icon: <Server className="h-8 w-8 text-gray-600" />,
      level: 70,
      color: "gray"
    },
    { 
      name: "Flask", 
      icon: <Server className="h-8 w-8 text-gray-600" />,
      level: 65,
      color: "gray"
    },
    { 
      name: "Python", 
      icon: <FaPython className="h-8 w-8 text-blue-500" />,
      level: 80,
      color: "blue"
    },
    { 
      name: "C/C++", 
      icon: <FaCuttlefish className="h-8 w-8 text-gray-600" />,
      level: 75,
      color: "gray"
    },
    { 
      name: "MySQL", 
      icon: <Database className="h-8 w-8 text-blue-600" />,
      level: 70,
      color: "blue"
    },
    { 
      name: "Git & GitHub", 
      icon: <FaGitAlt className="h-8 w-8 text-orange-500" />,
      level: 85,
      color: "orange"
    },
    { 
      name: "Docker", 
      icon: <FaDocker className="h-8 w-8 text-blue-600" />,
      level: 70,
      color: "blue"
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">My Skills</h2>
        <div className="w-20 h-1 bg-emerald-500 mx-auto mb-4"></div>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Here are the technologies and tools I work with to build efficient and scalable solutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skills.map((skill, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-300 group border-t-4 border-t-emerald-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 p-3 rounded-full bg-gray-100 group-hover:bg-emerald-100 transition-colors">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full bg-emerald-600"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-6 text-center">Development Workflow</h3>
        <div className="flex flex-col md:flex-row justify-between items-center text-center mb-12">
          <div className="flex flex-col items-center mb-6 md:mb-0 p-4 transform hover:scale-105 transition-transform duration-300">
            <div className="p-4 bg-blue-100 rounded-full text-blue-600 mb-4">
              <Code className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-medium mb-2">Planning & Design</h4>
            <p className="text-gray-600 text-sm">Requirements analysis and system architecture</p>
          </div>
          <div className="h-0 w-12 border-t-2 border-gray-300 md:h-0.5 md:w-12 md:border-t-0 md:border-l-2 my-4 md:my-0"></div>
          <div className="flex flex-col items-center mb-6 md:mb-0 p-4 transform hover:scale-105 transition-transform duration-300">
            <div className="p-4 bg-green-100 rounded-full text-green-600 mb-4">
              <GitBranch className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-medium mb-2">Development</h4>
            <p className="text-gray-600 text-sm">Coding with best practices and version control</p>
          </div>
          <div className="h-0 w-12 border-t-2 border-gray-300 md:h-0.5 md:w-12 md:border-t-0 md:border-l-2 my-4 md:my-0"></div>
          <div className="flex flex-col items-center p-4 transform hover:scale-105 transition-transform duration-300">
            <div className="p-4 bg-orange-100 rounded-full text-orange-600 mb-4">
              <Server className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-medium mb-2">Deployment</h4>
            <p className="text-gray-600 text-sm">Testing, CI/CD and cloud deployment</p>
          </div>
        </div>
      </div>
    </div>
  )
}
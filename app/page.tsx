"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ExternalLink, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = [heroRef, aboutRef, projectsRef, experienceRef, contactRef]

    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current)
      }
    })

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current)
        }
      })
    }
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="text-xl font-bold">
            <span className="text-primary">David</span>Zhong
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Button
              variant="link"
              className={activeSection === "hero" ? "text-primary" : ""}
              onClick={() => scrollToSection(heroRef)}
            >
              Home
            </Button>
            <Button
              variant="link"
              className={activeSection === "about" ? "text-primary" : ""}
              onClick={() => scrollToSection(aboutRef)}
            >
              About
            </Button>
            <Button
              variant="link"
              className={activeSection === "projects" ? "text-primary" : ""}
              onClick={() => scrollToSection(projectsRef)}
            >
              Projects
            </Button>
            <Button
              variant="link"
              className={activeSection === "experience" ? "text-primary" : ""}
              onClick={() => scrollToSection(experienceRef)}
            >
              Experience
            </Button>
            <Button
              variant="link"
              className={activeSection === "contact" ? "text-primary" : ""}
              onClick={() => scrollToSection(contactRef)}
            >
              Contact
            </Button>
          </nav>
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="min-h-screen">
        <section id="hero" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div className="container text-center z-10" style={{ opacity, scale }}>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hi, I'm <span className="text-primary">David Zhong</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I'm a developer building responsive, user-friendly web apps with clean design and practical functionality.
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <Button variant="ghost" size="icon" onClick={() => scrollToSection(aboutRef)}>
              <ArrowDown className="h-6 w-6" />
            </Button>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background z-0"></div>
        </section>

        <section id="about" ref={aboutRef} className="py-20 md:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex justify-center"
              >
                <Avatar className="h-64 w-64 border-4 border-primary rounded-full shadow-xl">
                  <AvatarImage src="/profile.webp" alt="David Zhong" className="object-cover" />
                  <AvatarFallback>DZ</AvatarFallback>
                </Avatar>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
                <p className="text-muted-foreground mb-6">
                  I'm a dedicated developer who loves building efficient and intuitive applications. With experience in
                  full-stack development and automation, I enjoy tackling complex challenges and streamlining processes.
                </p>
                <p className="text-muted-foreground mb-6">
                  Outside of coding, I’m passionate about chess, gaming, and watching NHL and NFL games, along with
                  analyzing sports betting. These interests enhance my analytical skills and keep me engaged in strategy
                  and decision-making.
                </p>

                <div className="flex gap-4">
                  <Link href="https://github.com/david1zhong" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/david-zhong-1b342a274/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="mailto:todavid198@gmail.com">
                    <Button variant="outline" size="icon">
                      <Mail className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/*
        <section id="projects" ref={projectsRef} className="py-20 md:py-32 bg-muted/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                Here are some of my recent projects that showcase my skills and interests.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((project) => (
                <motion.div
                  key={project}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: project * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Card className="h-full flex flex-col overflow-hidden group">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=300&width=600&text=Project+${project}`}
                        alt={`Project ${project}`}
                        width={600}
                        height={300}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>Project {project}</CardTitle>
                      <CardDescription>
                        A brief description of this amazing project and what technologies were used.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">TypeScript</Badge>
                        <Badge variant="secondary">Tailwind</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                      <Button size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        */}


        <section id="projects" ref={projectsRef} className="py-20 md:py-32 bg-muted/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                Here is a recent project I am proud of that blends my skills and interests.
              </p>
            </motion.div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-md"
              >
                <Card className="h-full flex flex-col overflow-hidden group">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src="/bet-nhl-preview.webp?height=300&width=600&text=Featured+Project"
                      alt="Featured Project"
                      width={600}
                      height={300}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Bet NHL</CardTitle>
                    <CardDescription>
                      Bet-NHL is a real-time NHL betting dashboard that fetches the latest game odds before puckdrop, live game statuses, 
                      and final betting results,
                      presenting them in a responsive and visually clean layout. 
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">HTML/CSS</Badge>
                      <Badge variant="secondary">JavaScript</Badge>
                      <Badge variant="secondary">Tailwind</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Designed to support simulated betting and strategy testing, 
                      it offers fans, like myself, a centralized platform to make informed predictions.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <a href="https://github.com/david1zhong/bet_nhl_demo_site" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                    </a>
                    
                    <a href="https://davidjzhong.vercel.app/bet-nhl" target="_blank" rel="noopener noreferrer">
                      <Button size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="experience" ref={experienceRef} className="py-20 md:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Skills</h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-bold mb-6">Work Experience</h3>

                <div className="space-y-8">
                  {[
                    {
                      title: "Full Stack Developer, Co-op",
                      company: "DigitalFire.ca",
                      period: "2023",
                      description:
                        "Automated a 200+ item inventory database using Python and Google API, built a frontend with HTML, CSS, PHP, and JavaScript, managed IT equipment for small businesses, and handled front desk communications and package reception.",
                    },
                    {
                      title: "Math and French Tutor",
                      company: "David's Tutoring",
                      period: "2021",
                      description:
                        "Designed & taught student-tailored lessons for Gr. 4 curriculum & contest-level math & French.",
                    },
                  ].map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="relative pl-8 border-l-2 border-muted-foreground/20"
                    >
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                      <h4 className="text-xl font-bold">{job.title}</h4>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <span>{job.company}</span>
                        <span className="mx-2">•</span>
                        <span>{job.period}</span>
                      </div>
                      <p className="text-muted-foreground">{job.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-bold mb-6">Skills & Technologies</h3>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-4">Languages</h4>
                    <ul className="space-y-2">
                      {["Python", "HTML", "CSS", "PHP", "C"].map((skill, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          viewport={{ once: true, margin: "-100px" }}
                          className="flex items-center"
                        >
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4">Frameworks & Libraries</h4>
                    <ul className="space-y-2">
                      {["Flask", "Pandas", "BeautifulSoup", "Selenium", "Matplotlib"].map((skill, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          viewport={{ once: true, margin: "-100px" }}
                          className="flex items-center"
                        >
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4">Tools & Platforms</h4>
                    <ul className="space-y-2">
                      {["Github", "VS Code", "Linux", "Google Cloud", "Git"].map((skill, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          viewport={{ once: true, margin: "-100px" }}
                          className="flex items-center"
                        >
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4">Other Skills</h4>
                    <ul className="space-y-2">
                      {["Web Scraping", "Data Analysis", "3d Modelling", "Automation", "Front Desk"].map((skill, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          viewport={{ once: true, margin: "-100px" }}
                          className="flex items-center"
                        >
                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-bold mb-4">Education</h4>
                  <div className="pl-8 border-l-2 border-muted-foreground/20 relative">
                    <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                    <h5 className="text-lg font-bold">Bachelor of Computing in Computer Science (Co-op)</h5>
                    <div className="flex items-center text-muted-foreground">
                      <span>University of Guelph</span>
                      <span className="mx-2">•</span>
                      <span>2024 - 2029</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="contact" ref={contactRef} className="py-20 md:py-32 bg-muted/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact</h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <Link
                      href="mailto:todavid198@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      todavid198@gmail.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">LinkedIn</h3>
                    <Link
                      href="https://www.linkedin.com/in/david-zhong-1b342a274/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      linkedin.com/in/david-zhong-1b342a274/
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Github className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">GitHub</h3>
                    <Link
                      href="https://github.com/david1zhong"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      github.com/david1zhong
                    </Link>
                  </div>
                </div>

                <div className="pt-6 text-center">
                  <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Button>Open Resume</Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex gap-4">
            <Link href="https://github.com/david1zhong" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/david-zhong-1b342a274/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="mailto:todavid198@gmail.com">
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

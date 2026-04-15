

export const CV_KNOWLEDGE = {
  personalInfo: {
    name: "Ntando Badla",
    title: "Full Stack Software Developer",
    location: "Stellenbosch Kayamandi, South Africa",
    email: "ntandobadla1@gmail.com",
    phone: "+27 74 614 8629",
    linkedin: "linkedin.com/in/ntando-badla",
    github: "github.com/ntandobadla",
    website: "vote-phere.netlify.app"
  },

  professionalSummary: "Full Stack Software Developer with a degree in ICT Application Development and strong experience in building user-facing interfaces, connecting front-end to back-end APIs, and developing full-stack applications. Skilled in React, JavaScript, Python, and database-driven systems. Hands-on experience designing UI/UX flows, optimizing performance, integrating APIs, and maintaining scalable systems. Comfortable in Agile teams and familiar with DevOps practices including CI/CD, cloud concepts, and automation basics.",

  education: {
    primary: {
      institution: "Walter Sisulu University",
      degree: "Diploma in ICT Application Development",
      graduationStatus: "Graduated with distinction in Application Development",
      year: "December 2024",
      location: "East London",
      averageScore: "65%",
      achievements: [
        "Graduated with distinction in Application Development",
        "Developed a Residence Management System using Oracle Apex",
        "Collaborated in a team project to build a Car Selling Website",
        "Served as Deputy Chairperson of the House Committee"
      ]
    },
    secondary: {
      institution: "Vulamasango Secondary School",
      qualification: "Grade 12",
      year: "December 2020",
      location: "Bloemfontein",
      leadership: "Elected by peers for 3 consecutive years due to leadership, reliability, and commitment"
    },
    internship: {
      institution: "NetCampus",
      program: "IT Educational Internship",
      year: "May 2025",
      location: "Tygervalley, Cape Town",
      certifications: [
        "Data Management and Analytics Scenarios",
        "Azure Data Services for Modern Analytics",
        "Microsoft 365 Copilot Use Cases in IT, HR, Marketing, and Finance"
      ]
    }
  },

  technicalSkills: {
    programmingLanguages: ["Java", "PHP", "Laravel", "React", "HTML", "VB.NET", "CSS", "JavaScript", "Python"],
    databases: ["MySQL", "Oracle Apex", "MS SQL Server"],
    designTools: ["Figma"],
    frameworks: ["React", "Laravel", ".NET Framework"],
    systems: ["ERP Systems", "IMS (Integrated Management System)", "BAAN (ERP)", "SQL Server Reporting Services (SSRS)"],
    otherSkills: ["Database Design & Implementation", "System Analysis", "Process Automation", "DevOps", "CI/CD", "Cloud concepts"]
  },

  workExperience: [
    {
      company: "Personal Project",
      position: "Full Stack Developer",
      project: "VoteSphere–Online Voting Platform",
      duration: "August 2025 - September 2025",
      responsibilities: [
        "Designed and implemented a full-stack web application for secure online voting",
        "Led a cross-functional team in designing and developing a React + Tailwind CSS frontend",
        "Implemented authentication protocols for secure user sign-in and role management",
        "Maintained a MySQL database to manage elections, votes, and results",
        "Ensured optimal performance and accessibility through server deployment"
      ],
      technologies: ["Python", "JavaScript", "React", "Tailwind CSS", "MySQL"]
    },
    {
      company: "Akhile",
      position: "Asset Auditor",
      duration: "April 2025 - May 2025",
      location: "Stellenbosch",
      responsibilities: [
        "Conducted physical verification of organisational assets across multiple sites",
        "Identified and recorded movable assets including furniture, equipment, and vehicles",
        "Captured asset details such as descriptions, conditions, serial numbers, and barcodes",
        "Performed quality assurance checks on collected asset data",
        "Connected front-end with back-end to fetch, transform, and display asset data"
      ],
      technologies: ["Python", "JavaScript", "React", "Microsoft technology"]
    },
    {
      company: "Codecraft",
      position: "Software Developer Intern",
      duration: "April 2025",
      location: "Remote",
      responsibilities: [
        "Designed and developed a Contact Management System using Java (30% efficiency improvement)",
        "Implemented Interactive Guessing Game engaging over 100 users during testing",
        "Built Web Scraping Application using Java and JSoup (40% reduction in manual data entry)",
        "Developed Weather Converter Tool with 95% accuracy in unit conversions",
        "Reduced code errors by 25% through strong debugging and problem-solving"
      ],
      technologies: ["Java", "JSoup", "Python", "JavaScript", "React"]
    },
    {
      company: "Walter Sisulu University",
      position: "Tutor and Mentor",
      duration: "June 2024 - November 2024",
      location: "East London",
      responsibilities: [
        "Mentored students in ICT-related modules to improve academic performance",
        "Developed personalized study plans to simplify complex concepts",
        "Designed strategies to connect front-end with back-end systems",
        "Optimized performance of student-facing interfaces"
      ],
      technologies: ["Python", "JavaScript", "React"]
    }
  ],

  projects: [
    {
      name: "VoteSphere – Online Voting Platform",
      description: "Full-stack web application for secure online voting with authentication and role management",
      whyBuilt: "I built VoteSphere because I noticed that many student organisations and small communities still rely on manual, paper-based voting which is slow, error-prone, and easy to manipulate. I wanted to create a secure, accessible digital solution that makes the voting process transparent and trustworthy for everyone.",
      technologies: ["React", "Tailwind CSS", "Python", "JavaScript", "MySQL"],
      features: ["Secure authentication", "Role management", "Election management", "Vote tracking", "Results display"],
      link: "vote-phere.netlify.app"
    },
    {
      name: "Residence Management System",
      description: "University project built using Oracle Apex for managing student residences",
      whyBuilt: "I built this during my studies at Walter Sisulu University to solve the real problem of manual residence administration. Students and staff struggled with room allocation and record-keeping, so I designed a database-driven system to automate and simplify the entire process.",
      technologies: ["Oracle Apex"],
      features: ["Student management", "Room allocation", "Database integration"]
    },
    {
      name: "Car Selling Website",
      description: "Team project for online car sales platform",
      whyBuilt: "This was a collaborative university project where our team identified that many local car dealers lacked an online presence. We built this platform to give sellers a digital storefront and buyers an easy way to browse and search for vehicles.",
      technologies: ["Web technologies"],
      features: ["Vehicle listings", "Search functionality", "User management"]
    },
    {
      name: "Contact Management System",
      description: "Java-based system improving data organization and retrieval efficiency by 30%",
      whyBuilt: "I built this during my internship at Codecraft to address the inefficiency of managing contacts manually. The goal was to create a structured, searchable system that saves time and reduces human error — and it achieved a 30% improvement in efficiency.",
      technologies: ["Java"],
      features: ["Contact organization", "Data retrieval", "Efficient searching"]
    },
    {
      name: "Web Scraping Application",
      description: "Automated data collection tool reducing manual data entry time by 40%",
      whyBuilt: "I built this to eliminate the tedious and time-consuming task of manually collecting data from multiple websites. By automating the process with Java and JSoup, I reduced manual data entry time by 40%, freeing up time for more valuable work.",
      technologies: ["Java", "JSoup"],
      features: ["Multi-source scraping", "Data automation", "Efficient processing"]
    },
    {
      name: "Module-Mate",
      description: "A web-based academic chatbot that helps students quickly access essential module information through a conversational interface",
      whyBuilt: "I built Module-Mate because students constantly waste time searching across multiple platforms just to find basic module information. I wanted to create a single conversational interface where students can instantly get the answers they need, available 24/7.",
      technologies: ["React", "TypeScript", "NodeJS", "Tailwind CSS", "OpenAI API"],
      features: ["Conversational AI interface", "Module knowledge base", "Instant answers", "24/7 availability"],
      link: "module-mate.netlify.app"
    }
  ],

  currentlyBusyWith: {
    summary: "I am currently busy with my internship with CAPACITI for the Systems Support, Full Stack Development, and Automation Testing programme (Clickatell Academy, March 2026 intake).This is a 6–12 month programme and I am very excited about this opportunity to grow in the tech industry.",
    details: [
      "Shortlisted for CAPACITI – Clickatell Academy (March 2026 intake)",
      "Busy with  on-site training for Systems Support / Full Stack Development / Automation Testing programme",
      "The programme runs for 6–12 months",
      "Continuing to build and improve my portfolio projects",
      "Sharpening skills in Full stack development and automation testing"
    ]
  },


  services: {
    webDevelopment: {
      description: "Full-stack web development services with modern technologies",
      startingPrice: "R2,000",
      technologies: ["React", "Laravel", "Java", "Python", "MySQL", "JavaScript"],
      features: [
        "Responsive design",
        "Database integration",
        "API development",
        "Authentication systems",
        "Performance optimization",
        "DevOps deployment"
      ]
    },
    consulting: {
      description: "Technical consulting and mentoring services",
      expertise: ["Full-stack development", "Database design", "System architecture", "Performance optimization"]
    }
  },

  achievements: [
    "Graduated with distinction from Walter Sisulu University",
    "Improved data organization efficiency by 30% in Contact Management System",
    "Reduced manual data entry time by 40% with Web Scraping Application",
    "Achieved 95% accuracy in Weather Converter Tool",
    "Reduced code errors by 25% through effective debugging",
    "Served as Deputy Chairperson of House Committee",
    "Elected by peers for 3 consecutive years in high school leadership",
    "Completed Microsoft Azure and Office 365 certifications"
  ],

  leadership: [
    "Deputy Chairperson of House Committee at Walter Sisulu University",
    "Student leader for 3 consecutive years in high school",
    "Liaison between 200+ students and school staff",
    "Planned and coordinated 10+ school events annually",
    "Increased class participation by 15% through motivation and discipline"
  ],

  references: [
    {
      name: "Taryn Lee",
      organization: "NetCampus",
      position: "Facilitator",
      phone: "082 605 8809"
    },
    {
      name: "Mrs N Ngesimane",
      organization: "Walter Sisulu University",
      position: "Information Systems Lecturer",
      phone: "073 699 4624",
      email: "nngesimani@wsu.ac.za"
    },
    {
      name: "Ikanyeng",
      organization: "Akhile",
      position: "Manager",
      phone: "061 366 1465"
    }
  ]
};
export const formatCVForChatbot = (): string => {
  return `
PERSONAL INFORMATION:
- Name: ${CV_KNOWLEDGE.personalInfo.name}
- Title: ${CV_KNOWLEDGE.personalInfo.title}
- Location: ${CV_KNOWLEDGE.personalInfo.location}
- Contact: ${CV_KNOWLEDGE.personalInfo.email}, ${CV_KNOWLEDGE.personalInfo.phone}
- Website: ${CV_KNOWLEDGE.personalInfo.website}

PROFESSIONAL SUMMARY:
${CV_KNOWLEDGE.professionalSummary}

EDUCATION:
- Institution: ${CV_KNOWLEDGE.education.primary.institution}
- Degree: ${CV_KNOWLEDGE.education.primary.degree}
- Status: ${CV_KNOWLEDGE.education.primary.graduationStatus}
- Year: ${CV_KNOWLEDGE.education.primary.year}
- Average Score: ${CV_KNOWLEDGE.education.primary.averageScore}

TECHNICAL SKILLS:
- Programming Languages: ${CV_KNOWLEDGE.technicalSkills.programmingLanguages.join(', ')}
- Databases: ${CV_KNOWLEDGE.technicalSkills.databases.join(', ')}
- Frameworks: ${CV_KNOWLEDGE.technicalSkills.frameworks.join(', ')}
- Other Skills: ${CV_KNOWLEDGE.technicalSkills.otherSkills.join(', ')}

WORK EXPERIENCE:
${CV_KNOWLEDGE.workExperience.map(exp => 
  `- ${exp.position} at ${exp.company} (${exp.duration})\n  Technologies: ${exp.technologies.join(', ')}`
).join('\n')}

KEY PROJECTS:
${CV_KNOWLEDGE.projects.map(project =>
  `- ${project.name}: ${project.description} (${project.technologies.join(', ')})
  Why built: ${project.whyBuilt}`
).join('\n')}

CURRENTLY BUSY WITH:
${CV_KNOWLEDGE.currentlyBusyWith.summary}
Details:
${CV_KNOWLEDGE.currentlyBusyWith.details.map(d => `- ${d}`).join('\n')}

SERVICES:
- Web Development: Starting from ${CV_KNOWLEDGE.services.webDevelopment.startingPrice}
- Technologies: ${CV_KNOWLEDGE.services.webDevelopment.technologies.join(', ')}
- Features: ${CV_KNOWLEDGE.services.webDevelopment.features.join(', ')}

ACHIEVEMENTS:
${CV_KNOWLEDGE.achievements.map(achievement => `- ${achievement}`).join('\n')}
  `.trim();
};
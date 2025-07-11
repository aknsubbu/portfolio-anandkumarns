export type ProjectConfig = typeof projectConfig;

export const projectConfig = [
  {
    title:
      "Enhanced Multi-Scale Pyramid Deep Image Prior (in collaboration with National Remote Sensing Center, Indian Space Research Organisation)",
    description:
      "Developed a enhanced version of Deep Image Prior tech customised for Cloud Removal from Satellite images. This work is being converted into research papers for publication alongside NRSC.",
    image: "/dip.png",
    rank: 1,
    technologies: [
      "Python",
      "Deep Image Prior",
      "PyTorch",
      "Satellite Imagery",
      "Cloud Removal",
    ],
    github: "https://github.com/aknsubbu/",
  },
  {
    title:
      "Regime-Switching Financial Risk Prediction Using Hidden Markov Model GARCH and Monte Carlo Simulation (Ongoing)",
    description:
      "Designed and writing a research paper to publish a regime-switching financial risk prediction framework integrating Hidden Markov Models (HMM) with GARCH processes and Monte Carlo simulation, achieving a 50% improvement in Value-at-Risk (VaR) forecasting accuracy for Apple Inc. stock (2005–2025), with robust validation using regime frequency, Kolmogorov-Smirnov tests, and VaR calibration metrics.",
    image: "/mtc.png",
    rank: 2,
    technologies: [
      "Python",
      "Hidden Markov Model (HMM)",
      "GARCH",
      "Monte Carlo Simulation",
      "Financial Risk Prediction",
    ],
    github: "https://github.com/aknsubbu/",
  },
  {
    title: "Secure Terminal Chat Room",
    description:
      "A secure, multi-user terminal chatroom server with Telnet support. SecureChatRoom provides a retro-style text-based chat experience with modern security features.... It supports multiple users, secure connections, and a simple command-line interface for interaction. The server is built using Python's socket programming and threading capabilities, ensuring efficient handling of multiple clients simultaneously.",
    image: "/scr.png",
    rank: 6,
    technologies: [
      "Node.js ",
      " WebSocket ",
      " Transmission Control Protocol (TCP) ",
      " SQL ",
      " Telnet",
    ],
    github: "https://github.com/aknsubbu/SecureChatRoom",
  },
  {
    title:
      "Autonomous Low Cost Mobile Robot (Developed in collaboration with HPE)",
    description:
      "This is a complete autonomous navigation system for a small robot using BLE beacons for localization and ultrasonic sensors for obstacle avoidance... This was built in accordance with the requirements of a competition organized by HPE and PSG Tech. The robot was able to navigate autonomously through a maze with the help of the sensors and the algorithms we developed.",
    image: "/amr.png",
    rank: 4,
    technologies: [
      " Bluetooth Low Energy",
      "Arduino",
      "Raspberry Pi",
      "Embedded Systems",
      "Serial Communications",
    ],
    github: "https://github.com/aknsubbu/AMR_Code",
  },
  {
    title: "Agentic Suite",
    description:
      "Developed Agentic-Suite, a collection of AI-powered proof-of-concept projects for advanced data analysis and natural language processing, designed for sales demonstrations and client presentations. Built three key applications—Financial Research Dashboard, TalkToCSV, and TalkToDB—using Python, Streamlit, FastAPI, and LangChain, enabling interactive stock market analysis, conversational CSV data exploration, and natural language-to-SQL query interfaces....",
    image: "/ags.png",
    rank: 5,
    technologies: ["Python", "AutoGen", "Agentic Tools", "ML", "AI Agents"],
    github: "https://github.com/aknsubbu/Agentic-Suite",
  },
  {
    title: "Xplora ML",
    description:
      "This is a tool that is responsible for parsing the code, providing a rudimentary analysis of your ML Code. The software then generates a XAI Technique Suggestion for the ML Code based on a multitude of factors… We use open-source Large Language Models (LLMs) to analyse the code and generate the suggestions with the help of a knowledge base and the Retireval Augmented Generation(RAG) Method. This allows us to create tailored suggestions...",
    image: "/xai.png",
    rank: 7,
    technologies: ["Python", "LangChain", "RAG", "ML", "XAI"],
    github: "https://github.com/aknsubbu/XAISuggestionServer",
  },
  {
    title: "Sustainable Agri AI Workflow",
    description:
      "A unique AI Agentic Workflow to help promote sustainable agriculture practices with the help of a crew of AI Agents for the collaboration and coordination between different capabilities built into the software…",
    image: "/saaiw1.png",
    rank: 3,
    technologies: ["AI Agents", "Python", "Agriculture", "Machine Learning"],
  },
  {
    title: "PSG Connect",
    description:
      "Developed a secure Expo React Native mobile application that allows students to access their academic profiles. The app features a robust login system with a 15-attempt limit and auto-lockout for enhanced security, displays comprehensive student information including personal, family, and contact details, and supports dark mode for improved user experience.",
    image: "/psgcnt.png",
    rank: 8,
    technologies: ["React Native", "Expo", "TypeScript", "Python", "FastAPI"],
    github: "https://github.com/aknsubbu/psg-connect",
  },
  {
    title: "AI Powered Retail Analysis",
    description:
      "This is a python based analysis backend with Langchain and OpenAI GPT 3.5 Turbo. Here we create an agent with specific tools geared towards data exploration and analysis so that we can analyse retail data. This is connected to a NextJS front-end which also does basic analysis and plots graphs and other relevant metrics... This was made so that businesses can have easier access to metrics and insights from their data so that they can make more informed choices with respect to their business.",
    image: "/rtan.png",
    rank: 9,
    technologies: ["Python", "LangChain", "OpenAI", "Next.js", "Data Analysis"],
    github: "https://github.com/aknsubbu/Retail-Analysis-v3",
  },
  {
    title: "NewsVision",
    description:
      "This is a piece of software that uses the Google Cloud Translate and Test to Speech Software to translate and generate audio for news articles in about 100 languages on both ends of the article. The audio is then laid over an animation generated dynamically with the images from the user and adjusted for time using the audio…",
    image: "/nvp.png",
    rank: 10,
    technologies: ["Google Cloud", "TTS", "Translation API", "Animation"],
    github: "https://github.com/aknsubbu/sns-hackathon-aiConversion",
  },
  {
    title: "NextJS Learning Pack",
    description:
      "This is a learning pack I created for students part of a workshop to refer to learn Next JS and brush up on the basics of CSS and HTML. This shows them the folder structure, files that are generated, how to create a Next JS project using the CLI Command. We also discuss the advantages of Next JS and its features. I also demonstrate the basic method for creating and reusing components….",
    image: "/nxtjslp.png",
    rank: 11,
    technologies: ["Next.js", "React", "HTML", "CSS", "Tutorial"],
    github:
      "https://github.com/GitHub-Campus-Club-PSGCT/NextJS-Learning-Pack.git",
  },
  {
    title: "BLE Attendance Tracking System",
    description:
      "My team and I built a BLE Attendance System that uses Bluetooth Low Energy Systems to verify presence using proximity to neighbouring students or stationary beacons in classes. This drastically reduced the time wasted in class and increased degree of accuracy with respect to the verification process compared to manual verification.",
    image: "/ble.jpeg",
    rank: 12,
    technologies: ["BLE", "IoT", "Mobile App", "Attendance System"],
  },
];

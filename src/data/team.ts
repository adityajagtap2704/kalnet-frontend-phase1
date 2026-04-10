import { TeamMember } from "@/types";

export interface ZentrixTeamMember extends TeamMember {
  accentColor: string;
}

export const team: ZentrixTeamMember[] = [
  {
    id: "tm1",
    name: "Rushikesh Dehankar",
    role: "Founder@TAYOG & Zentrix| IIT Hyderabad",
    accentColor: "#3b82f6", // Blue
    bio: "Visionary leader focused on building high-performance engineering cultures and bridging the gap between deep-tech innovation and industry needs.",
    avatar: "/team/rushikesh.jpg",
    social: {
      linkedin: "https://linkedin.com/in/rushikesh-dehankar",
    },
  },
  {
    id: "tm2",
    name: "RISHAV RAJ",
    role: "Co-Founder & CTO @Zentrix",
    accentColor: "#a855f7", // Purple
    bio: "Full-stack architect and technical visionary leading the core engineering efforts and infrastructure scaling at Zentrix.",
    avatar: "/team/rishav.jpg",
    social: {
      linkedin: "https://linkedin.com/in/rishav-raj",
      github: "https://github.com/rishav-raj",
    },
  },
  {
    id: "tm3",
    name: "Anveshchandra Bavikadi",
    role: "Founder associate",
    accentColor: "#f43f5e", // Rose/Red
    bio: "Supporting strategic initiatives and executive operations to drive project consistency and operational excellence.",
    avatar: "/team/anvesh.jpg",
    social: {
      linkedin: "https://linkedin.com/in/anveshchandra",
    },
  },
  {
    id: "tm4",
    name: "Vedika Khiwansara",
    role: "Partnership Manager",
    accentColor: "#10b981", // Emerald
    bio: "Building long-term industry relationships and managing strategic alliances to expand the Zentrix ecosystem.",
    avatar: "/team/vedika.jpg",
    social: {
      linkedin: "https://linkedin.com/in/vedika-khiwansara",
    },
  },
  {
    id: "tm5",
    name: "Anjali Kanojiya",
    role: "Partnership assistant",
    accentColor: "#f59e0b", // Amber
    bio: "Dedicated support for partnership growth and relationship management across our industry networks.",
    avatar: "/team/anjali.jpg",
    social: {
      linkedin: "https://linkedin.com/in/anjali-kanojiya",
    },
  },
  {
    id: "tm6",
    name: "Jyothsna Lenka",
    role: "AL/ML Engineer",
    accentColor: "#06b6d4", // Cyan
    bio: "Expert in deep learning and machine learning systems, building the intelligent backends for Zentrix's data-driven solutions.",
    avatar: "/team/jyothsna.jpg",
    social: {
      linkedin: "https://linkedin.com/in/jyothsna-lenka",
      github: "https://github.com/jyothsna-l",
    },
  },
  {
    id: "tm7",
    name: "Arva Presswala",
    role: "Partnership Assistant at Zentrix",
    accentColor: "#6366f1", // Indigo
    bio: "Coordinating strategic communication and outreach initiatives to strengthen our partnership pipeline.",
    avatar: "/team/arva.jpg",
    social: {
      linkedin: "https://linkedin.com/in/arva-presswala",
    },
  },
  {
    id: "tm8",
    name: "Shubham Gupta",
    role: "Business development Associate",
    accentColor: "#ec4899", // Pink
    bio: "Driving market expansion and identified new growth opportunities for Zentrix's engineering and training divisions.",
    avatar: "/team/shubham.jpg",
    social: {
      linkedin: "https://linkedin.com/in/shubham-gupta",
    },
  },
];

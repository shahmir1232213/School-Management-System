import type { ElementType } from "react";
import { MdDashboard } from "react-icons/md";
import { FaChalkboard, FaUserGraduate, FaUserTie, FaBookOpen } from "react-icons/fa";

export interface NavItem {
  name: string;
  path: string;
  icon: ElementType;
}

export interface NavGroup {
  title: string;
  links: NavItem[];
}

export const adminLinks: NavGroup[] = [
  {
    title: "Main",
    links: [{ name: "Dashboard", path: "/home/dashboard", icon: MdDashboard }],
  },
  {
    title: "Management",
    links: [
      { name: "Students", path: "/home/students", icon: FaUserGraduate },
      { name: "Teachers", path: "/home/teachers", icon: FaUserTie },
      { name: "Timetable", path: "/home/timetable", icon: FaChalkboard },
      { name: "Subjects", path: "/home/subjects", icon: FaBookOpen },
      { name: "Classes", path: "/home/classes", icon: FaBookOpen },
    ],
  },
];

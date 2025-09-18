"use client";

import { useState } from "react";
import { Home, User, BarChart3, Settings } from "lucide-react";

const tabs = [
  { id: "home", name: "Home", icon: Home },
  { id: "profile", name: "Profile", icon: User },
  { id: "portals", name: "Portals", icon: BarChart3 },
  { id: "form", name: "Form", icon: BarChart3 },
  { id: "settings", name: "Settings", icon: Settings },
];

export default function Sidebar({ onSelect }: { onSelect: (id: string) => void }) {
  const [active, setActive] = useState("home");

  const handleClick = (id: string) => {
    setActive(id);
    onSelect(id);
  };

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Navigation</h1>
      </div>
      <nav className="mt-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleClick(tab.id)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                active === tab.id ? "bg-blue-50 border-r-4 border-blue-500 text-blue-700" : "text-gray-700"
              }`}
            >
              <Icon size={20} className="mr-3" />
              {tab.name}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

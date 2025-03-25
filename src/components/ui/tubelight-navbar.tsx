"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  textColor?: string
  activeItem?: string
  onActiveChange?: (item: string) => void
}

export function NavBar({ items, className, textColor = "#1a1a1a", activeItem, onActiveChange }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(activeItem || items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update active tab if controlled externally
  useEffect(() => {
    if (activeItem && activeItem !== activeTab) {
      setActiveTab(activeItem)
    }
  }, [activeItem])

  const handleTabChange = (itemName: string) => {
    setActiveTab(itemName)
    if (onActiveChange) {
      onActiveChange(itemName)
    }
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/5",
        className,
      )}
    >
      <div className="flex items-center justify-between py-2 px-8 max-w-[1920px] mx-auto">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleTabChange(items[0].name);
          }}
          className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img
            src="/images/baggy/garbagebag.jpg"
            alt="BAGGY"
            className="w-full h-full object-cover rounded-full"
          />
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {items.map((item) => {
            const isActive = activeTab === item.name;
            
            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange(item.name);
                }}
                className={cn(
                  "relative cursor-pointer text-[10px] tracking-[0.2em] hover:opacity-50",
                  "transition-all duration-300 ease-in-out font-light uppercase",
                  isActive 
                    ? "text-black" 
                    : "text-black/70"
                )}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  )
} 
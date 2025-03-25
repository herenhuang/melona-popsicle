import React, { useEffect, useRef, useState, createContext, useContext } from "react"
import Matter, {
  Engine,
  Render,
  World,
  Bodies,
  Runner,
  Body,
  Events
} from "matter-js"

import { cn } from "@/lib/utils"

interface GravityProps {
  gravity: { x: number; y: number }
  className?: string
  children: React.ReactNode
}

const EngineContext = createContext<Matter.Engine | null>(null)

export function Gravity({ gravity, className, children }: GravityProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef(Engine.create())

  useEffect(() => {
    if (!sceneRef.current) return

    const engine = engineRef.current
    engine.gravity = gravity

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      }
    })

    Runner.run(Runner.create(), engine)
    Render.run(render)

    const handleResize = () => {
      render.canvas.width = window.innerWidth
      render.canvas.height = window.innerHeight
      render.options.width = window.innerWidth
      render.options.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      Render.stop(render)
      World.clear(engine.world, false)
      Engine.clear(engine)
      render.canvas.remove()
    }
  }, [gravity])

  return (
    <EngineContext.Provider value={engineRef.current}>
      <div ref={sceneRef} className={cn("relative", className)}>
        {children}
      </div>
    </EngineContext.Provider>
  )
}

interface MatterBodyProps {
  x: string | number
  y: string | number
  children: React.ReactNode
  onPositionUpdate?: (x: number, y: number) => void
}

export function MatterBody({ x, y, children, onPositionUpdate }: MatterBodyProps) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0, angle: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const bodyInstance = useRef<Matter.Body | null>(null)
  const engine = useContext(EngineContext)

  useEffect(() => {
    if (!bodyRef.current || !engine) return

    const rect = bodyRef.current.getBoundingClientRect()
    const startX = typeof x === 'string' ? (parseFloat(x) / 100) * window.innerWidth : x
    const startY = typeof y === 'string' ? (parseFloat(y) / 100) * window.innerHeight : y

    const body = Bodies.rectangle(
      startX,
      startY,
      rect.width,
      rect.height,
      { render: { visible: false }, isStatic: true }
    )

    bodyInstance.current = body
    World.add(engine.world, body)

    return () => {
      if (bodyInstance.current) {
        World.remove(engine.world, bodyInstance.current)
      }
    }
  }, [x, y, engine])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y
      
      if (bodyInstance.current) {
        const newX = position.x + deltaX
        const newY = position.y + deltaY
        Body.setPosition(bodyInstance.current, {
          x: newX + bodyRef.current!.offsetWidth/2,
          y: newY + bodyRef.current!.offsetHeight/2
        })
        setPosition({ x: newX, y: newY, angle: 0 })
        onPositionUpdate?.(newX + bodyRef.current!.offsetWidth/2, newY + bodyRef.current!.offsetHeight/2)
      }
      
      setDragStart({ x: e.clientX, y: e.clientY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart, position, onPositionUpdate])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    e.preventDefault()
  }

  return (
    <div 
      ref={bodyRef} 
      className="absolute cursor-grab active:cursor-grabbing pointer-events-auto" 
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px) rotate(${position.angle}rad)`,
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  )
}

Gravity.displayName = "Gravity"

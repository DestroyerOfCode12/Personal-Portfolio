import { useEffect, useState } from 'react'

export type DeviceClass = 'mobile' | 'tablet' | 'desktop'

// Mirrors Tailwind's default md (768px) and lg (1024px) breakpoints.
const TABLET_MIN = 768
const DESKTOP_MIN = 1024

function classify(width: number): DeviceClass {
  if (width >= DESKTOP_MIN) return 'desktop'
  if (width >= TABLET_MIN) return 'tablet'
  return 'mobile'
}

export function useDeviceClass(): DeviceClass {
  const [deviceClass, setDeviceClass] = useState(() => classify(window.innerWidth))

  useEffect(() => {
    const handleResize = () => setDeviceClass(classify(window.innerWidth))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return deviceClass
}

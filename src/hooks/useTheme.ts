import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('light') ? 'light' : 'dark',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage can be blocked; theme still applies for the session */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return [theme, toggle]
}

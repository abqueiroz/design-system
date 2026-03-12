import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type CustomTheme = {
  light?: Record<string, string>
  dark?: Record<string, string>
  radius?: Record<string, string>
  spacing?: Record<string, string>
  typography?: Record<string, string>
}

type ThemeProviderProps = {
  children?: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  theme?: CustomTheme
  selector?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  toggleTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  theme: customTheme,
  selector,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const setTheme = (theme: Theme) => {
    localStorage.setItem(storageKey, theme)
    setThemeState(theme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  // Handle custom theme injection
  useEffect(() => {
    if (!customTheme || !selector) return

    const styleId = `scoped-theme-${selector.replace(/[^a-zA-Z0-9]/g, "-")}`
    let styleTag = document.getElementById(styleId) as HTMLStyleElement

    if (!styleTag) {
      styleTag = document.createElement("style")
      styleTag.id = styleId
      document.head.appendChild(styleTag)
    }

    const generateVariables = (vars?: Record<string, string>, prefix = "") => {
      if (!vars) return ""
      return Object.entries(vars)
        .map(([key, value]) => `  --${prefix}${key}: ${value};`)
        .join("\n")
    }

    const lightVars = generateVariables(customTheme.light, "color-")
    const darkVars = generateVariables(customTheme.dark, "color-")
    const radiusVars = generateVariables(customTheme.radius, "radius-")
    const spacingVars = generateVariables(customTheme.spacing, "spacing-")
    const typoVars = generateVariables(customTheme.typography, "") // Typography vars usually have their own prefixes or are direct

    let css = `${selector} {\n${lightVars}${radiusVars}${spacingVars}${typoVars}\n}\n`
    if (darkVars) {
      css += `.dark ${selector}, ${selector}.dark {\n${darkVars}\n}\n`
    }

    styleTag.innerHTML = css

    return () => {
      // Cleanup if needed? Usually we keep it for performance if multiple stories use it,
      // but if the component unmounts we should remove it.
      // styleTag.remove()
    }
  }, [customTheme, selector])

  const value = {
    theme,
    setTheme,
    toggleTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

import { createContext, useContext } from 'react'
import type { Project } from '../data/projects'

export const DemoContext = createContext<(p: Project) => void>(() => {})
export const useOpenDemo = () => useContext(DemoContext)

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { StateCreator } from 'zustand'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'USER' | 'PRO' | 'COACH' | 'ADMIN'
  plan: 'FREE' | 'PRO' | 'ENTERPRISE'
}

interface Strategy {
  id: string
  title: string
  game: string
  map?: string
  yourTeam: string
  opponentTeam: string
  createdAt: string
}

interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

interface AppState {
  // Auth
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void

  // UI
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void

  // Current game
  currentGame: 'valorant' | 'lol'
  setCurrentGame: (game: 'valorant' | 'lol') => void

  // Strategy builder
  currentStrategy: Partial<Strategy> | null
  setCurrentStrategy: (strategy: Partial<Strategy> | null) => void

  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void

  // Loading states
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

// use a simpler typing to avoid generic incompatibility
const storeCreator: StateCreator<AppState> = (set: any) => ({
  // Auth
  user: null,
  isAuthenticated: false,
  setUser: (user: User | null) =>
    set({ user, isAuthenticated: !!user }),
  logout: () =>
    set({ user: null, isAuthenticated: false }),

  // UI
  sidebarOpen: true,
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  theme: 'dark',
  setTheme: (theme: 'light' | 'dark') => set({ theme }),

  // Current game
  currentGame: 'valorant',
  setCurrentGame: (game: 'valorant' | 'lol') => set({ currentGame: game }),

  // Strategy builder
  currentStrategy: null,
  setCurrentStrategy: (strategy: Partial<Strategy> | null) => set({ currentStrategy: strategy }),

  // Notifications
  notifications: [],
  addNotification: (notification: Omit<Notification, 'id'>) =>
    set((state: AppState) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Math.random().toString() },
      ],
    })),
  removeNotification: (id: string) =>
    set((state: AppState) => ({
      notifications: state.notifications.filter((n: Notification) => n.id !== id),
    })),

  // Loading
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
})

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      storeCreator,
      {
        name: 'wopseeion-app-store',
        partialize: (state: AppState) => ({
          user: state.user,
          theme: state.theme,
          currentGame: state.currentGame,
        }),
      }
    )
  )
)

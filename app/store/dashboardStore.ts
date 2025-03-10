import { create } from 'zustand'

interface DashboardStats {
  money: string
  users: number
  clients: number
  sales: string
}

interface Project {
  name: string
  team: string[]
  budget: number
  progress: number
  status: string
}

interface Order {
  id: string
  name: string
  date: string
  amount: number
  status: string
}

interface DashboardStore {
  // Stats
  stats: DashboardStats
  // Active Users
  activeUsers: {
    total: number
    online: number
    pending: number
    offline: number
  }
  // Projects
  projects: Project[]
  // Orders
  orders: Order[]
  
  // Actions
  updateStats: (stats: Partial<DashboardStats>) => void
  updateActiveUsers: (users: any) => void
  updateProjects: (projects: Project[]) => void
  updateOrders: (orders: Order[]) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  // Initial state
  stats: {
    money: '$53,000',
    users: 2300,
    clients: 3020,
    sales: '$173,000'
  },
  activeUsers: {
    total: 32984,
    online: 2420,
    pending: 2400,
    offline: 320
  },
  projects: [
    {
      name: "Chakra Soft UI Version",
      team: ["Team A"],
      budget: 14000,
      progress: 60,
      status: "working"
    },
    {
      name: "Add Progress Track",
      team: ["Team B"],
      budget: 3000,
      progress: 10,
      status: "pending"
    }
  ],
  orders: [
    {
      id: "1",
      name: "Design changes",
      date: "2024-03-10",
      amount: 2500,
      status: "completed"
    },
    {
      id: "2",
      name: "New order #37942",
      date: "2024-03-09",
      amount: 1500,
      status: "pending"
    }
  ],

  // Actions
  updateStats: (newStats) => 
    set((state) => ({
      stats: { ...state.stats, ...newStats }
    })),
  updateActiveUsers: (users) => 
    set({ activeUsers: users }),
  updateProjects: (projects) => 
    set({ projects }),
  updateOrders: (orders) => 
    set({ orders })
})) 
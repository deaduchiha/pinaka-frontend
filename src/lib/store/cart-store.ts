import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  sku: string
  stockQuantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  isLoading: boolean
}

interface CartActions {
  // Cart management
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  
  // UI actions
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  
  // Computed values
  getTotalItems: () => number
  getTotalPrice: () => number
  getItemById: (itemId: string) => CartItem | undefined
}

type CartStore = CartState & CartActions

const initialState: CartState = {
  items: [],
  isOpen: false,
  isLoading: false,
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Cart management
      addItem: (item: Omit<CartItem, 'id'>) => {
        const { items } = get()
        const existingItem = items.find(i => i.productId === item.productId)
        
        if (existingItem) {
          // Update quantity if item already exists
          set({
            items: items.map(i =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          })
        } else {
          // Add new item
          const newItem: CartItem = {
            ...item,
            id: `${item.productId}-${Date.now()}`,
          }
          set({ items: [...items, newItem] })
        }
      },

      removeItem: (itemId: string) => {
        const { items } = get()
        set({ items: items.filter(item => item.id !== itemId) })
      },

      updateQuantity: (itemId: string, quantity: number) => {
        const { items } = get()
        if (quantity <= 0) {
          set({ items: items.filter(item => item.id !== itemId) })
        } else {
          set({
            items: items.map(item =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          })
        }
      },

      clearCart: () => {
        set({ items: [] })
      },

      // UI actions
      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      toggleCart: () => {
        const { isOpen } = get()
        set({ isOpen: !isOpen })
      },

      // Computed values
      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      getItemById: (itemId: string) => {
        const { items } = get()
        return items.find(item => item.id === itemId)
      },
    }),
    {
      name: 'pinaka-cart-storage',
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
) 
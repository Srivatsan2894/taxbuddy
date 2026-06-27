import { Outlet, createRootRoute } from '@tanstack/react-router'
import { BottomNav } from '../components/bottom-nav'
import { Toaster } from '../components/ui/sonner'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto max-w-[480px] pb-24">
        <Outlet />
      </div>
      <BottomNav />
      <Toaster position="top-center" />
    </div>
  )
}
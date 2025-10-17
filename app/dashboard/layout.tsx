"use client"

import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { SidebarProvider, useSidebar } from "@/components/providers/sidebar-provider"
import { Toaster } from "sonner"

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isOpen, close } = useSidebar()
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={close}
        />
      )}
      
      <div 
        className="flex flex-col flex-1 overflow-hidden transition-all duration-300"
      >
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-6 space-y-6">
            <Breadcrumbs />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
      <Toaster richColors position="top-right" />
    </SidebarProvider>
  )
}

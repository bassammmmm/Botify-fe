"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MdAccountCircle } from "react-icons/md"
import Sidebar from '@/components/SideBar/SideBar'
import Account from "@/components/Account/Account"
import AllApps from "@/components/AllApps/AllApps"
import { toast } from "sonner"
import { useAuth } from "@/components/AuthProvider/AuthProvider"
import Image from "next/image"

export default function Page() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "apps"
  const [selectedTab, setSelectedTab] = useState(initialTab)
  const { logout, user } = useAuth()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
  }

  return (
    <div>
      {/* Navbar */}
      <div className='fixed top-0 w-full bg-white dark:bg-transparent backdrop-blur z-50 flex justify-between items-center px-4 md:px-16 py-2 border-b '>
        <div className='w-24 cursor-pointer'>
          <Image src="/home/logoo.png" width={100} height={100} onClick={() => router.push('/')}
            alt="Logo" />
        </div>
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2">
              {mounted && (
                <span className="text-sm font-medium hidden md:inline">
                  {user?.username || ''}
                </span>
              )}
              <MdAccountCircle className='w-8 h-8 cursor-pointer' />
            </div>
          </PopoverTrigger>
          <PopoverContent className='hover:cursor-pointer p-0 font-bold'>
            <h4
              className='p-2 hover:bg-gray-100'
              onClick={() => setSelectedTab("account")}
            >
              Profile
            </h4>
            <hr />
            <h4
              className='text-red-500 p-2 hover:bg-red-100'
              onClick={handleLogout}
            >
              Logout
            </h4>
          </PopoverContent>
        </Popover>
      </div>

      {/* Sidebar */}
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Main content */}
      <main className="pt-24 pl-20 md:pl-60 p-6 w-full bg-gray-100 dark:bg-black">
        {selectedTab === "apps" && <AllApps />}
        {/* {selectedTab === "chat-sessions" && <ChatSessions />} */}
        {selectedTab === "account" && <Account />}
      </main>
    </div>
  )
}

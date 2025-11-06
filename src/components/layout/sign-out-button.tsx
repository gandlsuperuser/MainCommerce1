"use client"

import { useRouter } from "next/navigation"
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      })
      
      if (response.ok) {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      Sign out
    </DropdownMenuItem>
  )
}


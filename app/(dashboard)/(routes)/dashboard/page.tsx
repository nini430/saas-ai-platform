import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <>
    <p>Dashboard Page</p>
    <UserButton afterSignOutUrl="/"/>
    </>
  )
}

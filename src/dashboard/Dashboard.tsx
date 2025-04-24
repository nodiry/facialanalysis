import NavBar from "@/components/NavBar"
import { Toaster } from "@/components/ui/sonner"

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center">
      <NavBar/>
      <h1 className="mt-24 text-2xl font-semibold">
      This is a dashboard!
      </h1>
      <Toaster/>
    </div>
  )
}

export default Dashboard

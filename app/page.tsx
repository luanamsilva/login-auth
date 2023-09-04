import { getCurrentUser } from "@/lib/session"


export default async function Home() {
  const user = await getCurrentUser()
  return (
    <main>
   {JSON.stringify(user)}
    </main>
  )
}

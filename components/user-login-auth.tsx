"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{}
interface IUser {
  email: string,
  password: string
}
export function UserLoginForm({ className, ...props}: UserAuthFormProps){
  const [data, setData] = useState<IUser>({ email: '', password: ''})
async function onSubmit(event: React.SyntheticEvent) {
  event.preventDefault
}

  return(<div className={cn("grid gap-6", className)}{...props}>
  <form onSubmit={onSubmit}>
    <div className="grid gap-2">
  <div className="grid gap-1">
  <Label>Usuário:</Label>
  <Input
  id="email"
  placeholder="name@name.com"
type="email"
autoCapitalize="none"
autoComplete="email"
autoCorrect="off"
name="email" 
value={data.email}
  />
  </div>
    </div>
  </form>
  </div>)
}
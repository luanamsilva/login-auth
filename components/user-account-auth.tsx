'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Icons } from '@/components/icons';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface IUser {
  name: string
  email: string;
  password: string;
}
export function UserAccountForm({ className, ...props }: UserAuthFormProps) {
const {toast} = useToast()

  const [data, setData] = useState<IUser>({name:'', email: '', password: '' });
 const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault;
    setIsLoading(true);

   const request = await fetch("/api/users",{
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
    } ,
    body: JSON.stringify(data)
  })
  const response = await request.json()
  
  if(!request.ok){
    toast({
      title: "Erro ",
      description: response.console.error,
      variant:  'destructive',
      action: (
        <ToastAction altText='Tente novamente'>Tente novamente</ToastAction>
      )
      
    })
  }

     setData({
      name:"",
      email: "",
      password: "",
    });
    setIsLoading(false);
  }
 
 

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
  
  <div className={cn('grid gap-6', className)} {...props}>
       <form onSubmit={onSubmit}>
        <div className="grid gap-2">
        <div className="grid gap-1">
            <Label htmlFor="email">Nome:</Label>
            <Input
              id="name"
              placeholder="Nome"
              type="text"
              disabled={isLoading}
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">Usuário:</Label>
            <Input
              id="email"
              placeholder="name@name.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className='gap-1'>
            <Label htmlFor='password'>Senha</Label>
    <Input
           id="password"
           placeholder="senha"
           type="password"
           autoCapitalize="none"
           autoCorrect="off"
           disabled={isLoading}
           name="password"
           value={data.password}
           onChange={handleChange}/>
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
           Registrar
          </Button>
        </div>
      </form>
    </div>
  );
}

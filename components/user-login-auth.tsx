'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Icons } from '@/components/icons';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface IUser {
  email: string;
  password: string;
}
export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const [data, setData] = useState<IUser>({ email: '', password: '' });
 const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault;
    setIsLoading(true);
  
    setData({
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
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
}

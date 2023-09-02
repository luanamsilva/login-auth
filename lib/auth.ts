import { NextAuthOptions } from "next-auth";
import  CredentialProvider  from "next-auth/providers/credentials";
import {PrismaAdapter} from "@auth/prisma-adapter"
import {db} from "@/lib/db"

export const authOptions : NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials:{
      email: {label: "Usuário", type: "text", placeholder: 'nome@nome.com'},
      password: {label: "Senha", type: "password", placeholder: "******"},
    username: {label: "Nome", type: "text", placeholder: "João "}
      },
      async authorize(credentials, req): Promise<any>{
        const user = {email: 'luanamoura2002@yahoo.com.br', password: '123456', name: "Luana"}
     return user
      }
    })
  ]
}
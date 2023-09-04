import { NextAuthOptions } from "next-auth";
import  CredentialProvider  from "next-auth/providers/credentials";
import  GithubProvider  from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter"
import {db} from "@/lib/db"

export const authOptions : NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
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
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
}
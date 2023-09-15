import { NextAuthOptions } from "next-auth";
import  CredentialProvider  from "next-auth/providers/credentials";
import  GithubProvider  from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter"
import {db} from "@/lib/db"
import bcrypt from 'bcrypt'


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
       console.log("Autorizado", credentials)
       if(!credentials?.email || !credentials.password) throw new Error("Dados inválidos!")
        const user = await db.user.findUnique({
          where: {
            email: credentials.email
         
          }
        })
        console.log("USER", user)

        if(!user || !user.hashedPassword) {
            throw new Error("Usuários não registrado através de credenciais")
        }

        const matchPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
        if(!matchPassword)
            throw new Error("Senha incorreta")

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
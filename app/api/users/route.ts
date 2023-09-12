import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest){
  const data = await request.json()
  const {name, email, password} = data
console.log("Route", data)

if(!name || !email|| !password){
  NextResponse.json('Dados inválidos!', {status:400})
}
const userExist = await db.user.findUnique({
  where:{
    email: email
  }
})
if (userExist){
  NextResponse.json('Email já cadastrado!', {status:400})
}

const hashedPassword = await bcrypt.hash(password, 10)
const user = await db.user.create({
  data:{
    email,
    name,
    hashedPassword
  }
})
  return NextResponse.json(user)
}
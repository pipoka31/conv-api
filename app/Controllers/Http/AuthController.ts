import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class AuthController {
  
 public async  login({auth,request}){
  const username = request.input('username')
  const password = request.input('password')
  console.log(username, password)
  try {
    await auth.attempt(username,password)
  } catch (error) {
    console.log('error auth',error)
  }
 }
}
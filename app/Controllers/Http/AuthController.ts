import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class AuthController {
    public async login({ request, response, auth }: HttpContextContract) {
       let {username, password} = request.all()
    
        try {
    
          const user = await User.findBy('user_name',username)
          
         
          
          if (user) {
            const isPasswordValid = await user.verifyPassword(password)
            console.log(isPasswordValid)
            return isPasswordValid
          } else {
            return response.status(401).json({ error: 'Invalid credentials' });
          }
        } catch {
          return response.unauthorized('Invalid credentials')
        }
      }
}
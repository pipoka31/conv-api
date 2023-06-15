import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class AuthController {
    public async login({ request, response }: HttpContextContract) {
        const email = request.input('username')
        const password = request.input('password')
    
        try {
    
          const user = await User
          .query()
          .where('userName', email)
          .where('active', true)
          .firstOrFail()
    
        if (!(await Hash.verify(user.password, password))) {
          return response.unauthorized('Invalid credentials')
        }
        } catch {
          return response.unauthorized('Invalid credentials')
        }
      }
}
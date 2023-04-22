import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserController{

  public async index( {request, response}: HttpContextContract){

    const users = await User.all()

    response.status(200)

    return{users}
  }

  public async store({ request, response }: HttpContextContract){

    const body = request.body()
   
    const user = await User.create(body)

    response.status(201)

    return{
      message: "usuário cadastrado com sucesso!",
      user: user
    }
  }

  public async update({ request, response }: HttpContextContract){

    const body = request.body()

    const user = await User.findOrFail(request.params().id)

    user.name = body.name?body.name:user.name
    user.password = body.password?body.password:user.password
    user.username = body.email?body.email:user.username

    await user.save()

    response.status(201)

    return{
      message: "usuário atualizado com sucesso!",
      user: user
    }
  }

  public async destroy({ request, response }: HttpContextContract){

    const user = await User.findOrFail(request.params().id)

    await user.delete()

    response.status(200)

    return{
       message: "usuario deletado com sucesso!"
    }
  }

}
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UserControllers{

  public async index( {response}: HttpContextContract){
    try {
      const users = await User.all()
  
      response.status(200)
  
      return{users}
    } catch (error) {
      
      console.log('index user error', error);
      
    }
  }

  public async store({ request, response }: HttpContextContract){
    try {
      const body = request.body()
      console.log(body)
     
      const user = await User.create(body)
  
      response.status(201)
  
      return{
        message: "usuário cadastrado com sucesso!",
        user: user
      }
    } catch (error) {

      console.log('store user error', error)

    }
  }

  public async update({ request, response }: HttpContextContract){
    try {
      const body = request.body()
  
      const user = await User.findOrFail(request.params().id)
  
      user.name = body.name ? body.name : user.name
      user.password = body.password ? body.password : user.password
      user.user_name = body.email ? body.email : user.user_name
      user.thought = body.thought ? body.thought : user.thought
      user.updated_at = body.updated_at ? body.updated_at : user.updated_at
  
      await user.save()
  
      response.status(201)
  
      return{
        message: "usuário atualizado com sucesso!",
        user: user
      }
    } catch (error) {

      console.log('update user error', error)

    }
  }

  public async destroy({ request, response }: HttpContextContract){
    try {
      const user = await User.findOrFail(request.params().id)
  
      await user.delete()
  
      response.status(200)
  
      return{
         message: "usuario deletado com sucesso!"
      }
    } catch (error) {

      console.log('destroy user error', error);

    }
  }

  public async getUserInfo({params,response}: HttpContextContract){
    try {

      const {id}  = params

      const query = `
      SELECT id, name, user_name, thought from users
      WHERE id = ?
      `

      const userInfo = await Database.rawQuery(query,id)
      
      return response.json(userInfo.rows)
                  
    } catch (error) {
      console.log('error getUserInfo', error)
    }
  }

}
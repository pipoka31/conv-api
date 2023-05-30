import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'

export default class MessengeControllers{

  public async index( {response}: HttpContextContract){
    try {
      const message = await Message.all()
  
      response.status(200)
  
      return{message}
      
    } catch (error) {

      console.log('index message error',error)

    }
  }

  public async store({ request, response }: HttpContextContract){

    try {
     const body = request.body()
     const message = await Message.create(body)

      response.status(201)

      return{
        message: "mensagem cadastrado com sucesso!",
        mensagem: message
      }
   } catch (error) {

    return(console.log('store message error',error))

   }
   
  }

  public async destroy({ request, response }: HttpContextContract){
    try {
      const message = await Message.findOrFail(request.params().id)
  
      await message.delete()
  
      response.status(200)
  
      return{
         message: "menssagem deletado com sucesso!",
         mensagem: message
      }
    } catch (error) {

      console.log('destroy message error', error)
      
    }
  }

}
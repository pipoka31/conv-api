import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conversation from 'App/Models/Conversation'

export default class ConversationControllers{

  public async index( {response}: HttpContextContract){
    try {
      
      const conversation = await Conversation.all()
  
      response.status(200)
  
      return{conversation}
      
    } catch (error) {
      
      console.log('index conversation error', error);

    }
  }

  public async store({ request, response }: HttpContextContract){
    try {
      
      const body = request.body()
     
      const conversation = await Conversation.create(body)
  
      response.status(201)
  
      return{
        message: "conversa cadastrado com sucesso!",
        conversation: conversation
      }
      
    } catch (error) {
      
      console.log('store conversation error', error);

    }
  }

  public async update({ request, response }: HttpContextContract){
    try {
      
      const body = request.body()
  
      const conversation = await Conversation.findOrFail(request.params().id)
  
      conversation.id_userSender = body.id_userSender ? body.id_userSender : conversation.id_userSender
      conversation.id_userReciever = body.id_userReciever ? body.id_userReciever : conversation.id_userReciever
      conversation.id_message = body.id_message ? body.id_message : conversation.id_message
  
      await conversation.save()
  
      response.status(201)
  
      return{
        message: "conversa atualizado com sucesso!",
        conversation: conversation
      }
      
    } catch (error) {
      
      console.log('update conversation error', error);
      
    }
  }
}
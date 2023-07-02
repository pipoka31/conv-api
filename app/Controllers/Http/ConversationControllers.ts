import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conversation from 'App/Models/Conversation'
import Database from '@ioc:Adonis/Lucid/Database'

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
  
      conversation.id_user_sender = body.id_userSender ? body.id_userSender : conversation.id_user_sender
      conversation.id_user_reciever = body.id_userReciever ? body.id_userReciever : conversation.id_user_reciever
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

  public async getConversation({params, response}: HttpContextContract){
    
    const { group_id } = params
    
    try {

      const query = `
      SELECT users.id as sender, u.id as receiver, messages.text, messages.created_at
      FROM conversations
      INNER JOIN users ON conversations.id_user_sender = users.id
      INNER JOIN users as u ON conversations.id_user_receiver = u.id
      INNER JOIN messages ON conversations.id_message = messages.id
      WHERE group_id = ?;
    `

    const conversation = await Database.rawQuery(query, [group_id])

      return response.json(conversation.rows)

    } catch (error) {

      console.log("get conversation error",error)
      return response.status(500).json({ error: 'Internal server error' })

    }
  }
}
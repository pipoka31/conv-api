import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Group from 'App/Models/Group'
import Conversation from 'App/Models/Conversation'
import Database, { RawQuery, ReferenceBuilderContract } from '@ioc:Adonis/Lucid/Database'


export default class GroupController {
    public async index({ response }: HttpContextContract) {
      try {
        const groups = await Group.all()
        response.status(200)

        return{groups}
      } catch (error) {
        console.log('index groups error', error)
      }
    }
  
    public async show({ params, response }: HttpContextContract) {
      const group = await Group.find(params.id)
      if (!group) {
        return response.notFound('Group not found')
      }
      return response.ok(group)
    }
  
    public async store({ request, response }: HttpContextContract) {
        try {
            const {user_1, user_2} = request.body()
            console.log(user_1,user_2)

            const groupData = {
                "user_1": user_1,
                "user_2": user_2,
            }

            const existingGroup = await Group.query()
            .where('user_1', user_1)
            .where('user_2', user_2)
            .orWhere('user_1', user_2)
            .orWhere('user_2', user_1)
            .first()

            if (existingGroup) {
                return response.conflict('Group already exists')
            }

            const group = await Group.create(groupData)
            response.status(201)
            return{
                message: "grupo criado com sucesso",
                group: group
            }
        } catch (error) {
            console.log('group store error',error)
        }
    }
  
    public async update({ params, request, response }: HttpContextContract) {
      const groupData = request.only([ 'user_1', 'user_2'])
      const group = await Group.findOrFail(params.id)
      group.merge(groupData)
      await group.save()
      return response.ok(group)
    }
  
    public async destroy({ params, response }: HttpContextContract) {
      const group = await Group.findOrFail(params.id)
      await group.delete()
      return response.noContent()
    }

    public async getGroups({params, response}: HttpContextContract){

        try {
          const { user1 } = params
  
          let query = `
          select 
          *,  
          g.id as group_id from groups as g
          where g.user_1 = ? or g.user_2 = ?
          group by id
          ;
          `
          const groups = await Database.rawQuery(query, [user1,user1])
          const users = [];

          for(let group of groups.rows){

            let id = null;
            if(group.user_1 != user1) id = group.user_1
            if(group.user_2 != user1) id = group.user_2

            console.log("id", id)
            let userInfo = (await Database.rawQuery(`
              SELECT id, name, user_name, thought, color from users where id = ${id} 
            `)).rows[0]

            userInfo.group_id = group.group_id;

            users.push(userInfo);
          }
          response.status(201)
          return{
            message: "recuperação dos grupos",
            group: [...users]
        }
        } catch (error) {
          console.log('error find groups',error)
        }  
    }
  }
  

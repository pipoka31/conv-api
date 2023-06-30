import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class AuthController {
    public async login({ request, response, auth }: HttpContextContract) {
       let {username, password} = request.all()
       
        try {

          let user = await User.findBy('user_name',username)

          if (user) {
            const isPasswordValid = await user.verifyPassword(password)
            let userFormatted = user.toJSON();
            delete userFormatted?.password
            return userFormatted;

          } else {
            return response.status(401).json({ error: 'Invalid credentials' });
          }
        } catch {
          return response.unauthorized('Invalid credentials')
        }
      }

      public async pusherAuth({ request, params }: HttpContextContract){

        const { socket_id, channel_name, cod, name, username, } = request.body();

        const Pusher = require('pusher')

        const pusher = new Pusher({
          appId: "1624923",
          key: "0fb0d6b89d9dcdaeb894",
          secret: "d43f41f7befcc6d33bb9",
          cluster: "sa1",
          useTLS: true
        });

        const socketId = socket_id;
        const channel = channel_name;

        const presenceData = {
          user_id: cod,
          user_info: { name, username, status:"online" }
        };
        // This authenticates every user. Don't do this in production!
        const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);
        
        return (authResponse);
        
      }
}

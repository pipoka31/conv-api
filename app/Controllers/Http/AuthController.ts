import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import axios from 'axios'

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


      public async spotifyRedirect({ response }) {
        const clientId = '42e764a831bf4a5b83a49f2f548ce1eb'
        const redirectUri = 'http://192.168.0.19:3333/auth/spotify/callback'
        const scopes = 'user-read-recently-played'
    
        try {
          // 1. Fazer a solicitação para obter a URL de autorização do Spotify
          const authorizeResponse = await axios.get('https://accounts.spotify.com/authorize', {
            params: {
              client_id: clientId,
              response_type: 'code',
              redirect_uri: redirectUri,
              scope: scopes,
            },
          });
    
          // 2. Retornar a URL de redirecionamento para o frontend
          const redirectUrl = authorizeResponse.request.res.responseUrl;
          if (!redirectUrl) {
            throw new Error('Redirect URL not found');
          }

          return response.json({ redirectUrl });
        } catch (error) {
          console.error('Erro ao obter URL de redirecionamento do Spotify:', error);
          // Trate o erro de acordo com a necessidade do seu backend
          return response.status(500).json({ error: 'Erro ao obter URL de redirecionamento do Spotify' });
        }
      }
    
      public async spotifyCallback({ request, response }) {
        const clientId = '42e764a831bf4a5b83a49f2f548ce1eb'
        const clientSecret = '167b8b85ebf745c5abc40a94ef1ee2d0'
        const redirectUri = 'http://192.168.0.19:3333/auth/spotify/callback'
        const code = request.input('code')
    
        const tokenParams = new URLSearchParams()
        tokenParams.append('code', code)
        tokenParams.append('redirect_uri', redirectUri)
        tokenParams.append('grant_type', 'authorization_code')
        tokenParams.append('client_id', clientId)
        tokenParams.append('client_secret', clientSecret)
    
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', tokenParams, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
    
        const accessToken = tokenResponse.data.access_token

        // Armazene o accessToken para uso posterior
        
        // Agora você pode redirecionar para outra rota onde exibirá as últimas músicas do usuário
        return response.redirect().toRoute('recently-played', { accessToken })
      }

}

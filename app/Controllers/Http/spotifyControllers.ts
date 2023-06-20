import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SpotifyService from 'App/Services/Spotify/spotifyServices'
import axios from 'axios'


const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize'
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_API_URL = 'https://api.spotify.com/v1'
const SPOTIFY_CLIENT_ID = '42e764a831bf4a5b83a49f2f548ce1eb'
const SPOTIFY_CLIENT_SECRET='167b8b85ebf745c5abc40a94ef1ee2d0'
const SPOTIFY_REDIRECT_URI = 'http://localhost:3333/auth/spotify/callback'

export default class spotifyControllers {
    
  public async getUserProfile({response }: HttpContextContract) {
        const clientId = '42e764a831bf4a5b83a49f2f548ce1eb';
        const clientSecret = '167b8b85ebf745c5abc40a94ef1ee2d0';
    
        const spotifyService = new SpotifyService(clientId, clientSecret);
        try {
          const userProfile : any= await spotifyService.getUserProfile();
          return response.status(200).json(userProfile);
        } catch (error) {
            console.log(error)
          return response.status(500).json({ message: 'Erro ao obter o perfil do usuário do Spotify' });
        }
      }

      public async redirectToLogin({ response }: HttpContextContract) {
        const scopes = ['user-read-private', 'user-read-email']
        const state = Math.random().toString(36).substring(2, 15) // Gerar um estado aleatório
        
        const authUrl = `${SPOTIFY_AUTH_URL}?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${scopes.join(
          '%20'
        )}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&state=${state}`
    
        response.redirect(authUrl)
      }

      public async handleCallback({ request, response }: HttpContextContract) {
        const { code } = request.qs()
    
        // Verificar se o estado retornado é o mesmo que foi enviado anteriormente
    
        const data = {
          grant_type: 'authorization_code',
          code,
          redirect_uri: SPOTIFY_REDIRECT_URI,
          client_id: SPOTIFY_CLIENT_ID,
          client_secret: SPOTIFY_CLIENT_SECRET,
        }
    
        try {
          // Obter o token de acesso do Spotify
          const tokenResponse = await axios.post(SPOTIFY_TOKEN_URL, null, {
            params: data,
          })
    
          const { access_token, refresh_token } = tokenResponse.data
    
          // Agora você pode usar o access_token para fazer solicitações à API do Spotify
          // Por exemplo, para obter os detalhes do perfil do usuário
    
          const profileResponse = await axios.get(`${SPOTIFY_API_URL}/me`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
    
          const userProfile = profileResponse.data
    
          // Faça o que precisar com as informações do usuário
    
          return response.json({
            userProfile,
            access_token,
            refresh_token,
          })
        } catch (error) {
          console.error(error)
          return response.status(500).json({ error: 'Internal server error' })
        }
      }

    
}


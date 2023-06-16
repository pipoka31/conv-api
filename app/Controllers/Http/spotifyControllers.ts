import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SpotifyService from 'App/Services/Spotify/spotifyServices'

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

    
}


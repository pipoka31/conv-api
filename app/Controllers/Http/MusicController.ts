import axios from 'axios'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

class MusicController {
  public async recentlyPlayed({ response, params }: HttpContextContract) {
    const accessToken = params.accessToken
    // Recupere o accessToken armazenado ou utilize o sistema de autenticação do Adonis.js para obtê-lo

    const recentlyPlayedUrl = 'https://api.spotify.com/v1/me/player/recently-played?limit=20'

    try {
      const recentlyPlayedResponse = await axios.get(recentlyPlayedUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      const recentlyPlayed = recentlyPlayedResponse.data.items
      // Faça o que for necessário com as últimas músicas do usuário

      return response.json(recentlyPlayed)
    } catch (error) {
      console.error(error)
      return response.status(error.response.status).json({ error: 'Erro ao obter as músicas recentes' })
    }
  }
}

export default MusicController

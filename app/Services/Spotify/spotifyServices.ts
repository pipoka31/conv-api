import axios from 'axios';

export default class SpotifyService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private accessToken: string | null = null;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  private async authenticate(): Promise<void> {
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        null,
        {
          params: {
            grant_type: 'client_credentials',
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
          },
        }
      );

      this.accessToken = response.data.access_token;
      console.log(this.accessToken)
    } catch (error) {
      throw new Error('Falha na autenticação com a API do Spotify');
    }
  }

  public async getUserProfile(): Promise<any> {
    try {
      if (!this.accessToken) {
        await this.authenticate();
      }
      
       return (this.accessToken)

      
    } catch (error) {
      throw new Error('Falha ao obter o perfil do usuário do Spotify');
    }
  }
}

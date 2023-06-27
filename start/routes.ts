/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.post('/createUser',"UsersControllers.store")

Route.post('/createMessege',"MessengeControllers.store")

Route.post('/createConversation',"ConversationControllers.store")

Route.post('/login','AuthController.login')

Route.get('/spotify/user-profile','SpotifyControllers.getUserProfile')

Route.get('/conversations/:userSenderId/:userReceiverId', 'ConversationControllers.getConversation')

Route.get('/auth/spotify', 'spotifyControllers.redirectToLogin')

Route.get('/auth/spotify/callback', 'SpotifyControllers.handleCallback')

Route.get('/userInfo/:id','UsersControllers.getUserInfo')
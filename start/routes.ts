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

Route.get('/conversations/:group_id', 'ConversationControllers.getConversation')

Route.get('/auth/spotify', 'spotifyControllers.redirectToLogin')

Route.get('/userInfo/:id','UsersControllers.getUserInfo')

Route.post('/pusher/auth', 'AuthController.pusherAuth')

Route.put('/updateUser/:id', "UsersControllers.update");

Route.post('/createGroup', "GroupController.store")

Route.get('/groups/:user1','GroupController.getGroups')

Route.get('/groupID/:user_1/:user_2','GroupController.getIDGroup')

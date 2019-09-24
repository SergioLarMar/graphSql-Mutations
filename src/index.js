// Carga de GraphSQLServer y todos los archivos
import { GraphQLServer } from 'graphql-yoga'
//array de data
import db from './db'
// Resolvers Queries
import Query from './resolvers/Query'
// Resolvers mutation
import Mutation from './resolvers/Mutation'
// Resolvers modelo Usuarios
import User from './resolvers/User'
// Resolvers modelo Pos
import Post from './resolvers/Post'
// Resolvers modelo Comentarios
import Comment from './resolvers/Comment'
// Iniciar el objeto  GraphQLServer
const server = new GraphQLServer({
    // Esquema de graphql
    typeDefs: './src/schema.graphql',
    //resolvers
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context: {
        db
    }
})

server.start(() => {
    console.log('The server is up!')
})
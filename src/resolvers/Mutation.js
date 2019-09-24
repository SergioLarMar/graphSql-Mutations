//genedor aleatorio de UUID
import uuidv4 from 'uuid/v4'

const Mutation = {
    //Crear Usuarios
    createUser(parent, args, { db }, info) {
        //mirar si el email esta en la base datos
        const emailTaken = db.users.some((user) => user.email === args.data.email)
         //Comprobar que no existe el mismo mail
        if (emailTaken) {
            throw new Error('Email taken')
        }
        // Insertar id y los valores a traves de babel-plugin-transform-object-rest-spread"
        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    // Borrar usuarios
    deleteUser(parent, args, { db }, info) {
        // comprobar si existe el usuario en el array
        const userIndex = db.users.findIndex((user) => user.id === args.id)
        // si el indice es -1 no existe
        if (userIndex === -1) {
            throw new Error('User not found')
        }
        //Borrar usuario
        const deletedUsers = db.users.splice(userIndex, 1)
         // comprobar si tiene post el usuario
        db.posts = db.posts.filter((post) => {
            // Si coincide el post.athor con los argumentos de la id
            const match = post.author === args.id
           
            if (match) {
                db.comments = db.comments.filter((comment) => comment.post !== post.id)
            }

            return !match
        })
          // comprobar si tiene comentarios con el post.id
        db.comments = db.comments.filter((comment) => comment.author !== args.id)

        return deletedUsers[0]
    },
    createPost(parent, args, { db }, info) {
        // Crear Post, si existe el usuario, coincide user id y author
        const userExists = db.users.some((user) => user.id === args.data.author)
        //error sino existe el usuario
        if (!userExists) {
            throw new Error('User not found')
        }
        // Insertar id y los valores a traves de babel-plugin-transform-object-rest-spread
        const post = {
            id: uuidv4(),
            ...args.data
        }
        // meterlo al array con el metodo push
        db.posts.push(post)

        return post
    },
    deletePost(parent, args, { db }, info) {
         // comprobar si existe el usuario en el array
        const postIndex = db.posts.findIndex((post) => post.id === args.id)
        // si el indice es -1 no existe
        if (postIndex === -1) {
            throw new Error('Post not found')
        }
        // Borrar post con el metodo slice en el array
        const deletedPosts = db.posts.splice(postIndex, 1)

        db.comments = db.comments.filter((comment) => comment.post !== args.id)

        return deletedPosts[0]
    },
    createComment(parent, args, { db }, info) {
        // comprobar si en la data esiste el autor e ide del post y si esta publicado
        const userExists = db.users.some((user) => user.id === args.data.author)
        const postExists = db.posts.some((post) => post.id === args.data.post && post.published)
         //sino existe el usuario o el post, error
        if (!userExists || !postExists) {
            throw new Error('Unable to find user and post')
        }
        // Insertar id y los valores a traves de babel-plugin-transform-object-rest-spread
        const comment = {
            id: uuidv4(),
            ...args.data
        }
        //push, meterlo en el array
        db.comments.push(comment)

        return comment
    },
    deleteComment(parent, args, { db }, info) {
        // comprobar si existe el usuario en el array
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)
        // si da -1 no existe el comentario, arrojar error
        if (commentIndex === -1) {
            throw new Error('Comment not found')
        }
        // borrar comentario con el metodo splice
        const deletedComments = db.comments.splice(commentIndex, 1)

        return deletedComments[0]
    }
}

export { Mutation as default }
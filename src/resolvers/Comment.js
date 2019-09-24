// Comments Resolver del tipo Commnents
const Comment = {
    author(parent, args, { db }, info) {
        //Buscar un autor de un post
        return db.users.find((user) => {
            return user.id === parent.author
        })
    },
    post(parent, args, { db }, info) {
        //Buscar post
        return db.posts.find((post) => {
            return post.id === parent.post
        })
    }
}

export { Comment as default }
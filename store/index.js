import Vuex from 'vuex'
//import axios from 'axios' //not needed now as we have enjected @nuxt/axios module globally for our project so it can be accessed as this.$axios with special methods like $get,$post
const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            addPost(state, post) {
                state.loadedPosts.push(post);
            },
            editPost(state, editedPost) {
                postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
                state.loadedPosts[postIndex] = editedPost;
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios.$get("/posts.json")
                    .then(data => { // not response coz nuxt.axios gives just data not full response.
                        console.log(data);
                        const postsArray = [];
                        for (const key in data) {
                            postsArray.push({...data[key], id: key })
                        }
                        vuexContext.commit('setPosts', postsArray)
                    }).catch(e => context.error(e))
            },
            addPost(vuexContext, post) {
                const createdPost = {...post, date: new Date() };
                return this.$axios
                    .$post("/posts.json", createdPost)
                    .then(data => {
                        console.log(data);
                        vuexContext.commit('addPost', {...createdPost, id: data.name });
                    })
                    .catch(e => console.log(e));
            },
            editPost(vuexContext, editedPost) {
                return this.$axios
                    .$put('/posts/' + editedPost.id + '.json', editedPost)
                    .then(res => {
                        vuexContext.commit('editPost', editedPost);
                    })
                    .catch(e => console.log(e))
            }
        },
    })
}
export default createStore
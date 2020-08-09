import Vuex from 'vuex'
import axios from 'axios'
const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return axios.get("https://nuxt-blog-fcd31.firebaseio.com/posts.json")
                    .then(res => {
                        console.log(res.data);
                        const postsArray = [];
                        for (const key in res.data) {
                            postsArray.push({...res.data[key], id: key })
                        }
                        vuexContext.commit('setPosts', postsArray)
                    }).catch(e => context.error(e))
            },
        },
    })
}
export default createStore
import Vuex from 'vuex';
import Cookie from 'js-cookie';
//import axios from 'axios' //not needed now as we have enjected @nuxt/axios module globally for our project so it can be accessed as this.$axios with special methods like $get,$post
const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
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
            },
            setToken(state, token) {
                state.token = token;
            },
            clearToken(state) {
                state.token = null;
            },
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token != null;
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
                    .$post("/posts.json?auth=" + vuexContext.state.token, createdPost)
                    .then(data => {
                        console.log(data);
                        vuexContext.commit('addPost', {...createdPost, id: data.name });
                    })
                    .catch(e => console.log(e));
            },
            editPost(vuexContext, editedPost) {
                return this.$axios
                    .$put('/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
                    .then(res => {
                        vuexContext.commit('editPost', editedPost);
                    })
                    .catch(e => console.log(e))
            },
            authenticateUser(vuexContext, authData) {
                let authUrl = '';
                if (!authData.isLogin) {
                    authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
                } else {
                    authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
                }
                return this.$axios
                    .$post(authUrl + process.env.firebaseApiKey, {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true,
                    })
                    .then((result) => {
                        console.log("request Succeded!");
                        console.log(result);
                        vuexContext.commit("setToken", result.idToken);
                        localStorage.setItem("token", result.idToken);
                        localStorage.setItem("tokenExpiresIn", new Date().getTime() + Number.parseInt(result.expiresIn) * 1000);
                        Cookie.set("jwt", result.idToken);
                        Cookie.set("tokenExpiresIn", new Date().getTime() + Number.parseInt(result.expiresIn) * 1000);
                    })
                    .catch(e => console.log(e))
            },
            initAuth(vuexContext, req) {
                console.log("I am started");
                let token, expirationDate;
                if (req) {
                    console.
                    log('request object is not null(server side).')
                    if (!req.headers.cookie) {
                        return;
                    }
                    const jwtCookie = req.headers.cookie.split(";").find(c => c.trim().startsWith("jwt="));
                    if (!jwtCookie) {
                        return
                    }
                    token = jwtCookie.split('=')[1];
                    expirationDate = req.headers.cookie.split(";").find(c => c.trim().startsWith("tokenExpiresIn=")).split('=')[1];

                } else {
                    console.log("request object null (client side).")
                    token = localStorage.getItem("token");
                    expirationDate = localStorage.getItem("tokenExpiresIn");
                }
                if (new Date().getTime() > expirationDate || !token) {
                    console.log("No token or invalid token.");
                    vuexContext.commit('clearToken');
                }
                vuexContext.commit('setToken', token);
            },
            logout(vuexContext) {
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('tokenExpiresIn');
                if (process.client) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiresIn');
                }
            }
        },
    })
}
export default createStore
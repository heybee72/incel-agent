/**
 * Auth Module
 */
import Vue from 'vue';
import axios from 'axios';
import firebase from 'firebase/app';
import Nprogress from 'nprogress';
import router from '../../../router';
import {
    facebookAuthProvider,
    googleAuthProvider,
    twitterAuthProvider,
    githubAuthProvider
} from '../../../firebase';

const state = {
    user: localStorage.getItem('user'),
    isUserSigninWithAuth0: Boolean(localStorage.getItem('isUserSigninWithAuth0'))
}
const BASE_URL = "https://test.mulloy.co/api/";
// getters
const getters = {
    getUser: state => {
        return state.user;
    },
    isUserSigninWithAuth0: state => {
        return state.isUserSigninWithAuth0;
    }
}

// actions
const actions = {

    async signinUser(context, payload) {
        const {
            user
        } = payload;
        context.commit('loginUser');

        try {
            const response = await axios.post(BASE_URL + 'agents/login', user); // Success.
            // console.log(response.data.token)
            delete user["password"];
            user["token"] = response.data.token;
            context.commit('loginUserSuccess', user);
        } catch (e) {
            if (e.response) {
                let status = e.response.status;
                if (status == 400) {
                    context.commit('loginUserFailure', e.response.data.error || 'no user found');
                } else {
                    context.commit('loginUserFailure', "Unable to login, try again");
                }
                console.log(e.response.data);
                console.log(e.response.headers);
            } else {
                context.commit('loginUserFailure', "Unable to login, try again");
            }
            console.log(e.response.data);
            // let decoded = JSON.parse(e.response.data);
            // context.commit('loginUserFailure', e.response.data.error);
        }

        /* firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(user => {
                Nprogress.done();
                setTimeout(() => {
                    context.commit('loginUserSuccess', user);
                }, 500)
            })
            .catch(error => {
                context.commit('loginUserFailure', error);
            }); */


    },

    async signUpUser(context, payload) {
        // const {
        //     user
        // } = payload;
        context.commit('loginUser');
        // console.log(user)

        try {
            const response = await axios.post(BASE_URL + 'agents/register', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }); // Success.
            console.log(response.data)
            // delete user["password"];
            // user["token"] = response.data.token;
            context.commit('signUserSuccess');
        } catch (e) {
            // if (e.response) {
            //     let status = e.response.status;
            //     if (status == 400) {
            //         context.commit('loginUserFailure', e.response.data.error || 'no user found');
            //     } else {
            //         context.commit('loginUserFailure', "Unable to login, try again");
            //     }
            //     console.log(e.response.data);
            //     console.log(e.response.headers);
            // } else {
                context.commit('loginUserFailure', "Unable to sign up, try again");
            // }
            console.log(e.response);
            // let decoded = JSON.parse(e.response.data);
            // context.commit('loginUserFailure', e.response.data.error);
        }

    },


    signinUserInFirebase(context, payload) {
        const {
            user
        } = payload;
        context.commit('loginUser');
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(user => {
                Nprogress.done();
                setTimeout(() => {
                    context.commit('loginUserSuccess', user);
                }, 500)
            })
            .catch(error => {
                context.commit('loginUserFailure', error);
            });
    },
    logoutUserFromFirebase(context) {
        Nprogress.start();
        firebase.auth().signOut()
            .then(() => {
                Nprogress.done();
                setTimeout(() => {
                    context.commit('logoutUser');
                }, 500)
            })
            .catch(error => {
                context.commit('loginUserFailure', error);
            })
    },
    signinUserWithFacebook(context) {
        context.commit('loginUser');
        firebase.auth().signInWithPopup(facebookAuthProvider).then((result) => {
            Nprogress.done();
            setTimeout(() => {
                context.commit('loginUserSuccess', result.user);
            }, 500)
        }).catch(error => {
            context.commit('loginUserFailure', error);
        });
    },
    signinUserWithGoogle(context) {
        context.commit('loginUser');
        firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
            Nprogress.done();
            setTimeout(() => {
                context.commit('loginUserSuccess', result.user);
            }, 500)
        }).catch(error => {
            context.commit('loginUserFailure', error);
        });
    },
    signinUserWithTwitter(context) {
        context.commit('loginUser');
        firebase.auth().signInWithPopup(twitterAuthProvider).then((result) => {
            Nprogress.done();
            setTimeout(() => {
                context.commit('loginUserSuccess', result.user);
            }, 500)
        }).catch(error => {
            context.commit('loginUserFailure', error);
        });
    },
    signinUserWithGithub(context) {
        context.commit('loginUser');
        firebase.auth().signInWithPopup(githubAuthProvider).then((result) => {
            Nprogress.done();
            setTimeout(() => {
                context.commit('loginUserSuccess', result.user);
            }, 500)
        }).catch(error => {
            context.commit('loginUserFailure', error);
        });
    },
    signupUserInFirebase(context, payload) {
        let {
            userDetail
        } = payload;
        context.commit('signUpUser');
        firebase.auth().createUserWithEmailAndPassword(userDetail.email, userDetail.password)
            .then(() => {
                Nprogress.done();
                setTimeout(() => {
                    context.commit('signUpUserSuccess', userDetail);
                }, 500)
            })
            .catch(error => {
                context.commit('signUpUserFailure', error);
            })
    },
    signInUserWithAuth0(context, payload) {
        context.commit('signInUserWithAuth0Success', payload);
    },
    signOutUserFromAuth0(context) {
        context.commit('signOutUserFromAuth0Success');
    }
}

// mutations
const mutations = {
    loginUser() {
        Nprogress.start();
    },
    loginUserSuccess(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        state.isUserSigninWithAuth0 = false
        // router.push("/default/dashboard/ecommerce");
        router.push("/admin/dashboard");
        setTimeout(function () {
            Vue.notify({
                group: 'loggedIn',
                type: 'success',
                text: 'Agent Logged In Successfully!'
            });
        }, 1500); 
    },
    signUserSuccess() {
        // state.user = user;
        // localStorage.setItem('user', JSON.stringify(user));
        // state.isUserSigninWithAuth0 = false
        // router.push("/default/dashboard/ecommerce");
        router.push("/session/login");
        setTimeout(function () {
            Vue.notify({
                group: 'loggedIn',
                type: 'success',
                text: 'Agent Created Successfully!'
            });
        }, 1500); 
    },
    loginUserFailure(state, error) {
        Nprogress.done();
        Vue.notify({
            group: 'loggedIn',
            type: 'error',
            text: error
            // text: error.message
        });
    },
    logoutUser(state) {
        state.user = null
        localStorage.removeItem('user');
        router.push("/session/login");
    },
    signUpUser() {
        Nprogress.start();
    },
    signUpUserSuccess(state, user) {
        state.user = localStorage.setItem('user', user);
        router.push("/default/dashboard/ecommerce");
        Vue.notify({
            group: 'loggedIn',
            type: 'success',
            text: 'Account Created!'
        });
    },
    signUpUserFailure(state, error) {
        Nprogress.done();
        Vue.notify({
            group: 'loggedIn',
            type: 'error',
            text: error.message
        });
    },
    signInUserWithAuth0Success(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        state.isUserSigninWithAuth0 = true;
    },
    signOutUserFromAuth0Success(state) {
        state.user = null
        localStorage.removeItem('user')
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
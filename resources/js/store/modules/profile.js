const state     ={
    user:null,
    userStatus:null,


};

const getters   ={
    user:state=>{
        return state.user;
    },

    status:state=>{
        return {
            user:state.userStatus,
            posts:state.postsStatus,
        };
    },
    friendship:state =>{
        return state.user.data.attributes.friendship;
    },
    friendButtonText:(state,getters,rootState)=>{
        if(rootState.User.user.data.user_id === state.user.data.user_id){
         return '';
        }else if(getters.friendship === null){
            return 'Add Friend';
        }else if(getters.friendship.data.attributes.confirmed_at===null
        && getters.friendship.data.attributes.friend_id !== rootState.User.user.data.user_id)
        {
            return 'Pending Friend Request';
        }else if (getters.friendship.data.attributes.confirmed_at !==null){
            return '';
        }
        return 'Accept';

    }
};

const actions   ={
    fetchUser({commit,dispatch},userId){
        commit('setUserStatus','loading');

        axios.get('/api/users/'+userId)
            .then(res=>{
                commit('setUser',res.data);
                commit('setUserStatus','success');

            }).catch(error=>{
            commit('setUserStatus','error');
        });

    },

    sendFriendRequest({commit, getters}, friendId){
        if(getters.friendButtonText !== 'Add Friend'){
            return;
        }
        commit('setButtonText','Loading');
        axios.post('/api/friend-request',{'friend_id': friendId})
            .then(res=>{
                commit('setUserFriendship',res.data);
            })
            .catch(error=>{
                commit('setUserFriendship','Add Friend');
            });
    },
    acceptFriendRequest({commit, state}, userId){
            commit('setButtonText','Loading');
            axios.post('/api/friend-request-response',{'user_id': userId,'status':1})
                .then(res=>{
                    commit('setUserFriendship',res.data);
                })
                .catch(error=>{

                });
        },
    ignoreFriendRequest({commit, state}, userId){
            commit('setButtonText','Loading');
            axios.delete('/api/friend-request-response/delete',{data:{'user_id': userId}})
                .then(res=>{
                    commit('setUserFriendship',null);
                })
                .catch(error=>{

                });
        },

};

const mutations ={
    setUser(state,user){
        state.user=user;
    },
    setUserFriendship(state,friendship){
        state.user.data.attributes.friendship=friendship;
    },
    setUserStatus(state,status){
        state.userStatus=status;
    },
 

};

export default {
    state,getters,actions,mutations,
}

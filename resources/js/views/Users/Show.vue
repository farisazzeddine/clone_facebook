<template>
    <div class="flex flex-col items-center" v-if="status.user === 'success' && user ">
        <div class="relative mb-8">
                    <div class="w-100 h-64 overflow-hidden z-10">
                        <UploadableImage />
                    </div>
                    <div class="absolute flex items-center bottom-0 left-0 -mb-8 ml-12  z-20">
                        <div class="w-32">
                            <img src="../../../../ui/photo-1518806118471-f28b20a1d79d.jpg" alt=" profil image user"
                                 class="object-cover w-32 h-32 border-4 border-gray-200 rounded-full shadow-lg">
                        </div>
                            <p class="ml-4 text-2xl text-gray-100">{{ user.data.attributes.name}}</p>

                    </div>
                    <div class="absolute flex items-center bottom-0 right-0 mb-4 mr-12  z-20">
                            <button v-if="friendButtonText && friendButtonText !=='Accept' " class="py-1 px-3 bg-gray-400 rounded"
                            @click="$store.dispatch('sendFriendRequest',$route.params.userId)">
                                {{ friendButtonText }}
                            </button>
                            <button v-if="friendButtonText && friendButtonText ==='Accept'" class="mr-2 py-1 px-3 bg-gray-500 rounded"
                            @click="$store.dispatch('acceptFriendRequest',$route.params.userId)">
                                Accept
                            </button>
                            <button v-if="friendButtonText && friendButtonText ==='Accept'" class="  py-1 px-3 bg-gray-400 rounded"
                            @click="$store.dispatch('ignoreFriendRequest',$route.params.userId)">
                                Ignore
                            </button>
                    </div>
        </div>
            <div v-if="status.posts ==='loading'"> Loading Posts...</div>
            <div v-else-if=" posts.length <1 ">No Posts found. Get started... </div>
            <Post v-else v-for="(post, postKey) in posts.data" :key="postKey" :post="post" />
    </div>
</template>

<script>
    import Post from '../../components/Post';
    import UploadableImage from "../../components/UploadableImage";
    import {mapGetters} from 'vuex';
    export default {
        name: "Show",

        components:{
            Post,
            UploadableImage,
        },


        mounted() {
            this.$store.dispatch('fetchUser'        ,this.$route.params.userId);
            this.$store.dispatch('fetchUserPosts'   ,this.$route.params.userId);


        },
        computed: {
            ...mapGetters({
                user:'user',
                posts:'posts',
                status:'status',
                friendButtonText:'friendButtonText',
            }),
        }
    }
</script>

<style scoped>

</style>

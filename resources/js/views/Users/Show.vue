<template>
    <div class="flex flex-col items-center">
        <div class="relative mb-8">
                    <div class="w-100 h-64 overflow-hidden z-10">
                        <img src="../../../../ui/photo5922572005410976711.jpg" alt="user background image"
                             class="object-cover w-full">
                    </div>
                    <div class="absolute flex items-center bottom-0 left-0 -mb-8 ml-12  z-20">
                        <div class="w-32">
                            <img src="../../../../ui/photo-1518806118471-f28b20a1d79d.jpg" alt=" profil image user"
                                 class="object-cover w-32 h-32 border-4 border-gray-200 rounded-full shadow-lg">
                        </div>
                            <p class="ml-4 text-2xl text-gray-100">{{ user.data.attributes.name}}</p>

                    </div>
        </div>
            <p v-if="postloading"> Loading Posts...</p>
            <Post v-else v-for="post in posts.data" :key="post.data.post_id" :post="post" />
            <p v-if="! postloading && posts.data.length <1 ">No Posts found. Get started... </p>
    </div>
</template>

<script>
    import Post from '../../components/Post'
    export default {
        name: "Show",

        components:{
            Post,
        },

        data: () =>{
            return{
                user:null,
                posts:null,
                userloading:true,
                postloading:true,
            }
        },
        mounted() {
            axios.get('/api/users/'+ this.$route.params.userId)
                 .then(res =>{
                     this.user = res.data;


            })
                .catch(error =>{
                    console.log('Unable to fetch the user from the server.');


                }).finally(()=>{
                this.userloading = false;
            });
            axios.get('/api/users/'+ this.$route.params.userId+'/posts')
                .then(res =>{
                this.posts=res.data;


            })
                .catch(error =>{
                    console.log('Unable to fetch posts');


                })
                .finally(()=>{
                this.postloading = false;
                });
        }
    }
</script>

<style scoped>

</style>

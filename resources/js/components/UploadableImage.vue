<template>
    <div>
        <img src="https://trophicproducts.com/wp-content/uploads/2015/04/header-bg-nature3.jpg"
             alt="user background image"
             ref=""
             class="object-cover w-full">
    </div>
</template>

<script>
    import Dropzone from 'dropzone';
    export default {
        name: "UploadableImage",

        data:()=>{
            return{
                dropzone:null,
            }
        },
        mounted(){
            this.dropzone = new Dropzone(this.$refs.userImage,this.settings);
        },
        computed:{
            settings(){
                return {

                };
            }
        }
    }
</script>

<style scoped>

</style>

<template>
<div>
  <form @submit="postpost">
  <input type="text" v-model="title" placeholder="Geeft je project een title">
  <br>
  <input type="text" v-model="description" placeholder="Beschrijf hier je project">
  <br>
  <input type="text" v-model="catergory" placeholder="Wat voor project is het">
  <br>
  <button class="btn btn-success">Project aanmaken</button>
  </form>
</div>
</template>

<script>
import axios from "axios";
import projects from '@/components/project'

export default {
  name: 'NewProject',
  mounted(){
    console.log('Component mounted.')
  },
  data() {
    return {
      title: '',
      description: '',
      catergory: ''
    };
  },
  methods: {
      postpost(e) {
        e.preventDefault();
        this.axios.post("http://128.199.60.110:8000/api/projects", {
        title: this.title,
        description: this.description,
        catergory: this.catergory
      }) 
      
        .then(function (response) {
//        this.projects.push(currentObj)
        let item = response.data
        //this.projects.push(response.data)
        console.log(item)

                })
        .catch(function (error) {
        console.log(error)
        });
  }
  }
};
 console.log("hi")
         //console.log(projects)
</script>

<style>

</style>


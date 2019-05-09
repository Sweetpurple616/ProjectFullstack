<template>
<div class="row">


  <div>
  <form @submit="postpost(projects)">
  <input type="text" v-model="newTitle" placeholder="Geeft je project een title">
  <br>
  <input type="text" v-model="newDescription" placeholder="Beschrijf hier je project">
  <br>
  <input type="text" v-model="newCatergory" placeholder="Wat voor project is het">
  <br>
  <button class="btn btn-success">Project aanmaken</button>
  </form>
</div>


  <ul class="collapsible center-align">
     <li class="col s12 center-align" v-for="(item, index ) in projects">
      <div class="collapsible-header center-align "> <h3>{{ item.title }} </h3> </div>
      <div class="collapsible-body row">
      <div class="col s6">  
        
        <h4> {{ item.title}} </h4>
        <h4> {{ item.description}} </h4>
        <h5 > {{ item.catergory}} </h5>
        <label> id : {{ item._id }} </label>
        <button type="button" class="btn red" v-on:click="deleteData(item,projects, index)">Delete</button>
      </div>
      <form @submit="editData(item)" class="col s6">
          <input placeholder="Title" v-model="item.title" id="title" type="text">
          <input placeholder="Description" v-model="item.description" id="description" type="text">
          <input placeholder="Catergory" v-model="item.catergory" id="catergory" type="text">

        <button class="btn blue">Edit </button>

      </form>
      </div>
    </li>
  </ul>
  </div>
</template>


<script>
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
      });


import axios from 'axios'

export default {
  name: 'project',
  components: {
  },
  data () {
    return {
      projects: [],
      title: '',
      description: '',
      catergory: '',
      ongoing: '',
      newTitle: '',
      newDescription: '',
      newCatergory: ''

    }
  },
  methods : {
        postpost(projects) {
        this.axios.post("http://128.199.60.110:8000/api/projects", {
        title: this.newTitle,
        description: this.newDescription,
        catergory: this.newCatergory
      }) 
        .then(function (response) {
        let item = response.data
        projects.push(response.data)
        console.log(item)



                })
        .catch(function (error) {
        console.log(error)
        });
  },
    deleteData(item,projects,index){

    axios.delete('http://128.199.60.110:8000/api/projects/' + item._id)
     
     
     
     .then(response => {
      projects.splice(index, 1);
      console.log(item)

       
     })
     .catch(err => {
     console.log(err)

     }) 
  },
      editData(item){
        let responseEdit
        // let currentObj = this;
        axios.put('http://128.199.60.110:8000/api/projects/' + item._id, {
        title: item.title,
        description: item.description,
        catergory: item.catergory,
        ongoing: item.ongoing
      })
            
        .then(function (response) {
        console.log(response.data)
        console.log('succes')
                
          })
        .catch(function (error) {
        console.log(error)
        });
      }
  },
  created () {
    axios.get('http://128.199.60.110:8000/api/projects')
      .then(response => {
        console.log(response.data.items)
        this.projects = response.data.items
        
      })
      .catch(err => {
        console.log(err)
      })
  },

}
</script>

<style scoped></style>

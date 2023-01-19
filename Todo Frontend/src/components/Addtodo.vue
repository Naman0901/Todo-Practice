<template>
<div>
  <h1>Add Task</h1>
  <form @submit="add">
    <input type="text" v-model="task" >
    <button type="submit">Submit</button>
    <ul>
      <li v-for="todo in todos" v-bind:key="todo.todo_id">{{todo.description}}
        <label v-if="todo.completed" v-bind:title="message">C</label>
      </li>
    </ul>
  </form>
</div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

export default {
  data () {
    return {
     task:'',
     todos:[],
     message: 'Completed Task'
    }
  },
  methods:{
    add: function(event){
      event.preventDefault();

      const newToDo={
        description: this.task,
        completed: false
      };
      this.$http.post('http://localhost:3000/todos',newToDo).
      then((data)=>{
        this.todos= [...this.todos, data.body];
      });

      this.task='';
    }
  },
  created(){
    this.$http.get('http://localhost:3000/todos').
      then((data)=>{
        this.todos= data.body
      });
  }
}
</script>

<style scoped>
div{
  border: 1px solid;
  text-align: center;
  margin: 50px 10px;
  padding: 30px;
  background-color: rgba(74, 228, 74, 0.900);
}
h1{
  margin-bottom: 50px;
  color:rgb(24, 41, 73);
}
input{
  width: 300px;
  height: 26px;
  border-radius: 12px;
  font-size: 20px;
  font-family: 'Times New Roman', Times, serif;
  text-indent: 7px;
}
button{
  width: 80px;
  height: 35px;
  border-radius: 15px;
  font-size: 16px;
  color: darkred;
  background: violet;
}
ul{
    list-style-type:disc;
    padding-top: 20px;
}
li{
    text-align: left;
    padding-bottom: 30px;
    margin: 5px;
    font-size: 25px;
    font-weight: bolder;
}
label{
  border:1px solid rgb(131, 58, 29);
  border-radius: 50px;
  background-color: lightblue;
  font-size: 14px;
  font-weight:900;
  padding: 1px;
  margin: 7px;
}
</style>


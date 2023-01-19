<template>
<div v-bind:class="{'completed' : todoItem.completed}">
  <p @click="markComplete">{{todoItem.description}}</p>
  <button @click="$emit('delete-todo-event', todoItem.todo_id)">Delete</button>
</div>
</template>

<script>

export default {
    props: ['todoItem'],
  data () {
    return {
      
    };
  },
  methods:{
    markComplete: function(){
      this.$http.put('http://localhost:3000/todos/'+this.todoItem.todo_id,{completed: !this.todoItem.completed}).
      then((data)=>console.log(data.body))
      this.todoItem.completed = !this.todoItem.completed;
    }
  }
};
</script>

<style scoped>
.completed{
  text-decoration: line-through;
}
button{
  width: 80px;
  height: 35px;
  border-radius: 15px;
  font-size: 16px;
  color: white;
  background: red;;
}
</style>

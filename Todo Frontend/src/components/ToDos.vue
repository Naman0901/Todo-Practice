<template>
  <div class="view">
    <h1>ToDo List</h1>
    <ul>
      <li v-bind:key="item.todo_id" v-for="item in TodoEntries">
        <item v-bind:todoItem="item" @delete-todo-event="deleteTodo(item.todo_id)" />
      </li>
    </ul>
  </div>
</template>

<script>
import ToDoItem from './ToDoItem.vue';
export default {
  components:{
    'item': ToDoItem
  },
  data() {
    return {
      TodoEntries: []
    };
  },
  methods:{
    deleteTodo: function(id){
      this.$http({
        url: 'http://localhost:3000/todos/'+id,
        method: 'DELETE',
        }).then(function(data){
        console.log(data.body);
        if(data){
      this.TodoEntries = this.TodoEntries.filter(item=> item.todo_id != id)
        }
      })
    }
  },
  beforeCreate(){
    this.$http.get('http://localhost:3000/todos').then(
      function(data){
        this.TodoEntries = data.body;
      }
    )
  }
};
</script>
<style scoped>
.view{
  border: 1px solid;
  text-align: center;
  margin: 50px 10px;
  padding: 30px;
  background-color: rgba(72, 161, 221, 0.87);
}
h1{
  margin-bottom: 50px;
  color:rgb(131, 58, 29);
}
ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li{
    flex-grow: 1;
    text-align: center;
    padding-bottom: 30px;
    border: 1px solid #222;
    margin: 5px;
    font-size: 25px;
    font-weight: bolder;
}
</style>
 
<template>
  <div>
    <app-header></app-header>
     <router-view></router-view>
  </div>
</template>

<script>
import ToDos from "./components/ToDos.vue";
import Addto from "./components/Addtodo.vue";
import Header from "./components/header.vue";

export default {
  components: {
    'todo': ToDos,
    "addto": Addto,
    'app-header': Header
  },
  data() {
    return {
      title: "Todo App",
    };
  },
  methods: {
    
  }
};
</script>

<style scoped>
</style>
 
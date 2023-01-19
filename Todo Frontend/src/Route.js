import ToDos from "./components/ToDos.vue";
import Addto from "./components/Addtodo.vue";
import axios from 'axios';

export default[
    {path: '/', component: ToDos},
    {path: '/add', component: Addto}
]


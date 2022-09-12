import {createWebHistory, createRouter} from "vue-router"
import TheMain from "@/pages/TheMain"
import TaskList from "@/pages/TaskList.vue"


const routes = [
  {
    path: "/",
    name: "Main",
    component: TheMain
  },
  {
    path: "/task-list",
    name: "Task",
    component: TaskList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;

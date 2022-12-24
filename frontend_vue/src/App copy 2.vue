<script setup lang="ts">
import * as utils from "./components/utils";
import axios from "axios";
import { ref, onMounted, computed, watch } from "vue";
import { defineStore } from "pinia";
import Cart from "./CartComp.vue";
import { useCartStore } from "./stores/cart";
import { nullLiteral } from "@babel/types";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000/"; // the FastAPI backend

defineProps<{
  msg: string;
}>();

const useRequestStore = defineStore("request", {
  state: () => {
    return { data: undefined };
  },
  getters: {
    g_get(): any {
      return this.data;
    },
  },
  actions: {
    a_get(): any {
      return this.data;
    },
    a_set(data: any) {
      this.data = data;
    },
  },
});

const useTodos = defineStore('todos', {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    // type will be automatically inferred to number
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // autocompletion! ✨
      // @ts-ignore
      return state.todos.filter((todo) => todo.isFinished)
    },
    unfinishedTodos(state) {
      // @ts-ignore
      return state.todos.filter((todo) => !todo.isFinished)
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(state) {
      if (this.filter === 'finished') {
        // call other getters with autocompletion ✨
        // @ts-ignore
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        // @ts-ignore
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    // any amount of arguments, return a promise or not
      // @ts-ignore
    addTodo(text) {
      // you can directly mutate the state
      // @ts-ignore
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})

const useRequestStore1 = () => {
  defineStore("request1", () => {
    const response = ref({});
    function setter(responseArg: any) {
      // @ts-ignore
      response.value = responseArg;
    }

    return { response, setter };
  });
}

const todos = useTodos();
const cart = useCartStore();
const requestStore = useRequestStore();
const name = ref([]);

const input_content = ref('');
const input_category = ref(null);

// const todo_asc = computed(() =>
//   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
//   todos.value.sort((a, b) => {
//     // @ts-ignore
//     return a.createdAt - b.createdAt;
//   })
// );

let value = null;

async function getData() {
  const data = utils.ConstructorAction1(
    {},
    "",
    utils.HttpMethods.Get(),
    3000,
    false
  );
  const response = await data();
  
  todos.addTodo(response.Hello);

  requestStore.a_set(response.Hello);

  console.log("requestStore: ", requestStore.$state.data);

  console.log("todos: ", todos.$state.todos);
}

function getData2() {
  console.log("test");
  axios.get("").then((response) => {
    console.log(response);
  });
}

const addTodo = () => {

};

watch(name, (newValue, oldValue) => {
  console.log(`${oldValue} => ${newValue}`);
  localStorage.setItem("name", `${newValue}` || "");
});





</script>

<template>

  <Cart/>

  <div>
    <ul data-testid="items">
          
          <li v-for="//@ts-ignore
          item in cart.items" :key="  
          // @ts-ignore
          item.name">
          
            {{ 
            // @ts-ignore 
            item.name }} ({{ 
            // @ts-ignore 
            item.amount }})
            <button @click="
            // @ts-ignore 
            cart.removeItem(item.name)" type="button">X</button>
          </li>
        </ul>
  </div>

  <div>
    {{requestStore.a_get()}}
  </div>

  <main class="app">
    <section class="greetings">
      <h2 class="title">
        What's up {{ name }}
        <input type="text" placeholder="name" v-model="name" />
      </h2>
    </section>
    <section class="addTodo">
      <form @submit.prevent="addTodo">
        <input type="text" />
      </form>
    </section>
  </main>

  <div class="custom_div_1">
    <header class="custom_header_1">header</header>
    <main class="custom_main_1">
      main
      <button @click="getData">get</button>
    </main>
    <footer class="custom_footer_1">footer</footer>
  </div>
</template>

<style scoped>
.custom_div_1 {
  margin: 0;
  padding: 0;
  text-align: center;
  place-items: center;
  justify-content: space-between;
}

.custom_header_1 {
  display: flex;
  text-align: center;
  place-items: center;
  justify-content: space-between;
}

.custom_main_1 {
  display: flex;
  text-align: center;
  place-items: center;
  justify-content: space-between;
  max-height: 100vh;
}

.custom_footer_1 {
  display: flex;
  text-align: center;
  place-items: center;
  justify-content: space-between;
}
</style>

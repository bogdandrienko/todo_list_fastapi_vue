<script setup lang="ts">
// region import
import { ref } from "vue";
import axios from "axios";
import * as utils from "./components/utils";
// endregion import

//

// region settings
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000/"; // the FastAPI backend
// endregion settings

//

// region store
const todosGetStore = utils.ConstructorStore("todosGet");
const todosCreateStore = utils.ConstructorStore("todosCreateStore");
const todosUpdateStore = utils.ConstructorStore("todosUpdateStore");
// endregion store

//

// region state
const titleForm = ref("");
const descriptionForm = ref("");
// endregion state

//

// region functions
function resetForm() {
  titleForm.value = "";
  descriptionForm.value = "";
}

// @ts-ignore
async function createTodos(form) {
  await utils.ConstructorAction1(
    {
      title: form.target.title.value,
      description: form.target.description.value,
    },
    "/todos/",
    utils.HttpMethods.Post(),
    3000,
    false,
    todosCreateStore
  )();
  resetForm();
  getTodos();
}

// @ts-ignore
async function updateTodos(form) {
  await utils.ConstructorAction1(
    {
      id: form.target.id.value,
      title: form.target.title.value,
      description: form.target.description.value,
    },
    "/todos/",
    utils.HttpMethods.Put(),
    3000,
    false,
    todosUpdateStore
  )();
  getTodos();
}

async function getTodos() {
  await utils.ConstructorAction1(
    {},
    "/todos/",
    utils.HttpMethods.Get(),
    3000,
    false,
    todosGetStore
  )();
}
// endregion functions
</script>

<template>
  <div class="custom_div_1">
    <header class="custom_header_1">
      <h1>Todo list with Fast Api + Vue3</h1>
    </header>
    <main class="custom_main_1">
      <div>
        <p>{{ todosCreateStore.load ? "...sending..." : "" }}</p>
        <p>{{ todosCreateStore.data ? todosCreateStore.data : "" }}</p>
        <p>
          {{ todosCreateStore.back_error ? todosCreateStore.back_error : "" }}
        </p>
        <p>
          {{ todosCreateStore.front_error ? todosCreateStore.front_error : "" }}
        </p>
      </div>
      <div>
        <form
          @submit.prevent="createTodos"
          method="POST"
          enctype="multipart/form-data"
        >
          <input
            type="text"
            placeholder="enter here 'Title' of task"
            minlength="3"
            maxlength="20"
            v-model="titleForm"
            name="title"
            required
            class="custom_el_1"
          />
          <input
            type="text"
            placeholder="enter here 'Description' of task"
            minlength="3"
            maxlength="50"
            v-model="descriptionForm"
            name="description"
            required
            class="custom_el_1"
          />
          <button type="submit" class="custom_el_1">submit</button>
          <button @click="resetForm" type="reset" class="custom_el_1">
            reset
          </button>
        </form>
      </div>

      <div>
        <p>{{ todosGetStore.load ? "...loading..." : "" }}</p>
        <p>{{ todosGetStore.data ? "" : "data not found" }}</p>
        <p>{{ todosGetStore.back_error ? todosGetStore.back_error : "" }}</p>
        <p>{{ todosGetStore.front_error ? todosGetStore.front_error : "" }}</p>
      </div>

      <div>
        <div>
          <ul data-testid="items">
            <li
              v-for="//@ts-ignore
          todo, index in todosGetStore.data"
              :key="
                // @ts-ignore
                todo.title
              "
              class="custom_li_1"
            >
              <form
                @submit.prevent="updateTodos"
                method="PUT"
                enctype="multipart/form-data"
              >
                <input
                  type="hidden"
                  :value="
                    //@ts-ignore
                    index
                  "
                  name="id"
                />
                <input
                  type="text"
                  placeholder="enter here 'Title' of task"
                  minlength="3"
                  maxlength="50"
                  :defaultValue="
                    //@ts-ignore
                    todo.title
                  "
                  name="title"
                  class="custom_el_1"
                />
                <input
                  type="text"
                  placeholder="enter here 'Description' of task"
                  minlength="3"
                  maxlength="50"
                  :defaultValue="
                    //@ts-ignore
                    todo.description
                  "
                  name="description"
                  class="custom_el_1"
                />
                <button type="submit" class="custom_el_1">submit</button>
                <button type="reset" class="custom_el_1">reset</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
      <button @click="getTodos">get</button>
    </main>
    <footer class="custom_footer_1"></footer>
  </div>
</template>

<style scoped>
.custom_el_1 {
  margin: 1px;
  padding: 1px;
  text-align: center;
  place-items: center;
  justify-content: space-between;
}

.custom_li_1 {
  margin: 3px;
  padding: 3px;
  text-align: center;
  place-items: center;
  justify-content: space-between;
}

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

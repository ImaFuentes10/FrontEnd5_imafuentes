import axios from "axios";

/* Este MODULO que maneja todo el estado de la aplicación, concentra la funcionalidad para manipular datos */
const BASE_URL_API = "http://localhost:3005/api";


/* funciton getTodos */
/* gets todos from API */
export const getTodos = async () => {
  try {
    const todos = await axios.get(`${BASE_URL_API}/todos`);
    console.log("llamada axios", todos);
    return todos.data;
  } catch (err) {
    console.log("Error al obtener los TODOs:", err);
    return [];
  }
};


/* addTodo */
/* Ejecutar función para añadir un nuevo pendiente, a un listado de pendientes y si es a traves de API, llamar a la API con un POST para crear. */
export async function addTodo(item) {
  
  try {
    const response = await axios.post(`${BASE_URL_API}/todos`, {
      ...item,
      done: 0,
    });
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log("Error al crear el TODO :", err);
    return {};
  }
}


/* toggleDone function */
/*toggles todo state and uploads change to API*/
export async function toggleDone(id) {
  const todos = await getTodos();
  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    console.log("No se encontró el TODO con id:", id);
    return;
  }

  todo.done = !todo.done;
  //console.log("Toggle done:", todo);

  try {
    await axios.put(`${BASE_URL_API}/todos/${id}`, {
      done: todo.done,
    });
  } catch (err) {
    console.log("Error al actualizar el TODO:", err);
  } 
}


/* removeTodo function */
/* Deletes todo from API */
export async function removeTodo(id) {
  const todos = await getTodos();
  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    console.log("No se encontró el TODO con id:", id);
    return;
  }

  try {
    await axios.delete(`${BASE_URL_API}/todos/${id}`);
    console.log("Todo eliminado:", todo);
  } catch (err) {
    console.log("Error al eliminar el TODO:", err);
  }
}


/* funciton getUsers */
/* gets users from API */
export const getUsers = async () => {
  try {
    const users = await axios.get(`${BASE_URL_API}/users`);
    console.log("llamada axios", users);
    return users.data;
  } catch (err) {
    console.log("Error al obtener los usuarios:", err);
    return [];
  }
};


/* addUser */
/* Adds a user to the API */
export async function addUser(item) {
  
  try {
    const response = await axios.post(`${BASE_URL_API}/users`, {
      ...item
    });
    console.log("test", response.data)
    return response.data;
  } catch (err) {
    console.log("Error al crear el usuario:", err);
    return {};
  }
}
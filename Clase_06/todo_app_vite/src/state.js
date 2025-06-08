import axios from "axios";

/* Este MODULO que maneja todo el estado de la aplicación, concentra la funcionalidad para manipular datos */
const BASE_URL_API = "http://localhost:3005/api";

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

/* export const todos = getTodos() */
//todos();
/* console.log(todos) */

/* addTodo */
/* Ejecutar función para añadir un nuevo pendiente, a un listado de pendientes y si es a traves de API, llamar a la API con un POST para crear. */
export async function addTodo(item) {

  const todos = await getTodos();
  
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

export async function toggleDone(id) {
  const todos = await getTodos();
  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    console.log("No se encontró el TODO con id:", id);
    return;
  }

  todo.done = !todo.done;
  console.log("Toggle done:", todo);

  try {
    await axios.put(`${BASE_URL_API}/todos/${id}`, {
      done: todo.done,
    });
  } catch (err) {
    console.log("Error al actualizar el TODO:", err);
  } 
}

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

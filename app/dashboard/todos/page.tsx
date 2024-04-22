import { fetchTodos } from '@/app/lib/data';
import { AddTodo } from '@/app/ui/todo/addTodo';
import TodoList from '@/app/ui/todo/todolist';

export default async function Page() {
  const todos = await fetchTodos();
  // console.log(todos);
  return (
    <>
      <p>Todos</p>
      <TodoList todolist={todos} />
      <AddTodo />
    </>
  );
}

import {  getUserTodoListAction } from "@/actions/todo.actions";
import AddToDoForm from "@/components/AddToDoForm";
import {ToDoTable} from "@/components/ToDoTable"
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth()
  const todos = await getUserTodoListAction({userId});
  



  return (
    <main className="flex min-h-screen flex-col  p-24">
      <AddToDoForm userId={userId } />
      <ToDoTable invoices={todos}/>
    </main>
  );
}

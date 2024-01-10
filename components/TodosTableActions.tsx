"use client";
import { deleteTodoAction } from "@/actions/todo.actions";
import { Pen, Trash } from "lucide-react";
import { useState } from "react";
import EditToDo from "./EditToDoDialog";
import Spinner from "./Spinner";
import { Button } from "./ui/button";
import { ITodos } from "@/interfaces";

function TodosTableActions({ todo }: { todo:ITodos }) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <>
        <EditToDo todo={todo} />
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={async () => {
          setLoading(true);
          await deleteTodoAction(todo?.id as string );
          setLoading(false);
        }}
      >
        {loading ? <Spinner /> : <Trash size={16} />}
      </Button>
    </>
  );
}

export default TodosTableActions;

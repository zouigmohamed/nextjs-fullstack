"use server";

import { ITodos } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getUserTodoListAction = async ({userId}: {userId: string | null}) => {
  const todos = await prisma.todo.findMany({
    where: {
    user_id : userId as string
    },
    orderBy: { createdAt: "desc" }
  });
  return todos;
};

export const createTodoAction = async ({
  title,
  body,
  completed,
  userId,
}: {
  title: string;
  body?: string | undefined;
    completed: boolean;
  userId:string| null
}) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
      user_id : userId as string 
    },
  });
  revalidatePath("/");
};

export const updateTodoAction = async ({
  id,
  title,
  body,
  completed,
}: ITodos) => {
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: {
      title,
      body,
      completed,
    },
  });
  revalidatePath("/");
};

export const deleteTodoAction = async (id: string) => {
  const deletedTodo = await prisma.todo.delete({
    where: { id },
  });

  revalidatePath("/");
};

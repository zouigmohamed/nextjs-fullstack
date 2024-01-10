"use client";

import { createTodoAction, updateTodoAction } from "@/actions/todo.actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { TodoFormValues, todoFormSchema } from "@/validation";
import Spinner from "./Spinner";
import { ITodos } from "@/interfaces";

const EditToDo = ({todo}:{todo:ITodos}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const defaultValues: Partial<TodoFormValues> = {
    title: todo.title,
    body: todo.body as string,
    completed: todo.completed,
  };

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: TodoFormValues) => {
    setLoading(true);
      await updateTodoAction({ id: todo.id, title: data.title, body: data.body as string, completed:data.completed});
    setLoading(false);
    setOpen(false);
    
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild className="ml-auto ">
      <Button size={"icon"} >
        <Pen size={16} />
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>edit this to do Todo</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Go to gym" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>You can write a short description about your next todo.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Completed</FormLabel>
                    </div>
                    <FormDescription>
                      Your to-do item will be uncompleted by default unless you checked it.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="space-x-2" disabled={loading}>
           
                {loading ? <>
                 <Spinner /> saving...
                </> : "save"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditToDo;
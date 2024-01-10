import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITodos } from "@/interfaces";
import TodosTableActions from "./TodosTableActions";
export function ToDoTable({ invoices }: { invoices: ITodos[] }) {
  return (
    <Table className="w-1/2 mx-auto">
      <TableCaption>A list of your recent tasks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">id</TableHead>
          <TableHead>title</TableHead>
          <TableHead>status</TableHead>
          <TableHead className="text-center">actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices ? invoices.map((invoice) => (
          <TableRow key={invoice.title}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell className="font-medium">{invoice.title}</TableCell>
            <TableCell>
              {invoice.completed ? (
                <Badge>Completed</Badge>
              ) : (
                <Badge variant={"destructive"}>Uncompleted</Badge>
              )}
            </TableCell>
            <TableCell className="flex items-center  justify-center space-x-2">
              <TodosTableActions todo={invoice} />
            </TableCell>
          </TableRow>
        )):"no data"}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>total</TableCell>
          <TableCell className="text-right">{invoices.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

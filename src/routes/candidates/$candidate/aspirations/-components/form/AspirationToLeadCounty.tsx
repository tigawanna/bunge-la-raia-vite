import { IconButton } from "@/components/park/ui/icon-button";
import {
  DatabaseTableType,
  TableRelationInput,
  TableType,
} from "@/lib/supabase/components/TableRelationInput";
import { Database } from "@/lib/supabase/db-types";
import { ValidRoutes } from "@/lib/tanstack/types";
import { Search, XIcon } from "lucide-react";
import * as Dialog from "~/components/park/ui/dialog";
interface AspirationToLeadModalProps<T extends TableType> {
  table: T;
  filterBy: keyof DatabaseTableType[T]["Row"];
  route: ValidRoutes;
  searchQuery: string;
  setItem: (row: Database["public"]["Tables"][T]["Row"]) => void;
  createNewRoute?: ValidRoutes;
}

export function AspirationToLeadModal<T extends TableType>({
  filterBy,
  route,
  searchQuery,
  setItem,
  table,
  createNewRoute,
}: AspirationToLeadModalProps<T>) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Search />
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content className="p-5 h-[90%] w-[90%] bg-bg-muted">
          <div className="flex gap-2 h-full w-full p-5">
            <TableRelationInput
              route={route}
              setItem={setItem}
              filterBy={filterBy}
              table={table}
              searchQuery={searchQuery}
              createNewRoute={createNewRoute}
            />
          </div>
          <Dialog.CloseTrigger asChild className="absolute top-[2%] right-[2%]">
            <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
              <XIcon />
            </IconButton>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

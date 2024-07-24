import { SupabaseClient } from "@supabase/supabase-js";

export interface LooseSupabaseDBType{
    public:Record<string,any>
}
interface TableRelationInputProps<T extends LooseSupabaseDBType> {
  supabase: SupabaseClient<T, "public", any>;
}

export function TableRelationInput<T extends LooseSupabaseDBType>({}:TableRelationInputProps<T>){
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>

 </div>
);
}

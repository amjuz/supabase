import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/types/database.types";
import { UseFormRegister } from "react-hook-form";

type TSelectBoxPostStatus = {
  register: UseFormRegister<Database["public"]["Tables"]["post"]["Row"]>
}
export default function SelectBoxPostStatus({register}:TSelectBoxPostStatus) {
  return (
    <div className="space-y-2">
      {/* <Label htmlFor={id}>Select with placeholder</Label> */}
      <Select defaultValue="publish" {...register("status")}>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="publish" >Publish</SelectItem>
          <SelectItem value="draft" >Draft</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

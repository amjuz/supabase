import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/types/database.types";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  TCreateBlogFormSchema,
  TStatus,
} from "./blog/create-blog-form/CreateBlog";

type TSelectBoxPostStatus = {
  register: UseFormRegister<TCreateBlogFormSchema>;
  setValue: UseFormSetValue<TCreateBlogFormSchema>;
  watch: UseFormWatch<TCreateBlogFormSchema>;
};
export default function SelectBoxPostStatus({
  register,
  setValue,
  watch,
}: TSelectBoxPostStatus) {
  return (
    <div className="space-y-2">
      <Select
        value={watch("status")}
        onValueChange={(value) => setValue("status", value as TStatus[number])}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="publish">Publish</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

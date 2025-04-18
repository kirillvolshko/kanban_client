import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectValue,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Control, FieldValues, Path } from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  error?: string;
}

const SelectField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,

  error,
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormMessage className="text-sm font-medium leading-none" />
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value || ""}
          >
            <FormControl>
              <SelectTrigger className="w-full ">
                <SelectValue
                  className="!placeholder:text-white "
                  placeholder={placeholder}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {error ? (
                <p className="text-red-500 px-3 py-2">{error}</p>
              ) : (
                options.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <FormDescription></FormDescription>
        </FormItem>
      )}
    />
  );
};
export default SelectField;

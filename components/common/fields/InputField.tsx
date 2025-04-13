import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { cn } from "@/lib/utils";
import { Input } from "../../ui/input";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  classNameItem?: string;
  type?: string;
  autoComplete?: string;
  classNameInput?: string;
  min?: number;
  defaultValue?: number | string;
  step?: string;
}

const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  classNameItem,
  classNameInput,

  type = "text",
  min,
  step,
  ...props
}: InputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("group", classNameItem)}>
          <div className="grid gap-2 w-full">
            {label && (
              <div className="flex  md:flex-row gap-4 w-full justify-between items-center">
                <FormLabel className="text-white">{label}</FormLabel>
                <FormMessage className="text-sm font-medium leading-none" />
              </div>
            )}
            <FormControl>
              <div className=" w-full">
                <Input
                  min={min}
                  type={type}
                  step={step}
                  placeholder={placeholder}
                  {...field}
                  {...props}
                  className={cn("placeholder:text-white/50", classNameInput)}
                />
              </div>
            </FormControl>
          </div>

          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

export default InputField;

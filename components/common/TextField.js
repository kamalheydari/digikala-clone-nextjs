import { DisplayError } from "components";
import { useController } from "react-hook-form";

export default function TextField({
  label,
  errors,
  name,
  control,
  ...inputProps
}) {
  const { field } = useController({ name, control, rules: { required: true } });
  return (
    <div className={`${label ? "space-y-3" : ""}`}>
      {label && (
        <label
          className='text-field__label'
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        className='text-field__input'
        id={name}
        value={field?.value}
        name={field.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        ref={field.ref}
        {...inputProps}
      />

      <DisplayError errors={errors} />
    </div>
  );
}

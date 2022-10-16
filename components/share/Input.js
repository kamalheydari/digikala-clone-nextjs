import { DisplayError } from "components";

export default function Input({
  label,
  register,
  errors,
  name,
  ...inputProps
}) {
  return (
    <div className={label ? "space-y-3" : ""}>
      {label && (
        <label
          className='text-xs text-gray-700 lg:text-sm md:min-w-max'
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input className='input' id={name} {...register(name)} {...inputProps} />
      <DisplayError errors={errors} />
    </div>
  );
}

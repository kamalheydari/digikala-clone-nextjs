import { Transition } from "@headlessui/react";
import { DisplayError } from "components";

export default function Input({
  label,
  register,
  errors,
  name,
  ...inputProps
}) {
  return (
    <div className={`min-h-[71px] ${label ? "space-y-3" : ""}`}>
      {label && (
        <label
          className='text-xs text-gray-700 lg:text-sm md:min-w-max'
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input className='input' id={name} {...register(name)} {...inputProps} />

      <Transition
        show={!!errors}
        enter='transition-opacity duration-150'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-10'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <DisplayError errors={errors} />
      </Transition>
    </div>
  );
}

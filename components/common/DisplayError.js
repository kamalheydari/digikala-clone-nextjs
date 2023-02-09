import Icons from "./Icons";

export default function DisplayError({ errors }) {
  return (
      <div className='error-msg'>
        <Icons.Exclamation />
        <span>{errors?.message}</span>
      </div>
  );
}

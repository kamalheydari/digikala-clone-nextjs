import { useState } from "react";
import { Icons } from "components";
import { useEffect } from "react";

export default function FlexibleTR({ data, type, values, setValues }) {
  console.log({ data });
  //? Local State
  const [counter, setCounter] = useState();

  useEffect(() => {
    if (data) {
      let size = Object.keys(data).length;
      setCounter(size + 1);
    } else {
      setCounter(1);
    }
  }, [data]);

  //? Handlers
  const counterHandler = () => {
    setCounter((counter) => (counter += 1));
  };

  const changeHandler = (e) => {
    // if(data) setValues({...data})
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const deleteHandler = (index, type) => {
    // const element = document.getElementById(index);
    // element.remove();
  };

  let flexArray = Array.from({ length: counter }, (_, index) => {
    return (
      <>
        {counter === index + 1 ? (
          <tr key={index} className=' border-b-2 border-green-50'>
            <td className='flex p-2'>
              <span className=' cursor-pointer w-full' onClick={counterHandler}>
                <Icons.Plus className='icon mr-0.5 text-green-500 border border-green-500 rounded-xl' />
              </span>
            </td>
            <td className=' bg-gray-100'></td>
          </tr>
        ) : (
          <tr key={index} className=' border-b-2 border-green-50' id={index}>
            <td className='p-2 flex'>
              {/* <span
                className='cursor-pointer m-0.5'
                onClick={() => deleteHandler(index, type)}
              >
                <Icons.Delete className='icon ml-3 text-red-500 ' />
              </span> */}
              <input
                name={`${type}-${index}`}
                onChange={changeHandler}
                type='text'
                className='w-full inline-block outline-none '
                value={data && data[`${type}-${index}`]}
              />
            </td>
            <td className=' bg-gray-100'></td>
          </tr>
        )}
      </>
    );
  });

  return <>{flexArray}</>;
}

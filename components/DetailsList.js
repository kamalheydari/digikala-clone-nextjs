import {
  addInfo,
  addSpecification,
  deleteItem,
  editItem,
} from "app/slices/detailsSlice";
import { Icons } from "components";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function DetailsList({ category, type, data }) {
  const dispatch = useDispatch();

  //? Local state
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [editId, setEditId] = useState();

  //? Handlers
  const addToStore = () => {
    if (name.trim() === "") return;
    if (status === "edit") {
      dispatch(editItem({ id: editId, type, name }));
      setName("");
    } else {
      if (type === "info") {
        dispatch(addInfo(name));
      } else {
        dispatch(addSpecification(name));
      }
    }
    setName("");
  };

  const handleDelete = (id) => {
    dispatch(deleteItem({ id, type }));
  };

  const handleEdit = (id) => {
    setStatus("edit");
    const item = data.find((item) => item.id === id);
    console.log(item);
    setName(item.name);
    setEditId(item.id);
  };

  return (
    <>
      <div className='text-sm lg:text-sm'>
        {type === "inof" ? (
          <span> ویژگی‌های دسته‌بندی</span>
        ) : (
          <span> مشخصات دسته‌بندی</span>
        )}{" "}
        <span className='text-green-500 text-base'>{category?.name}</span>
      </div>
      <table className='w-full'>
        <thead
          className={
            type === "info"
              ? "bg-emerald-50 text-emerald-500"
              : "bg-fuchsia-50 text-fuchsia-500"
          }
        >
          <tr className=''>
            <th>نام</th>
            <th className='w-1/4 p-2.5'>مقدار</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className='border-b-2 border-gray-100'>
              <td className='flex p-2'>
                <button
                  className='mr-1 ml-2'
                  type='button'
                  onClick={() => handleDelete(item.id)}
                >
                  <Icons.Delete className='icon  text-red-500' />
                </button>
                <button
                  className='mr-1 ml-4'
                  type='button'
                  onClick={() => handleEdit(item.id)}
                >
                  <Icons.Edit className='icon  text-amber-500' />
                </button>
                {item.name}
              </td>
              <td
                className={
                  type === "info"
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-fuchsia-50 text-fuchsia-500"
                }
              ></td>
            </tr>
          ))}
          <tr className='border-b-2 border-green-50'>
            <td className='flex p-2'>
              <button className='mr-1 ml-3' type='button' onClick={addToStore}>
                <Icons.Plus className='icon  text-green-500 border border-green-500 rounded-xl' />
              </button>
              <input
                type='text'
                onChange={(e) => setName(e.target.value)}
                className='w-full inline-block outline-none'
                value={name}
                // required
              />
            </td>
            <td
              className={
                type === "info"
                  ? "bg-emerald-50 text-emerald-500"
                  : "bg-fuchsia-50 text-fuchsia-500"
              }
            ></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

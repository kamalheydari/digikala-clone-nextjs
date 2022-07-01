import { useState } from "react";

import {
  addInfo,
  addSpecification,
  deleteItem,
  editItem,
} from "app/slices/detailsSlice";
import { useDispatch } from "react-redux";

import { Icons, Buttons } from "components";
export default function DetailsList({ category, type, data }) {
  const dispatch = useDispatch();

  //? Local state
  const [name, setName] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [editId, setEditId] = useState();

  //? Handlers
  const addToStore = () => {
    if (name.trim() === "") return;
    if (!onEdit) {
      if (type === "info") {
        dispatch(addInfo(name));
      } else {
        dispatch(addSpecification(name));
      }
    } else {
      dispatch(editItem({ id: editId, type, name }));
      setName("");
      setOnEdit(false);
    }
    setName("");
  };

  const handleDelete = (id) => {
    dispatch(deleteItem({ id, type }));
  };

  const handleEdit = (id) => {
    setOnEdit(true);
    const item = data.find((item) => item.id === id);
    setName(item.name);
    setEditId(item.id);
  };

  return (
    <>
      <div className='text-sm lg:text-sm'>
        {type === "info" ? <span> ویژگی‌های</span> : <span> مشخصات</span>}{" "}
        <span
          className={
            type === "info" ? " text-emerald-600" : " text-fuchsia-600"
          }
        >
          {category?.name}
        </span>
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
              <td className='flex items-center p-2 gap-x-2'>
                <Buttons.Delete onClick={() => handleDelete(item.id)} />
                <Buttons.Edit onClick={() => handleEdit(item.id)} />

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
              <Buttons.Add onClick={addToStore} />
              <input
                type='text'
                onChange={(e) => setName(e.target.value)}
                className='inline-block w-full mr-2 outline-none'
                value={name}
                placeholder='...'
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

import { useState } from "react";
import { Icons } from "components";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, editItem } from "app/slices/productSlice";
import { useRef } from "react";
export default function Sizes() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const {
    product: { sizes },
  } = useSelector((state) => state.product);

  const [size, setSize] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const [editId, setEditId] = useState();

  const addToStore = () => {
    if (size.trim() === "") return;
    if (!onEdit) {
      dispatch(addItem({ type: "sizes", value: size }));
      setSize("");
    } else {
      dispatch(editItem({ id: editId, type: "sizes", value: size }));
      setSize("");
      setEditId();
      setOnEdit(false);
    }
  };

  const handleEdit = (id) => {
    setOnEdit(true);
    const item = sizes.find((item) => item.id === id);
    setSize(item.size);
    setEditId(item.id);
    inputRef.current.focus();
  };
  const handleDelete = (id) => {
    dispatch(deleteItem({ id, type: "sizes" }));
  };

  return (
    <div className='text-sm space-y-1.5'>
      <span className='text-sm'>اندازه ها</span>
      <div className='w-full max-w-2xl mx-auto space-y-3'>
        <div className='flex'>
          <button className='mr-1 ml-3' type='button' onClick={addToStore}>
            <Icons.Plus className='icon  text-green-500 border border-green-500 rounded-xl' />
          </button>
          <input
            type='text'
            onChange={(e) => setSize(e.target.value)}
            className=' input w-44 inline-block outline-none'
            value={size}
            placeholder='...'
            ref={inputRef}
          />
        </div>
        <div className='flex flex-wrap gap-x-5 gap-y-3 justify-center'>
          {sizes.map((item) => (
            <div
              key={item.id}
              className='shadow rounded flex items-center px-1.5 py-2'
            >
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
              {item.size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

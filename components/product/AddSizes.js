import { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, editItem } from "app/slices/product.slice";

import { AddIconBtn,  DeleteIconBtn, EditIconBtn } from "components";

export default function AddSizes() {
  const dispatch = useDispatch();

  //? Refs
  const inputRef = useRef();

  //? Local States
  const [size, setSize] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const [editId, setEditId] = useState();

  //? Store
  const {
    product: { sizes },
  } = useSelector((state) => state.product);

  //? Handlers
  const handleAddToStore = () => {
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
      <span>اندازه ها</span>
      <div className='w-full max-w-2xl mx-auto space-y-3'>
        <div className='flex items-center gap-x-2'>
          <AddIconBtn onClick={handleAddToStore} />
          <input
            type='text'
            onChange={(e) => setSize(e.target.value)}
            className='inline-block outline-none input w-44'
            value={size}
            placeholder='...'
            ref={inputRef}
          />
        </div>
        <div className='flex flex-wrap justify-center gap-x-5 gap-y-3'>
          {sizes.map((item) => (
            <div
              key={item.id}
              className='shadow rounded flex items-center gap-x-3 px-1.5 py-2'
            >
              <DeleteIconBtn onClick={() => handleDelete(item.id)} />
              <EditIconBtn onClick={() => handleEdit(item.id)} />
              {item.size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

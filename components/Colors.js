import { useState } from "react";
import { Buttons } from "components";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, editItem } from "app/slices/product.slice";
import { useRef } from "react";
export default function Colors() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const {
    product: { colors },
  } = useSelector((state) => state.product);

  const [color, setColor] = useState({ name: "", hashCode: "#2fd13c" });
  const [onEdit, setOnEdit] = useState(false);
  const [editId, setEditId] = useState();

  const addToStore = () => {
    if (color.name.trim() === "") return;

    if (!onEdit) {
      dispatch(addItem({ type: "colors", value: color }));
      setColor({ name: "", hashCode: "#2fd13c" });
    } else {
      dispatch(editItem({ id: editId, type: "colors", value: color }));
      setColor({ name: "", hashCode: "#2fd13c" });
      setEditId();
      setOnEdit(false);
    }
  };

  const handleEdit = (id) => {
    setOnEdit(true);
    const item = colors.find((item) => item.id === id);
    setColor({ name: item.name, hashCode: item.hashCode });
    setEditId(item.id);
    inputRef.current.focus();
  };
  const handleDelete = (id) => {
    dispatch(deleteItem({ id, type: "colors" }));
  };

  return (
    <div className='text-sm space-y-1.5'>
      <span>اندازه ها</span>
      <div className='w-full max-w-2xl mx-auto space-y-3'>
        <div className='flex items-center gap-x-2'>
          <Buttons.Add onClick={addToStore} />
          <input
            type='text'
            onChange={(e) =>
              setColor((color) => ({ ...color, name: e.target.value }))
            }
            className='inline-block outline-none input w-44'
            name='name'
            value={color.name}
            placeholder='نام رنگ'
            ref={inputRef}
          />
          <input
            type='color'
            name='hashCode'
            value={color.hashCode}
            onChange={(e) =>
              setColor((color) => ({ ...color, hashCode: e.target.value }))
            }
            className='w-24 h-9'
          />
        </div>
        <div className='flex flex-wrap justify-center gap-x-5 gap-y-3'>
          {colors.map((item) => (
            <div
              key={item.id}
              className='shadow rounded flex gap-x-2 items-center px-1.5 py-2 bg-gray-50'
            >
              <Buttons.Delete onClick={() => handleDelete(item.id)} />
              <Buttons.Edit onClick={() => handleEdit(item.id)} />
              {item.name}
              <span
                className='w-6 h-6 mr-3 rounded-sm shadow '
                style={{ background: item.hashCode }}
              ></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

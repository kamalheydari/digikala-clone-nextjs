import Image from 'next/image'

import { Control, FieldError, useFieldArray } from 'react-hook-form'

import { DisplayError, UploadImage } from 'components'
import { Delete } from 'icons'

import type { IProductForm } from 'types'

interface Props {
  control: Control<IProductForm>
  errors?: { url?: FieldError | undefined }[] | undefined
}

const ImageList: React.FC<Props> = (props) => {
  // ? Props
  const { control, errors } = props

  // ? Form Hook
  const { fields, append, remove } = useFieldArray({
    name: 'images',
    control,
  })

  // ? Handlers
  const handleAddUploadedImage = ({ url, id, placeholder }: { url: string; placeholder: string; id: string }) =>
    append({ url, id, placeholder })

  // ? Render(s)
  return (
    <div className="space-y-3">
      <UploadImage folder="/products" handleAddUploadedImage={handleAddUploadedImage} />

      <div className="mx-3 flex flex-wrap gap-x-2 gap-y-3">
        {/*  @ts-ignore  */}
        <DisplayError errors={errors} />
        {fields.map((image, idx) => (
          <div
            className="relative max-w-max overflow-hidden rounded-md border border-gray-200 transition-colors hover:border-gray-300"
            key={idx}
          >
            <Image src={image.url} width={150} height={150} alt="product image" />
            <button type="button" className="absolute -right-1 -top-1 z-10" onClick={() => remove(idx)} title="حذف">
              <Delete className="icon h-7 w-7 rounded-2xl bg-red-100 p-1 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageList

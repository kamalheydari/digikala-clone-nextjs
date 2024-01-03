import { useEffect, useState } from 'react'

import { nanoid } from '@reduxjs/toolkit'

import AWS from 'aws-sdk'
import type { PutObjectRequest } from 'aws-sdk/clients/s3'

import { useCreatePlaceholderMutation } from 'services'

export const s3 = new AWS.S3({
  endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
  accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_KEY,
  correctClockSkew: true,
})

interface Props {
  folder: string
  handleAddUploadedImage: (data: { url: string; placeholder: string; id: string }) => void
}

const UploadImage: React.FC<Props> = (props) => {
  // ? Props
  const { folder, handleAddUploadedImage } = props

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const [createPlaceholder, { data, isSuccess }] = useCreatePlaceholderMutation()

  useEffect(() => {
    if (isSuccess && data) {
      handleAddUploadedImage({ url: data.imageUrl, placeholder: data.placeholder, id: nanoid() })
      setMessage('آپلود عکس موفقیت آمیز بود')
    }
  }, [isSuccess])

  // ? Handlers
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null)
  }

  const handleUpload = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setLoading(true)
    try {
      if (!file) {
        setError('لطفا یک فایل انتخاب کنید')
        setLoading(false)
        return
      }

      if (!file.type.startsWith('image/')) {
        setError('فایل انتخاب شده باید تصویر باشد.')
        setLoading(false)
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('حجم تصویر نباید بیشتر از 5 مگابایت باشد.')
        setLoading(false)
        return
      }

      const params: PutObjectRequest = {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key: `digikala${folder || '/others'}/${nanoid()}_${file?.name}`,
        Body: file,
        ContentType: file?.type,
        ACL: 'public-read',
      }

      const res = await s3.upload(params).promise()
      await createPlaceholder({ imageUrl: res.Location })
    } catch (error) {
      setError('آپلود عکس ناموفق بود')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="my-4 flex-1 space-y-3">
        <label htmlFor="file" className="text-field__label">
          آپلود تصویر
        </label>
        <div className="flex items-center gap-x-3">
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 px-3 py-2"
          />
          <button
            type="button"
            disabled={loading || !file}
            onClick={handleUpload}
            className="w-36 rounded bg-green-50 py-2 text-green-600 hover:bg-green-100 hover:text-green-700  "
          >
            {loading ? 'در حال آپلود...' : 'آپلود'}
          </button>
        </div>
      </div>
      {error && <p className="my-1 text-red-500">{error}</p>}
      {message && <p className="my-1 text-green-500">{message}</p>}
    </>
  )
}

export default UploadImage

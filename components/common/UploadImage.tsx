import { nanoid } from '@reduxjs/toolkit'
import AWS from 'aws-sdk'
import { PutObjectRequest } from 'aws-sdk/clients/s3'
import { useState } from 'react'

export const s3 = new AWS.S3({
  endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
  accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_KEY,
  correctClockSkew: true,
})

interface Props {
  folder: string
  handleAddUploadedImageUrl: (url: string) => void
}

const UploadImage: React.FC<Props> = (props) => {
  //? Props
  const { folder, handleAddUploadedImageUrl } = props

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null)
  }

  const handleUpload = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLoading(true)

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

    try {
      const res = await s3.upload(params).promise()
      handleAddUploadedImageUrl(res.Location)
      setMessage('آپلود عکس موفقیت آمیز بود')
    } catch (error) {
      setError('عکس آپلود نشد')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='flex-1 space-y-3 my-4'>
        <label htmlFor='file' className='text-field__label'>
          آپلود تصویر
        </label>
        <div className='flex items-center gap-x-3'>
          <input
            type='file'
            id='file'
            onChange={handleFileChange}
            className='border border-gray-300 px-3 py-2 w-full'
          />
          <button
            type='button'
            disabled={loading || !file}
            onClick={handleUpload}
            className='text-green-600 bg-green-50 w-36 hover:text-green-700 hover:bg-green-100 py-2 rounded  '
          >
            {loading ? 'در حال آپلود...' : 'آپلود'}
          </button>
        </div>
      </div>
      {error && <p className='text-red-500 my-1'>{error}</p>}
      {message && <p className='text-green-500 my-1'>{message}</p>}
    </>
  )
}

export default UploadImage

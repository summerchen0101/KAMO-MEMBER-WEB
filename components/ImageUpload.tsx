import { useLoaderProvider } from '@/context/LoaderProvider'
import useHelper from '@/utils/useHelper'
import { Box, Image, Input, InputProps } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function ImageUpload({ value, ...props }: InputProps, ref) {
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const [imageUrl, setImageUrl] = useState('')
  const { getBase64 } = useHelper()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    loadingStart()
    const file = e.target.files[0]
    if (!file) {
      setImageUrl('')
      return
    }
    const imgUrl = await getBase64(file)
    setImageUrl(imgUrl)
    loadingEnd()
  }
  useEffect(() => {
    setImageUrl(value as string)
  }, [value])
  return (
    <div className="form-upload mb-1">
      {imageUrl ? (
        <Image src={imageUrl} />
      ) : (
        <button type="button" className="text-area">
          <i className="iconfont add" />
          <span className="text-lighgray">
            支持扩展名 .png .jpg
            <br />
            {'(圖片最大上傳檔案大小：2 MB)'}
          </span>
        </button>
      )}

      <Input
        className="upload"
        type="file"
        name="filename"
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}

export default React.forwardRef(ImageUpload)

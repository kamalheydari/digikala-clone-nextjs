import { useDisclosure } from '@/hooks'
import { ArrowLeft } from '@/icons'

interface Props {
  specification: { title: string; value?: string }[]
}

const ProductSpecificationList: React.FC<Props> = (props) => {
  // ? Props
  const { specification } = props

  // ? Assets
  const [isShowSpec, showSpecHandlers] = useDisclosure()

  const renderProductspecification = isShowSpec ? specification : specification.slice(0, 7)

  // ? Render(s)
  return (
    <section className="px-4 ">
      <div className="lg:flex lg:max-w-3xl lg:gap-x-20 xl:max-w-5xl">
        <h4 className="mb-3 h-fit w-min lg:border-b-2 lg:border-red-500">مشخصات</h4>
        <ul className="space-y-4 lg:mt-10">
          {renderProductspecification.map((item, i) => {
            if (!item.value) return null
            else
              return (
                <li key={i} className="flex">
                  <span className="ml-3 w-36 py-2 font-light leading-5 tracking-wide text-gray-500">{item.title}</span>
                  <span
                    className="w-full break-all border-b border-gray-100 py-2 font-normal leading-5 tracking-wide text-gray-600 md:break-normal "
                    dangerouslySetInnerHTML={{ __html: item.value }}
                  ></span>
                </li>
              )
          })}
        </ul>
      </div>
      {specification.length > 7 && (
        <button type="button" className="flex items-center py-2 text-sm text-sky-400" onClick={showSpecHandlers.toggle}>
          {isShowSpec ? 'بستن' : 'مشاهده بیشتر'}
          <ArrowLeft className="icon text-sky-400" />
        </button>
      )}
    </section>
  )
}

export default ProductSpecificationList

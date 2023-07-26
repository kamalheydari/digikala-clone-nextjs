interface Props {
  infos: { title: string; value?: string }[]
}

const Info: React.FC<Props> = (props) => {
  //? Props
  const { infos } = props

  //? Render(s)
  return (
    <section className='px-4 pb-2'>
      <h4 className='my-3 lg:mt-6'>ویژگی‌ها</h4>
      <ul className='mr-6 space-y-2 list-disc'>
        {infos.map((item, i) => (
          <li key={i} className='tracking-wide text-gray-500'>
            <span className='ml-2 font-light'>{item.title} :</span>
            <span className='text-gray-900'>{item.value}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Info

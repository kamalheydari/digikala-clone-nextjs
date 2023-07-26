import {
  CashOnDelivery,
  Daysreturn,
  ExpressDelivery,
  OriginalProducts,
  Support,
} from 'components'

export default function Services() {
  const services = [
    {
      name: 'امکان تحویل اکسپرس',
      icon: <ExpressDelivery className='w-10 h-10' />,
    },
    { name: '۲۴ ساعته، ۷ روز هفته', icon: <Support className='w-10 h-10' /> },
    {
      name: 'امکان پرداخت در محل',
      icon: <CashOnDelivery className='w-10 h-10' />,
    },
    {
      name: 'هفت روز ضمانت بازگشت کالا',
      icon: <Daysreturn className='w-10 h-10' />,
    },
    {
      name: 'ضمانت اصل بودن کالا',
      icon: <OriginalProducts className='w-10 h-10' />,
    },
  ]

  //? Render(s)
  return (
    <section className='hidden py-5 border-t border-b-2 border-gray-200 lg:flex justify-evenly'>
      {services.map((item, i) => (
        <div key={i} className='flex items-center gap-x-1'>
          {item.icon}
          <span className='text-xs'>{item.name}</span>
        </div>
      ))}
    </section>
  )
}

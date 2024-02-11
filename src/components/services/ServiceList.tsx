import { CashOnDelivery, Daysreturn, ExpressDelivery, OriginalProducts, Support } from '@/icons'

export default function ServiceList() {
  const services = [
    {
      name: 'امکان تحویل اکسپرس',
      icon: <ExpressDelivery className="h-10 w-10" />,
    },
    { name: '۲۴ ساعته، ۷ روز هفته', icon: <Support className="h-10 w-10" /> },
    {
      name: 'امکان پرداخت در محل',
      icon: <CashOnDelivery className="h-10 w-10" />,
    },
    {
      name: 'هفت روز ضمانت بازگشت کالا',
      icon: <Daysreturn className="h-10 w-10" />,
    },
    {
      name: 'ضمانت اصل بودن کالا',
      icon: <OriginalProducts className="h-10 w-10" />,
    },
  ]

  // ? Render(s)
  return (
    <section className="hidden justify-evenly border-b-2 border-t border-gray-200 py-5 lg:flex">
      {services.map((item, i) => (
        <div key={i} className="flex items-center gap-x-1">
          {item.icon}
          <span className="text-xs">{item.name}</span>
        </div>
      ))}
    </section>
  )
}

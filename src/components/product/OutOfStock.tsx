export default function OutOfStock() {
  return (
    <section className="mx-3 my-5 rounded bg-gray-300/50 p-1.5 lg:my-0 lg:rounded-lg lg:bg-gray-300 lg:py-2">
      <div className="flex items-center justify-between gap-x-2">
        <div className="h-[3px] flex-1 bg-gray-400" />
        <h4 className="text-base font-bold text-gray-600">ناموجود</h4>
        <div className="h-[3px] flex-1 bg-gray-400" />
      </div>
      <p className="px-3 text-sm text-gray-800">
        این کالا فعلا موجود نیست اما می‌توانید زنگوله را بزنید تا به محض موجود شدن، به شما خبر دهیم
      </p>
    </section>
  )
}

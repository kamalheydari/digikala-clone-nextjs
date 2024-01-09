interface Props {
  children: React.ReactNode
  tHeads: string[]
}

const TableContainer: React.FC<Props> = (props) => {
  const { children, tHeads } = props

  return (
    <div className="mx-3 mt-7 overflow-x-auto lg:mx-5 xl:mx-10">
      <table className="w-full whitespace-nowrap">
        <thead className="h-9 bg-emerald-50">
          <tr className="text-emerald-500">
            <th className="border-x-2 border-gray-100 px-2 text-right">{tHeads[0]}</th>
            <th className="border-x-2 border-gray-100">{tHeads[1]}</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">{children}</tbody>
      </table>
    </div>
  )
}

export default TableContainer

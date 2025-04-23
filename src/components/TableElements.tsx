interface TableType {
  HeaderCell: React.FC<{ children: React.ReactNode }>;
  BodyCell: React.FC<{ children: React.ReactNode }>;
}

const TableElements: TableType = {} as TableType;

TableElements.HeaderCell = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-2 border border-gray-200 text-left text-sm font-medium text-gray-600">
    {children}
  </th>
);

TableElements.BodyCell = ({ children }: { children: React.ReactNode }) => (
  <td className="px-4 py-2 border border-gray-200 text-sm text-gray-700">
    {children}
  </td>
);

export default TableElements;

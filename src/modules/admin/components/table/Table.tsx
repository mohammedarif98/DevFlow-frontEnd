import React from "react";


interface TableProps {
    tableHeading: string;
    headers: string[];
    rows: { [key: string]: any }[];
}


const Table: React.FC<TableProps> = ({tableHeading, headers, rows}) => {
  return (
    <div className="w-full mb-12 px-4">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sm rounded bg-[#ffffff] text-black">
        <div className="rounded-t px-4 py-3 border-0">
          <div className="flex items-center">
            <div className="w-full flex-grow">
              <h3 className="font-semibold text-lg text-black">{tableHeading}</h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {headers.map((headers, index) => (
                  <th key={index} className="px-6 py-3 text-center text-xs uppercase font-semibold  bg-[#4e4d4d] text-white border-black-">
                    {headers}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
                {rows.map((row, rowindex) => (
                <tr key={rowindex} className="border-b border-b-gray-400 text-center hover:bg-gray-200 transition duration-150 ease-in-out">
                    {headers.map((header, cellIndex) => (
                    <td key={cellIndex} className="p-2">
                        {row[header]}   
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default Table;

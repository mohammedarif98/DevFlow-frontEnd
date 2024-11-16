import React from "react";

interface TableProps {
  tableHeading: string;
  headers: string[];
  rows: { [key: string]: any }[];
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  filterRole: string;
  setFilterRole: React.Dispatch<React.SetStateAction<string>>;
}

const Table: React.FC<TableProps> = ({
  tableHeading,
  headers,
  rows,
  searchName,
  setSearchName,
  filterRole,
  setFilterRole,
}) => {
  return (
    <div className="w-full mb-12 px-4">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sm rounded bg-[#ffffff] text-black">
        <div className="rounded-t px-4 py-3 border-0">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg text-black">{tableHeading}</h3>
            <div className="flex items-center gap-6">
              {/* ---------- Search Bar ----------- */}
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="py-1 px-2 border w-full pr-8 border-black rounded focus:outline-none"
                />
                {searchName && (
                  <button
                    onClick={() => setSearchName("")}
                    className="absolute text-lg right-4 font-semibold top-1/2 transform -translate-y-1/2 text-black"
                  >
                    x
                  </button>
                )}
              </div>
              {/* -------------- Dropdown Filter ------------- */}
              <div className="relative">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="py-1 px-4 border border-black rounded focus:outline-none"
                >
                  <option value="">All Roles</option>
                  <option value="author">Author</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-center text-xs uppercase font-semibold bg-[#4e4d4d] text-white border-black-"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-b-gray-400 text-center hover:bg-gray-200 transition duration-150 ease-in-out"
                >
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

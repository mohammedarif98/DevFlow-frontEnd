import React, { useEffect, useState } from 'react';
import Table from '../../components/table/Table';
import { getAllUsers } from '../../../../services/axios.GetMethods'; 



const UsersList: React.FC = () => {

    interface UserList {
        _id: string;
        Photo: string | any;
        username: string;
        email: string;
        password: string;
        role: string;
        isBlocked: boolean;
    }

    // ------------- State for storing users data ----------------
    const [data, setData] = useState<UserList[]>([]);

    const tableHeading = 'USER LIST';
    const tableHeaders = ['ID', 'Photo', 'Name', 'Email', 'Role', 'Status', "Operation"];

    // Fetch users on component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getAllUsers();
                console.log('Fetched Data:', result);
                if (Array.isArray(result.data.data.users)) {
                    const dataArray: UserList[] = result.data.data.users as UserList[];
                    setData(dataArray);
                }
            } catch (error:any) {
                console.error('Failed to fetch users:', error.message);
            }
        };
        fetchUser();
    }, []);


    const rows = data.map((user,index) => ({
        ID: index+1,
        Photo: user.Photo ? (
            <img src={user.Photo} alt={user.username} className="w-12 h-12 rounded-full" />
        ) : (
            'No Image'
        ),
        Name: user.username,
        Email: user.email,
        Role: user.role,
        Status: user.isBlocked ? 'Blocked' : 'Active',
        Operation: user.isBlocked ? (
            <button className="px-3 py-1 bg-green-700 text-white rounded">Unblock</button>
        ):(
            <button className="px-3 py-1 bg-red-800 text-white rounded">Block</button>
        ),
    }));

    return (
        <div>
            <Table tableHeading={tableHeading} headers={tableHeaders} rows={rows} />
        </div>
    );
};

export default UsersList;

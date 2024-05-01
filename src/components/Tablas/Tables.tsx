'use client';
import { ChangeEvent } from 'react';
import { User } from '@/interfaces';
import { changeUserRole } from '@/action';

interface UserT {
    users: User[];
}

export const Tables = ({ users }: UserT): JSX.Element => (
    <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
            <tr>
                <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                    Email
                </th>
                <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                    Nombre completo
                </th>
                <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                    Role
                </th>
            </tr>
        </thead>
        <tbody>
            {users.map(
                (user: User): JSX.Element => (
                    <tr
                        key={user.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {user.name}
                        </td>
                        <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <select
                                className="text-sm w-full p-2 text-gray-900"
                                value={user.role}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    changeUserRole(user.id, e.target.value)
                                }
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </td>
                    </tr>
                )
            )}
        </tbody>
    </table>
);

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-pulse flex justify-center mb-4">
            <div className="h-12 w-12 bg-blue-400 rounded-full"></div>
          </div>
          <p className="text-slate-600 font-medium">Loading employees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center border-l-4 border-red-500 max-w-md">
          <p className="text-red-600 font-semibold text-lg mb-2">⚠️ Error</p>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Employee Directory</h1>
          <p className="text-slate-500">Browse and search through all employees</p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search employees by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
          />
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No employees found matching your search</p>
          </div>
        )}

        {filteredUsers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <Link href={`/user/${user.id}`} key={user.id}>
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 p-6 cursor-pointer group">
                  <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">{user.name}</h2>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600"><span className="font-medium text-slate-700">Email:</span> {user.email}</p>
                    <p className="text-sm text-slate-600"><span className="font-medium text-slate-700">Phone:</span> {user.phone}</p>
                    <p className="text-sm text-slate-600"><span className="font-medium text-slate-700">Company:</span> {user.company.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

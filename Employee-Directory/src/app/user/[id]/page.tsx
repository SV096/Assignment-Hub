"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
};

export default function UserDetails() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
      );
      const data = await res.json();
      setUser(data);
    };

    if (id) fetchUser();
  }, [id]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-pulse flex justify-center mb-4">
            <div className="h-12 w-12 bg-blue-400 rounded-full"></div>
          </div>
          <p className="text-slate-600 font-medium">
            Loading employee details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/">
          <button className="mb-8 inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors font-medium">
            &larr; Back to Directory
          </button>
        </Link>

        <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
          <div className="gradient-header bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
            <p className="text-blue-100">@{user.username}</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">
                      Email
                    </label>
                    <p className="text-slate-600 break-all">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">
                      Phone
                    </label>
                    <p className="text-slate-600">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">
                      Website
                    </label>
                    <p className="text-blue-600 hover:text-blue-700 break-all">
                      <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.website}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                  Address
                </h2>
                <div className="space-y-2 text-slate-600">
                  <p className="font-medium">
                    {user.address.street}, {user.address.suite}
                  </p>
                  <p>
                    {user.address.city}, {user.address.zipcode}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Company Information
              </h2>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="mb-2">
                  <span className="font-semibold text-slate-700">Company:</span>
                  <span className="text-slate-600 ml-2">
                    {user.company.name}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Motto:</span>
                  <span className="text-slate-600 ml-2 italic">
                    &quot;{user.company.catchPhrase}&quot;
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

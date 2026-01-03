"use client";

import React from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { TbHomeMove } from "react-icons/tb";
import { MdAccessTime } from "react-icons/md";
import Link from 'next/link';


function Sidebar() {
  return (
    <div className="w-1/6 h-[98vh] p-2 border m-2 rounded-xl">
      <h1 className='font-bold text-lg'>TODO</h1>
      
      {/* DASHBOARD */}

      <div>
        {dashboard.map((item, index) => (
          <Link href={item.path} key={index}>
                  <div key={index} className='flex items-center gap-3 my-6'>
                       {item.icon}
                       {item.label}
                  </div>
          </Link>
        ))}
      </div>

      {/* Workspace */}

       <label className='text-xs text-gray-400'>Workspace</label>
       <div className='flex flex-col gap-3 mt-2'>
              {studio.map((item, index) => (
                   <Link href={item.path} key={index}>
                        <div key={index} className='flex items-center gap-3'>
                            {item.icon}
                            {item.label}
                         </div>
                   </Link>
              ))}
      </div>
          

    </div>
  )
}

export default Sidebar

const dashboard = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard />
  },
]

const studio = [
  {
    label: "workspaces",
    path: "/workspaces",
    icon: <TbHomeMove />
  },
  {
    label: "Archive",
    path: "/archive",
    icon: <MdAccessTime />
  }
]
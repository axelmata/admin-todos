'use client'

import { useEffect } from "react";
import { useSession } from "next-auth/react"

export default function PorfilePage() {

    const { data: session} = useSession()

    useEffect(() => {
        console.log('client Side')
    }, []);

  return (
    <div>
      <h1>Perfil Page</h1>
      <hr />
      <div className=" flex flex-col">
        <span>{session?.user?.name ?? 'No Name'}</span>
        <span>{session?.user?.email ?? 'No Email'}</span>
        <span>{session?.user?.image ?? 'No Image'}</span>
        <span>{ session?.user?.roles }</span>
        <span>{ session?.user?.id}</span>
      </div>
    </div>
  );
}
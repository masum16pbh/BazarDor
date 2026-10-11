"use client"
import Link from "next/link";
import { useSession,signOut} from "@/src/lib/auth-client";
import { Divider } from "@gravity-ui/uikit";
export default function NavUserSection() {
    const { data: session, isPending, error } = useSession()
    if (isPending) {
        return (<div>লোডিং হচ্ছে...</div>)
    }
    if (!session) {
        return (
            <>

                <div>
                    <Link href={`/signin`} className="px-2 w-10 bg-white rounded-xl mx-1">সাইন ইন</Link>
                    <Link href={`/signup`} className="px-2 w-10 rounded-xl bg-green-500">সাইন আপ</Link>
                </div>


            </>
        )

    }
    return(
        <>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
      <p>স্বাগতম, <strong>{session.user.name}</strong></p>
      <p>ইমেইল: {session.user.email}</p>
      <button 
        onClick={() => signOut()} 
        className="mt-2 bg-red-500 text-white px-3 py-1.5 rounded text-sm"
      >
        লগআউট
      </button>
    </div>
  </>
    )
}
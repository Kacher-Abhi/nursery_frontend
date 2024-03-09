"use client"
import { useRouter } from "next/navigation";


export default function Layout({ children }) {
  
    const router = useRouter();
    useEffect(() => {
        if(typeof window !== 'undefined' && window?.localStorage?.getItem('access_token')) {
            router.push('/home')
        } else {
            router.push('/')
        }
    }, []);
      return (
        <div className='layout h-screen'>
          <div>{children}</div>
        </div>
      );
  }
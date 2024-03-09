import { store } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProtectedPage = ({ children, allowedRoles }) => {
    const router = useRouter();
    const userRole = useSelector((store)=> store.currentUser.userRole);
    console.log("userRole", userRole)
    useEffect(() => {
      // Redirect if user role is not allowed
      if (!allowedRoles.includes(userRole)) {
        router.push('/login');
      }
    }, []);
  
    return children;
  };
  
  export default ProtectedPage;
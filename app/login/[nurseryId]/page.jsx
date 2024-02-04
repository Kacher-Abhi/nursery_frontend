// pages/login.js

import LoginError from '@/components/Login/LoginError';
import LoginForm1 from '@/components/Login/LoginError';
import LoginForm from '@/components/Login/LoginForm';
import { setNurseryId } from '@/redux/slices/CurrentUserSlice';

const LoginPage = async ({ params }) => {
  async function getNusretDetails(nurseryId){
    'use server'
    var data = null;
    const res = await fetch(`${process.env.API_HOST}/nurseries/${nurseryId}`)
    if(res.ok){
      data = await res.json();
      console.log(data)
      return {data: data, error: false}
    }
    else{
      data = await res.text();
      console.log(data);
      return {data: data, error: true};
    }
  }
  const {data, error} = await getNusretDetails(params.nurseryId)
  return (
    <div>
      {
        !error && data && <LoginForm nursery ={data}/>
      }
      {
      error && <LoginError nurseryId ={params.nurseryId}/>
      }
    </div>
  );
};

export default LoginPage;

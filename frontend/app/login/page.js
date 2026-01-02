'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../../lib/form/component/FormInput';
import Button from '../../lib/form/component/Button';

import { useLoginMutation } from '../../lib/redux/api/authApi';
import { setCredentials } from '../../lib/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formData).unwrap();
      console.log("data:", res)
      dispatch(setCredentials(res));
      router.push("/")
    } catch (err) {
      setError(err?.data?.message || "failed to login try again");
    };
}


  return (
    <div className='bg-[#F4F4F4] h-[100vh] flex flex-col justify-center items-center gap-5'>

      <div className='flex flex-col text-center gap-4'>
        <h1 className='logo'>TODO</h1>
        <p>Welcome back please login your account</p>
      </div>

      <section className='flex flex-col justify-center bg-white w-sm py-7 px-4 rounded-2xl shadow-2xl'>
        <h1 className='text-center mb-8 text-lg font-semibold'>Login</h1>

        <form onSubmit={handleSubmit}>

          {error && <div className='text-red-400 bg-red-50 px-3 py-2 rounded-lg mb-3'>{error}</div>}
          <FormInput
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />

          <FormInput
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />

          <Button
            text={isLoading ? 'Logging in...' : 'Login'}
            type="submit"
            disabled={isLoading}
          />

          <p className='text-end mt-6 cursor-pointer text-gray-500'>Forget password ?</p>
          <p className='text-end mt-1 cursor-pointer text-gray-500'>Don't have an account ? Sign up</p>
        </form>
      </section>
    </div>
  );
}

export default Page;

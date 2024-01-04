import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const List = () => {
    const [data, setData] = useState(null); 
const [selectedUser, setSelectedUser] = useState(null);

const handleInfoClick = (user) => {
    setSelectedUser(user);
  };
  
  const handleDeleteClick = (userId) => {
    const updatedData = data.filter((user) => user.id !== userId);
    setData(updatedData);
    setSelectedUser(null);
  };
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error data:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    },[] );
  return (
    <>
    <div className='items-center justify-center border border-solid border-black p-4'>
    {data?.length > 0 ? (
            data?.map((item, index) => (
              <div>
                <h1>{item.name}</h1>
                <div>
                <button onClick={() => handleInfoClick(item)}>info</button>
      <button onClick={() => handleDeleteClick(item.id)}>delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className=''>Nothing to display</p>
          )}
      </div>

     <div>
        {selectedUser && (
    <div>
    <h1>User Details</h1>
    <h1>Name: {selectedUser.name}</h1>
    <h1>Email: {selectedUser.email}</h1>
    <h1>phone: {selectedUser.phone}</h1>
     </div>
    )}
    </div>
    </>
  )
}

export default List
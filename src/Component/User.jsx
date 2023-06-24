import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from "./user.module.css"

const User = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page');
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      } catch (error) {
        console.error("not found");
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredUsers = users.filter((user) =>
        user.first_name.toLowerCase().includes(searchTerm) 
        // user.last_name.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filteredUsers);
  };

  return (
    <div id={style.maindiv}>
        
      <input type="text"value={searchTerm}onChange={handleSearch}placeholder="Search by first name" />
      {filteredUsers.map((user) => (
        <div key={user.id} id={style}>
            <h3>{user.id}</h3>
        
          <div id={style.imagecontainer}><img src={user.avatar} alt={user.first_name}/></div>
          <p>{user.first_name}</p>
          
        </div>
      ))}
    </div>
  );
};

export default User;
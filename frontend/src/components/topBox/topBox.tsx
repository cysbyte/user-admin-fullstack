import "./topBox.scss";
import { topDealUsers } from "../../data";
import { useEffect, useState } from "react";
import { User } from '../../models/user';
import * as AuthApi from "../../network/auth_api";

const TopBox = () => {
    const [users, setUsers] = useState<User[] | null>(null);

    // useEffect(() => {
	// 	async function fetchUsers() {
	// 		try {
	// 			const users = await NotesApi.getLoggedInUser();
	// 			setUsers(users);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	}
	// 	fetchUsers();
    // }, []);
    
  return (
    <div className="topBox">
      <h2>Top Deals</h2>
      <div className="list">
        {topDealUsers.map((user) => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;

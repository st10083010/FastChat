import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../configs/config';

// 個人資訊
const UserInfo = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const path = baseUrl + "info/me";
        fetch(path, {
            method: "GET",
            credentials: "include"
        }).then(res => {
            if (!res.ok) {
                throw new Error("Not authenticated");
            }
            return res.json();
        })
        .then(data => setUser(data))
        .catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <>
            <h1>User Info</h1>
            {user ? (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </>
    )
}

export default UserInfo;
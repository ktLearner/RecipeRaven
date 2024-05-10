import React from "react";
import "./profile.css";
export const Profile = () => {
  return (
    <div className="ProfileConatiner">
      <div className="ProfileBody">

            <img  className="ProfileAvatar" src="https://tse1.mm.bing.net/th?id=OIP.zRG7_6cFjh5TdxTbdW_SkgHaH_&pid=Api&P=0&h=180"/>
    
        <div className="ProfileDetails">
          <div className="Profilefields">
            <div className="ProfileLabel">Name</div>
            <div className="ProfileValue">Jayvant</div>
          </div>
          <div className="Profilefields">
            <div className="ProfileLabel">Email</div>
            <div className="ProfileValue">jayvant.knk@gmail.com</div>
          </div>
          <div className="Profilefields">
            <div className="ProfileLabel">Location</div>
            <div className="ProfileValue">Bangalore</div>
          </div>
          <div className="Profilefields">
            <div className="ProfileLabel">Phone</div>
            <div className="ProfileValue">903709363</div>
          </div>
          <button className="Logout">My Recipes</button>
          <button className="Logout">Logout</button>
        </div>
      </div>
    </div>
  );
};

// Author: Zafar Alem


import React from "react";
import "../styles-sections-mymembership/style_profileContent.css"

function ProfileContent({ userData }) {
    const membershipStatus = userData && userData.membershipActive ? "Active" : "Inactive";

    return (
        <div className="profile-content">
            <div className="profile-data">
                <div className="profile-header">
                    <h1 id="userFullName">
                        {userData && userData.firstName} {userData && userData.lastName}
                    </h1>
                    <div id="userRegDate">
                        <label>Registration Date:</label>
                        <li>{userData && userData.registrationDate}</li>
                    </div>
                </div>

                <div className="profile-footer">
                    <div className="profile-dob">
                    <label>Date of Birth:</label>
                      <li>{userData && userData.dob}</li>
                    </div>

                <div id="membershipStatus">
                    <label>Membership Status:</label>
                    <li>{membershipStatus}</li>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ProfileContent;

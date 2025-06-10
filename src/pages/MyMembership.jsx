// Author Zafar Alem

import React, { useState, useEffect } from "react";
import ProfileContent from "../sections-mymembership/ProfileContent-mm";
import ContactContent from "../sections-mymembership/ContactContent-mm";
import PaymentContent from "../sections-mymembership/PaymentContent-mm";
import PlansContent from "../sections-mymembership/PlansContent-mm";
import { getDatabase, ref, update, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import "../styles_pages/MyMembership_style.css";

function MyMembership() {
    const [userData, setUserData] = useState(null);
    const [userID, setUserID] = useState(null);
    const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [editedEmail, setEditedEmail] = useState("");
    const [isEditingPayment, setIsEditingPayment] = useState(false);
    const [editedCardNumber, setEditedCardNumber] = useState("");
    const [editedExpiryDate, setEditedExpiryDate] = useState("");
    const [editedCVV, setEditedCVV] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userPasswordForReauth, setUserPasswordForReauth] = useState("");

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        if (userID) {
            setUserID(userID);

            const db = getDatabase();
            const userDataRef = ref(db, `zenData/userData/${userID}`);

            get(userDataRef)
                .then((userDataSnapshot) => {
                    if (userDataSnapshot.exists()) {
                        const userDataFromDB = userDataSnapshot.val();
                        setUserData(userDataFromDB);
                        setEditedPhoneNumber(userDataFromDB.phoneNumber);
                        setEditedEmail(userDataFromDB.email);
                        setEditedCardNumber(userDataFromDB.cardNumber);
                        setEditedExpiryDate(userDataFromDB.expiryDate);
                        setEditedCVV(userDataFromDB.cvv);
                    } else {
                        console.log("No data available for this user");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });

            const auth = getAuth();
            if (auth.currentUser) {
                setUserEmail(auth.currentUser.email);
            }
        } else {
            console.log("User ID not found in local storage");
        }
    }, []);

    const onSavePayment = () => {
        const db = getDatabase();
        const userDataRef = ref(db, `zenData/userData/${userID}`);

        update(userDataRef, {
            cardNumber: editedCardNumber,
            expiryDate: editedExpiryDate,
            cvv: editedCVV,
        })
            .then(() => {
                console.log("Payment details updated successfully");
                setIsEditingPayment(false);
            })
            .catch((error) => {
                console.error("Error updating payment details:", error);
            });
    };

    return (
        <div className="myMembership-container">
            <div className="myMembership-content">

                <div className="title-wrapper">
                    <h2 className='section-title'>My Membership</h2>
                </div>

                <div className="section-wTitle">
                    <h5 className='section-subtitle'>My Profile</h5>
                    <div className="member-data-section">
                        <ProfileContent userData={userData} />
                    </div>
                </div>

                <div className="section-wTitle">
                    <div className="member-data-section">
                        <ContactContent
                            userData={userData}
                            isEditingPhoneNumber={isEditingPhoneNumber}
                            setIsEditingPhoneNumber={setIsEditingPhoneNumber}
                            editedPhoneNumber={editedPhoneNumber}
                            setEditedPhoneNumber={setEditedPhoneNumber}
                            isEditingEmail={isEditingEmail}
                            setIsEditingEmail={setIsEditingEmail}
                            editedEmail={editedEmail}
                            setEditedEmail={setEditedEmail}
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            userPasswordForReauth={userPasswordForReauth}
                            setUserPasswordForReauth={setUserPasswordForReauth}
                            userID={userID}
                            setUserData={setUserData}
                        />
                    </div>
                </div>

                {userData && (
                    <div className="section-wTitle">
                        <h2>My Plan</h2>
                        <div className="member-data-section">
                            <PlansContent userData={userData} setUserData={setUserData} />
                        </div>
                    </div>
                )}

                <div className="section-wTitle payment-section">
                    <h2>Payment</h2>
                    <div className="payment-content">
                        <PaymentContent
                            userData={userData}
                            onUpdateUserData={setUserData}
                            isEditingPayment={isEditingPayment}
                            setIsEditingPayment={setIsEditingPayment}
                            editedCardNumber={editedCardNumber}
                            setEditedCardNumber={setEditedCardNumber}
                            editedExpiryDate={editedExpiryDate}
                            setEditedExpiryDate={setEditedExpiryDate}
                            editedCVV={editedCVV}
                            setEditedCVV={setEditedCVV}
                            onSavePayment={onSavePayment}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyMembership;

// Author: Zafar Alem

import { getAuth, EmailAuthProvider } from "firebase/auth";

function ChangeEmailModal() {
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const credential = EmailAuthProvider.credential(user.email, password);
            user.reauthenticateWithCredential(credential)
                .then(() => {
                    user.updateEmail(newEmail)
                        .then(() => {
                            console.log("Email updated successfully");
                            // Close the modal or show a success message
                        })
                        .catch((error) => {
                            console.error("Error updating email:", error);
                        });
                })
                .catch((error) => {
                    console.error("Error re-authenticating user:", error);
                });
        } else {
            console.error("User not authenticated");
        }
    };

    return (
        <div className="change-email-modal">
            <h2>Change Email</h2>
            <div className="input-field">
                <label>New Email:</label>
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </div>
            <div className="input-field">
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleChangeEmail}>Change Email</button>
        </div>
    );
}

export default ChangeEmailModal;

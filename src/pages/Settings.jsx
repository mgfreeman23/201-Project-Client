import React, { useState } from "react";

const SettingsPage = () => {
    const [showBlockedAccounts, setShowBlockedAccounts] = useState(false);
    const [logoutError, setLogoutError] = useState("");
    const [deleteError, setDeleteError] = useState("");

    const handlePasswordChangeRequest = async () => {
        try {
            var response = await fetch("http://localhost:4000/api/change-password-request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "userid": localStorage.getItem("userid") }),
            });
            var data = await response.json();
            if (!data.success) {
                alert("Failed to send password change request. Please try again later.");
            }
            else {
                alert("Password change request sent! Check your email for further instructions.");
            }
        } catch (error) {
            alert("Failed to send password change request. Please try again later.");
        }
    }

    const logout = () => {
        localStorage.removeItem("userid");
        window.location.href = "/";
    }

    const deleteAccount = async () => {
        try {
            var response = await fetch("http://localhost:4000/api/delete-account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "userid": localStorage.getItem("userid") }),
            });
            var data = await response.json();
            if (data.success) {
                localStorage.removeItem("userid");
                window.location.href = "/";
            } else {
                setDeleteError("Unable to delete account at this time, please try again later");
            }
        } catch (error) {
            alert("Unable to delete account at this time, please try again later.");
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.spaceVertical}>{showBlockedAccounts ? (
                <BlockedAccountsPage onClose={() => setShowBlockedAccounts(false)} />
            ) : (<button style={styles.button} onClick={() => setShowBlockedAccounts(true)}>
                View Blocked Accounts
            </button>)}

                <div>
                    <button style={styles.button} onClick={handlePasswordChangeRequest}>Change Password</button>
                    <button style={styles.button} onClick={logout}>Log out</button>
                    <div style={styles.error}>{logoutError}</div>
                    <button style={styles.button} onClick={deleteAccount}>Delete Account</button>
                    <div style={styles.error}>{deleteError}</div>
                </div>
            </div>
        </div>
    );
};

const BlockedAccountsPage = ({ onClose }) => {
    const blockedAccounts = [
        { name: "Bob", date: "Oct 10", userid: 1 },
        { name: "Bill", date: "Jan 6", userid: 2 },
        { name: "Fred", date: "Feb 2", userid: 3 },
        { name: "Alan", date: "Sep 25", userid: 4 },
        { name: "Gregor", date: "Feb 29", userid: 5 },
    ];

    const unblock = async (userid) => {
        var response = await fetch("http://localhost:4000/api/unblock-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "blocked": userid, "blocker": localStorage.getItem("userid") }),
        });
    }

    return (
        <div>
            <div>
                <button style={styles.button} onClick={onClose}>
                    Back
                </button>
                <h3>Blocked Accounts</h3>
                <div style={styles.list}>
                    {blockedAccounts.map((account, index) => (
                        <div key={index} style={styles.accountRow}>
                            <span>{account.name}</span>
                            <span>{account.date}</span>
                            <button style={styles.unblockButton} onClick={()=>{unblock(account.userid)}}>Unblock</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: "500px",
        width: "300px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#d3e9f7",
        borderRadius: "8px",
    },
    button: {
        display: "block",
        width: "100%",
        margin: "10px 0",
        padding: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    list: {
        marginTop: "10px",
    },
    accountRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
    },
    unblockButton: {
        backgroundColor: "#ff4d4f",
        color: "white",
        border: "none",
        padding: "5px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    spaceVertical: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // expand to be as tall as the container
        height: "100%",
    },
    error: {
        color: "#ff4d4f",
        marginBottom: "10px",
    },
};

export default SettingsPage;

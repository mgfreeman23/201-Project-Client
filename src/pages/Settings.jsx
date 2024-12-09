import React, { useState } from "react";

const Settings = () => {
	const [passwordInputsVisible, setPasswordInputsVisible] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const styles = {
		root: {
			backgroundImage: "url('USC Background.jpg')",
			backgroundSize: "cover",
			color: "#333",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",height: "100vh",
			margin: 0,
			fontFamily: "Arial, sans-serif",
		},
		
		container: {
			backgroundColor: "rgba(178, 177, 179, 0.5)",
			borderRadius: "8px",
			boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
			padding: "2rem",
			width: "300px",
			textAlign: "center",
		},
		
		heading: {
			fontSize: "2rem",
			color: "#8c2625",
			marginBottom: "2rem",
		},
		
		button: {
			backgroundColor: "#8c2625",
			color: "white",
			border: "none",
			padding: "12px 20px",
			margin: "10px 0",
			fontSize: "1rem",
			cursor: "pointer",
			borderRadius: "5px",
			width: "100%",
			transition: "background-color 0.3s ease",
		},
		
		buttonHover: {
			backgroundColor: "#f1c232",
		},
		
		input: {
			width: "100%",
			boxSizing: "border-box",
			padding: "12px",
			margin: "10px 0",
			border: "1px solid #ccc",
			borderRadius: "5px",
			fontSize: "1rem",
		},
		
		section: {
			marginTop: "1rem",
		},
	};

	// Change Password.
	const togglePasswordInputs = () => {
		setPasswordInputsVisible(!passwordInputsVisible);
	};

	const handlePasswordSubmit = async () => {
		if (newPassword !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		try {
			const response = await fetch("/CSCI201-Final-Project-Server/ChangePasswordServlet", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ newPassword: newPassword }),
			});

			const data = await response.json();
			if (data.success) {
				alert("Password updated successfully!");
			} else {
				alert(`Failed to update password: ${data.message}`);
			}			
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while updating the password.");
		}
	};

	// Log Out.
	const handleLogOut = async () => {
		try {
			const response = await fetch("/CSCI201-Final-Project-Server/UserLogOutServlet", { method: "POST" });

			if (response.ok) {
				alert("Logged out successfully.");
				window.location.href = "/";
			} else {
				alert("Failed to log out.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred during log out.");
		}
	};
	
	// Delete Account.
	const handleDeleteAccount = async () => {
		if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
			try {
				const response = await fetch("/CSCI201-Final-Project-Server/DeleteAccountServlet", { method: "POST" });
				const data = await response.json();
				
				if (data.success) {
					alert("Account deleted successfully.");
					window.location.href = "/";
				} else {
					alert(`Failed to delete account: ${data.message}`);
				}
			} catch (error) {
				console.error("Error:", error);
				alert("An error occurred while deleting the account.");
			}
		}
	};
	
	return (
		<div style={styles.root}>
			<div style={styles.container}>
				<h1 style={styles.heading}>Settings</h1>
				
				<section>
				<button
					style={styles.button}
					onClick={togglePasswordInputs}
					onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
					onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}>
					Change Password
				</button>
				
				{passwordInputsVisible && (
					<div>
						<input
							type="password"
							placeholder="Enter new password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							style={styles.input}/>
						<input
							type="password"
							placeholder="Confirm new password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							style={styles.input}/>
							
						<button
							style={styles.button}
							onClick={handlePasswordSubmit}
							onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
							onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}>
							Submit
						</button>
					</div>
				)}
				</section>
			
				<section style={styles.section}>
					<button
						style={styles.button}
						onClick={handleLogOut}
						onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
						onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}>
						Log Out
					</button>
				</section>
				
				<section style={styles.section}>
					<button
						style={styles.button}
						onClick={handleDeleteAccount}
						onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
						onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}>
						Delete Account
					</button>
				</section>
			</div>
		</div>
	);
};

	export default Settings;

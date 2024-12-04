import React, { useState } from "react";

const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  // get secret key from get parameter
  const urlParams = new URLSearchParams(window.location.search);
  const secretKey = urlParams.get("secretKey");

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[$&+,:;=?@#|'<>.^*()%!-]/.test(password);
    return hasUppercase && hasNumber && hasSpecialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== repeatPassword) {
      setErrorMessage("Passwords do not match!");
      setSuccessMessage("");
    } else if (!validatePassword(newPassword)) {
      setErrorMessage(
        "Password must contain at least an uppercase letter, a number, and a special character (_!?@)."
      );
      setSuccessMessage("");
    } else {
      try {
        var response = await fetch("http://localhost:4000/api/change-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "secretKey": secretKey, "newPassword": newPassword, "userid": localStorage.getItem("userid") }),
        });
        var data = await response.json();
        if (data.success) {
          setErrorMessage("");
          setSuccessMessage("Password successfully changed! You may close this page now");
          setNewPassword("");
          setRepeatPassword("");
          setCompleted(true);
        } else {
          setErrorMessage("Failed to change password. Please try again later.");
          setSuccessMessage("");
        }
      } catch (error) {
        setErrorMessage("Failed to change password. Please try again later.");
        setSuccessMessage("");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h3>Change Password</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="newPassword" style={styles.label}>
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
            disabled={completed}
            maxLength={40}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="repeatPassword" style={styles.label}>
            Repeat New Password
          </label>
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            style={styles.input}
            disabled={completed}
            maxLength={40}
            required
          />
        </div>
        <p style={styles.passwordRequirements}>
          Password must contain:
          <ul>
            <li>An uppercase letter</li>
            <li>A number</li>
            <li>A special character (_!?@)</li>
          </ul>
        </p>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#d3e9f7",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "90%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  passwordRequirements: {
    fontSize: "14px",
    margin: "10px 0",
  },
  error: {
    color: "#ff4d4f",
    marginBottom: "10px",
  },
  success: {
    color: "#28a745",
    marginBottom: "10px",
  },
};

export default ChangePasswordPage;
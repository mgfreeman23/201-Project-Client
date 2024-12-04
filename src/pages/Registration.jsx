import React, { useState } from "react";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const styles = {
        container: {
            maxWidth: "400px",
            margin: "0 auto",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9f9f9",
        },
        heading: {
            textAlign: "center",
            color: "#900",
        },
        input: {
            width: "90%",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "5px",
        },
        errorText: {
            color: "red",
            fontSize: "14px",
            marginBottom: "10px",
        },
        button: {
            width: "100%",
            padding: "10px",
            backgroundColor: "#900",
            color: "white",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
        },
        inputContainer: {
            marginBottom: "15px",
        },
    };

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!email.endsWith("@usc.edu")) {
            newErrors.email = "Not a valid email (must be @usc.edu)";
        }

        // Username validation
        if (username === "tommytrojan") {
            newErrors.username = "This username is taken";
        }

        // Password validation
        if (password.length < 6) {
            newErrors.password = "Must have at least 6 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                var response = await fetch("http://localhost:8080/CSCI201-Final-Project-Server/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: email, username: username, password: password }),
                });
                var data = await response.json();
                if (response.ok) {
                    alert("Account created successfully!");
                    localStorage.setItem("uid", data);
                    window.location.href = "/";
                } else {
                    alert("Error: " + data);
                }
            } catch (error) {
                alert("Could not connect to server!");
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>SIGN UP</h2>
            <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div style={styles.inputContainer}>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        style={styles.input}
                    />
                    {errors.email && <p style={styles.errorText}>{errors.email}</p>}
                </div>

                {/* Username Input */}
                <div style={styles.inputContainer}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        style={styles.input}
                    />
                    {errors.username && <p style={styles.errorText}>{errors.username}</p>}
                </div>

                {/* Password Input */}
                <div style={styles.inputContainer}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        style={styles.input}
                    />
                    {errors.password && <p style={styles.errorText}>{errors.password}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" style={styles.button}>
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;

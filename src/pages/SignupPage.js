// SignupPage.js
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/SignupPage.css";
const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 비밀번호 확인 로직 추가
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // 회원가입 API 호출 로직 추가 (예시)
    try {
      const response = await fetch("http://43.203.91.122/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password, // confirmPassword는 서버로 보낼 필요가 없습니다.
        }),
      });

      const data = await response.json();

      // 회원가입 성공 후 로직
      if (response.ok) {
        console.log("Signed up successfully", data);
        // 여기에 로그인 페이지로 리다이렉트하는 로직을 추가할 수 있습니다.
        const userConfirmed = window.confirm(
          "회원가입 성공! 로그인하러 가시겠습니까?"
        );

        if (userConfirmed) {
          // 사용자가 '확인'을 클릭한 경우, 로그인 페이지로 리다이렉션
          navigate("/signin");
        } else {
          // 사용자가 '취소'를 클릭한 경우, 메인 페이지로 리다이렉션
          navigate("/");
        }
      } else {
        // 서버가 에러 메시지를 응답으로 보냈을 때 그 메시지를 alert로 보여줄 수 있습니다.
        alert(data.message || "An error occurred while signing up.");
      }
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed");
    }
  };
  return (
    <>
      <NavBar showSearch={false} />
      <div className="signup-page">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/SigninPage.css"; // 적절한 CSS 파일 경로를 사용하세요

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    // 로그인 로직 구현 부분
    try {
      const response = await fetch("http://localhost:8000/user/signin", {
        // 경로 오타 수정 및 메소드, 헤더, 바디 추가
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json(); // 응답 데이터를 JSON 형식으로 변환

      if (response.ok) {
        console.log("Login successful", data);
        localStorage.setItem("groomAccessToken", data.accessToken); // JWT를 로컬 스토리지에 저장
        navigate("/"); // 로그인 성공 후 메인 페이지로 리다이렉션
      } else {
        // 로그인 실패 시 사용자에게 알림
        console.error("Login failed", data.message);
        alert(data.message || "An error occurred during login.");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed due to network error.");
    }
  };

  return (
    <>
      {" "}
      <NavBar showSearch={false} />
      <div className="signin-page">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
};

export default SigninPage;

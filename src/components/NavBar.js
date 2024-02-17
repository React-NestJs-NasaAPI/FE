import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가

function NavBar({ onSearch, showSearch = true, isProfilePage = false }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  // 로컬 스토리지에서 accessToken 읽기
  const isLoggedIn = !!localStorage.getItem("groomAccessToken");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      alert("검색어를 입력해주세요");
    } else {
      onSearch(searchTerm);
    }
  };

  // 로그인 페이지로 이동
  const handleSignIn = () => {
    navigate("/signin");
  };

  // 회원가입 페이지로 이동
  const handleSignUp = () => {
    navigate("/signup");
  };

  // 프로필 페이지로 이동
  const handleProfile = () => {
    navigate("/profile"); // 여기서 "/profile"은 예시 경로입니다.
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        NASA Image
      </div>{" "}
      {/* 로고 클릭시 메인페이지 이동 */}
      {showSearch && (
        <div className="search-form">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      )}
      <div className="auth-buttons">
        {isLoggedIn && !isProfilePage && (
          <button onClick={handleProfile}>Profile</button>
        )}
        {!isLoggedIn && (
          <>
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignUp}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

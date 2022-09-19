import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const App = () => {

  const navigate = useNavigate();

  window.api.subjects.get();

  useEffect(() => {
    window.api.subjects.get().then(subjects => {
      if (subjects.length === 0) {
        navigate("/welcome");
      } else {
        navigate("/home");
      }
    });
  }, [navigate]);
  

  return (
    <>
      <div className="spinner-container">
        <div className="spinner"></div>
        <h1 className="loading-header">Loading...</h1>
      </div>
    </>
  );
};
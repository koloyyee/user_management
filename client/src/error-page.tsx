import { useNavigate } from "react-router-dom";

export function ErrorPage() {

  const navigate = useNavigate();


  return (
    <>
      <h1>🤷 Not Found</h1>
      <button type="button" onClick={() => navigate(-1)}> back </button>
    </>
  );
}

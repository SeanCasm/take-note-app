import Breadcrumb from "react-bootstrap/Breadcrumb";
import { paths } from "../utils/paths";
import { useNavigate, useParams } from "react-router-dom";

export const CustomBreadcrumb = () => {
  const { bookTitle } = useParams();
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(paths.noteEditor);
  };
  return (
    <Breadcrumb
      style={{ display: "block", width: 700, padding: 30, margin: "auto" }}
    >
      {bookTitle !== undefined && (
        <>
          <Breadcrumb.Item onClick={handleNavigation}>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Book Config</Breadcrumb.Item>
        </>
      )}
    </Breadcrumb>
  );
};

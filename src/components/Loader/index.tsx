import "./index.css";
import { Spinner } from "reactstrap";

export const Loader = () => {
  return (
    <div className="loader">
      <Spinner size={"sm"} />
    </div>
  );
};

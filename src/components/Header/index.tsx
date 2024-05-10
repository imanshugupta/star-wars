import "./index.css";

export const Header = () => {
  return (
    <div className="container-fluid text-light header">
      <div className="container">
        <div className="py-3 d-flex">
          <div>
            <img src="/logo.jpg" height={100} alt="logo" className="logo-img" />
          </div>
          <div className="mt-auto ms-3">
            <h1>
              <i style={{ fontWeight: 800 }}>Characters</i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="container-fluid border-bottom">
      <div className="container ">
        <div className="py-3 d-flex">
          <div>
            <img src="/star-wars-logo.png" height={100} alt="logo" />
          </div>
          <div className="mt-auto ms-3">
            <h1>
              <i>Characters</i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

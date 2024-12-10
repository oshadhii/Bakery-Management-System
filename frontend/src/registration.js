
function Registration() {

   

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h3>Employee Registration</h3>
        <form>
            <div className="KaviRegistration">
          <button id="permanent" type="submit" className="registration-btn" >Permanent Employee Registration</button>
          <button id="temporary" type="submit" className="registration-btn">Temporary Employee Registration</button>
          </div>
        </form>
        </div>
      </div>
   
  );
}

export default Registration;

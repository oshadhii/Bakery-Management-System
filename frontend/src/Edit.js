function Edit(){
    return(
        <>

         <div className="Kaviform1">
              <form >
               
                <input type="text" id="name" name="name" />
                <label htmlFor="addrs">Address</label>
                <input type="text" id="addrs" name="addrs"  />
                <label htmlFor="num">Phone number</label>

                <button id="Kavibutn" type="submit">Save</button>
                <button id="Kavibutn1" type="submit">Cancel</button>
              
              </form>
            </div>
          
        </>
    )
}
export default Edit;
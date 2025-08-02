import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { intialgetReducer } from "../Store/Slice";


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "0 20px",
    marginTop: "400px"
  },
  heading: {
    fontSize: "3rem",
    color: "#333",
    marginBottom: "20px"
  },
  subtext: {
    fontSize: "1.2rem",
    color: "black",
    marginBottom: "30px"
  },
  button: {
    padding: "12px 24px",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

const WelcomePage = () => {
  const  items  = useSelector((state) => state.store.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    // Dispatch the initial get reducer to fetch items
    dispatch(intialgetReducer());
    return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to My Stationary Shop</h2>
      <p style={styles.subtext}>
        Discover a variety of quality stationery items for all your needs.
      </p>
     { items.length > 0 &&  <button style={styles.button} onClick={()=>{
      navigate("/items/availableitems");
      }} >Explore Products</button>}
    </div>
  );;
};

export default WelcomePage;

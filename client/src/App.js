import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  // const [isAddUser, setIsAddUser] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const getAllUsers = async () => {
    const res = await axios.get("http://localhost:8080/api/users");
      setData(res.data.users);
      console.log(res.data.users)
    //setData(res.data.users);
    return res.data.users;
  };
  useEffect(() => {
    setData(getAllUsers());
  }, []);

  // const addUser = async () => {
  //   await axios({
  //     method: "post",
  //     url: "http://localhost:8080/api/users",
  //     data: {
  //       cash: 0,
  //       credit: 0,
  //     },
  //   });
  //   console.log("works");
  // };

  const printAllUsers = () => {
    console.log("print")
    return (
      <ul>
        {data.map((user, index) => {
          return (
            <li key={index}>
              <p className={user.id}>id: {user.id}</p>
              <p className="balance">credit: {user.cash}</p>
              <p className="credit">cash: {user.credit}</p>
              <hr />
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div >
      <h1>Hello</h1>
      <button onClick={() => setIsClicked(true)}>Get All Users</button>
      {isClicked && printAllUsers()}
    </div>
  );
}

export default App;

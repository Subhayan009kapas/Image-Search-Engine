import { useState } from "react";

import "./App.css";

function App() {
  let seemorebtn=document.querySelector(".seemore");
  let inputval=document.querySelector("input")
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState([]);
  let [pagevalue, setPagevalue] = useState(1);
  const accessKey = "yt5spMQK4GGojx75rVNU8tFIjl6IeWq_C5NW5h8-KsI";

  const btnclick = async (isNewSearch = true) => {
    const url = `https://api.unsplash.com/search/photos?page=${pagevalue}&query=${keyword}&client_id=${accessKey}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.results);
    setUser(isNewSearch ? data.results : [...user, ...data.results]);

    setTimeout(()=>{
      seemorebtn.style.display="block"
      inputval.value="";

    },2000)
    

    // (...user )-- previous value take rakhche
    // abr (...data.results)-- previous value er stahe natun value add korche ....
  };
  const seemore = () => {
    setPagevalue((prev) => prev + 1);
    btnclick(false);
  };

  return (
    <>
      <div className="con">
        <h1 align="center" style={{color:"white" , fontSize:"50px"}}>Image Search ⭐</h1>
        <div className="input">
        <input
       
          type="text"
          placeholder="Search Image"
          onChange={(e) => setKeyword(e.target.value)}
        />
        </div>
       
        <br></br>
        <br></br>

        <button onClick={btnclick} className="submit">Search 🔍</button>
      </div>
      <hr></hr>
      <br></br>

      <div className="result">
        {user.map((val) => {
          return (
            <div className="img-con">
              <div>
                <img src={val.urls.small} height={"400px"} />
              </div>
            </div>
          );
        })}
        <br></br>
        <button onClick={seemore} className="seemore">Seemore👇</button>
      </div>
    </>
  );
}

export default App;

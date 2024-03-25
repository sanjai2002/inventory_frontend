import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../Styles/Superproduct.css'

function SuperProduct() {
  //search filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://localhost:7282/api/Superproduct/GetAllProducts')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])
    const handleInputChange = (event) => {
      const query = event.target.value;
      setSearchQuery(query);
      const filtered = data.filter((item) =>
        item.productName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    };
    return (
<>

<input type="text" class="form-control mr-sm-2" placeholder="Search..." value={searchQuery} onChange={handleInputChange} />
<div class="container-fluid" id="SuperProducts">
<div class="d-flex flex-wrap">
{searchQuery === "" ? (
    data.map((d)=>( 
    <div className="card m-2 shadow-lg p-3 mb-5 bg-white rounded" > 
     <img src={"data:image/png;base64," + d.productImage} style={{ "width": "200px" }}></img>
    <div class="card-body ">
    {d.superProductId}
      <h4 class="card-title">{d.productName}</h4>
      <p class="card-text">{d.description}</p>
      <p class="card-text">{d.sellingPrice}</p>
      <Link  class="btn btn-primary" to={`/Purchase/${d.superProductId}`}>Purchase product</Link>
    </div>
  </div>
    )
    )): filteredItems.length > 0 ?(
      filteredItems.map((d)=>( 
        <div className="card m-2 shadow-lg p-3 mb-5 bg-white rounded" > 
        <img src={"data:image/png;base64," + d.productImage} style={{ "width": "200px" }}></img>
        <div class="card-body ">
  
        <h4 class="card-title">{d.productName}</h4>
      <p class="card-text">{d.description}</p>
      <p class="card-text">{d.sellingPrice}</p>
          <Link  class="btn btn-primary" to={`/Purchase/${d.superProductId}`}>Purchase product</Link>
        </div>
      </div>
      ))):(
        <p>No matching items found</p>
      )
}
</div>
</div>
</>
    )
}
export default SuperProduct;


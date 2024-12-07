import React,{useContext, useEffect} from "react";
import AppContext from "../../context/AppContext";
const FilterProd = () => {
//   const { setFilteredData, products, filteredData } = useContext(AppContext);
// console.log(filteredData);

// useEffect(()=>{
    // const filterProdeuct = (e) => {
        // const a =  products.filter((p) => p.category == e.category);
        // setFilteredData(a);
    //   };
    //   filterProdeuct()
// },[filteredData])
 

  return (
    <div>
      {/*category filter products  */}
      <nav className="navbar " style={{ backgroundColor: "#6f42c1" }}>
        <div className="container-fluid">
          <div className="navbar-collapse">
            <ul className="navbar-nav d-flex flex-row justify-content-center">
              <li className="nav-item ms-4">
                <p
                  className="text-light nav-link "
                  onClick={filterProdeuct(products)}
                >
                  no filter
                </p>
              </li>
              <li className="nav-item ms-4">
                <p
                  className="text-light nav-link "
                  onClick={filterProdeuct("mobile")}
                >
                  mobiles
                </p>
              </li>
              <li className="nav-item ms-4">
                <p
                  className="text-light nav-link "
                  onClick={filterProdeuct("laptop")}
                >
                  laptops
                </p>
              </li>
              <li className="nav-item ms-4">
                <p
                  className="text-light nav-link "
                  onClick={filterProdeuct("camera")}
                >
                  camera
                </p>
              </li>
              <li className="nav-item ms-4">
                <p
                  className="text-light nav-link "
                  onClick={filterProdeuct("watch")}
                >
                  watch
                </p>
              </li>
              <li className="nav-item ms-4">
                <p
                  className="text-light nav-link "
                  onClick={filterProdeuct("men")}
                >
                  mens
                </p>
              </li>
              <li className="nav-item ms-4">
                <p
                  className="text-light nav-link "
                  onClick={filterProdeuct("women")}
                >
                  womens
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* show filtered category wise products */}
      {/* {filteredData.map((prod, i) => {
        return (
          <div key={i}>
            <div>
              <img src={prod.imgsrc} alt="" />
              <h3>{prod.title}</h3>
              <p>{prod.description}</p>
              <p>{prod.price}</p>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default FilterProd;

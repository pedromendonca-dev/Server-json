import './App.css';

import {useState, useEffect} from "react";

import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/products"


function App() {

  const [products, setProducts] = useState ([])

  const {data : items, httpConfig, loading, error} = useFetch(url);

  const [name,setName] = useState("")
  const [price,setPrice] = useState(0)




  


  //useEffect(() => {
  //  const fetchData = async () => {
  //    try {
  //      const res = await fetch(url);
  //      const data = await res.json();
  //      setProducts(data);
  //    } catch (error) {
  //      console.error("Error fetching data:", error);
  //    }
  //  };
//
 //   fetchData();
 // }, []);



  const handleSubmit = async (e) =>{
    e.preventDefault()

    const product = {
      name,
      price,
    };

    
    //const res = await fetch(url,{
     // method:"POST",
     // headers:{
     //   "Content-Type": "application/json"
     // },
     // body:JSON.stringify(product)
    //})
//
    //const addedProduct = await res.json();
//
//
    //setProducts((prevProducts)=>[...prevProducts, //addedProduct])

    httpConfig(product, "POST")

    setName("")
    setPrice("")
  }

  const handleRemove = (id) =>{
    httpConfig (id,"DELETE");
  };


  return (
  <div className="App">
    <h1>List of products</h1>
    {loading && <p>Carregando dados...</p>}
    {!loading &&
    <ul>
    {items && 
      items.map((product) => (
        <li key={product.id}>
          {product.name} - R$: {product.price}
          <button onClick={() => handleRemove(product.id)}> Remove </button>
        </li>
      ))
    }
  </ul>
  }


    <div className="add-product">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} name="name" onChange={(e)=> setName(e.target.value)} required/>
        </label>
        <label>
          Price:
          <input type="text" value={price} name="price" onChange={(e)=> setPrice(e.target.value)} required/>
        </label>


        {loading && <input type="submit" disabled value="Loading"/>}
        
        {error && <p>{error}</p>}
        
        {!error && <p></p>}

        {!loading && <input type="submit" value="Add"/>}
      </form>
    </div>
  </div>
  );
}

export default App;

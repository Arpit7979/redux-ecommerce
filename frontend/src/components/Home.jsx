import React from 'react'
import { useGetAllProductsQuery } from '../features/productsApi'
import "../App.css"
import { useDispatch } from 'react-redux'
import { addToCart, cartTotal } from '../features/cartSlice'
import { useNavigate} from "react-router"



const Home = () => {
 
  const {data,error,isLoading}=useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navitgate = useNavigate();

  const handleClick = (product)=>{
   dispatch(addToCart(product))
   dispatch(cartTotal())
   navitgate("/cart");
  }

  return (
    <div className="home-container">
      {isLoading?(<p>Loading....</p>):error?(<p>An error occoured...</p>):<>
        <h2>New Arrival</h2>
        <div className="products">
          {
            data.map(product=>(
              <div key={product.id} className="product">
                <h3>{product.name}</h3>
                <img src={product.image} alt="" />
                <div className="details">
                  <span>{product.disc}</span>
                  <span className='price'>{product.price} Rs</span>
                </div>
                <button onClick={()=>handleClick(product)} >Add to Cart</button>
              </div>
            ))
          }
        </div>
      </>}
    </div>
  )
}

export default Home

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartTotal, clearCart, decreaseCartQuantity, increaseCartQuantity, removeFromCart } from '../features/cartSlice'


const Cart = () => {
  const cart = useSelector(state => state.cart)
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(()=>{dispatch(cartTotal())},[cart,dispatch])
  const navigate = useNavigate();



  //payment razorpay

  const amount = cart.cartTotalAmount*100;
  const currency = "INR"
  const receiptId = "ark124"

  const getPayment = async(e)=>{
    const response = await fetch("http://localhost:5000/orders",{
      method:"POST",
      body:JSON.stringify({
        amount,
        currency,
        receipt:receiptId
      }),
      headers:{
        "content-type":"application/json",
      }
    })

    const order = await response.json();
    console.log(order);
    var options = {
      "key": "rzp_test_qeBNe20JEWtdUa", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      "name": "ARK SHOP",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id":order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async function (response){
          const body = { ...response,};
          const validateRes = await fetch("http://localhost:5000/orders/validate",{
            method:"POST",
            body:JSON.stringify(body),
            headers: {
                  "content-Type":"application/json"
            } 
          })
          const jsonRes = await validateRes.json();
          console.log(jsonRes)
      },
      "prefill": {
          "name": "ark",
          "email": "ark@example.com",
          "contact": "7061922505"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function (response){
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
  });
  rzp1.open();
    e.preventDefault();

  }

  return (
    <div className="cart-container">
    <h2>Shopping Cart</h2>
    {
      cart.cartItems.length===0?(
        <div className="empty-cart">
          <h3>Your Shopping Cart is Empty</h3>
          <Link to={"/"}>
            <span>Start Shopping</span>
          </Link>
        </div>
      ):(
        <div>
          <div className="title">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {
              cart.cartItems.map(item=>(
                <div className="cart-item" key={item.id}>
                 <div className="cart-product">
                  <img src={item.image} alt="" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.disc}</p>
                    <button onClick={()=>dispatch(removeFromCart(item))}>Remove</button>
                  </div>
                 </div>
                 <div className="cart-price">
                  RS {item.price}
                 </div>
                 <div className="cart-quantity">
                  <button onClick={()=>dispatch(decreaseCartQuantity(item))}>-</button>
                  <div className="count">{item.cartQuantity}</div>
                  <button onClick={()=>dispatch(increaseCartQuantity(item))}>+</button>
                 </div>
                 <div className="cart-total-price">
                  RS {item.price*item.cartQuantity}
                 </div>
                </div>
              ))
            }
          </div>
          <div className="cart-summary">
            <button onClick={()=>dispatch(clearCart())} className='clear-cart'>Clear Cart</button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span>{cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and charges applicable at checkout</p>
              {
                auth._id?<button onClick={getPayment}>Checkout</button>:<button style={{backgroundColor:"yellow",color:"black"}} onClick={()=>navigate("/login")}>Login to Checkout</button>
              }
              <Link to={"/"}>
                <span className='continue-shopping'>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      )
    }
    </div>
  )
}

export default Cart

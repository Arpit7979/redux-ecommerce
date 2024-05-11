import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
    cartTotalQuantity:0,
    cartTotalAmount:0,
}

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
           const itemIndex = state.cartItems.findIndex(product=>product.id===action.payload.id);

           if(itemIndex>=0){
            state.cartItems[itemIndex].cartQuantity+=1;
            toast.info("Increased Product Quantity",{position:"bottom-left"})
            
           }else{
            const tempProduct = {...action.payload,cartQuantity:1}
            state.cartItems.push(tempProduct)
            toast.success(`${action.payload.name} added to cart`,{position:"bottom-left"})
           } 

           localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
        removeFromCart:(state,action)=>{
            state.cartItems = state.cartItems.filter(
                item=>item.id !== action.payload.id
            )
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            toast.error(`${action.payload.name} Remove from Cart`,{position:"bottom-left"})

        },
        decreaseCartQuantity:(state,action)=>{
            const itemIndex = state.cartItems.findIndex(item=>{
               return item.id === action.payload.id
            })

            if(state.cartItems[itemIndex].cartQuantity>1){
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.info(`Decrease ${action.payload.name} Cart Quantity`,{position:"bottom-left"})
            }else if(state.cartItems[itemIndex].cartQuantity === 1){
                state.cartItems = state.cartItems.filter(
                    item=>item.id !== action.payload.id
                )
                toast.error(`${action.payload.name} Remove from Cart`,{position:"bottom-left"})
            }
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
        increaseCartQuantity:(state,action)=>{
            const itemIndex = state.cartItems.findIndex(item=>{
              return  item.id === action.payload.id
            })
            state.cartItems[itemIndex].cartQuantity += 1;
            toast.info(`Increase ${action.payload.name} Cart Quantity`,{position:"bottom-left"})
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
        clearCart:(state,action)=>{
            state.cartItems = [];
            toast.info("Cart Cleared",{position:"bottom-left"})
            return localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
        cartTotal:(state,action)=>{
           let {total,quantity} = state.cartItems.reduce((cartTotal,item)=>{
                const {price ,cartQuantity} = item;
                const totalAmount = price*cartQuantity;
                cartTotal.total += totalAmount;
                cartTotal.quantity += cartQuantity
                return cartTotal
            },{
                total:0,
                quantity:0,
            })
            state.cartTotalAmount = total;
            state.cartTotalQuantity = quantity
        }
        
    }
})

export const {addToCart,removeFromCart,decreaseCartQuantity,increaseCartQuantity,clearCart,cartTotal} = cartSlice.actions;

export default cartSlice.reducer
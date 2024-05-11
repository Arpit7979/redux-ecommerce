import styled from 'styled-components';

export const StyledForm = styled.form`
   max-width:450px;
   width:100;
   margin:4rem auto;

   h2{
    margin-bottom:2rem;
    font-size:2rem;
   }

   button,input{
    width:100%;
    height:3rem;
    margin-bottom:1rem;
    border-radius:10px;
    border:1px solid grey;
    outline:none;
    padding:5px;
    font-size:1rem;
    border-bottom:4px solid grey;

    &:focus{
        border:1px solid skyblue;
        border-bottom:4px solid skyblue;
    }
   }

   button{
    cursor:pointer;
    border:none;
    &:focus{
        border:none
    }
   }

   p{
    color:red;
   }
`;


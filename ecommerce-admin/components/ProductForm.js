import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
    _id,
    title : existingTitle, 
    description : existingDescription, 
    price : existingPrice
}){
    const router = useRouter();

    const[title, setTitle] = useState(existingTitle || '');
    const[description, setDescription] = useState(existingDescription || '');
    const[price, setPrice] = useState(existingPrice || '');

    const [goToProduct, setGoToProduct] = useState(false);

    async function saveProduct(ev){
        ev.preventDefault();
        const data = {title, description, price};  
        //Updata Product
        if(_id){
            await axios.put('/api/products', {...data, _id});
        } 
        //Create Product
        else{
            await axios.post('/api/products', data);            
        }
        setGoToProduct(true);
    }
    if(goToProduct){
        router.push('/products');
    }

    return(
            <form onSubmit={saveProduct}>

            <label>Product Name</label>
            <input 
            type="text" 
            placeholder="Product Name" 
            value={title} 
            onChange={ev => setTitle(ev.target.value)}
            />

            <label>Photos</label>

            <label>Description</label>
            <textarea 
            placeholder="Description"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            />

            <label>Price (in USD)</label>
            <input 
            type="number" 
            placeholder="Price"
            value={price}
            onChange={ev => setPrice(ev.target.value)}
            />

            <button 
            type="submit" 
            className="btn-primary">Save</button>

            </form>
    )
}
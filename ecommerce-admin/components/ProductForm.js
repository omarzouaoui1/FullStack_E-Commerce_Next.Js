import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
    title : existingTitle, 
    description : existingDescription, 
    price : existingPrice
}){
    const router = useRouter();

    const[title, setTitle] = useState(existingTitle || '');
    const[description, setDescription] = useState(existingDescription || '');
    const[price, setPrice] = useState(existingPrice || '');

    const [goToProduct, setGoToProduct] = useState(false);

    async function createProduct(ev){
        ev.preventDefault();
        const data = {title, description, price};  
        await axios.post('/api/products', data);
        
        setGoToProduct(true);
    }
    if(goToProduct){
        router.push('/products');
    }

    return(
            <form onSubmit={createProduct}>

            <label>Product Name</label>
            <input 
            type="text" 
            placeholder="Product Name" 
            value={title} 
            onChange={ev => setTitle(ev.target.value)}
            />

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
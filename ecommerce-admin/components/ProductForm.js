import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
    _id,
    title : existingTitle, 
    description : existingDescription, 
    price : existingPrice,
    images,
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

    async function uploadImages(ev){
        const files = ev.target?.files ;
        if(files?.length > 0){
            const data = new FormData();
            for(const file of files){
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            console.log(res.data);
        }
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
            <div className="mb-2">
                <label className="w-60 h-60 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-700 rounded-md bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                    Upload 
                    </div>
                    <input type="file" className="hidden" onChange={uploadImages}/>
                </label>
                {!images?.length && (
                <div>No Photos in this product</div>
            )}
            </div>

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
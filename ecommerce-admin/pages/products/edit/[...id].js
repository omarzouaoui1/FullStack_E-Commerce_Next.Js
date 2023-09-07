import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EditProductPage(){

    const router = useRouter();
    const {id} = router.query;
    useEffect(()=>{},[])

    return(
        <Layout>
            Edit 
        </Layout>
    )
}
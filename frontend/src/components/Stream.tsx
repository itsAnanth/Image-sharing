import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';

function Stream() {
    const [base64, setBase64] = useState(null || String);
    const [gotData, setData] = useState(false);
    const params = useParams();
    const canvasRef = useRef(null);
    const imgId = params.id;

    useEffect(() => {
        const getData = async () => {
            const res = await (await fetch(`http://localhost:5000/image?id=${imgId}`).catch(console.error))?.json();
            let b64;
            if (res.success)
                b64 = res.message;
            setBase64(`data:image/jpg;base64,${b64}`);
        };

        getData().then(() => setData(true));

        if (gotData) {
            renderImage();
        }

        async function renderImage() {
            const image = document.createElement('img');
            const canvas = (canvasRef.current as unknown as HTMLCanvasElement);
            const ctx = canvas.getContext('2d');
    
            image.src = base64;
    
            const promise = new Promise(res => image.onload = res);
    
            await promise;
    
            const aw = (window.innerWidth / 2) / image.width;
            const ah = (window.innerHeight / 2) / image.height;
    
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
    
    
    
            ctx?.drawImage(image, 0, 0, image.width * aw, image.height * ah);
    
        }


    }, [imgId, gotData, base64]);





    return gotData ? (
        <>
            <canvas id="canvas" ref={canvasRef}></canvas>
            {/* <img id="img" src={base64} alt="img"></img> */}
        </>
    ) : (
        <>
            <div>Loading</div>
        </>
    )
}


export default Stream;
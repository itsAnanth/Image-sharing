import React from "react";


function Upload() {
    return (
        <>
            <div id='main-div'>
                <form encType="multipart/form-data" name='imageUpload' id='image-upload'>
                    <div className='form-group'>
                        <label className='custom-label'> Select An Image To Upload: </label>
                        <input accept="image/png" type="file" name="user-file"></input>
                    </div>

                    {/* <div className='form-group'>
                        <label class='custom-label' style='vertical-align: top;'> Video Details:</label>
                        <textarea rows="10" cols="80" name='details'></textarea>
                    </div> */}

                    <div style={{ paddingLeft: '15%' }}>
                        <input type="submit" id='submit' value="Upload File" onClick={onSubmit} name="submit"></input>
                    </div>
                </form>
            </div>
            <div style={{ paddingLeft: "15%" }} id='message'></div>
            <img id="image" alt="img"></img>
        </>
    );
}


function onSubmit(e: React.FormEvent<HTMLInputElement>) {
    console.log('at submit')
    e.preventDefault();
    let customMessage = document.getElementById('message');
    if (validateForm(customMessage)) {
        uploadVideo(customMessage);
    }
}

function validateForm(customMessage: HTMLElement | null) {
    // @ts-ignore
    const uploadedFile = (document.getElementById('image-upload') as unknown as HTMLFormElement).elements[0].files[0];
    if (!uploadedFile) {
        setMessage({ element: customMessage, message: "Please select an image to upload" });
        return false;
    }
    const fileLimit = 104857600;
    if (uploadedFile.size > fileLimit) {
        setMessage({ element: customMessage, message: "Maximum video size allowed: 100MB" });
        return false;
    }
    return true;
}

function uploadVideo(customMessage: HTMLElement | null) {
    (document.getElementById("submit") as HTMLInputElement).disabled = true;
    customMessage && (customMessage.innerHTML = 'uploading image..');
    let formElement = (document.getElementById("image-upload") as HTMLFormElement);
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/", true);
    request.onload = onComplete;
    request.upload.onprogress = fileUploadPercentage;
    const data = new FormData(formElement);
    request.send(data);
}

function onComplete(this: XMLHttpRequest, event: ProgressEvent<EventTarget>) {
    if (!event) return;
    if (!event.currentTarget) return;
    let customMessage = document.getElementById('message');
    const response = JSON.parse(this.response);
    console.log(response);
    if (response.success) {
        (document.getElementById('main-div') as HTMLElement).style.display = 'none';
        customMessage && (customMessage.style.color = '#9C27B0');
        setMessage({
            element: customMessage,
            message: `Video Uploaded successfully!!. Please <a href=${response.message.link}>click here</a> to view the video.`
        })
    } else {
        setMessage({ element: customMessage, message: response.error });
        customMessage && (customMessage.style.color = 'red');
    }
    (document.getElementById("submit") as HTMLInputElement).disabled = false;
    (document.getElementById('image') as HTMLImageElement).src = `data:image/png;base64,${response.message}`;
}

function fileUploadPercentage(e: ProgressEvent<EventTarget>) {
    if (!e.lengthComputable) return;
    let customMessage = document.getElementById('message');
    let percentage = (e.loaded / e.total) * 100;
    setMessage({
        element: customMessage,
        message: `Uploading Image: ${percentage}%`
    })
};

function setMessage({ element, message }: { element: HTMLElement | null, message: string }) {
    element && (element.innerHTML = message);
}


export default Upload;
const count = 10;
let photoArray=[];
const API_KEY = "oVVPjWDDcQYO4MZeHjkU1F3C5zPQfabjUDcOV8yiI78";
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;
let image_container= document.querySelector("#image-container");
let loader =document.querySelector("#loader");
let imageLoaded=0;
let totalImages;
let ready=false;

function imageLoadFunc()
{
  imageLoaded++;
  if(imageLoaded===totalImages) {
    ready=true;
    loader.hidden=true;
 }
  console.log(ready)
}

function displayGallery()
{
    totalImages=photoArray.length;
    imageLoaded=0;
    photoArray.forEach((photo) => 
    {
        const item= document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        const imageElemnt= document.createElement('img');
        imageElemnt.setAttribute('src', photo.urls.regular);
        imageElemnt.setAttribute('alt', photo.alt_description);
        imageElemnt.setAttribute('title', photo.alt_description);
        imageElemnt.addEventListener("load", imageLoadFunc);
        item.appendChild(imageElemnt);
        image_container.appendChild(item);
    }
    )
}

//Get photos from splash
async function getPhotos() {
  try {
    const response = await fetch(API_URL);
     photoArray = await response.json();
     console.log(photoArray);
     displayGallery();
  } catch (error) {
    console.log(error);
  }
}
 
window.addEventListener('scroll', ()=>{
    if(window.innerHeight+window.scrollY>= document.body.offsetHeight-1000 && ready){
     ready=false;
     getPhotos();
    }
})
getPhotos()

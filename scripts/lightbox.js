(function(){
    var imageIndex = 0,
        lightboxImage = document.getElementById('lightbox-image'),
        lightboxCaption = document.getElementById('lightbox-caption'),
        lightboxImageCount = document.getElementById('lightbox-image-count'),
        loadingGifURL = "http://3.bp.blogspot.com/-3Hb7OM_iVEw/VYF6rNj6nuI/AAAAAAAACRg/KEjZSLILSkk/s1600/clock-loading.gif",
        imageCountTotal,
        imageData;

    lightboxImage.src = loadingGifURL;
    window.jsonp_callback = function(response) {
        delete window.jsonp_callback;
        ref.parentNode.removeChild(script);
        handleResponse(response);
    };

    var ref = window.document.getElementsByTagName('script')[0];
    var script = document.createElement('script');
    script.src = 'https://api.instagram.com/v1/users/490773256/media/recent?access_token=490773256.fc3bba8.0bb01a7762694dc081b239114063af32&count=33&callback=jsonp_callback';
    ref.parentNode.insertBefore(script, ref);

    function handleResponse(response){
        imageData = response.data;
        imageCountTotal = imageData.length;
        updateImage();
    }

    function updateImage(){
        lightboxImage.src = imageData[imageIndex].images.standard_resolution.url;
        lightboxImageCount.innerHTML = (imageIndex + 1) + "/" + imageCountTotal;
        lightboxCaption.innerHTML = imageData[imageIndex].caption ? imageData[imageIndex].caption.text : "";
    }

    function previousImage(){
        imageIndex--;
        if(imageIndex < 0){
            imageIndex = imageData.length - 1;
        }
        updateImage();
    }

    function nextImage(){
       imageIndex++;
       if(imageIndex === imageData.length){
           imageIndex = 0;
       }
       updateImage(); 
    }

    document.getElementById("navigate-left").addEventListener("click", previousImage);
    document.getElementById("navigate-right").addEventListener("click", nextImage);
    window.addEventListener("keydown", function(event){
        if(event.which === 37){
            previousImage();
        } else if(event.which === 39){  
            nextImage();
        }
    });
})();
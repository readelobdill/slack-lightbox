(function(){
    var imageIndex = 0,
        lightBoxImage = document.getElementById('lightbox-image'),
        loadingGifURL = "http://25.media.tumblr.com/e6335c8ed1b993faa6c4ca4dab5996d7/tumblr_mmul7vJJ8X1qbogk6o1_1280.gif",
        imageData;

    lightBoxImage.src = loadingGifURL;
    window['jsonp_callback'] = function(response) {
        delete window['jsonp_callback'];
        ref.parentNode.removeChild(script);
        handleResponse(response);
    };

    var ref = window.document.getElementsByTagName('script')[0];
    var script = document.createElement('script');
    script.src = 'https://api.instagram.com/v1/users/490773256/media/recent?access_token=490773256.fc3bba8.0bb01a7762694dc081b239114063af32&count=33&callback=jsonp_callback';
    ref.parentNode.insertBefore(script, ref);

    function handleResponse(response){
        imageData = response.data;
        lightBoxImage.src = imageData[imageIndex].images.standard_resolution.url;
    }

    document.getElementById("navigate-left").addEventListener("click", function() {
        imageIndex--;
        if(imageIndex < 0){
            imageIndex = imageData.length - 1;
        }
        updateImage();
    });

    document.getElementById("navigate-right").addEventListener("click", function() {
        imageIndex++;
        if(imageIndex === imageData.length){
            imageIndex = 0;
        }
        updateImage();
    });

    function updateImage(){
        lightBoxImage.src = imageData[imageIndex].images.standard_resolution.url;
    }
})();
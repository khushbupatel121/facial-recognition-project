(function() {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.

    var width = 320; // We will scale the photo width to this
    var height = 0; // This will be computed based on the input stream

    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.

    var streaming = false;

    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() { //reference
        console.log('hi');
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');
        console.log(photo);
        //get the media stream
        navigator.mediaDevices.getUserMedia({ video: true }) //access
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(err) { //error
                console.log("An error occurred: " + err);
            });
        //Listen for the video to start playing
        video.addEventListener('canplay', function(ev) { //
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);
                console.log('height');


                video.setAttribute('width', width);
                video.setAttribute('height', height);
                streaming = true;
            }
        }, false);
        //Handle clicks on the button
        startbutton.addEventListener('click', function(ev) {
            console.log('adas');
            takepicture();
            ev.preventDefault();
        }, false);

        clearphoto();
    }
    //Capturing a frame from the stream
    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        } else {
            clearphoto();
        }
    }

    // Fill the photo with an indication that none has been
    // captured.
    //Clearing the photo box
    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#FF0000";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }


    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, false);
})();
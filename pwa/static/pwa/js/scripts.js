// Get DOM elements
const captureButton = document.getElementById('captureButton');
const video = document.getElementById('video');
const freezeButton = document.getElementById('freezeButton');
const capturedCanvas = document.getElementById('capturedCanvas');
const capturedContext = capturedCanvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const resultText = document.getElementById('result');
const resultBox = document.getElementById('resultBox');

let stream;

// Event listener for the "Take Picture" button
captureButton.addEventListener('click', async () => {
  try {
    // Access the device camera
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });

    // Set the camera feed as the source for the video element
    video.srcObject = stream;

    // Display other buttons and hide the capture button
    freezeButton.style.display = 'block';
    resetButton.style.display = 'block';
    captureButton.style.display = 'none';
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
});

// Event listener for the "Analyze Picture" button
freezeButton.addEventListener('click', async () => {
  // Set the canvas dimensions to match the video feed
  capturedCanvas.width = video.videoWidth;
  capturedCanvas.height = video.videoHeight;

  // Draw the video feed onto the canvas
  capturedContext.drawImage(
    video,
    0,
    0,
    capturedCanvas.width,
    capturedCanvas.height
  );

  // Display the captured image and hide the video feed
  video.style.display = 'none';
  capturedCanvas.style.display = 'block';
  capturedCanvas.style.width = '100%';

  // Stop the video stream
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  }

  // Convert the captured image to base64-encoded JPEG format
  const imageData = capturedCanvas.toDataURL('image/jpeg');

  // Get the CSRF token from the form
  var csrfToken = $('[name=csrfmiddlewaretoken]').val();

  try {
    // Send the captured image data to the server for analysis
    const response = await fetch('/analyze_picture/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ image_data: imageData }),
    });

    // Parse the response as JSON
    const data = await response.json();

    // Display the analysis result on the same page
    if (data.result) {
      resultText.innerHTML = 'This item is recyclable!';
      resultBox.style.border = '3px solid green';
    } else {
      resultText.innerHTML = 'This item is not recyclable.';
      resultBox.style.border = '3px solid red';
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// Event listener for the "Reset Picture" button
resetButton.addEventListener('click', () => {
  // Reset the state and allow capturing another picture
  video.style.display = 'block';
  capturedCanvas.style.display = 'none';
  freezeButton.style.display = 'block';
  resetButton.style.display = 'block';
  resultText.innerHTML = '';
  resultBox.style.border = 'none';

  // Stop the video stream
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  }
});
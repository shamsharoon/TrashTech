# yourappname/views.py
from django.shortcuts import render
from django.http import JsonResponse
import json
from dotenv import load_dotenv
from msrest.authentication import CognitiveServicesCredentials
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from PIL import Image, ImageDraw
import requests
from io import BytesIO
import base64
import os


from .backend.recyclable import recyclable

def home(request):
    return render(request, "pwa/home.html")

def app(request):
    return render(request, "pwa/app.html")

def detectObject(image_data):
    # Get API_KEY and ENDPOINT from environment variables
    load_dotenv()
    API_KEY = os.getenv("API_KEY")
    ENDPOINT = os.getenv("ENDPOINT")

    # Create a ComputerVisionClient
    cv_client = ComputerVisionClient(ENDPOINT, CognitiveServicesCredentials(API_KEY))

    # Decode base64-encoded image data
    image_data_decoded = base64.b64decode(image_data.split(",")[1])
    image_stream = BytesIO(image_data_decoded)

    # Perform object detection
    response_objects = cv_client.detect_objects_in_stream(image_stream)
    detected_objects = response_objects.objects

    # Perform image description
    image_stream.seek(0)  # Reset stream position
    response_description = cv_client.describe_image_in_stream(image_stream)
    image_description = response_description.captions[0].text

    # Perform TagImage operation
    image_stream.seek(0)  # Reset stream position
    tags_result = cv_client.tag_image_in_stream(image_stream)
    tags = [tag.name for tag in tags_result.tags]

    # Print image description and tags
    print("Image Description:", image_description)

    image_description_tags = image_description.split(" ")
    image_description_tags.extend(tags)

    print("Image Description Tags:", set(image_description_tags))
    return image_description_tags


def recyclable(image_data):
    # Define a dictionary containing recyclable objects tags
    recyclable_objects_tags = {
        "recyclable": [
            "plastic",
            "bottle",
            "spoon",
            "glass",
            "cup",
            "kitchen utensil",
            "drinkware",
            "container",
            "waterbottle",
            "plastic bottle",
            "plate",
            "platter",
            "dish",
            "tableware",
            "cylinder",
        ]
    }
    
    

    # Use the detectObject function to retrieve tags from the provided image_data
    tags_retrieved = detectObject(image_data)

    # Check if any of the retrieved tags match recyclable objects
    for tag in tags_retrieved:
        if tag in recyclable_objects_tags["recyclable"]:
            # If a recyclable tag is found, return True
            return True

    # If no recyclable tag is found, return False
    return False

def analyze_picture(request):
    if request.method == "POST":
        # Parse the JSON data from the request body
        data = json.loads(request.body.decode("utf-8"))

        # Access the image_data from the parsed data
        image_data = data.get("image_data", None)

        # Do something with the image_data, for example, pass it to recyclable function
        result = recyclable(image_data)

        # Return the result as a JSON response
        print()
        return JsonResponse({"result": result})

    # Handle other HTTP methods if needed
    return JsonResponse({"error": "Invalid request method"})

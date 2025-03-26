from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

@csrf_exempt
def upload_file(request):
    if request.method == 'POST' and request.FILES.get('file') and request.POST.get('emp_id'):
        emp_id = request.POST['emp_id']
        file = request.FILES['file']

        # Create folder path: media/{emp_id}/filename
        folder_path = f"{emp_id}/{file.name}"
        file_name = default_storage.save(folder_path, ContentFile(file.read()))
        file_url = default_storage.url(file_name)

        return JsonResponse({"message": "File uploaded successfully", "url": file_url}, status=201)

    return JsonResponse({"error": "No file uploaded or Employee ID missing"}, status=400)

from django.http import JsonResponse
from .models import Document
from django.conf import settings
import os

def search_files(request, emp_id):
    emp_folder_path = os.path.join(settings.MEDIA_ROOT, emp_id)

    # Check if the folder exists
    if not os.path.exists(emp_folder_path):
        return JsonResponse({"files": []})

    # List all files in the employee folder
    files = os.listdir(emp_folder_path)
    file_urls = [f"/media/{emp_id}/{file}" for file in files]

    return JsonResponse({"files": file_urls})

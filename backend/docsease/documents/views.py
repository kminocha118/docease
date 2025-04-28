from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
import os

#onrole
@csrf_exempt
def upload_onrole_file(request):
    if request.method == 'POST' and request.FILES.get('file') and request.POST.get('emp_id'):
        emp_id = request.POST['emp_id']
        file = request.FILES['file']

     
        folder_path = f"onrole_employees/{emp_id}/{file.name}"
        file_name = default_storage.save(folder_path, ContentFile(file.read()))
        file_url = default_storage.url(file_name)

        return JsonResponse({"message": "On-role file uploaded successfully", "url": file_url}, status=201)

    return JsonResponse({"error": "No file uploaded or Employee ID missing"}, status=400)


# offrole
@csrf_exempt
def upload_offrole_file(request):
    if request.method == 'POST' and request.FILES.get('file') and request.POST.get('emp_id'):
        emp_id = request.POST['emp_id']
        file = request.FILES['file']

        
        folder_path = f"offrole_employees/{emp_id}/{file.name}"
        file_name = default_storage.save(folder_path, ContentFile(file.read()))
        file_url = default_storage.url(file_name)

        return JsonResponse({"message": "Off-role file uploaded successfully", "url": file_url}, status=201)

    return JsonResponse({"error": "No file uploaded or Employee ID missing"}, status=400)


# ----------- SEARCH FILES -----------
def search_files(request, emp_id):
    file_urls = []

    
    for role in ["onrole_employees", "offrole_employees"]:
        emp_folder_path = os.path.join(settings.MEDIA_ROOT, role, emp_id)

        if os.path.exists(emp_folder_path):
            files = os.listdir(emp_folder_path)
            for file in files:
                file_urls.append(f"/media/{role}/{emp_id}/{file}")

    return JsonResponse({"files": file_urls})

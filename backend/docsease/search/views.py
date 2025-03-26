from django.http import JsonResponse
from .models import Document

def search_files(request, emp_id):
    files = Document.objects.filter(emp_id=emp_id)
    file_list = [{"name": file.file.name, "url": file.file.url} for file in files]
    return JsonResponse({"files": file_list})

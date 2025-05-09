from django.urls import path
from .views import upload_file, search_files

urlpatterns = [
    path('api/upload/', upload_file, name='upload_file'),
    path('api/search/<str:emp_id>/', search_files, name='search_files'),
]

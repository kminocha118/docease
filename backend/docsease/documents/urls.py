from django.urls import path
from .views import (
    upload_onrole_file,
    upload_offrole_file,
    search_files
)

urlpatterns = [
    # On-role employee upload
    path('upload/onrole/', upload_onrole_file, name='upload_onrole'),

    # Off-role employee upload
    path('upload/offrole/', upload_offrole_file, name='upload_offrole'),

    # Search documents by employee ID
    path('api/search/<str:emp_id>/', search_files, name='search_files'),
]

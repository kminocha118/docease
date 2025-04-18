# documents/serializers.py

from rest_framework import serializers
from .models import OnRoleDocument, OffRoleDocument

class OnRoleDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnRoleDocument
        fields = '__all__'

class OffRoleDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OffRoleDocument
        fields = '__all__'

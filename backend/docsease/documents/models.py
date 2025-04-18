from django.db import models

# Function to store on-role employee documents
def upload_to_onrole(instance, filename):
    return f'onrole_employees/{filename}'

# Function to store off-role employee documents
def upload_to_offrole(instance, filename):
    return f'offrole_employees/{filename}'

class OnRoleDocument(models.Model):
    emp_id = models.CharField(max_length=100)
    file = models.FileField(upload_to=upload_to_onrole)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"On-role - {self.emp_id}"

class OffRoleDocument(models.Model):
    emp_id = models.CharField(max_length=100)
    file = models.FileField(upload_to=upload_to_offrole)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Off-role - {self.emp_id}"

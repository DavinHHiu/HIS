from django.db import models


class Patient(models.Model):
    name = models.CharField(max_length=255)
    dateOfBirth = models.DateField()
    mobile = models.CharField(max_length=10)
    email = models.CharField(max_length=255)
    address = models.CharField(max_length=255, null=True, blank=True)
    healthInsuranceNumber = models.CharField(max_length=255, null=True, blank=True)
    startBiography = models.CharField(max_length=255, null=True, blank=True)

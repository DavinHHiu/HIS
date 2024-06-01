from django.db import models


class Doctor(models.Model):
    name = models.CharField(max_length=255)
    dateOfBirth = models.DateField()
    mobile = models.CharField(max_length=10)
    email = models.CharField(max_length=255)
    address = models.CharField(max_length=255, null=True, blank=True)
    specializeIn = models.CharField(max_length=255, null=True, blank=True)

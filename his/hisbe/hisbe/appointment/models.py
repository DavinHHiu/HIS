from django.db import models


class Appointment(models.Model):
    patient_name = models.CharField(max_length=255)
    patient_mobile = models.CharField(max_length=255)
    patient_email = models.CharField(max_length=255)
    patient_address = models.CharField(max_length=255)
    patient_dob = models.DateField()
    dateOfAppointment = models.DateField()
    fromTime = models.TimeField()
    toTime = models.TimeField()
    doctor_id = models.IntegerField()
    treatment = models.CharField(max_length=255)
    note = models.CharField(max_length=255, null=True, blank=True)

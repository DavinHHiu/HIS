from rest_framework import serializers
from appointment.models import Appointment
from doctor.models import Doctor


class AppointmentSerializer(serializers.ModelSerializer):
    consulting_doctor = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = "__all__"

    def get_consulting_doctor(self, obj):
        doctor = Doctor.objects.get(id=obj.doctor_id)
        return doctor.name

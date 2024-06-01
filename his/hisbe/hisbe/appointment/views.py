from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from appointment.models import Appointment
from appointment.serializers import AppointmentSerializer


class AppointmentApiView(APIView):
    def get(self, request):
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        action = request.data.get("action")
        if action == "get":
            appointment_id = request.data.get("id")
            appointment = Appointment.objects.get(id=appointment_id)
            if appointment:
                serializer = AppointmentSerializer(appointment)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status.HTTP_400_BAD_REQUEST)
        if action == "add":
            appointment_data = request.data.get("appointment")
            appointment = Appointment.objects.create(**appointment_data)
        if action == "update":
            appointment_data = request.data.get("appointment")
            appointment = Appointment(
                id=appointment_data["id"],
                patient_name=appointment_data["patient_name"],
                patient_mobile=appointment_data["patient_mobile"],
                patient_email=appointment_data["patient_email"],
                patient_address=appointment_data["patient_address"],
                patient_dob=appointment_data["patient_dob"],
                dateOfAppointment=appointment_data["dateOfAppointment"],
                fromTime=appointment_data["fromTime"],
                toTime=appointment_data["toTime"],
                doctor_id=appointment_data["doctor_id"],
                treatment=appointment_data["treatment"],
                note=appointment_data["note"],
            )
            appointment.save()
            return Response(1, status=status.HTTP_200_OK)
        if action == "delete":
            appointment_id = request.data.get("id")
            appointment = Appointment.objects.get(id=appointment_id)
            if appointment:
                appointment.delete()
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

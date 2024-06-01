from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from doctor.models import Doctor
from doctor.serializers import DoctorSerializer


class DoctorApiView(APIView):
    def get(self, request):
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        action = request.data.get("action")
        if action == "get":
            doctor_id = request.data.get("id")
            doctor = Doctor.objects.get(id=doctor_id)
            if doctor:
                serializer = DoctorSerializer(doctor)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status.HTTP_400_BAD_REQUEST)

        if action == "add":
            doctor_data = request.data.get("doctor")
            doctor = Doctor.objects.create(**doctor_data)
        if action == "update":
            doctor_data = request.data.get("doctor")
            doctor = Doctor(
                id=doctor_data["id"],
                name=doctor_data["name"],
                dateOfBirth=doctor_data["dateOfBirth"],
                mobile=doctor_data["mobile"],
                email=doctor_data["email"],
                address=doctor_data["address"],
                specializeIn=doctor_data["specializeIn"],
            )
            doctor.save()
            return Response(1, status=status.HTTP_200_OK)
        if action == "delete":
            doctor_id = request.data.get("id")
            doctor = Doctor.objects.get(id=doctor_id)
            if doctor:
                doctor.delete()
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

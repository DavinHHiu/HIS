from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from patient.models import Patient
from patient.serializers import PatientSerializer
import json


class PatientApiView(APIView):
    def get(self, request):
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        action = request.data.get("action")
        if action == "get":
            patient_id = request.data.get("id")
            patient = Patient.objects.get(id=patient_id)
            if patient:
                serializer = PatientSerializer(patient)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status.HTTP_400_BAD_REQUEST)
        if action == "add":
            patient_data = request.data.get("patient")
            patient = Patient.objects.create(**patient_data)
        if action == "update":
            patient_data = request.data.get("patient")
            patient = Patient(
                id=patient_data["id"],
                name=patient_data["name"],
                dateOfBirth=patient_data["dateOfBirth"],
                mobile=patient_data["mobile"],
                email=patient_data["email"],
                address=patient_data["address"],
                healthInsuranceNumber=patient_data["healthInsuranceNumber"],
                startBiography=patient_data["startBiography"],
            )
            patient.save()
            return Response(1, status=status.HTTP_200_OK)
        if action == "delete":
            patient_id = request.data.get("id")
            print(patient_id)
            patient = Patient.objects.get(id=patient_id)
            if patient:
                patient.delete()
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

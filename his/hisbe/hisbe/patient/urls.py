from django.urls import path, include
from .views import PatientApiView

urlpatterns = [
    path("patients/", PatientApiView.as_view()),
]

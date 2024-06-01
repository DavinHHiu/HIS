from django.urls import path
from .views import DoctorApiView

urlpatterns = [
    path("doctors/", DoctorApiView.as_view()),
]

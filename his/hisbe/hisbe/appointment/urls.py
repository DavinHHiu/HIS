from django.urls import path
from appointment.views import AppointmentApiView

urlpatterns = [
    path("appointments/", AppointmentApiView.as_view()),
]

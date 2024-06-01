from django.contrib import admin
from django.urls import path, include
from patient import urls as patient_urls
from doctor import urls as doctor_urls
from appointment import urls as appointment_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(patient_urls)),
    path("api/", include(doctor_urls)),
    path("api/", include(appointment_urls)),
]

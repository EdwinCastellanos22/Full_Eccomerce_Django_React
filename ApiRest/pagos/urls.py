from django.urls import path
from .views import crear_pago

urlpatterns = [
    path("pago/", crear_pago, name="crear pago")
]

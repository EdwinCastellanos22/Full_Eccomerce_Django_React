from django.shortcuts import render
import paypalrestsdk
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import PagoCarrito
from api1.models import Carrito
from .serializer import PagoCarritoSerializer
from django.conf import settings

# Create your views here.

@api_view(['POST'])
def crear_pago(request):

    usuario= request.user

    if not usuario.is_authenticated:
        return Response({'error':'Usuario no autenticado'}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        carrito= Carrito.objects.filter(user= usuario)
        serializer= PagoCarritoSerializer(carrito)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Carrito.DoesNotExist:
        return Response({'error':'Carrito no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
    # paypalrestsdk.configure({
    #     'mode': 'sandbox',
    #     'client_id': settings.PAYPAL_CLIENT_ID,
    #     'client_id': settings.PAYPAL_CLIENT_SECRET,
    # })

    # items= []
    # for car in carrito:
    #     for elemento in car.objects.all():
    #         item= {
    #             'nombre': elemento.producto.nombre,
    #             'cantidad': str(elemento.cantidad),
    #             'precio': str(elemento.producto.precio)
    #         }

    #         items.append(items)

    # payment= paypalrestsdk.Payment({
    #     "intent": "sale",
    #     "payer": {
    #         "payment_method": "paypal"
    #     },
    #     "redirect_urls": {
    #         "return_url": "http://localhost:8000/pago/completado/",
    #         "cancel_url": "http://localhost:8000/pago/cancelado/"
    #     },
    #     "transactions": [{
    #         "item_list": {
    #             "items": items
    #         },
    #         "amount": {
    #             "total": str(carrito.precio_total),
    #             "currency": "USD"
    #         },
    #         "description": "Compra en mi sitio web."
    #     }]
    # })

    # if payment.create():
    #     for link in payment.links:
    #         if link.rel == 'approval_url':
    #             return Response({'url':link.href})
    # else:
    #     return Response({'error':payment.error}, status=status.HTTP_400_BAD_REQUEST)    
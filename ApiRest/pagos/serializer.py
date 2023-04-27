from rest_framework import serializers
from .models import PagoCarrito

class PagoCarritoSerializer(serializers.ModelSerializer):

    producto_nombre= serializers.ReadOnlyField(source= 'producto.nombre')
    producto_precio= serializers.ReadOnlyField(source= 'producto.precio')


    class Meta:
        model= PagoCarrito
        fields= ['id','carrito', 'producto', 'producto_nombre', 'producto_precio', 'cantidad']
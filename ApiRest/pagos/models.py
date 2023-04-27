from django.db import models
from api1.models import Carrito, Producto

# Create your models here.
class PagoCarrito(models.Model):

    id = models.AutoField(primary_key=True)
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    producto= models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad= models.PositiveIntegerField(default=1)

    class Meta:
        unique_together= ('carrito', 'producto')

    def __str__(self):
        return self.carrito

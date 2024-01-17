from django.db import models

# Create your models here.

class Item(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    typeProduit = models.CharField(max_length=120)
    stock = models.IntegerField()
    minimumStock = models.IntegerField()
    enAchat = models.BooleanField(default=False)
    
    def _str_(self):
        return self.title

"""
Voici l’information que l’on veut sauvegarder concernant les produits de l’entreprise :
-	Nom du produit;
-	Description du produit;
-	Type de produit;
-	Quantité actuelle en stock;
-	Seuil minimum en stock;

"""
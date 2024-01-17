from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = (
            'id',
            'title',
            'description', 
            'typeProduit', 
            'stock',
            'minimumStock',
            'enAchat',
        )
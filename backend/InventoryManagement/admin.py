from django.contrib import admin
from .models import Item

class InventoryAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'description', 
        'typeProduit', 
        'stock',
        'minimumStock',
        'enAchat'
    )

# Register your models here.

admin.site.register(Item, InventoryAdmin)
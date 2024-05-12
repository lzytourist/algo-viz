from rest_framework import serializers

from .models import Category


def create_slug(name):
    return (name
            .lower()
            .replace(' ', '-')
            .replace('--', '-'))


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'slug', 'description')
        extra_kwargs = {
            'slug': {'read_only': True},
        }

    def validate_name(self, value):
        slug = create_slug(value)
        return not Category.objects.filter(slug=slug).exists()

    def create(self, validated_data):
        slug = create_slug(validated_data['name'])
        validated_data['slug'] = slug
        return super().create(validated_data)

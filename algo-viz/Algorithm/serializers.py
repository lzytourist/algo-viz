from rest_framework import serializers

from Algorithm.models import AlgorithmCategory, Algorithm, Comment, UserProgress


class AlgorithmCategorySerializer(serializers.ModelSerializer):
    parent = serializers.SerializerMethodField()

    class Meta:
        model = AlgorithmCategory
        exclude = ('id',)

    @staticmethod
    def get_parent(obj):
        if obj.parent:
            return AlgorithmCategorySerializer(obj.parent).data
        return None


class AlgorithmSerializer(serializers.ModelSerializer):
    category = AlgorithmCategorySerializer(read_only=True)

    class Meta:
        model = Algorithm
        exclude = ('id',)


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        exclude = ('id', 'algorithm')
        read_only_fields = ('user', 'algorithm')

    @staticmethod
    def get_user(obj):
        return f"{obj.user.first_name} {obj.user.last_name}"


class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        exclude = ('id',)
        read_only_fields = ('user', 'algorithm')

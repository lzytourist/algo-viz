from django.db import IntegrityError
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from AlgoViz.permissions import IsVerified

from .models import AlgorithmCategory, Algorithm, Comment, UserProgress
from .serializers import AlgorithmCategorySerializer, AlgorithmSerializer, CommentSerializer, UserProgressSerializer


class AlgorithmCategoryListAPIView(ListAPIView):
    queryset = AlgorithmCategory.objects.select_related('parent')
    serializer_class = AlgorithmCategorySerializer
    search_fields = ('name', 'parent__name')
    ordering_fields = ('name',)
    ordering = ('id',)


class AlgorithmCategoryAPIView(RetrieveAPIView):
    queryset = AlgorithmCategory.objects.select_related('parent')
    serializer_class = AlgorithmCategorySerializer
    lookup_field = 'slug'


class AlgorithmListAPIView(ListAPIView):
    queryset = Algorithm.objects.select_related('category')
    serializer_class = AlgorithmSerializer
    ordering_fields = ('name', 'category__name', 'created_at')
    ordering = ('-created_at',)
    search_fields = ('name', 'category__name')


class AlgorithmAPIView(RetrieveAPIView):
    queryset = Algorithm.objects.select_related('category')
    serializer_class = AlgorithmSerializer
    lookup_field = 'slug'


class CommentListAPIView(ListAPIView, CreateAPIView):
    lookup_field = 'slug'
    queryset = Comment.objects.select_related('algorithm')
    serializer_class = CommentSerializer
    ordering_fields = ('created_at',)
    ordering = ('-created_at',)

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsVerified()]
        return [AllowAny()]

    def get_queryset(self):
        return Comment.objects.filter(algorithm__slug=self.kwargs['slug'])

    def perform_create(self, serializer):
        algorithm = Algorithm.objects.get(slug=self.kwargs['slug'])
        serializer.save(user=self.request.user, algorithm=algorithm)


class UserProgressAPIView(RetrieveAPIView, CreateAPIView):
    serializer_class = UserProgressSerializer
    queryset = UserProgress.objects
    lookup_url_kwarg = 'slug'

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsVerified()]
        return [AllowAny()]

    def perform_create(self, serializer):
        try:
            algorithm = Algorithm.objects.get(slug=self.kwargs['slug'])
            serializer.save(user=self.request.user, algorithm=algorithm)
        except IntegrityError:
            pass

    def get_object(self):
        return self.queryset.filter(user=self.request.user).filter(algorithm__slug=self.kwargs['slug'])

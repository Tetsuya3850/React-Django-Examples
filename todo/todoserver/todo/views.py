
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    @action(methods=['post'], detail=True)
    def toggle(self, request, pk=None):
        todo = self.get_object()
        todo.done = not todo.done
        todo.save()
        return Response({'status': 'toggled'})

from django.db import models


class Todo(models.Model):
    task = models.CharField(max_length=25)
    done = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return self.task

from django.contrib.admin import SimpleListFilter
from django.utils.translation import gettext_lazy as _

from .models import Algorithm


class YearFilter(SimpleListFilter):
    title = _("year")
    parameter_name = "year"

    def lookups(self, request, model_admin):
        years = Algorithm.objects.all()
        print(years)
        return []

    def queryset(self, request, queryset):
        if self.value() is None:
            return queryset.filter(created_at__year=self.value())
        return queryset

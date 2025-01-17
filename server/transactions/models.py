from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _


from users.models import UserAccount


class TransactionManager(models.Manager):
    def essentials(self):
        return self.filter(is_essential=True)


class PaymentMethod(models.TextChoices):
    CASH = "CA", _("Cash")
    CREDIT_CARD = "CC", _("Credit card")
    DEBIT_CARD = "DC", _("Debit card")
    BANK_TRANSFER = "BT", _("Bank transfer")
    GIFT_CARD = "GC", _("Gift card")


class PFCategory(models.TextChoices):
    INCOME = "IN", _("Income")
    SPENDING = "SP", _("Spending")
    SAVING = "SA", _("Saving")
    INVESTING = "IV", _("Investing")
    PROTECTION = "PR", _("Protection")


class TransactionFrequency(models.TextChoices):
    ONE_TIME = "OT", _("One Time Transaction")
    DAILY = "DA", _("Daily Transaction")
    WEEKLY = "WE", _("Weekly Transaction")
    BI_WEEKLY = "BW", _("Bi-Weekly Transaction")
    MONTHLY = "MO", _("Monthly Transaction")
    YEARLY = "YE", _("Yearly Transaction")


class Transaction(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    amount = models.DecimalField(decimal_places=2, max_digits=10)
    payment_method = models.CharField(choices=PaymentMethod.choices)
    finance_category = models.CharField(choices=PFCategory.choices)
    transaction_frequency = models.CharField(choices=TransactionFrequency.choices)
    description = models.TextField(null=True, blank=True)
    is_essential = models.BooleanField(default=False)
    objects = TransactionManager()

    def clean(self):
        if self.finance_category in [PFCategory.INCOME, PFCategory.PROTECTION] and self.amount < 0:
            raise ValidationError("Income transactions cannot have negative amounts.")

        if self.finance_category == PFCategory.SPENDING and self.amount > 0:
            raise ValidationError("Spending transactions must have negative amounts.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email).lower()
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def update_onboarding(self, user, age, goal):
        if not user.pk:
            raise ValueError("User must exist in the database to complete onboarding.")
        if not age or not goal:
            raise ValueError("Both 'age' and 'goal' are required to complete onboarding.")

        user.age = age
        user.goal = goal
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **kwargs):
        kwargs.setdefault("first_name", "Admin")
        kwargs.setdefault("last_name", "User")
        user = self.create_user(email, password=password, **kwargs)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):

    class Goal(models.TextChoices):
        CUT_SPENDING = "CS", _("Cut Spending")
        INVEST = "IN", _("Invest")
        SAVE_MONEY = "SM", _("Save Money")
        REDUCE_DEBT = "RD", _("Reduce Debt")
        RETIREMENT = "RT", _("Retirement")

    class Age(models.TextChoices):
        GRADE_SCHOOL = "GR", _("Grade School")
        COLLEGE_STUDENT = "CL", _("College Student")
        ADULT = "AD", _("Working Adult")

    first_name = models.CharField(max_length=254)
    last_name = models.CharField(max_length=254)
    email = models.EmailField(unique=True, max_length=254)
    age = models.CharField(max_length=2, choices=Age.choices, blank=True, null=True)
    goal = models.CharField(max_length=2, choices=Goal.choices, blank=True, null=True)
    is_onboarded = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def save(self, *args, validate_onboarding=False, **kwargs):
        self.email = self.__class__.objects.normalize_email(self.email).lower()

        if validate_onboarding and (not self.age or not self.goal):
            raise ValidationError("Both 'age' and 'goal' must be set during onboarding.")

        super().save(*args, **kwargs)

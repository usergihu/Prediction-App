from django.test import TestCase
from django.contrib.auth import get_user_model
# Create your tests here.
class UserModelTest(TestCase):
    def test_create_user(self):
        user=get_user_model().object.create_user(
            email="test@example.com",
            username="testuser",
            password="testpsw"
        )
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.check_password('password'))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        user=get_user_model().object.create_user(
            email="admin@example.com",
            username="testadmin",
            password="adminpsw"
        )
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.check_password('password'))
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
from django.test import TestCase
from django.contrib.auth import get_user_model
# Create your tests here.

class UserTests(TestCase):

    def test_new_superuser(self):
        db = get_user_model()
        superuser = db.objects.create_superuser('korjnan@gmail.com','password')
        self.assertEqual(superuser.email, 'korjnan@gmail.com')
        # self.assertEqual(superuser.password, 'password')
        self.assertTrue(superuser.is_superuser)
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_active)
        # testing the dunder str method
        self.assertEqual(str(superuser), 'korjnan@gmail.com')

        # Tests according to the cases we inserted in user manager
        with self.assertRaises(ValueError):
            db.objects.create_superuser('',password='password')

        with self.assertRaises(ValueError):
            db.objects.create_superuser(email='korjnan@gmail.com', password='password', is_superuser='False')
        
        with self.assertRaises(ValueError):
            db.objects.create_superuser(email='korjnan@gmail.com', password='password', is_staff='False')

    
    def test_new_user(self):
        db = get_user_model()
        user = db.objects.create_user('new@gmail.com','pass123')

        self.assertEqual(user.email, 'new@gmail.com')
        # self.assertEqual(user.password, 'pass123')
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        
        with self.assertRaises(ValueError):
            db.objects.create_user('',password='pass123')
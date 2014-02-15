from app import app
from selenium import webdriver


class TestUserInterface(object):
    """Tests for Rogoto Web UI"""
    @classmethod
    def setup_class(cls):
        cls.app = app.test_client()
        cls.driver = webdriver.Firefox()

    @classmethod
    def teardown_class(cls):
        cls.driver.quit()
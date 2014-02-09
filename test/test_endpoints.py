from app import app


class TestEndpoints(object):
    """Tests for HTTP Endpoints"""
    @classmethod
    def setup_class(cls):
        cls.app = app.test_client()

    @classmethod
    def teardown_class(cls):
        pass

    def test_index(self):
        rv = self.app.get('/')
        assert "Rogoto" in rv.data
        assert "Logo" in rv.data

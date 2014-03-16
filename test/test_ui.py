import os

from selenium import webdriver


class TestUserInterface(object):
    """Tests for Rogoto Web UI"""

    @classmethod
    def setup_class(cls):
        try:
            cls.username = os.environ['SAUCE_USERNAME']
            cls.key = os.environ['SAUCE_ACCESS_KEY']
            desired_capabilities = getattr(webdriver.DesiredCapabilities,
                                           os.environ['SAUCE_BROWSER'],
                                           None)
            if desired_capabilities is None:
                raise "Browser Capabilities Not Found"
            desired_capabilities['version'] = os.environ['SAUCE_BROWSER_VERSION']
            desired_capabilities['platform'] = os.environ['SAUCE_PLATFORM']
            desired_capabilities['name'] = 'Rogoto HTTP Server'
            desired_capabilities['tunnel-identifier'] = os.environ['TRAVIS_JOB_NUMBER']
            desired_capabilities['device-orientation'] = 'portrait'
            desired_capabilities['build'] = os.environ['TRAVIS_BUILD_NUMBER']
            desired_capabilities['tags'] = [os.environ['TRAVIS_PYTHON_VERSION'], 'CI']
            hub_url = "%s:%s@localhost:4445" % (cls.username, cls.key)

            cls.driver = webdriver.Remote(desired_capabilities=desired_capabilities,
                                          command_executor="http://%s/wd/hub" % hub_url)
        except Exception as e:
            print ("This following error was encounterd: %s" % e)
            cls.driver = webdriver.Firefox()

    @classmethod
    def teardown_class(cls):
        cls.driver.quit()

    def setUp(self):
        self.driver.refresh()

    def test_we_can_clear_things(self):
        self.driver.get('http://localhost:5000/logo')
        self.driver.find_element('id', 'code').send_keys("penup\npendown")
        self.driver.find_element('id', 'clear').click()
        assert "" == self.driver.find_element('id', 'code').get_attribute('value')

    def test_we_can_draw_images(self):
        self.driver.get("http://localhost:5000/logo")
        self.driver.find_element('id', 'code').send_keys("pendown\nforward 20\nleft 30\nforward 100")
        self.driver.find_element('id', 'run').click()
        result = self.driver.execute_script('return arguments[0].toDataURL("image/png");',
                                             self.driver.find_element('id', 'logo'))
        assert 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAADQUlEQVR4nO3d1+u2cwDH8fdjPfaWmRkRoQgpI6NIQlZGSEJGiQihyIhEGUUiIwohImWEJDJCRgiRZPsbHFyHz8XRk+8dr1f9zt/3ydV9f7t+308BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAy8261bGjIwD+yYrVudUv1YmDWwD+1oHVx9Vr1a5jUwDmbV09VX2Xn4HAglqjuqH6o7qyWjo2B2BZS6pTqx+rh6vNxuYAzNureqd6t9p7cAvArE2rh5q+VZ3W9C0LYKEsra5oOqe6sVpzbA7AvGOqb6unq20GtwDM2qV6tfqkOmhwC8CsDaq7q1+r85reWgdYKCtVF1a/VXdU643NAZh3aPV59VK10+AWgFnbVc9VX1dHDm4BmLVWdUvTawqXVquMzQFY1pLqzOqn6v5q47E5APP2rT6o3qr2GNwCMGuL6rHqh+qkwS0As1arrmk6p7q2Wn1sDsC8E6rvq8erLQe3AMzavXqz+rDab3ALwKyNqvuaRh/OqlYYmwOwrJWrS5rOqW6t1h6bAzDviOqr6vlq+8EtALN2rF6svqgOG9wCMGvd6vam2xQuarpdAWChrFCdU/1c3VNtODYHYN4BTSvKr1e7jU0BmLdV9WTTivJxY1MA5q1eXV/9WV1VrTo2B2DeKU17f49kRRlYUHs2rSi/V+0zuAVg1ibVg02X6Z2eFWVgAS2tLm/6d5qbsqIMLKijq2+qZ6ptB7cAzNq5eqX6tDp4cAvArPWru5pWlM/PijKwgFasLmh6UN3Z9OACWDiHVJ9VLzf9FARYONtVzzYdqh81uAVg1prVzU2vKVyWFWVgAS2pzmi69uWBrCgDC2rf6v3q7awoAwtq8+rRphXlkwe3AMxatbq66ZzquqwoAwvq+KYV5SeaLtYDWDi7VW9UH1X7D24BmLVRdW/TivLZWVEGFtDK1cXV79Vt1Tpjc4D/km+X89+X1QvVDv/mhwD+H5b3A+vwfzcfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvgLIgmGdaYBIUUAAAAASUVORK5CYII=' == result

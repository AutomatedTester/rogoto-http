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
        assert 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAC0klEQVR4nO3PUQsmUgBF0R0REiEiISIiQiJERDQTEhEiISIiQiKKSIiIiJAIEQkREREiISIi05CIEAkR8Qe+m5fhirXqvO9TAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAq1dHYAwF85qvq6WjI7BGBkx+ql6v5qvcktAAutVt1evVXtObkFYOjc6ufqpNkhACMHVcurayZ3AAxtWT1VPV5tNrkFYOj66qPqwNkhACOnVr9VZ80OARjZp3q3uqVaeW4KwGIbVg9Vz1fbTW4BGLq8+qI6fHYIwMix1XfVRbNDAEZ2qV6t7qnWntwCsNCa1V3V69Vuc1MAxi6ofqiOnx0CMHJo9Vl15ewQgJFtqmerR6qNJ7cADN1UvV/tNzsEYOSM6o/q9NkhACP7Vx9UN84OARjZpHq0eqbaenILwNBV1afVIbNDAEZOqH6szp8dAjCye/VGdWe1xuQWgIXWqe6tXql2ntwCMHRx9W11zOwQgJEjqi+ry2aHAIxsX71QPVhtMLkFYKFVqlurd6q9J7cADJ1d/VqdMjsEYGRJ9XF13ewQgJHNqyeqJ6stJrcADF1bLauWzg4BGDm5+qU6Z3YIwMhe1dvVbdWqk1sAFlq/eqB6sdphcgvA0KXVV9WRs0MARo6uvqkumR0CMLJT9XJ1X7Xu5BaAhVav7qjerPaY3AIwdF71U3Xi7BCAkYOrT6qrZ4cAjGxVPV09Vm06uQVg6Ibqw+qA2SEAI6dVv1dnzg4BGNm3eq+6uVppcgvAQhtVD1fPVdtObgEYuqL6vDpsdgjAyHHV99WFs0OA/5ZlK3ivVXdXa/2TJ4D/h+UreLv+fakAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwL/Eng0J5FkY9MLAAAAAASUVORK5CYII=' == result

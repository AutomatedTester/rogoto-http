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
            desired_capabilities['tags'] = [os.environ['TRAVIS_PYTHON_VERSION'],
                                            'CI']
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

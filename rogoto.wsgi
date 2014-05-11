activate_this = '/var/www/http_venv/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))

import sys
sys.path.insert(0, '/var/www/rogoto-http/')

from app import app as application
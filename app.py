from flask import Flask, render_template, redirect, url_for, send_from_directory, session
from flask_socketio import SocketIO, join_room, leave_room, send, emit

import random
import string

app = Flask(__name__)
socketio = SocketIO(app)
rooms = {}


def generate_room_id():
    """ Generate Unique ID for room """
    id_length = 6
    while True:
        id_tmp = ''.join(random.SystemRandom().choice(
            string.ascii_uppercase) for _ in range(id_length))
        conflict = id_tmp in rooms
        if not conflict:
            return id_tmp


@app.route('/')
def start():
    return render_template('login.html')


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=1232, debug=True)

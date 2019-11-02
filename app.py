from flask import Flask, render_template, redirect, url_for, send_from_directory, session, jsonify

import json
import random
import string


class Room:
    """ Room Representation """

    def __init__(self, room_id):
        self.id = room_id
        self.user_list = []
        self.song_queue = []


class User:
    """ User Representation """

    def __init__(self, username):
        self.name = username


app = Flask(__name__)
socketio = SocketIO(app)
rooms = {}
users = {}


def generate_room_id():
    """ Generate Unique ID for room """
    id_length = 6
    while True:
        id_tmp = ''.join(random.SystemRandom().choice(
            string.ascii_uppercase) for _ in range(id_length))
        conflict = id_tmp in rooms
        if not conflict:
            return id_tmp


@app.route('/create_room', methods=['GET'])
def create_room():
    room_id = generate_room_id()
    rooms[room_id] = Room(room_id)
    data = {"room_id" : room_id}
    return jsonify(data)

@app.route('/join_room', methods=['POST'])
def join_room():
    data = request.json
    user = User(data['username'])
    return jsonify(data)

    



if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=1232, debug=True)

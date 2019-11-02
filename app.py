from flask import Flask, render_template, redirect, url_for, send_from_directory, session, jsonify, request

import json
import random
import string


class Room:
    """ Room Representation """

    def __init__(self, room_id):
        self.id = room_id
        self.user_list = []
        self.song_queue = []
        self.votes = []

    def add_user(self, user):
        user_list.append(user)


class User:
    """ User Representation """

    def __init__(self, username):
        self.name = username
        self.voted = []


class Song:
    """" Song Representation """

    def __init__(self, name, url):
        self.name = name
        self.url = url
        self.votes = 0


app = Flask(__name__)
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


@app.route('/create_room', methods=['GET'])
def create_room():
    room_id = generate_room_id()
    rooms[room_id] = Room(room_id)
    data = {"room_id": room_id}
    return jsonify(data)


@app.route('/join_room', methods=['POST'])
def join_room():
    data = request.json
    user = User(data['username'])
    room = rooms[data['room_id']]
    room.add_user(user)


@app.route('/get_users')
def get_users():
    usernames = []
    for user in room.user_list:
        usernames.append(user.username)
    
    return jsonify(usernames)

@app.route('/song_vote', methods = ['POST'])
def song_vote():
    data = request.json
    room = rooms[data['room_id']]
    song = room.song_queue[data['song_id']]
    song.votes += 1

@app.route('/get_song', methods = ['GET'])
def get_song():
    data = request.json
    room = rooms[data['room_id']]
    songs = room.song_queue
    maxVotes = -1
    maxIndex = 0
    for i in range(0,len(songs)):
        if songs[i].votes > maxVotes:
            maxVotes = songs[i].votes
            maxIndex = i
        songs[i].votes = 0
    users = user_list
    for i in range(0, len(users)):
        users.voted = False
    returnSong = songs.pop(maxIndex)
    newData = {'song_url', returnSong.url}
    return jsonify(newData)

@app.route('/song_queue', methods = ['GET'])
def song_queue():
    data = request.json
    room = rooms[data['room_id']]


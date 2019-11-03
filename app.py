from flask import Flask, render_template, redirect, url_for, send_from_directory, session, jsonify, request

import json
import random
import string

import os

import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors

scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]

def get_url(song):
    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"
    client_secrets_file = "YOUR_CLIENT_SECRET_FILE.json"

    # Get credentials and create an API client
    flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
        client_secrets_file, scopes)
    credentials = flow.run_console()
    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, credentials=credentials)

    request = youtube.search().list(
        part="snippet",
        maxResults=1,
        q=song
    )
    response = request.execute()

    return response.url

class Room:
    """ Room Representation """

    def __init__(self, room_id):
        self.id = room_id
        self.user_list = []
        self.song_queue = []
        self.votes = []
        self.numSongs = 0

    def add_user(self, user):
        self.user_list.append(user)


class User:
    """ User Representation """

    def __init__(self, username):
        self.name = username


class Song:
    """" Song Representation """

    def __init__(self, name, url):
        self.name = name
        self.url = url
        self.votes = 0
        self.user_voted = []


app = Flask(__name__)
rooms = {}

# tested
def generate_room_id():
    """ Generate Unique ID for room """
    return "AAAAAA"
    id_length = 6
    while True:
        id_tmp = ''.join(random.SystemRandom().choice(
            string.ascii_uppercase) for _ in range(id_length))
        conflict = id_tmp in rooms
        if not conflict:
            return id_tmp

# implemented
# tested
@app.route('/create_room', methods=['GET'])
def create_room():
    room_id = generate_room_id()
    rooms[room_id] = Room(room_id)
    data = {"room_id": room_id}
    return jsonify({'error': 'none', 'result': data})

# implemented
# tested
@app.route('/join_room', methods=['POST'])
def join_room():
    data = request.json
    print(data)
    user = User(data['username'])
    if not data['room_id'] in rooms:
        return jsonify({'error': 'room does not exist'})
    room = rooms[data['room_id']]
    for temp_user in room.user_list:
        if data['username'] == temp_user.name:
            return jsonify({'error': 'user already exists in room'})
    room.add_user(user)
    return jsonify({'error': 'none'})


# implemented
# tested
@app.route('/get_users', methods = ['GET'])
def get_users():
    data = request.json
    if not data['room_id'] in rooms:
        return jsonify({'error': 'room does not exist'})
    room = rooms[data['room_id']]
    usernames = []
    for user in room.user_list:
        usernames.append(user.name)
    return jsonify({'error': 'none', 'result': usernames})

# implemented
# tested
@app.route('/song_vote', methods = ['POST'])
def song_vote():
    data = request.json
    if not data['room_id'] in rooms:
        return jsonify({'error': 'room does not exist'})
    room = rooms[data['room_id']]
    song = ''
    for curr_song in room.song_queue:
        if curr_song.name == data['song_name']:
            song = curr_song
            break
    
    if data['username'] in song.user_voted:
        return jsonify({'error': 'user already voted for this song'})
        
    song.votes += 1
    song.user_voted.append(data['username'])
    
    return jsonify({'error': 'none'})

### NOT IMPLEMENTED
def getUrl(song_name):
    return song_name + ": url is supposed to be here"

# implemented
# tested
@app.route('/add_song', methods = ['POST'])
def add_song():
    data = request.json
    if not data['room_id'] in rooms:
        return jsonify({'error': 'room does not exist'})
    room = rooms[data['room_id']]
    song_name = data['song_name']
    #query spotify/youtube to find url
    url = getUrl(song_name)
    for song in room.song_queue:
        if song_name == song.name or url == song.url:
            return jsonify({'error': 'repeat song'})
    new_song = Song(song_name, url)
    room.song_queue.append(new_song)
    room.numSongs += 1
    return jsonify({'error': 'none'})

@app.route('/get_song', methods = ['GET'])
def get_song():
    data = request.json
    if not data['room_id'] in rooms:
        return jsonify({'error': 'room does not exist'})
    room = rooms[data['room_id']]
    songs = room.song_queue
    maxVotes = -1
    maxIndex = 0
    if len(songs) == 0:
        return jsonify({'error': 'no songs'})
    for i in range(0,len(songs)):
        if songs[i].votes > maxVotes:
            maxVotes = songs[i].votes
            maxIndex = i
        songs[i].votes = 0
        songs[i].user_voted = []
    returnSong = songs.pop(maxIndex)
    room.numSongs -= 1
    newData = {'song_url' : returnSong.url}
    return jsonify(newData)

# implemented
# tested
@app.route('/song_queue', methods = ['GET'])
def song_queue():
    data = request.json
    if not data['room_id'] in rooms:
        return jsonify({'error': 'room does not exist'})
    room = rooms[data['room_id']]
    
    songs = []
    for song in room.song_queue:
        songs.append((song.name, song.votes))

    return jsonify({'error': 'none', 'result': songs})

# testing purposes
@app.route('/get_all_rooms', methods = ['GET'])
def get_all_rooms():
    room_ids = []
    for room in rooms:
        room_ids.append(rooms[room].id)

    return jsonify({'error': 'none', 'result': room_ids})

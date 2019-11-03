from flask import Flask, render_template, redirect, url_for, send_from_directory, session, jsonify, request

# MAKE SURE TO pip3 install -r requirements.txt

import json
import random
import string

import os

import isodate
import requests

from googleapiclient.discovery import build
import googleapiclient.errors

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

    def __init__(self, name, url, dur):
        self.name = name
        self.url = url
        self.votes = 0
        self.user_voted = []
        self.duration = dur


app = Flask(__name__)
rooms = {}

# tested
def generate_room_id():
    """ Generate Unique ID for room """
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

# implemented
def get_url(song):
    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"
    client_secrets_file = "credentials.json"

    with open(client_secrets_file, 'r') as f:
        cred_dict = json.load(f)

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey=cred_dict['api-key'])

    request = youtube.search().list(
        part="snippet",
        maxResults=1,
        q=song
    )
    data = request.execute()

    curr_id = ""
    
    for search in data["items"]:
        if(search["id"]["kind"] == 'youtube#video'):
            curr_id = search["id"]["videoId"]
            break
    
    next_url = f"https://www.googleapis.com/youtube/v3/videos?id={curr_id}&key={cred_dict['api-key']}&part=contentDetails"
    data = requests.get(next_url).json()["items"][0]

    dur = isodate.parse_duration(data['contentDetails']['duration'])

    return (f'https://www.youtube.com/embed/{curr_id}?&autoplay=1', int(dur.total_seconds()))

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
    (url, duration) = get_url(song_name)
    for song in room.song_queue:
        if song_name == song.name or url == song.url:
            return jsonify({'error': 'repeat song'})
    new_song = Song(song_name, url, duration)
    room.song_queue.append(new_song)
    room.numSongs += 1
    return jsonify({'error': 'none'})

@app.route('/get_song', methods = ['POST'])
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
    newData = {'song_url' : returnSong.url, 'duration' : returnSong.duration }
    return jsonify(newData)

# implemented
# tested
@app.route('/song_queue', methods = ['POST'])
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

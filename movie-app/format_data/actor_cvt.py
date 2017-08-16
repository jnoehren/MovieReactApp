import json
import re

class Actor:
    def __init__(self, name, movie, likes):
        self.name = name
        self.movie = [movie]
        self.likes = likes

with open('movie_data.json', encoding="utf8") as f:
    moviejs = json.load(f)

actorList = []

for movie in moviejs:
    listLen = len(actorList) 
    iterator = 0 
    for actor in actorList:
        iterator += 1
        if(actor.name == movie['actor_1_name']):
            actor.movie.append(movie['movie_title'])
            break
    if(listLen==iterator):
        actorList.append(
            Actor(movie['actor_1_name'], 
            movie['movie_title'],
            movie['actor_1_facebook_likes']))

    iterator = 0 
    for actor in actorList:
        iterator += 1
        if(actor.name == movie['actor_2_name']):
            actor.movie.append(movie['movie_title'])
            break
    if(listLen==iterator):
        actorList.append(
            Actor(movie['actor_2_name'], 
            movie['movie_title'],
            movie['actor_2_facebook_likes']))

    iterator = 0 
    for actor in actorList:
        iterator += 1
        if(actor.name == movie['actor_3_name']):
            actor.movie.append(movie['movie_title'])
            break
    if(listLen==iterator):
        actorList.append(
            Actor(movie['actor_3_name'], 
            movie['movie_title'],
            movie['actor_2_facebook_likes']))

actorjson = []
for actor in actorList:
    actorjson.append(
        {
            'actor':actor.name,
            'movies':actor.movie,
            'likes':actor.likes
        }
    )
    with open('actor_table.json', 'w') as f:
        json.dump(actorjson,f, indent=2)
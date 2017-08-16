import json
import re

with open('movie_data.json', encoding="utf8") as f:
    moviejs = json.load(f)

moviejson = []

for movie in moviejs:
    moviejson.append(
            {
                'title': movie["movie_title"],
                'director' : movie["director_name"],
                'duration' : movie["duration"],
                'year' : movie["title_year"],
                'content_rating' : movie["content_rating"],
                'imdb_score' : movie["imdb_score"]
            }
    )

    with open('movie_table.json', 'w') as f:
        json.dump(moviejson,f, indent=2)
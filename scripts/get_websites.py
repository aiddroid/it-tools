# encoding: utf-8

import os
import re
import json
import time
from datetime import datetime
import requests
import pymysql
import zlib

# set requests header user agent
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

def crc32(text):
    return str(zlib.crc32(bytes(str(text), 'utf8')) & 0xFFFFFF)

# send reqeust to url, extract icons and totalPages from json response
def get_websites(lang='en-US'):
    response = requests.get(f'https://infinity-api.infinitynewtab.com/get-icons?lang={lang}&page=0&type=popular', headers=headers)
    j = response.json()
    
    total_page = j["totalPages"]
    print('totalPages:', total_page)
    icons = j["icons"]
    
    for page in range(total_page + 1):
        response = requests.get(f'https://infinity-api.infinitynewtab.com/get-icons?lang={lang}&page={page}&type=popular', headers=headers)
        j = response.json()
        # print('icons:', j["icons"])
        print('page:', page)
        icons = j["icons"]
        # write icons to file as json
        with open(f'icons-{lang}.json', 'a', encoding='utf-8') as f:
            for icon in icons:
                f.write(json.dumps(icon, ensure_ascii=False) + '\n')
        time.sleep(0.5)
    
    return icons

def parse_websites(lang='en-US'):
    icons = {}
    # read json from file
    with open(f'icons-{lang}.json', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        print('lines:', len(lines))
        for line in lines:
            icon = json.loads(line)
            # {"_id": "595a178e703e23483da871c7", "uid": "ee8aec1813f45aec64a67876eafeb3b0", "name": "Google", "url": "https://www.google.com", "imgname": "google.png", "src": "https://infinityicon.infinitynewtab.com/user-share-icon/73aa787ba15e632af86263a7649d9d26.png", "keyword": "GoogleGooglehttps://www.google.com", "rate": 8456, "time": 1475044252378378, "type": ["app"], "isInfinity": false, "isZh": false, "source": "infinity", "description": "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.", "isAboveall": false, "country": ["in"]}

            name = str(icon['name'])
            # check if name is alpha numberic
            if not re.match(r'^[a-zA-Z0-9 ]+$', name):
                # use millisecond as logo name
                logo_name = 'images/logos/' + crc32(name) + '.png'
            else:
                logo_name = 'images/logos/' + name.lower().replace(' ', '') + '.png'
            description = icon.get('description', '')
            category = list(icon.get('type', ['other']))
            languages = icon.get('country', [])
            if not languages and icon.get('language'):
                    languages = [icon.get('language')]
            url = icon['url']
            src = icon['src']
            is_global = icon.get('isAboveall', False)
            source = icon.get('source', '')
            # get created_at from timestamp
            # convert datetime 2020-01-01 00:00:00 to timestamp
            if icon['time']//1000 >  datetime.strptime("2024-12-30 00:00:00", "%Y-%m-%d %H:%M:%S").timestamp():
                created_at = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
            else:
                created_at = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(icon['time'] // 1000))
            rate = icon['rate']
            if (rate > 10000000000000 and rate < 10000000000100) \
                or rate < 100:
                continue
            
            icons[url] = {
                'name': name,
                'logo': logo_name,
                'description': description,
                'category': category,
                'languages': languages,
                'src': src,
                'url': url,
                'is_global': is_global,
                'source': source,
                'votes': rate,
                'created_at': created_at
            }
            print(icon)
            print(name, logo_name, description, category, languages)
            
            # check if file exists
            if not os.path.exists(logo_name):
                res = requests.get(src, headers=headers)
                with open(logo_name, 'wb') as f:
                    f.write(res.content)
                time.sleep(0.1)
    print('icons:', len(icons.keys()))
    with open('icons.json', 'w', encoding='utf-8') as f:
        json.dump(icons, f, ensure_ascii=False)
    return icons

if __name__ == '__main__':
    # get_websites('en-US')
    
    icons = parse_websites('en-US')
    
    # load icons from json file
    with open('icons.json', 'r', encoding='utf-8') as f:
        icons = json.load(f)
    print('icons:', len(icons.keys()))
    
    db = pymysql.connect(host="127.0.0.1", 
            user="root", 
            password="", 
            port=3306,
            database="dcat", 
            charset='utf8')
    cursor = db.cursor()
    
    for url in icons:
        try:
            icon = icons[url]
            sql = "INSERT INTO `websites`(`name`, `logo`, `url`, `description`, `category`, `languages`, `votes`, `source`, `created_at`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (icon['name'], icon['logo'], icon['url'], icon['description'][:250], json.dumps(icon['category']), json.dumps(icon['languages']), icon['votes'], icon['source'], icon['created_at']))
            db.commit()
        except:
            print('icon:', icon)
    # close db connection
    db.close()
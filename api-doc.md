## 📄 API documentation

- Get random emoji

```rs
GET https://emojihub.yurace.pro/api/random
```

```json
{
  "name": "hugging face",
  "category": "smileys and people",
  "group": "face positive",
  "htmlCode": ["&#129303;"],
  "unicode": ["U+1F917"]
}
```

- Get an array of all emojis

```rs
GET https://emojihub.yurace.pro/api/all
```

- Get all available categories

```rs
GET https://emojihub.yurace.pro/api/categories
```

```json
[
  "smileys and people",
  "animals and nature",
  "food and drink",
  "travel and places",
  "activities",
  "objects",
  "symbols",
  "flags"
]
```

- Get all available groups

```rs
GET https://emojihub.yurace.pro/api/groups
```

```json
["face positive","face neutral","face negative","face role","face sick","creature face",...and more]
```

- Search emojis by name

```rs
GET https://emojihub.yurace.pro/api/search?q={query}
```

```json
[
  {
    "name": "cat face with wry smile",
    "category": "smileys and people",
    "group": "cat face",
    "htmlCode": ["&#128572;"],
    "unicode": ["U+1F63C"]
  }
]
```

- Get similar emojis by name

```rs
GET https://emojihub.yurace.pro/api/similar/{name}
```

```json
[
  {
    "name": "grinning face",
    "category": "smileys and people",
    "group": "face positive",
    "htmlCode": ["&#128512;"],
    "unicode": ["U+1F600"]
  },
  {
    "name": "smiling face with smiling eyes",
    "category": "smileys and people",
    "group": "face positive",
    "htmlCode": ["&#128513;"],
    "unicode": ["U+1F601"]
  }
]
```

Each endpoint can be supplemented by a path to a specific category or group:

```
/category/{category-name}
```

```
/group/{group-name}
```

📚 Table with all available emoji categories and groups:

| Category           | Groups                                                                                                                                                                                                                  |
| ------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| smileys-and-people | body, cat-face, clothing, creature-face, emotion, face-negative, face-neutral, face-positive, face-positive, face-role, face-sick, family, monkey-face, person, person-activity, person-gesture, person-role, skin-tone |
| animals-and-nature | animal-amphibian, animal-bird, animal-bug, animal-mammal, animal-marine, animal-reptile, plant-flower, plant-other                                                                                                      |
| food-and-drink     | dishware, drink, food-asian, food-fruit, food-prepared, food-sweet, food-vegetable                                                                                                                                      |
| travel-and-places  | travel-and-places                                                                                                                                                                                                       |
| activities         | activities                                                                                                                                                                                                              |
| objects            | objects                                                                                                                                                                                                                 |
| symbols            | symbols                                                                                                                                                                                                                 |
| flags              | flags                                                                                                                                                                                                                   |

### 🎯 Examples

```
https://emojihub.yurace.pro/api/categories
```

```
https://emojihub.yurace.pro/api/groups
```

```
https://emojihub.yurace.pro/api/random/group/face-positive
```

```
https://emojihub.yurace.pro/api/random/category/food-and-drink
```

```
https://emojihub.yurace.pro/api/all/category/travel-and-places
```

```
https://emojihub.yurace.pro/api/all/group/animal-bird
```

```
https://emojihub.yurace.pro/api/search?q=smile
```

```
https://emojihub.yurace.pro/api/similar/cat
```

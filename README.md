# **Recipy**

[Visit the deployed app](https://will-recipy.herokuapp.com/)

## About the Project

Recipy (pronounced 'reci-pie') is a web application that allows users to filter recipes by ingredients they have in their pantry. Users can also login to add recipes to their favourites and play a themed Spotify playlist within the app to cook along to.

All recipes have been scraped from [BBC Good Food](https://www.bbcgoodfood.com/) using a custom-built scraper located in [this repository](https://github.com/Will-Helliwell/Recipe_Scraper).

Accordingly, the rights to all recipes belong to BBC Good Food. This project is solely for educational purposes.

## **Screenshots of app in use**

### Homepage
![Homepage](https://github.com/Will-Helliwell/Recipy/blob/master/recipy_homepage_screenshot.png)

### Filtering Recipes by Ingredient
![Homepage](https://github.com/Will-Helliwell/Recipy/blob/master/recipy_filter_screenshot.png)

### Login
![Homepage](https://github.com/Will-Helliwell/Recipy/blob/master/recipy_login_screenshot.png)



## **User Stories**

#### Completed
```
As a user
Because I am obsessed with BBC
I would like to have access to all recipes from BBC Food

As a user
So that I can choose what to eat tonight
I would like to see a list of recipes with titles, images, summary, cook time

As a user
So that the page loads suitably quickly
I would like to be able to scroll infinitely

As a user
So that I can see all the recipe details
I would like to click on a recipe card and see a pop-up of all recipe details (ingredients, instructions etc.)

As a user
So that I can find recipes that use ingredients I have in the cupboard
I want to be able to filter recipes by ingredients
```
#### In Progress
```
As a user
I can listen to music with my meal
I would like to have a link to a relaxing background music playlist from Spotify
```
This works on the dev environment, but not yet in the deployed app.

#### Future Features
```
As a user
So that I can easily buy the food I need for next week
I would like to add all ingredients from any recipe of my choice to my shopping cart with one click
```

#### Completed solo since end of group project

- Deployed app to Heroku
- Reconfigure databases - test database is now my personal version, containing a fixed 118 recipes. Moved production database key to private .env file to prevent manipulation of deployment. Kept test and dev databases public (in config/keys.js) to allow anyone to clone and run the app and tests.
- In the process of adding Cypress feature testing
- Misc - update readme, clean up scripts, improved scripts (e.g. `npm run dev` now starts Spotify server as well as backend and client servers)
---
### **Tech Summary**

| Technology    | Use                           |
| ------------- | ----------------------------- |
| Node          | Back-end JavaScript Framework |
| Express       | Web application framework     |
| React         | Frontend Framework            |
| Redux         | Managing application state    |
| Cypress       | Feature testing               |
| Jasmine       | Unit testing                  |
| MongoDB       | Database                      |
| CSS           | Styling                       |
| Travis        | CI/CD                         |
| Heroku        | Live deployment (work in progress)        |
| ESLint        | Linting                       |
| Puppeteer     | Headless browser controller (recipe scraper repo only)     |

---
## **Setup**

Clone this repository

```
git clone https://github.com/will-helliwell/Recipy.git
```

Move to the project directory

```
cd Recipy
```

Run the package installer

```
npm install
```
---
## **Testing:**

To run feature tests with Cypress:
```
npm run feature-test
```
This will open a browser window containing the app (connected to the dev database). It will also open up the Cypress Test Runner in a another browser window, from where you can run feature tests (individually or all at once).

To run unit tests with Jasmine:
```
npm run unit-test
```
---
## **To run the web app**

In order to run the project, you must have NodeJS and node package manager (npm) installed.
To run in development mode (connects to the development database), navigate to the project root directory and run:
```
npm run dev
```
The browser should open the project url in your browser automatically, but if not visit [http://localhost:3000](http://localhost:3000) to view.


## **Contributors**

This repository is cloned from the original group project, allowing me to make changes and alter the databases in isolation.

Other contributors - Zeen Lam, Lisa Bardelli, AJ Montgomery, Simon Piper.

## **Links to Repositories**

- [Recipe Scraper](https://github.com/Will-Helliwell/Recipe_Scraper)
- [Orignal group project Repository](https://github.com/AJSMonty/Recipy)


# Magic the Gathering Collection Application:

## Instructions
Right now, the project is hosted on Heroku! You can access the application with the link in the description or visit it [here](https://enigmatic-basin-39847.herokuapp.com/)! Anonymous users can use the Search view and functions and see cards posted on the market by way of the navigation bar at the top. However you'll have to create an account to add and remove cards from an account and the marketplace.

I'm creating a test account that you can use to access the logged in features for this project. Once I've set up a few restrictions, I'll provide access to it here!

__Note:__ Since this project is hosted for free on Heroku, it may be slow to load. To learn more about this, see their documentation on [free dyno hours](https://devcenter.heroku.com/articles/free-dyno-hours)!

## Project Description
__A Magic the Gathering application where you can view, store and trade cards between users. It will involve using the [Magic: The Gathering API](https://magicthegathering.io/) to retrieve information on the different cards in the game.__


### 3 Main Features
1. Users should be able to browser MTG cards by set
2. Users should be able to add cards to their profile
3. Users should be able to post cards to a market page

### Bonus Features
4. The ability to trade cards between users through the market page

5. The ability to add comments to cards/sets

### Views and UI Description
**The Index View**\
UI will consist of a form where can submit a query for information on a particular set. There will be links to the different "basic" views such as a login page, sign-in page, and profile page. There will also be links to views for each set.

**Individual Card View**\
An image of the card and relevant information such as type and effects

**Set View:**\
Will be separate views with links to individual cards in that set

There will be an account registration and sign-in page

**Profile View:**\
A place where you can list card favorites, current posts, and want lists

**Trading Market View:**\
Users can post cards with requested cards to trade. This may be a gallery of cards that you can look through.

### Project Steps, Priorities, and Checklist
**Initial Setup:**
Create a server and get it running

Get the primary views running.
 - Index, set, and card views

 - Get api information to render to the different views

**Start Working on Features**
 - Create a way to search for specific cards through a form

 - Create the Market view

 - Create a way for users to create profiles

 - Create a way for users to store cards and other information to their profiles

 - Find a way to post cards from the Profile view to the market view.


### Technical Requirements:
The project uses HTML, CSS, NodeJS, BootStrap, and jQuery.\

The app will use the following Packages.
Express
mtgsdk
body-parser
express-handlebars
mongoose
passport
passport-local
cookie-parser

## Post Project Summary 
This is an updated version of my first application project. It was built using NodeJS, Express, MongoDB, Handlebars and PassportJS. Built as a single page application, I wanted to include concepts I'd learned over my first few months learning JavaScript.

### Concepts Implemented
* Asyncronous JavaScript
* Server-Side Rendering with Handlebars and Express
* Templating with Handlebars
* Handling HTTP requests
* Communicating with a MongoDB database
* Basic account creation and authentication

### Lessons Learned
__NodeJS can do a lot!__\
When I was planning out my project, finding the different tools I'd need to use was pretty overwhelming! I'd never really dug into npm's packages outside of setting up a few smaller projects. It was amazing to see all the different tools people use to accomplish different things and improve their applications!

__Planning:__\
 Before working on this project, I'd only ever worked with JavaScript on the front end. Working on this project taught me a lot about the importance of planning out your project beforehand. When you have a lot of ideas for a project, implementing them while you work can make the process complicated. It's important to have a basic idea or even a diagram mapped out so you don't go overboard with features.

__APIs and Documentation__\
Finding good documentation is super important when you're planning out a project. It's a good idea to test out APIs before you start building your application. If you don't, you'll definitely run into problems down the line. Some APIs have quirks, and you have to really think about which features you plan to use with them and test them ahead of time! Some of the features for the API I was using to retrieve data, required streams to get them to work. I wasn't familiar with how to work with streams. Luckily, I was able to find another method for retrieving the card data I needed.

### Plans for future changes
I'm hoping that, when I have more time, I can add the trading feature that was one of my extra goals for this project. Having worked on a few projects since I started this, I have a few ideas that I'd like to try out!

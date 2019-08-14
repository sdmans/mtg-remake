
# Magic the Gathering Collection Application:

## Project Description
__A Magic the Gathering application where you can view, store and trade cards between users. It will involve using the [Magic: The Gathering API](https://magicthegathering.io/) to retrieve information on the different cards in the game.__

### Accessing Demo and Application Instructions
Right now, this project is hosted on Heroku! You can access the application with the link in the description or visit it [here](https://enigmatic-basin-39847.herokuapp.com/)! Instructions for using the application can be found at the bottom of of this document. You can also access them with this [link](#instructions)!

__Note:__ Since this project is hosted for free on Heroku, it may be slow to load at first. To learn more about this, see their documentation on [free dyno hours](https://devcenter.heroku.com/articles/free-dyno-hours)!

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
The project uses HTML, CSS, NodeJS, BootStrap, and jQuery.

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

## Instructions
You can access the application with the link in the description or visit it [here](https://enigmatic-basin-39847.herokuapp.com/)! Once you've accessed the link, you'll be taken to the home view of the application. 

### Home View
In this view, you can navigate to the application with the three main functions for the application.

__The first option, "Create An Account To Start a Collection" -__ Takes you to a form to create an account so you can log in and start a collection.

__The second option, "Check out the market" -__ This will take you to the market view where you can see what cards have been posted by other users in the market.

__The third option, "Search a specified card by set" -__ This will take you to the Search View that lets you access the card search function for the application.

__Note:__ Anonymous users can use the Search view and functions and see cards posted on the market by way of the navigation bar at the top. However you'll have to create an account to access additional features such as adding searched cards and remove cards from an account collection or the marketplace!

## Test Account and Application Walkthrough
You can use this test account to access the signed in features for this project.

__Username:__ testuser\
__Password:__ testpw

### Account Setup and Signing in
To create an account, select the first option. This will take you to a page to create a Username and Password. You can also use the test account above to sign into the application!

Once you've signed in, you'll be taken to a profile view. Navigate to the search view via the Search navigation item at the top or through the third option in the home view. Once you've selected either of these options, you'll be taken to the search view. Here, you can search for cards from sets in Magic the Gathering!

### Card Search View
First, select a Set and Type from the game. If you're unfamiliar, just select the first option, "Amonkhet". Then in the second select box, choose the first option, "Creature". After those two are selected click submit!

Once the page has loaded, select a Card Name. You can select any you prefer or just the first one, "Ahn-Crop Champion". Then click the submit button. This will take you to the detail view for this card with the card's image and description.

Since you're logged in, you'll see an Add to Inventory button near the bottom of the page. Click this button and you'll be taken to your profile view! 

### User Profile View
The user profile view will display your username at the top with an inventory of any cards added to your collection. You'll see the card you'd just selected, added to the inventory. At the bottom of the page, you'll see three options. 

__Add a new card to your inventory:__/
This will navigate you back to the search view where can you can submit a query for another card like in the previous step.

__Post a card to the market:__/
Selecting this option will take you to a submit view with your inventory listed and a selector at the bottom where you can pick a card to add to the market! After you've selected this, you can then navigate to the Market view to see your card listed.

__Remove a card from inventory:__/
This selector will let you choose a card in your inventory to remove. Once you've selected the card you intend to remove, click the remove card button and the page will be reloaded with your updated inventory.

For the purpose of walking you through the process, click the second option, "Post a card to the market!". Then select the card added to your inventory via the selector at the bottom and click Submit Card. Once you do this, you'll be taken back to the profile view. To view the market, select "Market" in the navigation menu at the top of the page. 

### Market View
Once you've clicked the "Market" link, you'll be taken to a page with a number of cards listed on the page. Search for your username or the picture of the card you submitted and you'll see that your card is posted to the market!

You can then remove the card from the Market via the drop down at the bottom under, "Remove a Card from the market". This drop down will list all cards you've posted to the market.

Once you're finished navigate to the Home View and, above the three main options, where it says that you're currently signed in. Click Sign Out to log out of the application. 

This completes the walkthrough for the application. With this application, you can create an account, search for cards, build a collection and add cards to the market. Thanks for completing the walkthrough!

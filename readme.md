# Final Project:
## Project Description
## A Magic the Gathering application where you can view, store and trade cards between users. It will involve using the Magic: The Gathering API to retrieve information on the different cards in the game.


### 3 Main Features
The ability to browser MTG cards by set
The ability to add cards to your profile
The ability to post cards to a market page

### Bonus Features
The ability to trade cards between users through the market page

The ability to add comments to cards/sets

### Views and UI Description
**The Index View**
UI will consist of a form where can submit a query for information on a particular set. There will be links to the different ‘basic’ views such as a login page, sign-in page, and profile page. There will also be links to set views

**Individual Card View**
An image of the card and relevant information such as type and effects

**Set View**
May be separate views with links to individual cards in that set

There will be an account registration and sign-in page

**Profile View**
A place where you can list card favorites, current posts, and want lists

**Trading Market View**
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
The app will likely use HTML, CSS, Javascript, BootStrap, and jQuery

The app will use the following Packages.
Express
mtgsdk
body-parser
express-handlebars
mongoose
passport
passport-local
cookie-parser

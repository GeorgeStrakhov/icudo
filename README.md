#ICUDO - do what matters

##Problem
We all want to do more than we can.
Todo lists get out of hand. Prioritizing sucks. Planning too much and accomplishing too litle is makes us feel unproductive and as a result robes us of happinness. And with everything becoming an uber-high-priority tasks - you end up spending your days doing only urgent stuff, and never quite doing the important things.

##Solution
ICUDO - a simple system to focus on what matters. The principle is simple: Every day start afresh and do at least 3 things: one that is important, one that is cool and one that is urgent.

##How it works
ICUDO is a todo-done list with prioritization and other opinionated smarts built in.

1.  You enter your tasks one by one
2.  For each one you choose whether it's important or not, cool or not and urgent or not
3.  You instantly see the tasks that you should focus on today (prioritized based on the rule above)
4.  When you are done - move them things to done
5.  When you log in tomorrow (first login each day) you are prompted to clean up your list: mark the dones, and for each undone you either need to move it to today or forget about it
6.  For every date (past or future) - see what's in the todo and what was done

##Data structure
    +-- appData
    |   +-- stats
    |       +-- visits 
    |           +-- days (key: "YYYY-MM-DD", val: visits); 
    +-- users (key: "UID")
    |   +-- userData
    |       +-- name (string)
    |       +-- email (string)
    |   +-- metaData
    |       +-- lastLoginTime (timestamp)
    |   +-- days (key: "YYYY-MM-DD")
    |       +-- tasks (key: UUID hash)
    |           +-- name (string)
    |           +-- createdAt (timestamp)
    |           +-- updatedAt (timestamp)
    |           +-- important (boolean)
    |           +-- cool (boolean)
    |           +-- urgent (boolean)
    |           +-- status (string "todo" || "done")


##Todo
* header for add/edit with x instead of +
* if no tasks for a day - show a button to add one
* different view for desktop
* feature: old date tasks => "copy to today" link
* choice of firebase endpoint based on the environment (host location): if icudo.com => icudo else
* add/edit task to be able to change date
* BUG: entering the app via a deep link to edit task id results in a redirect
* integrate connection lost detector http://github.hubspot.com/offline/
* ng-Animate menus for mobile
* create desktop UI (todo and done in one view?)  => separate controllers to avoid conflicts?
* BUG: what if I left the window open overnight? how / when should the date be changed? (!) recheck regularly?
* style global loader (loading partial view)
* integrate intercom for user-management & communication: http://docs.intercom.io/integrating-intercom-in-one-page-app

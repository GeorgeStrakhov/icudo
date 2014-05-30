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
* BUG: reconfigure grunt to deploy properly with minification and all that. currently 25 files which is BAAD
* add/edit task to be able to change date
* integrate connection lost detector http://github.hubspot.com/offline/
* feature: old date tasks => "copy to today" link
* header for add/edit with x instead of + ((complicated because of nested routes issue, do it later))
* ng-Animate menus for mobile
* BUG: what if I left the window open overnight? how / when should the date be changed? (!) recheck regularly?
* integrate intercom for user-management & communication: http://docs.intercom.io/integrating-intercom-in-one-page-app

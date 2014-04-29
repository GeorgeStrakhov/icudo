#ICUDO - do what matters

##Problem
We all want to do more than we can.
Todo lists get out of hand. Prioritizing sucks. Planning too much and accomplishing too litle is painful. And with everything becoming an uber-high-priority tasks - you end up spending your days doing only urgent stuff, and never quite doing the important things.

##Solution
ICUDO - a simple system to focus on what matters. The principle is simple: Every day start afresh and do at least 3 things: one that is important, one that is cool and one that is urgent.

##How it works
ICUDO is a todo-done list.
1. You enter your tasks one by one
2. For each one you choose whether it's important or not, cool or not and urgent or not
3. You instantly see the tasks that you should focus on today (prioritized based on the rule above)
4. When you are done - move them things to done
5. When you log in tomorrow (first login each day) you are prompted to clean up your list: mark the dones, and for each undone you either need to move it to today or forget about it
6. For every date (past or future) - see what's in the todo and what was done

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
* test that last visit check works 
* bug: first visit of the day: the screen doesn't go away after moving the one and only task from today...
    or is it a connection lag issue - saw it on the ferry...
* deal with UI and showing the header...
* css: single mobile brakepoint (xs+sm vs md+lg)
* global loading indicator => $rootScope.globalLoading
* redo mobile frienly with ng-Animate
* password recovery when new browser window! - entry points...
* performance test: what if there are 6000 tasks in the your account? (should now not be a problem since only one day is loaded);

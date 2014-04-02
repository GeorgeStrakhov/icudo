#IUIDO - do what matters

##Problem
We all want to do more than we can.
Todo lists get out of hand. Prioritizing sucks. Planning too much and accomplishing too litle is painful. And with everything becoming an uber-high-priority tasks - you end up spending your days doing only urgent stuff, and never quite doing the important things.

##Solution
IUIDO - a simple system to focus on what matters. The principle is simple:Every day start afresh and do at least 3 things: one that is important, one that is urgent and one that is interesting.

##How it works
IUIDO is a todo list.
1. You enter your tasks one by one
2. For each one you choose whether it's important or not, urgent or not and interesting or not
3. You instantly see the tasks that you should focus on today (prioritized based on the rule above)
4. When you are done - you cross things off
5. When you log in tomorrow (first login each day) you are prompted to clean up your list: mark the dones, and for each undone you either need to move it to today or forget about it

##Todo
* permission rules:
    default: read & write false
    read & write my user object if my auth.uid == user.uid
    read & write tasks where my auth.uid == task.userId
    validation: tasks should have name etc.
* create functions in tasksservice
* show special screen for the first login a day (after 4am) => logic inside UserService

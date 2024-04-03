Functionality:
- View Groups added by user
- Sort Groups added by user
- Add groups to indexdb database
- View Events added by user
- View Events in scotland from ticketmaster
- Sort both external and internal events
- Add events to indexdb database

Use of AI

Chatgpt use 1 - https://chat.openai.com/share/e23eae7a-3e27-4e10-a595-f891d84f182f
- issue with adding and displaying database items on load so used chatgpt to try and figure out why. 
- Didnt make much use of chatgpt's code here, but it helped me realise the cause of the problem leading to my solution of having the database be displayed on a button click or other user input. 

Chatgpt use 2 - https://chat.openai.com/share/20db0e43-2c8c-4ff4-8efa-23bfb1db1687
- Began as a continuation of previous issue. 
- Used it as a reminder of some basic concepts because I was coding late at night and kept forgetting basic javascript syntax.
- Then used it to troubleshoot an error surrounding items being added
- I believe some minor bits were added from here but not too much


Chatgpt use 3 - https://chat.openai.com/share/d203ec98-efd5-4866-9fbf-a6f786846f9b
- I noticed in provided code for indexdb that it was displaying items from the array and not the database itself and struggled to find examples online (was once again coding late at night so I found mutliple but just couldnt figure out what they were doing)
- I am incredibly sorry for my wording at the start of the prompt, I was frustrated from countless errors that day and didnt realise that I had to send my chatgpt logs until after that. 
- Used it to try and figure out why it was only adding items before adding new items to the database.
- Used it to troubleshoot an issue related to the key not automatically updating which turned out to be because I was trying to use a seperate ID variable instead of indexdb's automatic key
- Asked it how to add formatted accordions to a list as limited tutorials online. I think my use of chatgpt was a bit too heavy here. I made sure I understood everything added, however this part may be a bit too much in excess
- Then used it to help with troubleshooting issues with the accordions
- This one was probably the most heavy use of chatgpt. I used it alot for the GroupViewData(), groupCreateAccordionItem(), EventViewData() and eventCreateAccordionItem() functions. 

Chatgpt use 4 - https://chat.openai.com/share/5a531721-c646-462f-a395-b467c123895b
- Used it to find out what ticketmaster's api example code was doing and how to use the addon it used
- Used it to troubleshoot an issue with reading the name of items from ticketmaster
- Used it to troubleshoot an error with not adding the accordion items for the external data
- Used it to troubleshoot and fix an error with the app stopping when it finds items that to not have a classification field
- attempted to use it to find an alternative to onclick similar to ionchange, however instead discovered that wouldnt work so combined onclick and ionchange instead
- basic syntax error trouble shooting
- used it to troubleshoot an error with items being added multiple times (caused by new eventlisteners being added each time its changed or clicked)

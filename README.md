# Syncin

## Inspiration
We were inspired by the fun we had with the sponsors while getting as much stickers and swag as our laptops and desktops can handle. We were mostly inspired by inevitable consequence of a lot of career fairs and meetups - most people do not get to talk to prospective employers and employers miss out on a lot of formidable student's who could turn out to be rockstar employees.

## What it does
Syncin seamlessly connects people by using iBeacons - a class of Bluetooth low energy (BLE) devices that broadcast their identifier to nearby portable electronic devices. Imagine a student , let's call her Jamie, walking around Hack The North Sponsor Booths and trying to get the attention of sponsors. The Booths are all occupied and the place is fully packed. Enters Syncin. With Syncin, All she needs to do is go to close to the Booth she is interested in and pull up Syncin on her iphone. In a time as short as the time between the beginning and end of your last blink, she detects the BLE signal from the Beacon. She shares, from Syncin, her predefined details including linkedin profile, academic status and a 100 word summary with the person in the both and also saves the contact information of the company she just met which includes a short pitch from the company. Something in the line of "We make cool stuff, have free lunch and offer free massages. Let's chat about opportunities at Cool Company", if the company is targeting a particular demographic.

On the other hand, the company's rep or recruiter is able to go back, log into Syncin desktop app and directly view the  profile and other details of the people who 'met' her at the event. In addition to viewing this list, the rep can also directly message the candidates or ask for more information. If they like a physical copy of the list, they can directly print it from their Syncin dashboard or export it to excel where they are able to extract emails for bulk messaging. 

If they have multiple events, they can also add those events to their dashboard and set up their Beacon for these events. One Beacon, <$40, can be reused for as many events as possible.

## How we built it
In building Syncin, we were social-minded and we were guided by our desire to build something that people will use. We thought it would be nice to help student's who are not assertive get connected to Employers while also helping Employers get the talent that they deserve. In addition to this, we built Syncin with an approachable personality to engage our users through empathy, emotional design and wholehearted dedication.

Specifically, we coded in Swift for the ios app and for connecting multiple beacons to different iphones. Furthermore, for the web interface, we primarily used javascript with inclduing angular js to provide a three way data binding between our view, our **firebase** real-time database and the controller which drives all the change and operations in the view and the database. Firebase was also used for integrating the operations between our webapp and ios app. With firebase, we did not have to worry about platform difference. 

While building Syncin, we created two user groups, Admins and Users. An admin, event organizer, is able to create multiple events with one iBeacon and place the iBeacon inside their booth with the iBeacon number visible to event goers to leave their contact information. A regular user, on the other hand, is able to store multiple contacts and modify their profile to cater to each employer before scanning an iBeacon. Our goal was to make the experience as seamless and ubiquitous as possible.

## Challenges we ran into
This is a great question. We initially started out building a recipe app or deal suggestion app or nutrition app. We did not even know what were we building! We had all the api's ready and we already built most of the Interface for both the Web and ios app for the former idea. At about 5pm on Sunday, one of us challenged our conformity. We then realized that we had shared our old idea with did not think it was practical. Some of them did not understand what we were trying to accomplish. We could not even articulate what we were doing, passionately! Fortunately, however, after waking up from our slumber of building stuff we thought some companies we were targeting would like, here we are awake all night building something and writing about something we are truely proud of. Something we have built with our whole heart and because we think it will be useful to students like us. 

## Accomplishments that we're proud of
We failed yet we were able to wake up. We wrote code for an unpractical idea yet we were able to make the code practical for loaded idea. We  started with something that many people questioned. We were reminded to keep asking questions and we are happy we made something we are are all truly proud of and will definitely love to continue to work on. We had fun even while dozzing off, coding and writing this, simultaneously.

## What we learned
We learned that no matter the amount of time, effort, money, sweat and even blood we invest in a project, completing it after we realizing that it is a bad project won't change it from being shitty to being less shitty.

## What's next for Synchin
Good question! We have a lot of work to do. The prospects that we envision for Syncin is a challenge for us and we plan to build it from ground up using better practices and more reliable tools and frameworks so that it can be used by our family and us. Since we think people are our family, we want people to try Syncin and we definitely want to put in more research and work into making it better.

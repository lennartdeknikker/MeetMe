# MeetMe Dating Application
## Description
In my experience conversations in dating apps are really superficial. It’s too easy to forget to answer for a day or two or just lose interest when someone doesn’t answer right away. Because of that it’s not always easy to go from starting a conversation to planning a date, but there’s even more obstacles. People don’t always live in the same city and they’re not always available.

This application will help people to impulsively go on a date. There's no need for waiting, you can just change your status whenever you're available, show others what activities you'd like to do and find someone to go on a date with right away.

A preview of this application is hosted on [Heroku](https://meetme-dating.herokuapp.com/).

## Table of contents
* [installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Credits](#credits)
* [References](#references)
* [License](#license)

## Installation
Use the clone repository:
`https://github.com/lennartdeknikker/MeetMe.git`
and install packages using
`npm install`

The feature will be installed to your system path.
This application needs a database on [mongoDB](mongodb.com). To be able to use the application, add an .env-file with the following variables:

```
DB_HOSTLIST=<host-url>
DB_NAME=<database-name>
DB_USER=<username>
DB_PASS=<password>
PORT=<portnr.>

API_KEY_CATBREEDS=<catbreeds-api-key>
```
[Here](https://thecatapi.com/) you can get a key for using the catbreeds API.

## Usage
To run the application use
`npm start`

## Contributing
When contributing, please make use of our [guidelines](https://github.com/lennartdeknikker/MeetMe/wiki/Guidelines)

## Credits
This project is created with help from these [contributors](https://github.com/lennartdeknikker/MeetMe/graphs/contributors):
* [Patrick-ve](https://github.com/patrick-ve)
* [Dejorden94](https://github.com/Dejorden94)

## References
Most pictures of people are produced by a GAN (generative adversarial network) on www.thispersondoesnotexist.com.
Icons are from www.thenounproject.com.

## License
Unless stated otherwise, code is [MIT](https://github.com/lennartdeknikker/MeetMe/blob/development/LICENSE) © [lenn4RT](http://www.lenn4rt.com).

<a name="references"/>

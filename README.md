# [Formulate](https://formulate.herokuapp.com)

Formulate is a tool created by [@gabrielperales](https://github.com/gabrielperales), [@mcelearr](https://github.com/mcelearr) and [@TroyMaeder](https://github.com/TroyMaeder), [@shadows666](https://github.com/Shadows666) for the Anna Freud Centre, a child mental health research, training and treatment centre based in London. Link to feedback form https://docs.google.com/forms/d/e/1FAIpQLScEpuicTnILvga-xCwjAHZGmnXbc_l2lHG9Biuid7-R93y-dg/viewform.

## The problem

Formulation is a process that clinicians carry out when diagnosing patients. It is a methodical way of considering the patient's symptoms and drawing causal links to factors that the clinician suspects might be responsible. In this way, the clinician is able to come to a rational conclusion on the cause of the patients issues and how to go about treating them. However, these formulations are done on paper meaning they are hard to get access to and can be hard to decypher for other clinicians and the patients themselves.

## The solution

Formulate is a graphical representation of the folumation broken down into symptoms, causal factors and treatments. It benefits:
* The clinicians developing the formulations because they can see these connections more clearly.
* Other clinicians such as those who are picking up the case or carrying out peer review to more easily and quickly see what the original clinician was thinking when they made the diagnosis.
* The patient. By being able to see a visual represenation of their condition, patients may find their condition less intimidating and may gain a sense of control and empowerment.

## DAMN Stack

Formulate uses the DAMN (Deployd, AngularJS, MongoDB, NG Admin) stack. [Deployd](https://github.com/deployd/deployd) is a tool for building backends with RESTful APIs, which is connected to [MongoDB](https://www.mongodb.com/). [NG-Admin](https://github.com/marmelab/ng-admin) is a administration app done with [AngularJS](https://github.com/angular) which consumes the API built with Deployd. The DAMN stack provides ready-made endpoints and an administation GUI that make it easy to get projects off the ground quickly.

## Quickstart guide

### Install MongoDB and Deployd globally

#### IOS
```bash
$ brew install mongodb
$ npm install -g deployd
```

#### Linux
```bash
$ sudo apt-get install mongodb
$ sudo npm install -g deployd
```

### Clone the repo

```bash
$ git clone https://github.com/CYPIAPT-LNDSE/formulate.git && cd formulate
```

### Enviroment variables
This repo comes with a example file for configuring your enviroment variables.
That file can be found in `example.config.env`. You have to copy that file and rename it with 
the name `confiv.env`. Formulate server will try to find that file for loading those variables.

- `MONGODB_URI` will be the uri where your mongodb database is hosted.
- `PORT` will be the port where formulate server will be running.

If Formulate server can't find `config.env` then it will use the default values and it will be running
the server on the **port 8080** and it will try to connect with a mongodb database in `mongodb://localhost:27017`.

### Build the app, start the server and watch for changes
You should have an mongodb server running

```bash
$ npm run watch
```

### Running the app for production
You should have an mongodb server running

```bash
$ npm run build
$ npm start
```

### Create the default user
The formulate server is based on [Deployd](https://github.com/deployd/deployd).
That tool comes with a dashboard for managing your database. To go to that dashboard
you will need a key, you can create one and see it with these commands:

```bash
$ ./node_modules/deployd/bin/dpd keygen # this will create a new key
$ ./node_modules/deployd/bin/dpd showkey # this will show the key
```

Now you can go to `/dashboard` in your browser, and put that key in the dashboard login.
There you will be able to go to the `users` collection and create your user.
Once you have finish these steps, you will be able to log in formulate and try it.

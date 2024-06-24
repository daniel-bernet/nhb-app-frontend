# nhb-app-frontend

## Introduction

This repository contains the frontend of my mod-164 school project about a mobile application to ease our band workflows.

## Deployment

Maybe dockerise and run from server to ease access to project?

## Browser Setup Locally

First you need to make sure that `Node` and the accompanying package manager `npm` are installed. You can accomplish this using the following commands. If neither one is installed consult the [public documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for a step by step installation guide.

```shell
node --version
npm --version
```

Next you need to ensure the installation and version of `Angular` and `Ionic` using the following commands. This application requires at least `Angular v18` and `Ionic v8`.

```shell
ng --version
ionic --version
```

If `Angular` or `Ionic` aren't installed on your system use the following commands for installation.

```shell
npm install -g @angular/cli
npm install -g @ionic/cli
```

Now Download the source code. Navigate to the project **source folder**. Next you need to install the node-modules using the following command.

```shell
npm install
```

Finally the frontend can be run locally in a web browser using the following command.

```shell
ionic serve
```

Make use of the `dev-tools` and `dimensions` selection to simulate an actual mobile device.

## Project Documentation, Concept & Mockup

As a part of this project I was required to write and create a concept and mockup. These files can, alongside further documentation, be found within the backend repository.

- [Concept](https://github.com/maknis3/nhb-app-backend/blob/main/documentation/concept/concept.md)
- [Mockup](https://github.com/maknis3/nhb-app-backend/blob/main/documentation/frontend/mockup.md)
- [Backend Repository](https://github.com/maknis3/nhb-app-backend)

## Frontend Structure

The frontend in general is structured around a 5-page tabs navigation alongside 2 auth pages for login and registration. I've further made use of the newly angular stand alone components for all my pages and components. The logic of the frontend-application is generally found within the page specific typescript code, wich rely on services and interseptors.

## Future Frontend Development

At this point of time this project is in it's _alpha_ state, as many features aren't implemented or completly missing. For a real world adaption of this application within our band a lot more essential features will have to be implemented. Additionally I've been cutting some corners, while implementing this first draft, for either reducing complexity or avoiding roadblocks and knowledge gaps. Further discussion with stakeholders for future development is needed to refine and redefine the future and scope of this project. Despite that I'm thankful for the already recieved insights, suggestions and feedback I've recieved. The following list provides an insight in to my thoughts and notes for the future of this project regarding the front end (general future features and thoughts can be found within my [backend documentation](https://github.com/maknis3/nhb-app-backend)):

- implement dark and light mode
- translate the application to german, implement using language setting
- switch from REST to WebSocket
- expand development to include ios devices
- implement virtual scroll for group feed (depricated, search alternative!)

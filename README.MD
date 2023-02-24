![banner of the project](https://github.com/ffex/JourneyLog/blob/main/public/images/banner.png)

# About

## Description

It is a simple webapp, SIMPLE must be the key! It have to help fast to plan a trip. Insert the name of the journey, some general informations (from and to dates, what vehicle use etc...).

Second step is to choose stops with the help of Google maps API. It generate in automatic a list of the routes with distance and duration, to check it rapid.

A useful dashboard resume all this things and get a simple autogenerate ToDo-list:

buy plane ticket
rent a car
reserve an hotel or bnb every stops
etc...
Every stop come with others helpfull informations (if you have done yet reservations, if you have complete yet!)

You can also write a log! for your thoughts during the travel.


## Partecipants

Me! [Twitter](https://twitter.com/GreenCoreSoft) [Github](https://github.com/ffex)


## Preview
<img width="1680" alt="Dashboard" src="https://user-images.githubusercontent.com/23725091/221144324-2d3d41e7-ea42-4f9f-b319-6b982bd78a52.png">

<img width="1680" alt="Insert Stops" src="https://user-images.githubusercontent.com/23725091/221144384-23c2ccef-99ad-4a2b-9546-bebd79273eb5.png">

<img width="1680" alt="Calculated Routes" src="https://user-images.githubusercontent.com/23725091/221144429-8d77f295-c1de-4254-add2-12ade3b632e0.png">


## Set up Project

### Backend with [Appwrite](https://appwrite.io/)

1. Install Appwrite by following the [installation guide](https://appwrite.io/docs/installation).

2. Open the Appwrite console and create a new project called `journey`.

3. Navigate to `Databases` and add a new `Database` called `journey-log-db` and add a `Collection` called `journey`.

4. Add the following attributes and all permission on `user`:
<img width="1680" alt="Screenshot 2023-02-24 at 09 02 25" src="https://user-images.githubusercontent.com/23725091/221145187-df464cb1-f2cf-4ca7-8958-1ca37767def8.png">

5. Add a new  `Collection` called `stop`.

6. Add the following attributes and all permission on `user`:
<img width="1680" alt="Screenshot 2023-02-24 at 09 02 44" src="https://user-images.githubusercontent.com/23725091/221145379-e82316e7-2b27-48ee-97b8-58049b414611.png">

7. Add a new  `Collection` called `route`.

8. Add the following attributes and all permission on `user`:
<img width="1680" alt="Screenshot 2023-02-24 at 09 02 34" src="https://user-images.githubusercontent.com/23725091/221145750-43d6f8a8-d4b0-4978-ab32-2387326b9137.png">


9. Add a new  `Collection` called `todo`.

10. Add the following attributes and all permission on `user`:
<img width="1680" alt="Screenshot 2023-02-24 at 09 03 02" src="https://user-images.githubusercontent.com/23725091/221145808-276e397c-364d-4053-a81c-8f116024a796.png">


11. Add a new  `Collection` called `vehicle`.

12. Add the following attributes and all permission on `user`:
<img width="1680" alt="Screenshot 2023-02-24 at 09 02 55" src="https://user-images.githubusercontent.com/23725091/221145783-de9e09b7-0d00-4e64-a76c-bb7e9b70c7c5.png">

### Running the development frontend server.

1. Clone the repo to your PC

2. Change your Appwrite API in /src/utility/appwriteClient.ts
2.1 There is API references in all the project, asseure that you change all of it
2.2 Change Google Maps API key in public/index.html and in src/components/map/map.tsx

3. run `npm install` to install the libraries

4. Start server:

```bash
    npm run dev
```

### Building for production.

```bash
    npm run build
```

### Running the production server.

```bash
    npm run start
```

## Learn More

To learn more about **refine**, please check out the [Documentation](https://refine.dev/docs)

- **Appwrite Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Ant Design** [Docs](https://refine.dev/docs/ui-frameworks/antd/tutorial/)
- **Antd Light/Dark Mode** [Docs](#)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)


## License

MIT

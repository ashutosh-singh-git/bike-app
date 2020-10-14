# Bike App

To deploy Code use

```git push heroku master```

Domain name for URL:

```https://salty-dawn-84029.herokuapp.com/ ```

Every 4 hours blogs are updated.

#Deploy To GCP

Build: ```gcloud builds submit --tag gcr.io/bikerapp-e3150/biker-app``` 

Deploy: ```gcloud run deploy --image  gcr.io/bikerapp-e3150/biker-app --platform managed```

#FireBase Deploy

Used for rewriting static caching -> cloud run for free caching

in case of different login than ROM

```firebase logout```   
```firebase login```   
```firebase deploy```


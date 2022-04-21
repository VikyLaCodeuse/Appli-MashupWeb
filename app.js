const express = require('express'); /* installation de l'appli express*/
const mongoose = require('mongoose'); /* installation de l'appli mongoose*/
const Thing = require('./models/thing'); /*Pour pouvoir utiliser le model thing*/
const app = express();

mongoose.connect('mongodb+srv://7mitwe2:5PIP7tuo@cluster0.4cwqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  /* permet de se connecter à MongoDB*/
app.use(express.json()); /* pour gerer les requêtes post*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
/* Ce header permet accéder à notre API depuis n'importe quelle origine ,d'ajouter les headers mentionnés aux requêtes envoyées vers notre API et d'envoyer des requêtes avec les differentes méthodes*/

app.post('/api/trad', (req, res, next) => {
    delete req.body._id; /* car generer automatiquement par mongoDB */
    const thing = new Thing({
      ...req.body /*raccourci afin d'eviter d'ecrire à chaque fois title: req.body.title.... */
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Traduction enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }); /* cree/enregistre les données*/

  app.get('api/trad', (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  }); /* recupere toutes les données*/

  app.get('api/trad/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  }); /* recupere les données d'un objet unique*/

  app.put('api/trad/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Tranduction modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }); /* modifier les objets*/

  app.delete('/api/trad/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Traduction supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }); /* supprime les données*/

module.exports = app;


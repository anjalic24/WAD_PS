const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// a) Connect to local MongoDB and create 'music' DB if not exists
mongoose.connect('mongodb://127.0.0.1:27017/music')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// b) Define the Song schema and model for 'songdetails' collection
const songSchema = new mongoose.Schema({
  SongName:      { type: String, required: true },
  FilmName:      { type: String, required: true },
  MusicDirector: { type: String, required: true },
  Singer:        { type: String, required: true },
  Actor:         String,
  Actress:       String
});
const Song = mongoose.model('Song', songSchema, 'songdetails');

// c) Insert one initial song if collection is empty
async function insertInitialSong() {
  const count = await Song.countDocuments();
  if (count === 0) {
    await Song.create({
      SongName: "Tum Hi Ho",
      FilmName: "Aashiqui 2",
      MusicDirector: "Mithoon",
      Singer: "Arijit Singh",
      Actor: "Aditya Roy Kapur",
      Actress: "Shraddha Kapoor"
    });
    console.log('Inserted initial song.');
  }
}
insertInitialSong();

// d, k) Display total count and all documents in browser as a table
app.get('/songs', async (req, res) => {
  const songs = await Song.find();
  const count = await Song.countDocuments();
  let html = `<h2>Total Songs: ${count}</h2><table border="1" cellpadding="5"><tr>
  <th>Song Name</th><th>Film Name</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>`;
  songs.forEach(song => {
    html += `<tr>
      <td>${song.SongName}</td>
      <td>${song.FilmName}</td>
      <td>${song.MusicDirector}</td>
      <td>${song.Singer}</td>
      <td>${song.Actor || ''}</td>
      <td>${song.Actress || ''}</td>
    </tr>`;
  });
  html += '</table>';
  res.send(html);
});

// e) List specified Music Director songs
app.get('/songs/music_director/:md', async (req, res) => {
  const songs = await Song.find({ MusicDirector: req.params.md });
  res.json(songs);
});

// f) List specified Music Director songs sung by specified Singer
app.get('/songs/music_director/:md/singer/:singer', async (req, res) => {
  const songs = await Song.find({ MusicDirector: req.params.md, Singer: req.params.singer });
  res.json(songs);
});

// g) Delete the song you don't like (by SongName)
app.delete('/songs/:songname', async (req, res) => {
  const result = await Song.deleteOne({ SongName: req.params.songname });
  if (result.deletedCount > 0) {
    res.send('Song deleted.');
  } else {
    res.send('Song not found.');
  }
});

// h) Add new song (your favourite)
app.post('/songs', async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.send('Song added!');
  } catch (err) {
    res.status(400).send('Error adding song: ' + err.message);
  }
});

// i) List Songs sung by Specified Singer from specified film
app.get('/songs/film/:film/singer/:singer', async (req, res) => {
  const songs = await Song.find({ FilmName: req.params.film, Singer: req.params.singer });
  res.json(songs);
});

// j) Update document by adding Actor and Actress name (by SongName)
app.put('/songs/:songname', async (req, res) => {
  const { Actor, Actress } = req.body;
  const result = await Song.updateOne(
    { SongName: req.params.songname },
    { $set: { Actor, Actress } }
  );
  if (result.matchedCount > 0 || result.n > 0) {
    res.send('Song updated!');
  } else {
    res.send('Song not found.');
  }
});


// Delete all records from the songdetails collection
app.delete('/songs', async (req, res) => {
  const result = await Song.deleteMany({});
  res.send(`Deleted ${result.deletedCount} song(s) from the collection.`);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

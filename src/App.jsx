import { useState, useEffect } from 'react';
import * as trackService from './services/trackService'
import TrackList from './components/TrackList/TrackList';
import TrackDetail from './components/TrackDetail/TrackDetail';
import TrackForm from './components/TrackForm/TrackForm';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const fetchedTracks = await trackService.index();
        if (fetchedTracks.err) {
          throw new Error(fetchedTracks.err);
        }
        setTracks(fetchedTracks);
      } catch (err) {
        // Log the error object
        console.log(err);
      }
    };
    fetchTracks();
  }, []);

  const handleSelect = (track) => {
    setSelected(track)
  }

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (formData) => {
    try {
    const newTrack = await trackService.create(formData);

    if (newTrack.err) {
      throw new Error(newTrack.err);
    }

    setTracks([newTrack, ...tracks]);
    setIsFormOpen(false);
    } catch (err) {
      // Log the error to the console
      console.log(err);
    }
  };



  return (
    <>
      <TrackList 
      tracks={tracks} 
      handleSelect={handleSelect}
      handleFormView={handleFormView}
      isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
      <TrackForm handleAddTrack={handleAddTrack}/>
    ) : (
      <TrackDetail selected={selected} />
    )}
    </>
  );
};


export default App;

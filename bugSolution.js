This improved approach combines `Linking.getInitialURL` and `Linking.addEventListener` to handle deep links even when the app is launched from a deep link:

```javascript
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';

function App() {
  const [initialUrl, setInitialUrl] = useState(null);

  useEffect(() => {
    const handleUrl = async (url) => {
      console.log('App is opened from deep link', url);
      // Process the deep link here
    };

    const initUrl = async () => {
        const url = await Linking.getInitialURL();
        if (url) {
          setInitialUrl(url);
          handleUrl(url);
        }
    };

    Linking.addEventListener('url', ({ url }) => {
      handleUrl(url);
    });

    initUrl();
    return () => {
      Linking.removeEventListener('url');
    };
  }, []);

  useEffect(() => {
    if(initialUrl){
      console.log('Initial Url', initialUrl);
    }
  }, [initialUrl]);

  return (
    // ... your app content
  );
}

export default App;
```

This solution ensures deep links are processed even if the app isn't actively running.